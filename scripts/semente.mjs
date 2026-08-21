/**
 * Gera api/instalacao/semente.json a partir dos modulos de dados do
 * frontend.
 *
 * Cargos, permissoes, graus e orgaos existem em src/data como fonte unica.
 * Copia-los a mao para dentro do instalador em PHP criaria duas verdades que
 * divergiriam na primeira alteracao normativa. Este script os exporta, e o
 * instalador apenas le o resultado.
 *
 * Uso: npm run semente
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const { CARGOS, GRUPOS_PERMISSAO, TODAS_PERMISSOES } = await import(`${raiz}/src/data/cargos.ts`);
const { GRAUS } = await import(`${raiz}/src/data/graus.ts`);
const { ORGAOS_CENTRAIS, ORGAOS_OBRIGATORIOS_LOCAIS } = await import(`${raiz}/src/data/orgaos.ts`);

const semente = {
  geradoEm: new Date().toISOString().slice(0, 10),
  permissoes: TODAS_PERMISSOES,
  gruposPermissao: GRUPOS_PERMISSAO,
  cargos: CARGOS.map((c) => ({
    id: c.id,
    codigo: c.codigo,
    nome: c.nome,
    descricao: c.descricao,
    escopo: c.escopo,
    precedencia: c.precedencia,
    sistema: c.sistema ? 1 : 0,
    permissoes: c.permissoes,
  })),
  graus: GRAUS.map((g) => ({
    id: g.id,
    codigo: g.codigo,
    nome: g.nome,
    categoria: g.categoria,
    ordem: g.ordem,
    descricao: g.descricao,
    xpSugerido: g.xpSugerido ?? 0,
  })),
  orgaosCentrais: ORGAOS_CENTRAIS,
  orgaosLocais: ORGAOS_OBRIGATORIOS_LOCAIS,
};

const destino = `${raiz}/api/instalacao/semente.json`;
mkdirSync(dirname(destino), { recursive: true });
writeFileSync(destino, JSON.stringify(semente, null, 2) + '\n', 'utf8');
console.log(
  `semente.json: ${semente.cargos.length} cargos, ${semente.permissoes.length} permissoes, ` +
    `${semente.graus.length} graus, ${semente.orgaosCentrais.length} orgaos centrais, ` +
    `${semente.orgaosLocais.length} orgaos locais obrigatorios.`,
);
