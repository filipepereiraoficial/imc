/**
 * Empacota a aplicação em um único arquivo HTML, sem nenhuma requisição
 * externa: JavaScript e CSS embutidos, fontes convertidas em data URI.
 *
 * Serve para distribuir a plataforma onde não há servidor — uma prévia
 * compartilhável, um pen drive, um anexo. O roteamento passa a ser por hash
 * (ver src/main.tsx).
 *
 *   npm run pagina-unica
 *     →  dist-unico/a-ordem.html            documento completo
 *     →  dist-unico/a-ordem-embutida.html   fragmento, sem <html>/<head>/<body>
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(raiz, 'dist');
const destino = join(raiz, 'dist-unico');

const assets = readdirSync(join(dist, 'assets'));
const arquivoJs = assets.find((a) => a.endsWith('.js'));
const arquivoCss = assets.find((a) => a.endsWith('.css'));
if (!arquivoJs || !arquivoCss) {
  throw new Error('Build não encontrado. Rode `npm run build` antes.');
}

const js = readFileSync(join(dist, 'assets', arquivoJs), 'utf8');
let css = readFileSync(join(dist, 'assets', arquivoCss), 'utf8');

// Fontes: de referência por caminho para data URI.
for (const fonte of readdirSync(join(dist, 'fontes'))) {
  const dados = readFileSync(join(dist, 'fontes', fonte)).toString('base64');
  css = css.replaceAll(`/fontes/${fonte}`, `data:font/woff2;base64,${dados}`);
}

const selo = readFileSync(join(dist, 'selo.svg'), 'utf8');
const seloUri = `data:image/svg+xml;base64,${Buffer.from(selo).toString('base64')}`;

// `</script>` dentro do código quebraria a tag que o envolve.
const jsSeguro = js.replaceAll('</script>', '<\\/script>');

const cabeca = `    <meta name="theme-color" content="#fffcf6" />
    <meta
      name="description"
      content="Plataforma institucional da Ordem — comunicação interna, formação, participação e gestão."
    />
    <link rel="icon" type="image/svg+xml" href="${seloUri}" />
    <title>A Ordem</title>
    <style>${css}</style>`;

const corpo = `    <div id="root"></div>
    <script type="module">${jsSeguro}</script>`;

// Documento completo — para abrir direto do disco ou hospedar como arquivo solto.
const completo = `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
${cabeca}
  </head>
  <body>
${corpo}
  </body>
</html>
`;

// Fragmento — para hospedagens que fornecem o esqueleto do documento.
const fragmento = `${cabeca}
${corpo}
`;

mkdirSync(destino, { recursive: true });
const arquivoCompleto = join(destino, 'a-ordem.html');
const arquivoFragmento = join(destino, 'a-ordem-embutida.html');
writeFileSync(arquivoCompleto, completo);
writeFileSync(arquivoFragmento, fragmento);
const mb = (t) => (Buffer.byteLength(t) / 1024 / 1024).toFixed(2) + ' MB';
console.log(`→ ${arquivoCompleto} (${mb(completo)})`);
console.log(`→ ${arquivoFragmento} (${mb(fragmento)})`);
