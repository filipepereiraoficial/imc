/**
 * Entrega de arquivo gerado ao usuario.
 *
 * Em uma hospedagem comum, o caminho e o link de download do proprio
 * navegador. Quando a aplicacao roda embutida em um visualizador que media a
 * gravacao de arquivos, o download direto e inerte — nesse caso a entrega
 * passa pelo canal oferecido pelo hospedeiro.
 */

interface SalvarHospedeiro {
  save: (pedido: { filename: string; data: string | Blob }) => Promise<unknown>;
}

interface RuntimeHospedeiro {
  use?: (nome: string) => Promise<SalvarHospedeiro | null>;
}

export type ResultadoDownload = 'salvo' | 'recusado' | 'indisponivel';

async function canalDoHospedeiro(): Promise<SalvarHospedeiro | null> {
  const runtime = (window as unknown as { claude?: RuntimeHospedeiro }).claude;
  if (!runtime?.use) return null;
  try {
    return await runtime.use('downloads');
  } catch {
    return null;
  }
}

function codigoDoErro(erro: unknown): string {
  return typeof erro === 'object' && erro !== null && 'code' in erro
    ? String((erro as { code: unknown }).code)
    : 'desconhecido';
}

/** Baixa um arquivo de texto. Devolve o desfecho para que a tela possa avisar. */
export async function baixarTexto(
  nomeArquivo: string,
  conteudo: string,
  tipoMime = 'text/plain;charset=utf-8',
): Promise<ResultadoDownload> {
  const canal = await canalDoHospedeiro();

  if (canal) {
    try {
      await canal.save({ filename: nomeArquivo, data: conteudo });
      return 'salvo';
    } catch (erro) {
      const codigo = codigoDoErro(erro);
      if (codigo === 'declined') return 'recusado';
      // A extensao pode nao ser aceita pelo hospedeiro; texto simples e sempre.
      if (codigo === 'extension_not_enabled' || codigo === 'rejected_extension') {
        try {
          await canal.save({
            filename: nomeArquivo.replace(/\.[^.]+$/, '') + '.txt',
            data: conteudo,
          });
          return 'salvo';
        } catch (segundoErro) {
          return codigoDoErro(segundoErro) === 'declined' ? 'recusado' : 'indisponivel';
        }
      }
      return 'indisponivel';
    }
  }

  const url = URL.createObjectURL(new Blob([conteudo], { type: tipoMime }));
  const link = document.createElement('a');
  link.href = url;
  link.download = nomeArquivo;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  return 'salvo';
}

/** Monta um CSV com separador de ponto e vírgula, no padrão de planilha pt-BR. */
export function montarCSV(colunas: string[], linhas: (string | number)[][]): string {
  const escapar = (celula: string | number) => `"${String(celula).replaceAll('"', '""')}"`;
  const corpo = [colunas, ...linhas].map((linha) => linha.map(escapar).join(';')).join('\r\n');
  // BOM: sem ele o Excel abre os acentos incorretamente.
  return '﻿' + corpo;
}
