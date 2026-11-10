// bundle.json(HTML/XML)을 풀고 repo의 assets/ 를 dist/assets 로 복사한다. Vercel buildCommand.
const fs = require('fs/promises'); const path = require('path');
(async () => {
  const OUT = path.join(__dirname, 'dist');
  await fs.rm(OUT, { recursive: true, force: true });
  const b = JSON.parse(await fs.readFile(path.join(__dirname, 'bundle.json'), 'utf8'));
  for (const [rel, b64] of Object.entries(b.files)) { const fp = path.join(OUT, rel); await fs.mkdir(path.dirname(fp), { recursive: true }); await fs.writeFile(fp, Buffer.from(b64, 'base64')); }
  await fs.cp(path.join(__dirname, 'assets'), path.join(OUT, 'assets'), { recursive: true });
  console.log('files', Object.keys(b.files).length, 'bundle', b.created);
})().catch(e => { console.error(e); process.exit(1); });
