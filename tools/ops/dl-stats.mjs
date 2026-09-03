#!/usr/bin/env node
/**
 * GitHub Releases 下载量聚合 —— 零依赖，cron 可用。
 * 数据源: https://api.github.com/repos/ardss/pickdone/releases (per-asset download counts)
 * 用法:
 *   node dl-stats.mjs                 # 表格输出到 stdout
 *   node dl-stats.mjs --json out.json # JSON 落盘(看板/归档)
 *   node db stats.sqlite              # 追加写入 SQLite(需 node:sqlite, node>=22.5)
 *   node dl-stats.mjs --serve 8787    # 起极简趋势页(JSON 汇总)
 * cron 示例: 0 6 * * * node /srv/pickdone/ops/dl-stats.mjs db /srv/pickdone/stats/stats.db
 */
const REPO = process.env.PD_REPO || 'ardss/pickdone'
const API = `https://api.github.com/repos/${REPO}/releases`
const args = process.argv.slice(2)
import fs from 'node:fs'
import { dirname } from 'node:path'

async function fetchReleases () {
  const out = []
  let page = 1
  const headers = { 'User-Agent': 'pickdone-dl-stats', Accept: 'application/vnd.github+json' }
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  for (;;) {
    const r = await fetch(`${API}?per_page=100&page=${page}`, { headers })
    if (!r.ok) throw new Error('GitHub API ' + r.status)
    const arr = await r.json()
    if (!arr.length) break
    out.push(...arr)
    if (arr.length < 100) break
    page++
  }
  return out.map(rel => ({
    tag: rel.tag_name,
    publishedAt: rel.published_at,
    prerelease: rel.prerelease,
    draft: rel.draft,
    total: rel.assets.reduce((a, x) => a + x.download_count, 0),
    assets: rel.assets.map(a => ({ name: a.name, count: a.download_count, size: a.size }))
  }))
}

function summarize (releases) {
  const t = {
    generatedAt: new Date().toISOString(),
    repo: REPO,
    releasesTotal: releases.length,
    downloadsTotal: releases.reduce((a, r) => a + r.total, 0),
    byAsset: {},
    byRelease: releases.map(r => ({ tag: r.tag, total: r.total, publishedAt: r.publishedAt }))
  }
  for (const r of releases) for (const a of r.assets) t.byAsset[a.name] = (t.byAsset[a.name] || 0) + a.count
  return t
}

const releases = await fetchReleases()
const sum = summarize(releases)

if (args.includes('--json')) {
  const i = args.indexOf('--json')
  const out = args[i + 1] || 'dl-stats.json'
  fs.mkdirSync(dirname(out), { recursive: true })
  fs.writeFileSync(out, JSON.stringify(sum, null, 2))
  console.log('written', out)
} else if (args.includes('db')) {
  const i = args.indexOf('db')
  const dbPath = args[i + 1] || 'stats.db'
  const { DatabaseSync } = await import('node:sqlite')
  const db = new DatabaseSync(dbPath)
  db.exec('CREATE TABLE IF NOT EXISTS snapshots (ts TEXT PRIMARY KEY, total INTEGER, json TEXT)')
  db.prepare('INSERT OR REPLACE INTO snapshots VALUES (?,?,?)').run(sum.generatedAt, sum.downloadsTotal, JSON.stringify(sum))
  console.log('snapshot inserted:', sum.generatedAt, 'total downloads =', sum.downloadsTotal)
} else if (args.includes('--serve')) {
  const http = await import('node:http')
  const port = Number(args[args.indexOf('--serve') + 1]) || 8787
  http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify(sum, null, 2))
  }).listen(port, () => console.log('dl-stats serving on http://127.0.0.1:' + port))
} else {
  console.log(`repo: ${REPO}  releases: ${sum.releasesTotal}  total downloads: ${sum.downloadsTotal}`)
  for (const r of [...sum.byRelease].reverse()) console.log(`  ${r.tag.padEnd(12)} ${String(r.total).padStart(7)}`)
  console.log('\nby asset:')
  for (const [n, c] of Object.entries(sum.byAsset).sort((a, b) => b[1] - a[1])) console.log(`  ${n.padEnd(40)} ${String(c).padStart(7)}`)
}
