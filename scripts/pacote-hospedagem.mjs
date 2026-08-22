/**
 * Monta o pacote pronto para enviar a uma hospedagem com PHP.
 *
 * O resultado em dist-hospedagem/ e exatamente o que se copia para
 * public_html (cPanel, Plesk, Hostinger) ou para htdocs (XAMPP):
 *
 *   index.html, assets/, .htaccess   a aplicacao
 *   api/                              o servidor e o instalador
 *
 * Uso: npm run pacote
 */
import { cpSync, existsSync, mkdirSync, rmSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const destino = join(raiz, 'dist-hospedagem');

if (!existsSync(join(raiz, 'dist', 'index.html'))) {
  console.error('dist/ ausente. Rode `npm run build` antes.');
  process.exit(1);
}
if (!existsSync(join(raiz, 'api', 'nucleo', 'semente.json'))) {
  console.error('api/nucleo/semente.json ausente. Rode `npm run semente` antes.');
  process.exit(1);
}

rmSync(destino, { recursive: true, force: true });
mkdirSync(destino, { recursive: true });

// A aplicacao construida, incluindo o .htaccess que veio de public/.
cpSync(join(raiz, 'dist'), destino, { recursive: true });

// O servidor. config.php nunca vai junto: e gerado no destino, pelo
// instalador, e carrega a senha do banco daquela hospedagem.
cpSync(join(raiz, 'api'), join(destino, 'api'), {
  recursive: true,
  filter: (origem) => !origem.endsWith(`${'api'}/config.php`) && !origem.endsWith('/config.php'),
});

function medir(caminho) {
  let arquivos = 0;
  let bytes = 0;
  for (const entrada of readdirSync(caminho, { withFileTypes: true })) {
    const alvo = join(caminho, entrada.name);
    if (entrada.isDirectory()) {
      const dentro = medir(alvo);
      arquivos += dentro.arquivos;
      bytes += dentro.bytes;
    } else {
      arquivos += 1;
      bytes += statSync(alvo).size;
    }
  }
  return { arquivos, bytes };
}

const total = medir(destino);
console.log(
  `dist-hospedagem/: ${total.arquivos} arquivos, ${(total.bytes / 1024 / 1024).toFixed(2)} MB.`,
);
console.log('Envie o conteudo desta pasta para public_html (ou htdocs) e abra o endereco no navegador.');
