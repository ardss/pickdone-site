#!/usr/bin/env node
/** 文档子页组装器：以 guide.html 为骨架，替换标题区/侧栏激活态/正文，生成 cli/data/faq 三页。 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const DIR = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.dirname(DIR)
const skeleton = fs.readFileSync(path.join(ROOT, 'guide.html'), 'utf8')

// 骨架切三段：<main> 前骨架 / hero 块 / 正文容器
const heroStart = skeleton.indexOf('  <section class="page-hero">')
const mainClose = skeleton.lastIndexOf('\n</main>')
const head = skeleton.slice(0, heroStart)
const heroBlock = skeleton.slice(heroStart, skeleton.indexOf('  <div class="wrap docs-layout">'))
const footBlock = skeleton.slice(skeleton.indexOf('\n<footer>'))

const PAGES = [
  {
    out: 'cli.html', active: 'cli.html', content: '_c-cli.html',
    title: 'CLI 参考 — 拾事 PickDone',
    desc: '拾事 PickDone CLI 完整参考：读取、写入与番茄命令，通用约定与 AI 助手接入。',
    h1key: 'cr.h1', h1zh: 'CLI 参考', ledekey: 'cr.lede',
    ledezh: '拾事的全部核心能力都以命令行原语开放，人和 AI 用同一套入口。本页与仓库内 CLI 手册保持一致，示例均可直接运行。'
  },
  {
    out: 'data.html', active: 'data.html', content: '_c-data.html',
    title: '数据与安全 — 拾事 PickDone',
    desc: '拾事 PickDone 数据与安全：存储位置、备份体系、换机迁移、导出与网络行为声明。',
    h1key: 'dt.h1', h1zh: '数据与安全', ledekey: 'dt.lede',
    ledezh: '拾事没有服务器。这一页讲清楚你的数据在哪、怎么被保护、怎么带走。'
  },
  {
    out: 'faq.html', active: 'faq.html', content: '_c-faq.html',
    title: '常见问题 — 拾事 PickDone',
    desc: '拾事 PickDone 常见问题与技术排查：离线与隐私、备份恢复、快捷键冲突、反馈渠道。',
    h1key: 'fq.h1', h1zh: '常见问题', ledekey: 'fq.lede',
    ledezh: '使用疑问与技术排查。没找到答案？GitHub Issues 见。'
  }
]

// guide.html 是已填充的真实页面（无占位符），直接替换其 hero 键位与文案
const GUIDE_H1 = '<h1 data-i18n="gd.h1">使用指南</h1>'
const GUIDE_LEDE = '<p class="lede" data-i18n="gd.lede">按目标组织的操作手册：找到你想做的事，照着步骤做即可。</p>'

for (const p of PAGES) {
  const content = fs.readFileSync(path.join(DIR, p.content), 'utf8').trimEnd()
  let html = head.replace('{TITLE}', p.title).replace('{DESC}', p.desc)
  let hero = heroBlock
    .replace(GUIDE_H1, '<h1 data-i18n="' + p.h1key + '">' + p.h1zh + '</h1>')
    .replace(GUIDE_LEDE, '<p class="lede" data-i18n="' + p.ledekey + '">' + p.ledezh + '</p>')
  if (hero.includes('gd.h1')) throw new Error('hero 替换失败: ' + p.out)
  html += hero
  let layout = '  <div class="wrap docs-layout">\n' +
    '    <aside class="docs-side" aria-label="文档目录">\n' +
    '      <a href="docs.html" data-i18n="dc.n1">入门</a>\n' +
    `      <a href="guide.html"${p.active === 'guide.html' ? ' class="on"' : ''} data-i18n="dc.n2">使用指南</a>\n` +
    `      <a href="cli.html"${p.active === 'cli.html' ? ' class="on"' : ''} data-i18n="dc.n3">CLI 参考</a>\n` +
    `      <a href="data.html"${p.active === 'data.html' ? ' class="on"' : ''} data-i18n="dc.n4">数据与安全</a>\n` +
    `      <a href="faq.html"${p.active === 'faq.html' ? ' class="on"' : ''} data-i18n="dc.n5">常见问题</a>\n` +
    '    </aside>\n\n' +
    '    <div>\n' + content + '\n    </div>\n  </div>'
  html += layout
  html += footBlock
  fs.writeFileSync(path.join(ROOT, p.out), html)
  console.log('built ' + p.out)
}
