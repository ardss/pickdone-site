#!/usr/bin/env node
/**
 * 官网视觉验收：Electron 临时浏览器(9777) 打开本地站，整页截图（桌面 1600 + 移动 390，中英双语）。
 * 前置：node website/tools/serve.cjs（5188）；npx electron website/tools/capture-main.cjs --remote-debugging-port=9777
 * （capture-main 的默认 URL 是 5175，这里用 CAPTURE_URL 环境变量覆盖）
 */
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
if (!page) throw new Error('no page target')
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
  const attempt = tries => {
    const id = ++seq
    const timer = setTimeout(() => { pending.delete(id); tries > 0 ? attempt(tries - 1) : reject(new Error('timeout ' + method)) }, 25000)
    pending.set(id, { resolve: v => { clearTimeout(timer); resolve(v) }, reject: e => { clearTimeout(timer); reject(e) } })
    ws.send(JSON.stringify({ id, method, params }))
  }
  attempt(1)
})
const evaluate = async expression => {
  const r = await send('Runtime.evaluate', { expression, returnByValue: true })
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || 'eval fail')
  return r.result?.value
}

await send('Page.enable')
await send('Runtime.enable')

async function shot (name, fullPage) {
  const { data } = await send('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: !!fullPage
  })
  fs.writeFileSync(path.join(OUT, name + '.png'), Buffer.from(data, 'base64'))
  console.log('verify-shot ' + name)
}

async function captureAll (label, width, height, dsf) {
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: dsf, mobile: width < 700 })
  await send('Page.reload')
  await sleep(600)
  for (let i = 0; i < 30; i++) {
    const ok = await evaluate(`document.readyState==='complete' && !!document.querySelector('.feat-grid')`).catch(() => false)
    if (ok) break
    await sleep(400)
  }
  await evaluate(`window.scrollTo(0, document.body.scrollHeight)`)
  await sleep(900) // 触发全部 reveal
  await evaluate(`window.scrollTo(0, 0)`)
  await sleep(600)
  await shot(label + '-full', true)
}

await send('Page.navigate', { url: SITE })
await sleep(1500)
await captureAll('zh-desktop', 1600, 1000, 1)
await evaluate(`localStorage.setItem('pd-lang','en')`)
await captureAll('en-desktop', 1600, 1000, 1)
await evaluate(`localStorage.setItem('pd-lang','zh')`)
await captureAll('zh-mobile', 390, 844, 2)
console.log('VERIFY DONE → ' + OUT)
process.exit(0)
