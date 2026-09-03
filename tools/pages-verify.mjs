#!/usr/bin/env node
/** 新页面（docs/blog）视觉验收：桌面 zh/en + 移动 zh */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const CDP = process.env.TODO_CDP || 'http://127.0.0.1:9777'
const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), 'verify')
fs.mkdirSync(OUT, { recursive: true })
const sleep = ms => new Promise(r => setTimeout(r, ms))

const list = await (await fetch(CDP + '/json/list')).json()
const page = list.find(t => t.type === 'page')
const ws = new WebSocket(page.webSocketDebuggerUrl)
await new Promise((r, j) => { ws.onopen = r; ws.onerror = j })
let seq = 0
const pending = new Map()
ws.onmessage = ev => {
  const m = JSON.parse(typeof ev.data === 'string' ? ev.data : ev.data.toString())
  if (m.id && pending.has(m.id)) {
    const p = pending.get(m.id); pending.delete(m.id)
    m.error ? p.reject(new Error(m.error.message)) : p.resolve(m.result)
  }
}
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++seq
  const timer = setTimeout(() => { pending.delete(id); reject(new Error('timeout ' + method)) }, 25000)
  pending.set(id, { resolve: v => { clearTimeout(timer); resolve(v) }, reject: e => { clearTimeout(timer); reject(e) } })
  ws.send(JSON.stringify({ id, method, params }))
})
const evaluate = async expression => {
  const r = await send('Runtime.evaluate', { expression, returnByValue: true })
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || 'eval fail')
  return r.result?.value
}
const shot = async name => {
  const { data } = await send('Page.captureScreenshot', { format: 'png' })
  fs.writeFileSync(path.join(OUT, name + '.png'), Buffer.from(data, 'base64'))
  console.log('shot ' + name)
}

await send('Page.enable'); await send('Runtime.enable')
const PLAN = [
  ['docs-zh-desktop', 'http://127.0.0.1:5188/docs.html', 1600, 1000, 1, 'zh'],
  ['docs-en-desktop', 'http://127.0.0.1:5188/docs.html', 1600, 1000, 1, 'en'],
  ['guide-zh-desktop', 'http://127.0.0.1:5188/guide.html', 1600, 1000, 1, 'zh'],
  ['cli-zh-desktop', 'http://127.0.0.1:5188/cli.html', 1600, 1000, 1, 'zh'],
  ['cli-en-desktop', 'http://127.0.0.1:5188/cli.html', 1600, 1000, 1, 'en'],
  ['data-zh-desktop', 'http://127.0.0.1:5188/data.html', 1600, 1000, 1, 'zh'],
  ['faq-zh-desktop', 'http://127.0.0.1:5188/faq.html', 1600, 1000, 1, 'zh'],
  ['blog-zh-desktop', 'http://127.0.0.1:5188/blog.html', 1600, 1000, 1, 'zh'],
  ['blog-en-desktop', 'http://127.0.0.1:5188/blog.html', 1600, 1000, 1, 'en'],
  ['docs-zh-mobile', 'http://127.0.0.1:5188/docs.html', 390, 844, 2, 'zh']
]
for (const [name, url, w, h, dsf, lang] of PLAN) {
  await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: dsf, mobile: w < 700 })
  await send('Page.navigate', { url })
  await sleep(1400)
  for (let i = 0; i < 25; i++) {
    if (await evaluate(`document.readyState==='complete' && !!document.querySelector('.foot-bottom')`).catch(() => false)) break
    await sleep(300)
  }
  await evaluate(`localStorage.setItem('pd-lang','${lang}')`)
  if (lang === 'en') { await send('Page.reload'); await sleep(1600) }
  await evaluate(`window.scrollTo(0, document.body.scrollHeight)`); await sleep(500)
  await evaluate(`window.scrollTo(0, 0)`); await sleep(400)
  await shot(name)
}
console.log('PAGES DONE')
process.exit(0)
