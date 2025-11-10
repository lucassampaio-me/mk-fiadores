const fs = require('fs');
const { execSync } = require('child_process');

console.log('🏗️  Iniciando build...\n');

// 1. Rodar build:css-minify
console.log('📦 Minificando CSS...');
execSync('npm run build:css-minify', { stdio: 'inherit' });

// 2. Rodar build:js
console.log('📦 Minificando JavaScript...');
execSync('npm run build:js', { stdio: 'inherit' });

// 3. Ler index-dev.html
console.log('📄 Lendo index-dev.html...');
let html = fs.readFileSync('index-dev.html', 'utf-8');

// 4. Substituir arquivos JS por bundle.min.js
console.log('🔄 Substituindo arquivos JS...');
html = html.replace(
  /<script src="src\/js\/dataLayer\.js"><\/script>\s*<script src="src\/js\/gsap\.min\.js"><\/script>\s*<script src="src\/js\/ScrollTrigger\.min\.js"><\/script>\s*<script src="src\/js\/ScrollSmoother\.min\.js"><\/script>\s*<script src="src\/js\/SplitText\.min\.js"><\/script>\s*<script src="src\/js\/scroll-smoother\.js"><\/script>\s*<script src="src\/js\/animations\.js"><\/script>\s*<script src="src\/js\/whatsapp-widget\.js"><\/script>\s*<script src="src\/js\/toast\.js"><\/script>\s*<script src="src\/js\/form\.js"><\/script>/g,
  '<script src="src/js/bundle.min.js"></script>'
);

// 5. Substituir output.css por theme.min.css
console.log('🔄 Substituindo CSS...');
html = html.replace(/src\/css\/output\.css/g, 'src/css/theme.min.css');

// 6. Remover comentários HTML
console.log('🧹 Removendo comentários HTML...');
html = html.replace(/<!--[\s\S]*?-->/g, '');

// 7. Minificar HTML
console.log('📦 Minificando HTML...');
html = html
  .replace(/>\s+</g, '><')           // Remove espaços entre tags
  .replace(/\s{2,}/g, ' ')           // Remove múltiplos espaços
  .trim();

// 8. Gerar index.html
console.log('💾 Gerando index.html...');
fs.writeFileSync('index.html', html, 'utf-8');

console.log('\n✅ Build concluído com sucesso!');
console.log('📁 Arquivo gerado: index.html');
