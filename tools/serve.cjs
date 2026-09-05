// 官网本地静态服务器（零依赖）：node website/tools/serve.cjs [端口]
const http = require('http')
const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const PORT = Number(process.argv[2] || 5188)
const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.png': 'image/png', '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.mp4': 'video/mp4'
}

http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0])
  // 旧宣传单页路径重定向回首页(该页已废弃,避免书签/旧标签继续踩到无修复版本)
  if (p.indexOf('/宣传/website') === 0) { res.writeHead(302, { Location: '/' }); return res.end() }
  if (p === '/') p = '/index.html'
  if (p.endsWith('/')) p += 'index.html'
  const file = path.join(ROOT, path.normalize(p).replace(/^([.][.][/\\])+/, ''))
  if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end() }
  fs.readFile(file, (err, buf) => {
    if (err) { res.writeHead(404); return res.end('404') }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache' })
    res.end(buf)
  })
}).listen(PORT, '127.0.0.1', () => console.log('SERVE_ON ' + PORT))
