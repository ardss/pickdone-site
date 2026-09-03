#!/usr/bin/env node
/**
 * 官网截图流水线：连 Electron 临时浏览器(9777) → 注入富演示数据 → 按 1600×1000@2x 截图。
 * 零依赖（Node 22 全局 WebSocket）。数据只写 5175 宿主的 localStorage，不碰真实应用库。
 * 用法:
 *   1) cd todo-app/browser-dev && npm run dev            # 5175 宿主
 *   2) cd todo-app && npx electron ../website/tools/capture-main.cjs --remote-debugging-port=9777
 *   3) node website/tools/capture.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const CDP = process.env.TODO_CDP || 'http://127.0.0.1:9777'
const ORIGIN = 'http://127.0.0.1:5175'
const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), 'shots')
fs.mkdirSync(OUT, { recursive: true })
const sleep = ms => new Promise(r => setTimeout(r, ms))

async function findPage () {
  for (let i = 0; i < 60; i++) {
    try {
      const list = await (await fetch(CDP + '/json/list')).json()
      const page = list.find(t => t.type === 'page' && t.url.includes('127.0.0.1:5175'))
      if (page) return page
    } catch {}
    await sleep(1000)
  }
  throw new Error('未发现 5175 页面目标——Electron 临时浏览器没起来?')
}

const page = await findPage()
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
  const attempt = (triesLeft) => {
    const id = ++seq
    const timer = setTimeout(() => {
      pending.delete(id)
      if (triesLeft > 0) attempt(triesLeft - 1)
      else reject(new Error('CDP 超时: ' + method))
    }, 20000)
    pending.set(id, { resolve: v => { clearTimeout(timer); resolve(v) }, reject: e => { clearTimeout(timer); reject(e) } })
    ws.send(JSON.stringify({ id, method, params }))
  }
  attempt(1)
})
const evaluate = async expression => {
  const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })
  if (r.exceptionDetails) throw new Error('页面执行失败: ' + JSON.stringify(r.exceptionDetails.exception?.description || r.exceptionDetails.text))
  return r.result && r.result.value
}

await send('Page.enable')
await send('Runtime.enable')
await send('Emulation.setDeviceMetricsOverride', { width: 1600, height: 1000, deviceScaleFactor: 2, mobile: false })

async function waitRender () {
  for (let i = 0; i < 40; i++) {
    const ok = await evaluate(`(function(){var el=document.querySelector('#app');return !!el&&el.innerText&&el.innerText.length>120})()`).catch(() => false)
    if (ok) return true
    await sleep(500)
  }
  return false
}

/* ---------------- 演示数据种子 ---------------- */
// 本地日期键（toISOString 在 UTC+8 会偏移一天，必须手拼）
const lkey = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0')
const CATS = {
  zh: [
    { id: 100001, name: '工作', color: '#4076C4' },
    { id: 100002, name: '学习', color: '#7E57C2' },
    { id: 100003, name: '健康', color: '#519A54' },
    { id: 100004, name: '生活', color: '#D9982F' }
  ],
  en: [
    { id: 100001, name: 'Work', color: '#4076C4' },
    { id: 100002, name: 'Study', color: '#7E57C2' },
    { id: 100003, name: 'Health', color: '#519A54' },
    { id: 100004, name: 'Life', color: '#D9982F' }
  ]
}
// 富任务种子：今天/昨天/明天/本周/逾期/已完成散布 60 天
function seedTasks (lang) {
  const zh = lang === 'zh'
  const T = (content, describe, catId, opt = {}) => ({ content, describe, catId, ...opt })
  const rows = [
    // 今天
    T(zh ? '给妈妈打电话' : 'Call mom', '', 100004, { dayOffset: 0 }),
    T(zh ? '写周报并发到群里' : 'Write weekly report and share', '', 100001, { dayOffset: 0, estimate: 2 }),
    T(zh ? '准备季度产品评审会' : 'Prepare quarterly review meeting', zh ? '数据看板截图 + 竞品对比页' : 'Dashboard shots + competitor page', 100001, { dayOffset: 0, estimate: 3, subs: zh ? [
      { text: '导出数据看板', checked: true }, { text: '写竞品对比一页纸', checked: false }, { text: '预约会议室', checked: false }
    ] : [
      { text: 'Export dashboard', checked: true }, { text: 'One-pager competitor scan', checked: false }, { text: 'Book meeting room', checked: false }
    ] }),
    T(zh ? '阅读《深入浅出 Vue.js》第 6 章' : 'Reading Vue.js chapter 6', '', 100002, { dayOffset: 0, estimate: 1 }),
    T(zh ? '下午跑步 5 公里' : 'Run 5 km', '', 100003, { dayOffset: 0, complete: true, remind: 120 }),
    T(zh ? '整理桌面与收件箱' : 'Clean desktop & inbox', '', 100004, { dayOffset: 0, complete: true }),
    // 昨日未完成
    T(zh ? '还书到图书馆' : 'Return library books', '', 100004, { dayOffset: -1 }),
    // 昨日已完成（保证连续完成天数 ≥1）
    T(zh ? '复盘当天计划' : 'Daily review', '', 100001, { dayOffset: -1, complete: true }),
    T(zh ? '回复邮件' : 'Inbox zero', '', 100001, { dayOffset: -1, complete: true }),
    // 明天
    T(zh ? '晨会同步本周排期' : 'Sync weekly schedule', zh ? '10:00 线上会议' : '10:00 online', 100001, { dayOffset: 1, remind: 30 }),
    T(zh ? '背 30 个单词' : 'Memorize 30 words', '', 100002, { dayOffset: 1, estimate: 1 }),
    T(zh ? '预约体检' : 'Book health checkup', '', 100003, { dayOffset: 1, remind: 1440 }),
    // 本周
    T(zh ? '准备周五的技术分享提纲' : 'Draft Friday tech-talk outline', zh ? '主题：时间管理工具的工程化实践' : 'Engineering practices of time tools', 100001, { dayOffset: 2, estimate: 2 }),
    T(zh ? '刷算法题：二叉树专题' : 'Algorithm practice: binary trees', '', 100002, { dayOffset: 2 }),
    T(zh ? '整理季度 OKR 初稿' : 'Draft quarterly OKR', '', 100001, { dayOffset: 4, estimate: 3 }),
    T(zh ? '和牙医预约洗牙' : 'Dentist appointment', '', 100003, { dayOffset: 5 }),
    // 逾期
    T(zh ? '提交上月水电费' : 'Pay last month utility bill', '', 100004, { dayOffset: -2, remind: 60 }),
    // 无日期
    T(zh ? '无日期的想法灵感' : 'A stray idea', zh ? '随手记一条，之后拖到具体日期' : 'Capture now, schedule later', 0),
    T(zh ? '年末旅行目的地候选' : 'Year-end trip candidates', '', 100004),
    // 高优先级 + 截止
    T(zh ? '递交项目立项材料' : 'Submit project proposal', zh ? '下午 5 点截止' : 'Due 5pm', 100001, { dayOffset: 0, priority: 3, deadline: 17 })
  ]
  // 完成事件散布近 56 天（喂热力图与周报基线），不进今天视图
  const now = Date.now()
  let seq = 0
  const mk = (t, dayOffset, complete, extra = {}) => {
    const day = new Date(); day.setHours(0, 0, 0, 0)
    const dayStart = day.getTime() + dayOffset * 86400000
    seq++
    return {
      taskId: 'seed_' + seq, userId: 840001, taskContent: t.content, taskDescribe: t.describe,
      complete: !!complete, delete: false,
      createTime: now - (60 - Math.min(dayOffset + 20, 59)) * 3600000 * 6, updateTime: now, syncTime: now,
      todoTime: dayOffset == null ? 0 : dayStart, dayStart: dayOffset == null ? 0 : dayStart,
      reminderTime: t.remind == null ? 0 : dayStart + 10 * 3600000 + t.remind * 60000,
      taskSort: seq * 10, snowAdd: 0, snowAssess: null,
      standbyStr1: '', standbyStr2: t.subs ? JSON.stringify(t.subs) : '', standbyStr3: '', standbyStr4: '',
      standbyInt1: t.catId, status: 'sync', version: 1,
      completedAt: complete ? dayStart + 15 * 3600000 + seq * 60000 : 0,
      tomatoEstimate: t.estimate || 0,
      priority: t.priority || 0,
      deadlineTs: t.deadline != null ? dayStart + t.deadline * 3600000 : 0
    }
  }
  const list = []
  for (const t of rows) list.push(mk(t, t.dayOffset ?? null, !!t.complete))
  // 历史完成：56 天拟真强度（近两周稳勤喂连续天数，更早有休息日与淡旺起伏），喂热力图与周报基线
  const names = zh
    ? ['整理会议纪要', '代码评审', '写单元测试', '联系供应商', '看 30 页书', '晨跑 3 公里', '记账与整理发票', '练吉他 20 分钟', '回复邮件', '复盘当天计划', '整理灵感清单', '买菜做饭']
    : ['Meeting notes', 'Code review', 'Write unit tests', 'Contact vendor', 'Read 30 pages', 'Morning run', 'Track expenses', 'Guitar 20 min', 'Inbox zero', 'Daily review', 'Idea list', 'Groceries & cook']
  for (let d = -1; d >= -56; d--) {
    const wd = new Date(Date.now() + d * 86400000).getDay()
    let n
    if (d >= -12) n = wd === 0 ? 1 : 2 + ((-d * 3) % 4)          // 近两周：每天 2-5 条（周日 1 条）
    else if (d >= -28) n = wd === 0 ? 0 : ((-d * 5) % 4)          // 中段：工作日 0-3 条
    else n = ((-d * 11) % 5) < 2 ? 0 : 1 + ((-d * 7) % 2)         // 远段：更稀疏
    for (let k = 0; k < n; k++) {
      const nm = names[(-d * 5 + k * 3) % names.length]
      const t = T(nm, '', [100001, 100002, 100003, 100004][(-d + k) % 4])
      list.push(mk(t, d, true))
    }
  }
  return list
}

function seedTomatoes (lang) {
  const zh = lang === 'zh'
  const labels = zh
    ? ['晨会跟进', '需求梳理', '写周报', '评审准备', '算法题', '阅读', '代码评审', '单元测试', '复盘', '整理发票', '练吉他', '晨跑']
    : ['Standup', 'Requirements', 'Weekly report', 'Review prep', 'Algorithms', 'Reading', 'Code review', 'Unit tests', 'Daily review', 'Expenses', 'Guitar', 'Run']
  const recs = []
  let n = 0
  const today = new Date(); today.setHours(0, 0, 0, 0)
  // 记录挂接已有任务（注意力流向按任务分类归组；seed_1..18 是未完成种子任务，19+ 是历史完成任务）
  const attach = { 0: 'seed_8', 2: 'seed_2', 3: 'seed_3', 4: 'seed_12', 5: 'seed_4', 6: 'seed_19', 7: 'seed_20', 8: 'seed_21', 9: 'seed_22', 10: 'seed_23', 11: 'seed_5' }
  for (let d = 0; d >= -27; d--) {
    const base = new Date(today.getTime() + d * 86400000)
    const weekday = base.getDay()
    if (weekday === 0) continue // 周日休息
    const dayN = 3 + ((-d * 5) % 6) + (weekday === 6 ? -2 : 0)
    let h = 9, m = (7 * (-d)) % 30
    for (let k = 0; k < dayN; k++) {
      const dur = 25
      const start = new Date(base.getTime()); start.setHours(h, m, 0, 0)
      n++
      const li = (-d * 3 + k) % labels.length
      recs.push({
        demoId: 'sd' + n, tomatoId: 'tmt_seed_' + n,
        startTime: start.getTime(), endTime: start.getTime() + dur * 60000,
        focusDuration: dur, restDuration: 5, succeed: (-d * 3 + k) % 11 !== 7, status: 'local',
        focus: labels[li], focusTaskId: attach[li] || null, dateKey: lkey(base)
      })
      h += (k % 2 === 1) ? 1 : 0; m = (m + 35) % 60
      if (h > 21) { h = 9; m = 0 }
    }
  }
  // 今天固定几条（保证今日页番茄条与时间轴好看）
  const T2 = (id, sh, sm, dur, label, task, succeed = true) => {
    const b = new Date(today.getTime()); b.setHours(sh, sm, 0, 0)
    return { demoId: id, tomatoId: 'tmt_today_' + id, startTime: b.getTime(), endTime: b.getTime() + dur * 60000, focusDuration: dur, restDuration: 5, succeed, status: 'local', focus: label, focusTaskId: task, dateKey: lkey(today) }
  }
  recs.push(
    T2('a1', 9, 0, 25, labels[0], 'seed_8'), T2('a2', 9, 30, 25, labels[0], 'seed_8'), T2('a3', 10, 5, 25, labels[1], 'seed_3', false),
    T2('a4', 10, 45, 25, labels[1], 'seed_3'), T2('a5', 11, 20, 25, labels[1], 'seed_3'),
    T2('a6', 14, 0, 25, labels[2], 'seed_2'), T2('a7', 15, 10, 25, labels[3], 'seed_3'), T2('a8', 16, 40, 25, labels[11], 'seed_5')
  )
  const doneToday = recs.filter(r => r.succeed && r.dateKey === lkey(today)).length
  return { tomatoRecordList: recs, todayTomatoCount: doneToday, _countDate: lkey(today) }
}

function seedExpr (lang) {
  const L = lang.startsWith('zh') ? 'zh' : 'en'
  const cats = CATS[L].map((c, i) => ({ category_id: c.id, user_id: 840001, category_name: c.name, category_color: c.color, create_time: Date.now(), list_sort: i * 10, folder_is: 0, folder_id: 0, delete_flag: 0 }))
  const tasks = seedTasks(L)
  const tomatos = seedTomatoes(L)
  return `localStorage.setItem('appBrowserShim.todos.v4', ${JSON.stringify(JSON.stringify(tasks))});
localStorage.setItem('eveShimCategories', ${JSON.stringify(JSON.stringify(cats))});
localStorage.setItem('tomatoState', ${JSON.stringify(JSON.stringify(tomatos))});
localStorage.setItem('appLocale', ${JSON.stringify(lang)});
localStorage.setItem('settingsState', '{}');
localStorage.setItem('leftoverAskDate', ${JSON.stringify(lkey(new Date()))});
localStorage.setItem('appBrowserShim.meta', ${JSON.stringify(JSON.stringify({ onboardingDone: true }))});
'SEEDED'`
}

async function bootWith (lang) {
  await evaluate(seedExpr(lang))
  await send('Page.reload')
  await sleep(1000)
  const ok = await waitRender()
  if (!ok) throw new Error('页面 8 秒未渲染完成')
  await sleep(1500)
}

async function shot (name) {
  const { data } = await send('Page.captureScreenshot', { format: 'png' })
  fs.writeFileSync(path.join(OUT, name + '.png'), Buffer.from(data, 'base64'))
  console.log('shot ' + name)
}

async function go (hash, theme) {
  await evaluate(`location.hash=${JSON.stringify(hash)}`)
  await sleep(1400)
  await evaluate(`document.documentElement.setAttribute('data-theme','${theme}')`)
  await sleep(500)
}

const PLAN = {
  'zh-CN': [
    ['today-light', '/todo-list/today', 'light'],
    ['today-dark', '/todo-list/today', 'dark'],
    ['statistics-light', '/todo-list/statistics', 'light'],
    ['statistics-dark', '/todo-list/statistics', 'dark'],
    ['calendar-light', '/todo-list/calendar', 'light'],
    ['calendar-dark', '/todo-list/calendar', 'dark'],
    ['todobox-light', '/todo-list/todo-box', 'light'],
    ['completed-light', '/todo-list/completed', 'light']
  ],
  'en-US': [
    ['en-today-light', '/todo-list/today', 'light'],
    ['en-today-dark', '/todo-list/today', 'dark'],
    ['en-statistics-light', '/todo-list/statistics', 'light'],
    ['en-statistics-dark', '/todo-list/statistics', 'dark'],
    ['en-calendar-light', '/todo-list/calendar', 'light'],
    ['en-calendar-dark', '/todo-list/calendar', 'dark']
  ]
}

for (const [lang, shots] of Object.entries(PLAN)) {
  const todo = shots.filter(([name]) => !fs.existsSync(path.join(OUT, name + '.png')))
  if (!todo.length) { console.log('skip ' + lang + ' (all exist)'); continue }
  await bootWith(lang)
  for (const [name, hash, theme] of todo) {
    await go(hash, theme)
    await shot(name)
  }
}
console.log('ALL DONE → ' + OUT)
ws.close()
process.exit(0)
