#!/usr/bin/env node
/** 视口级细节验收：按锚点滚动逐屏截图。前置同 verify.mjs */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const CDP = process.env.TODO_CDP || 'http://127.0.0.1:9777'
const SITE = process.env.SITE_URL || 'http://127.0.0.1:5188/'
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
await send('Emulation.setDeviceMetricsOverride', { width: 1600, height: 1000, deviceScaleFactor: 1, mobile: false })
await send('Page.navigate', { url: SITE })
await sleep(1500)
for (let i = 0; i < 30; i++) {
  if (await evaluate(`document.readyState==='complete' && !!document.querySelector('.feat-grid')`).catch(() => false)) break
  await sleep(400)
}

// 逐锚点：先滚到底触发 reveal，再回各锚点拍
await evaluate(`window.scrollTo(0, document.body.scrollHeight)`)
await sleep(1000)
const stops = [
  ['s1-hero', 0],
  ['s2-pillar1', 'document.querySelector("#pillars").offsetTop + 300'],
  ['s3-pillar2', 'document.querySelectorAll(".pillar")[1].offsetTop - 40'],
  ['s4-pillar3', 'document.querySelectorAll(".pillar")[2].offsetTop - 40'],
  ['s5-cli', 'document.querySelector("#cli").offsetTop - 60'],
  ['s6-feats', 'document.querySelector("#features").offsetTop - 40'],
  ['s7-compare', 'document.querySelector("#compare").offsetTop - 40'],
  ['s8-privacy', 'document.querySelector("#privacy").offsetTop - 40'],
  ['s9-download', 'document.querySelector("#download").offsetTop - 40'],
  ['s10-faq-footer', 'document.body.scrollHeight']
]
for (const [name, where] of stops) {
  await evaluate(`window.scrollTo(0, ${typeof where === 'string' ? where : where})`)
  await sleep(650)
  await shot(name)
}
console.log('SECTIONS DONE')
process.exit(0)
