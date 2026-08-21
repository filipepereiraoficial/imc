/**
 * Percurso de integracao da API em PHP.
 *
 * Nao substitui os testes de interface: exercita as regras que so o servidor
 * pode garantir — escopo, precedencia, quorum, unicidade do voto e as
 * restricoes normativas que a tela nao alcanca.
 *
 * Uso: node testes/api.mjs [http://127.0.0.1:8088]
 */

const BASE = process.argv[2] ?? 'http://127.0.0.1:8088';
const API = `${BASE}/api`;

let passou = 0;
let falhou = 0;
const falhas = [];

function conferir(descricao, condicao, detalhe = '') {
  if (condicao) {
    passou++;
    console.log(`  ok   ${descricao}`);
  } else {
    falhou++;
    falhas.push(`${descricao}${detalhe ? ` — ${detalhe}` : ''}`);
    console.log(`  FALHA ${descricao}${detalhe ? ` — ${detalhe}` : ''}`);
  }
}

function titulo(t) {
  console.log(`\n${t}`);
}

/** Sessao com cookie e token anti-CSRF proprios. */
class Cliente {
  constructor(nome) {
    this.nome = nome;
    this.cookie = '';
    this.csrf = null;
  }

  async pedir(metodo, caminho, corpo) {
    const cabecalhos = {};
    if (this.cookie) cabecalhos.Cookie = this.cookie;
    if (this.csrf) cabecalhos['X-CSRF-Token'] = this.csrf;
    if (corpo !== undefined) cabecalhos['Content-Type'] = 'application/json';

    const resposta = await fetch(`${API}${caminho}`, {
      method: metodo,
      headers: cabecalhos,
      body: corpo === undefined ? undefined : JSON.stringify(corpo),
      redirect: 'manual',
    });
    const bruto = resposta.headers.getSetCookie?.() ?? [];
    for (const c of bruto) {
      const par = c.split(';')[0];
      if (par.startsWith('omcl_sessao=')) this.cookie = par;
    }
    let dados = null;
    const texto = await resposta.text();
    try {
      dados = JSON.parse(texto);
    } catch {
      dados = { bruto: texto.slice(0, 200) };
    }
    return { situacao: resposta.status, ...dados };
  }

  get(c) { return this.pedir('GET', c); }
  post(c, b) { return this.pedir('POST', c, b ?? {}); }
  put(c, b) { return this.pedir('PUT', c, b ?? {}); }
  patch(c, b) { return this.pedir('PATCH', c, b ?? {}); }
  delete(c) { return this.pedir('DELETE', c); }

  async entrar(identificacao, senha) {
    const r = await this.post('/sessao', { identificacao, senha });
    if (r.ok) this.csrf = r.dados.csrf;
    return r;
  }
}

const SENHA_ADMIN = process.env.SENHA_ADMIN ?? 'Outra-Senha-Firme-8';
const admin = new Cliente('admin');

titulo('Estado e sessao');
{
  const estado = await (await fetch(`${API}/estado`)).json();
  conferir('a plataforma se declara instalada', estado.instalado === true);

  const errado = await admin.entrar('admin@ordem.test', 'nao-e-a-senha');
  conferir('senha errada e recusada com 401', errado.situacao === 401, `situacao ${errado.situacao}`);

  const certo = await admin.entrar('admin@ordem.test', SENHA_ADMIN);
  conferir('entrada com a senha correta', certo.ok === true, JSON.stringify(certo).slice(0, 120));
  conferir('o token anti-CSRF acompanha a entrada', typeof admin.csrf === 'string' && admin.csrf.length === 64);

  const eu = await admin.get('/sessao');
  conferir('a sessao devolve o cargo', eu.dados?.cargo?.codigo === 'administrador');
  conferir('a sessao devolve as permissoes', (eu.dados?.permissoes?.length ?? 0) === 30);
}

titulo('Referencias');
let referencias;
{
  const r = await admin.get('/referencias');
  referencias = r.dados;
  conferir('14 cargos semeados', referencias.cargos.length === 14, `${referencias.cargos.length}`);
  conferir('13 graus semeados', referencias.graus.length === 13);
  conferir('7 orgaos centrais semeados', referencias.orgaos.length === 7);
  conferir('o pais da sede foi criado', referencias.paises.length === 1);
  conferir(
    'Secretaria e Tesouraria tem permissoes disjuntas nas areas sensiveis',
    (() => {
      const sec = referencias.cargos.find((c) => c.codigo === 'secretario_geral').permissoes;
      const tes = referencias.cargos.find((c) => c.codigo === 'tesoureiro_geral').permissoes;
      return !sec.includes('tesouraria.lancarReceita') && !tes.includes('membros.editar');
    })(),
  );
}

titulo('Territorio e Nucleo');
let estadoId;
let municipioId;
let nucleoId;
{
  const e = await admin.post('/estados', {
    paisId: referencias.paises[0].id, nome: 'Minas Gerais', sigla: 'MG',
  });
  estadoId = e.dados?.id;
  conferir('estado cadastrado', e.ok === true, JSON.stringify(e).slice(0, 120));

  const m = await admin.post('/municipios', { estadoId, nome: 'Belo Horizonte' });
  municipioId = m.dados?.id;
  conferir('municipio cadastrado', m.ok === true);

  const repetido = await admin.post('/municipios', { estadoId, nome: 'Belo Horizonte' });
  conferir('municipio repetido e recusado', repetido.situacao === 422);

  const n = await admin.post('/nucleos', {
    nome: 'Nucleo Bandeirante', codigo: 'NBH', paisId: referencias.paises[0].id,
    estadoId, municipioId, dataFundacao: '2024-03-15', situacao: 'ativo',
  });
  nucleoId = n.dados?.id;
  conferir('Nucleo criado', n.ok === true, JSON.stringify(n).slice(0, 160));

  const detalhe = await admin.get(`/nucleos/${nucleoId}`);
  conferir(
    'os tres orgaos locais do Art. 59 nascem com o Nucleo',
    detalhe.dados?.orgaos?.length === 3,
    `${detalhe.dados?.orgaos?.length}`,
  );

  const municipioDeOutro = await admin.post('/nucleos', {
    nome: 'Nucleo Invalido', codigo: 'NIV', paisId: referencias.paises[0].id,
    estadoId, municipioId: referencias.paises[0].id, dataFundacao: '2024-01-01',
  });
  conferir('municipio de outro estado e recusado', municipioDeOutro.situacao === 422);
}

titulo('Cadastro e deferimento — Est. Art. 17');
let candidatoId;
{
  const c = await fetch(`${API}/cadastro`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nomeCompleto: 'Helena Drummond', email: 'helena@ordem.test',
      usuario: 'helena', senha: 'Vespera-Serena-1889', nucleoId,
    }),
  });
  const corpo = await c.json();
  conferir('cadastro publico aceito', corpo.ok === true, JSON.stringify(corpo).slice(0, 120));

  const dup = await fetch(`${API}/cadastro`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nomeCompleto: 'Outra Pessoa', email: 'helena@ordem.test',
      usuario: 'helena2', senha: 'Vespera-Serena-1889',
    }),
  });
  const dupCorpo = await dup.json();
  conferir('duplicidade nao vaza pela resposta', dupCorpo.ok === true && dupCorpo.mensagem === corpo.mensagem);

  const lista = await admin.get('/membros?situacao=pendente');
  candidatoId = lista.dados?.[0]?.id;
  conferir('o postulante entra como pendente', lista.dados?.length === 1, JSON.stringify(lista).slice(0, 160));

  const candidato = new Cliente('candidato');
  const tentativa = await candidato.entrar('helena@ordem.test', 'Vespera-Serena-1889');
  conferir('pendente nao entra antes do deferimento', tentativa.situacao === 403, `situacao ${tentativa.situacao}`);

  const defere = await admin.post(`/membros/${candidatoId}/situacao`, { situacao: 'ativo' });
  conferir('deferimento aceito', defere.ok === true, JSON.stringify(defere).slice(0, 160));

  const cargoMembro = referencias.cargos.find((c) => c.codigo === 'membro');
  conferir('o deferimento troca candidato por membro', defere.dados?.cargoId === cargoMembro.id);
}

titulo('Privacidade — Est. Art. 21, VI');
const membro = new Cliente('membro');
{
  await membro.entrar('helena@ordem.test', 'Vespera-Serena-1889');
  conferir('o membro deferido entra', membro.csrf !== null);

  const visto = await membro.get(`/membros/${candidatoId}`);
  conferir('o membro ve o proprio e-mail', visto.dados?.email === 'helena@ordem.test');

  const outro = await membro.get('/membros');
  const oAdmin = outro.dados?.find((m) => m.usuario === 'admin');
  conferir(
    'o e-mail do administrador, marcado como administrativo, nao sai para o membro comum',
    oAdmin !== undefined && oAdmin.email === null,
    JSON.stringify(oAdmin ?? {}).slice(0, 160),
  );
  conferir('nenhuma resposta carrega senha_hash', !JSON.stringify(outro).includes('senha_hash'));

  const publico = await membro.patch(`/membros/${candidatoId}`, { visibilidadeEmail: 'publico' });
  conferir('o membro escolhe a propria faixa de visibilidade', publico.ok === true);
}

titulo('Escalonamento de privilegio');
{
  const cargoGraoMestre = referencias.cargos.find((c) => c.codigo === 'grao_mestre');
  const tentativa = await membro.patch(`/membros/${candidatoId}`, { cargoId: cargoGraoMestre.id });
  conferir(
    'membro comum nao se promove a Grao-Mestre',
    tentativa.situacao === 403,
    `situacao ${tentativa.situacao}`,
  );

  const alheio = await membro.post(`/membros/${candidatoId}/situacao`, { situacao: 'suspenso' });
  conferir('membro comum nao altera situacao', alheio.situacao === 403);

  const cargoSecretario = referencias.cargos.find((c) => c.codigo === 'secretario_geral');
  const concessao = await membro.put(`/cargos/${cargoSecretario.id}/permissoes`, {
    permissoes: ['membros.editar'],
  });
  conferir('membro comum nao mexe em permissoes', concessao.situacao === 403);
}

titulo('Feed');
let publicacaoId;
{
  const p = await membro.post('/publicacoes', { conteudo: 'Primeira reflexao do Nucleo.' });
  publicacaoId = p.dados?.id;
  conferir('membro publica no feed', p.ok === true, JSON.stringify(p).slice(0, 120));

  const oficial = await membro.post('/publicacoes', {
    conteudo: 'Comunicado.', oficial: true, emitidoPor: 'Chancelaria',
  });
  conferir('membro comum nao emite comunicado oficial', oficial.situacao === 403);

  const doAdmin = await admin.post('/publicacoes', {
    conteudo: 'A Ordem comunica.', oficial: true, emitidoPor: 'Chancelaria', categoria: 'comunicado',
  });
  conferir('quem tem a permissao emite o comunicado', doAdmin.ok === true);

  const curtiu = await membro.post(`/publicacoes/${publicacaoId}/curtida`);
  conferir('reconhecimento registrado', curtiu.dados?.curti === true && curtiu.dados?.curtidas === 1);
  const descurtiu = await membro.post(`/publicacoes/${publicacaoId}/curtida`);
  conferir('reconhecimento alternado', descurtiu.dados?.curti === false && descurtiu.dados?.curtidas === 0);

  const comentario = await membro.post(`/publicacoes/${publicacaoId}/comentarios`, { conteudo: 'De acordo.' });
  conferir('comentario aceito', comentario.ok === true);

  const feed = await membro.get('/publicacoes');
  conferir('o feed traz as duas publicacoes', feed.dados?.length === 2, `${feed.dados?.length}`);
  conferir('o comunicado traz o orgao emissor', feed.dados?.some((p) => p.emitidoPor === 'Chancelaria'));
}

titulo('Assembleia — Est. Arts. 27 a 32');
let assembleiaId;
let materiaId;
{
  const assembleiaGeral = referencias.orgaos.find((o) => o.codigo === 'assembleia_geral');
  const daqui = new Date(Date.now() + 20 * 86400000).toISOString().slice(0, 19).replace('T', ' ');
  const a = await admin.post('/assembleias', {
    titulo: 'Assembleia Geral Ordinaria', orgaoId: assembleiaGeral.id,
    inicio: daqui, modalidade: 'hibrido', ordinaria: true,
  });
  assembleiaId = a.dados?.id;
  conferir('assembleia convocada', a.ok === true, JSON.stringify(a).slice(0, 160));
  conferir('a antecedencia do Art. 30 e conferida', a.dados?.convocacao?.regular === true);

  const passado = await admin.post('/assembleias', {
    titulo: 'Retroativa', orgaoId: assembleiaGeral.id,
    inicio: '2020-01-01 10:00:00', modalidade: 'online',
  });
  conferir('assembleia no passado e recusada', passado.situacao === 422);

  const m = await admin.post(`/assembleias/${assembleiaId}/materias`, {
    titulo: 'Reforma estatutaria', quorum: 'qualificado', fundamento: 'Est. Art. 67',
  });
  materiaId = m.dados?.id;
  conferir('materia pautada', m.ok === true);

  const cedo = await admin.post(`/materias/${materiaId}/voto`, { opcao: 'favor' });
  conferir('nao se vota antes da instalacao', cedo.situacao === 409, `situacao ${cedo.situacao}`);

  const semQuorum = await admin.post(`/assembleias/${assembleiaId}/situacao`, { acao: 'instalar' });
  conferir(
    'sem quorum a assembleia nao instala em primeira convocacao',
    semQuorum.situacao === 409,
    JSON.stringify(semQuorum).slice(0, 160),
  );

  await admin.post(`/assembleias/${assembleiaId}/presenca`);
  const comPresenca = await membro.post(`/assembleias/${assembleiaId}/presenca`);
  conferir('presenca registrada desde a convocacao', comPresenca.ok === true, JSON.stringify(comPresenca).slice(0, 160));
  conferir('com os dois presentes o quorum de maioria absoluta e atingido', comPresenca.dados?.instalavel === true);

  const instala = await admin.post(`/assembleias/${assembleiaId}/situacao`, { acao: 'instalar' });
  conferir('assembleia instalada', instala.ok === true, JSON.stringify(instala).slice(0, 160));

  const voto = await admin.post(`/materias/${materiaId}/voto`, { opcao: 'favor' });
  conferir('voto registrado', voto.ok === true, JSON.stringify(voto).slice(0, 160));

  const repetido = await admin.post(`/materias/${materiaId}/voto`, { opcao: 'contra' });
  conferir('o voto nao se repete nem se altera', repetido.situacao === 409, `situacao ${repetido.situacao}`);

  const abstencao = await membro.post(`/materias/${materiaId}/voto`, { opcao: 'abstencao' });
  conferir('abstencao aceita', abstencao.ok === true);
  conferir(
    'a abstencao conta na presenca e nao nos votos validos — Est. Art. 32',
    abstencao.dados?.validos === 1 && abstencao.dados?.total === 2 && abstencao.dados?.abstencao === 1,
    JSON.stringify(abstencao.dados),
  );
  conferir(
    'quorum qualificado exige dois tercos dos validos',
    abstencao.dados?.exigidos === 1 && abstencao.dados?.aprovada === true,
    JSON.stringify(abstencao.dados),
  );
}

titulo('Tesouraria — Est. Arts. 10 a 13; C106');
{
  const conta = await admin.post('/financeiro/contas', { nome: 'Conta geral', saldoInicial: 0 });
  const cReceita = await admin.post('/financeiro/categorias', { nome: 'Contribuicoes', tipo: 'receita' });
  const cDespesa = await admin.post('/financeiro/categorias', { nome: 'Sede', tipo: 'despesa' });
  conferir('conta e categorias criadas', conta.ok && cReceita.ok && cDespesa.ok);

  const hoje = new Date().toISOString().slice(0, 10);
  const receita = await admin.post('/financeiro/lancamentos', {
    tipo: 'receita', data: hoje, descricao: 'Pistis Eisphora de agosto',
    categoriaId: cReceita.dados.id, contaId: conta.dados.id, valor: 250, modalidade: 'pistis',
  });
  conferir('receita lancada', receita.ok === true, JSON.stringify(receita).slice(0, 160));

  const trocada = await admin.post('/financeiro/lancamentos', {
    tipo: 'despesa', data: hoje, descricao: 'Categoria trocada',
    categoriaId: cReceita.dados.id, contaId: conta.dados.id, valor: 10,
  });
  conferir('categoria de tipo errado e recusada', trocada.situacao === 422);

  const negativo = await admin.post('/financeiro/lancamentos', {
    tipo: 'despesa', data: hoje, descricao: 'Valor invalido',
    categoriaId: cDespesa.dados.id, contaId: conta.dados.id, valor: -5,
  });
  conferir('valor negativo e recusado', negativo.situacao === 422);

  const doMembro = await membro.get('/financeiro/lancamentos');
  conferir('membro comum nao ve a escrituracao', doMembro.situacao === 403);

  const transparencia = await membro.get('/transparencia');
  conferir('a transparencia e aberta a todo membro', transparencia.ok === true);
  conferir('a transparencia soma sem nomear', transparencia.dados?.receita === 250);
  conferir(
    'C106:20 — nenhum contribuinte e nomeado nos agregados',
    !JSON.stringify(transparencia.dados).includes('helena'),
  );

  const compromisso = await membro.post('/compromissos', { valorMensal: 50 });
  conferir('o membro assume o proprio compromisso — C106:7', compromisso.ok === true);
  const meu = await membro.get('/compromissos/meu');
  conferir('o compromisso volta ao proprio membro', Number(meu.dados?.valorMensal) === 50);
}

titulo('Auditoria e trilha');
{
  const doMembro = await membro.get('/auditoria');
  conferir('membro comum nao consulta auditoria', doMembro.situacao === 403);

  const trilha = await admin.get('/auditoria');
  conferir('a auditoria responde a quem tem a permissao', trilha.ok === true);
  const acoes = new Set((trilha.dados ?? []).map((a) => a.acao));
  conferir('a instalacao ficou registrada', acoes.has('instalacao.concluida'));
  conferir('a tentativa recusada ficou registrada', acoes.has('sessao.recusada'));
  conferir('o voto ficou registrado', acoes.has('voto.registrou'));
  conferir('a tentativa de edicao administrativa ficou registrada', acoes.has('membro.edicao.negada'));

  const semRemocao = await admin.delete('/auditoria');
  conferir('a auditoria nao aceita remocao', semRemocao.situacao === 404 || semRemocao.situacao === 405);
}

titulo('Encerramento de sessao');
{
  const sai = await membro.delete('/sessao');
  conferir('saida aceita', sai.ok === true);
  const depois = await membro.get('/sessao');
  conferir('a sessao encerrada nao volta', depois.dados === null);
}

console.log(`\n${passou} passaram, ${falhou} falharam.`);
if (falhas.length > 0) {
  console.log('\nFalhas:');
  for (const f of falhas) console.log(`  - ${f}`);
}
process.exit(falhou === 0 ? 0 : 1);
