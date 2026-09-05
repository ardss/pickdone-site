/* 拾事 PickDone 官网 — 交互与双语（零依赖） */
;(function () {
  'use strict'

  var LS_LANG = 'pd-lang'

  /* ---------------- 双语字典 ---------------- */
  var I18N = {
    zh: {
      'nav.demo': '在线演示', 'dl.tag': 'Portable · 单文件', 'fl.task': '晨会同步本周排期', 'fl.count': '今日番茄 10/8', 'demo.note': '内容由浏览器内置的演示数据生成，仅保存在你自己的设备上，不会上传。', 'nav.features': '功能', 'nav.cli': 'AI CLI', 'nav.compare': '对比', 'nav.privacy': '隐私', 'nav.faq': '常见问题', 'nav.download': '免费下载',
      'hero.badge': '开源 · MIT 协议 · Windows 可用',
      'hero.h1': '计划、专注、复盘，<br><span class="em">一气呵成</span>',
      'hero.sub': '拾事把待办、日程、番茄专注和数据复盘连成一条工作流：每段专注都算到对应的事情上，周报替你把一周讲成故事。零账号、不依赖网络——数据只存在你的电脑里。',
      'hero.cta1': '免费下载 Windows 版', 'hero.cta2': '在 GitHub 查看',
      'hero.m1': '免安装便携版可用', 'hero.m2': '无需注册<b>任何账号</b>', 'hero.m3': '启动即用，<b>5 分钟</b>上手',
      'brand.name': '拾事<small>PICKDONE</small>',
      'hero.chip1': '这段专注记在了任务上', 'hero.chip2': '你的数据从没被上传过',
      'hero.chip1t': '番茄 +1', 'hero.chip2t': '0 上传',
      'cli.plain': '不会命令行？完全没关系——这一区是给 AI 助手和进阶玩家准备的，跳过它不影响任何日常使用。',
      'cmp.r7': '多端同步', 'cmp.r7a': '全平台实时同步', 'cmp.r7b': '桌面优先；数据是一个文件，拷到哪用到哪',
      'cmp.r8': '从旧应用迁移', 'cmp.r8a': '手动重录，或导出格式互不相通', 'cmp.r8b': '一键导入主流待办应用的备份 CSV，重复自动去重',
      'q8.q': '我在用滴答清单 / TickTick / Todoist，能搬过来吗？',
      'q8.a': '能。设置 → 数据管理 → 「从其他应用迁移」，选择它们导出的备份 CSV 即可一键导入：清单变成分类、子任务和完成状态保留、重复任务自动去重，导入前可预览。习惯用终端的话，CLI 的 import 命令支持同样的格式。',
      'gr.h': '怕坚持不下来？', 'gr.link': '看看为「吃灰」设计的细节 →',
      'gr.p': '托盘常驻、桌面小组件、一秒记录、悬浮窗提醒——拾事专门为「坚持不下去」的你设计了兜底；每周复盘还会拉你回来看自己走了多远。',
      'dt.net.p2': '不信？可以自己验证：退出应用后用系统命令查看网络连接（如 netstat），或在防火墙里拦掉拾事后照常用；源码全部公开，联网调用点可以直接搜。',
      'dt.enc.h': '加密是怎么做的',
      'dt.enc.p': '数据库使用 SQLCipher 系加密驱动（better-sqlite3-multiple-ciphers）整库加密；密钥文件 <span class="path">db.key</span> 与数据库放在同一目录，随备份/迁移一起走，不需要你记密码。',
      'dt.enc.p2': '诚实边界：这能防住「拿到单个数据库文件」的读取；如果攻击者已经能读取你的整个用户目录，密钥也在一起，这层不设防（系统级方案在评估中）。我们把边界写出来，是因为加密不是魔法。',
      'trust.t1': 'MIT 开源', 'trust.t2': '零账号 · 离线全功能', 'trust.t3': '数据就是本机一个文件', 'trust.t4': 'CLI 让 AI 替你管任务', 'trust.t5': '中英双语 · 深色模式',
      'pillars.eyebrow': '为什么是拾事',
      'pillars.h2': '番茄不是插件，<br>是整个产品的<span class="hl">骨架</span>',
      'pillars.lede': '从今日清单到 24 小时时间轴，专注与休息的每一次轮转都贯穿全程——每个番茄都会沉淀到具体的事项上。',
      'p1.eyebrow': '番茄专注',
      'p1.h': '一条完整的工作流，不只是一个计时器',
      'p1.p': '专注与休息自动轮转，时长在设置里随便调；桌面悬浮窗、白噪音与提示音陪伴。专注时挂上任务，结束时时长自动记到这件事头上——一天结束，时间轴上看得见每一分钟去了哪。',
      'p1.b1': '<b>悬浮窗</b>：缩到角落的专注小窗，随时报进度',
      'p1.b2': '<b>白噪音</b>：10 类真实录音，专注更有沉浸感',
      'p1.b3': '<b>24h 时间轴</b>：专注与休息一目了然，支持事后补录',
      'p1.cap': '今日待办 · 左侧为 24 小时时间轨',
      'p2.eyebrow': '数据复盘',
      'p2.h': '复盘是小作文，不是数字墙',
      'p2.p': '基于你自己的历史基线生成叙事式周报：这周怎么样、比平时更投入还是松懈、下一个周期怎么调整。没有虚荣指标，只有说得人话的复盘。',
      'p2.b1': '<b>叙事周报</b>：先读一段总结，再看数据',
      'p2.b2': '<b>活跃热力图</b>：GitHub 风格，坚持看得见',
      'p2.b3': '<b>分享卡片</b>：一键生成，把坚持晒出来',
      'p2.cap': '数据复盘 · 浅色',
      'p2.capDark': '数据复盘 · 深色',
      'p3.eyebrow': '日程月历',
      'p3.h': '月历上排日程，拖一下就改期',
      'p3.p': '月 / 周 / 时间块三种视图，农历、节假日与调休一应俱全。任务拖到哪天就算哪天；重复任务支持天 / 周 / 月 / 年，甚至按农历重复。',
      'p3.b1': '<b>拖拽改期</b>：排程像挪便签一样直观',
      'p3.b2': '<b>农历与节假日</b>：按中国日历过日子的任务也能重复',
      'p3.b3': '<b>多重提醒</b>：一件事可以设多个提醒时间',
      'p3.cap': '拖拽改期 · 真实演示',
      'cli.eyebrow': 'AI-Ready CLI',
      'cli.h': '你和 AI，<br>用<span class="hl">同一套入口</span>',
      'cli.p': '拾事的所有核心能力都开放为命令行原语，支持结构化输出。把它注册成 Claude、Cursor 等 AI 助手的工具，你的待办从此可以被托付——不用为 AI 单独开接口。',
      'cli.b1': '<b>20+ 命令</b>：任务、子任务、统计、回收站全域覆盖',
      'cli.b2': '<b>--json 输出</b>：Agent 拿到结构化数据就能干活',
      'cli.b3': '<b>同一份数据</b>：人和 AI 读写同一个本地库，没有同步',
      'cli.term': '终端 — 拾事 CLI',
      'cli.c1': 'todo-cli add "递交项目立项材料" --date today --remind -1h',
      'cli.o1': '✓ 已添加到「今天」，并设置提前 1 小时提醒',
      'cli.c2': 'todo-cli overview',
      'cli.o2': '<span class="k">today</span>: 5 件待办 · 2 件已完成 · <span class="k">focus</span>: 10 个番茄 / 250 分钟',
      'cli.c3': 'todo-cli done "立项材料"',
      'cli.o3': '✓ 已完成（可撤销 5 秒）',
      'cli.c4': 'todo-cli log --n 5 --json',
      'cli.o4': '✓ 审计流水：AI 刚才的每一步写入都在案可查',
      'feat.eyebrow': '细节控的舒适区',
      'feat.h': '把待办当产品的每个细节都认真做',
      'f1.h': '四象限矩阵视图', 'f1.p': '今日清单在列表与四象限之间一键切换，要事一眼定位。',
      'f2.h': '多重提醒', 'f2.p': '一件事可以设多个提醒时间点，重要的事不靠脑子记。',
      'f3.h': '智能重复', 'f3.p': '天 / 周 / 月 / 年任意组合，支持农历重复与跳过节假日。',
      'f4.h': '子任务与番茄预估', 'f4.p': '拆步骤、估番茄，每个任务的花费都算得清清楚楚。',
      'f5.h': '桌面小组件', 'f5.p': '半透明日历、待办卡钉在桌面上，回到桌面一眼看清今天。',
      'f6.h': '全局快捷键', 'f6.p': '任何界面一键唤起迷你输入条，想到什么一秒记下。',
      'f7.h': '深色模式', 'f7.p': '完整打磨的深色主题，深夜专注不刺眼，跟随或手动切换。',
      'f8.h': '撤销与回收站', 'f8.p': '完成、删除都可撤销；误删的东西在回收站里等你反悔。',
      'f9.h': '自动备份', 'f9.p': '内容去重 + 分级保留 + 危险操作前快照，一键从备份恢复。',
      'cmp.eyebrow': '不一样的选择',
      'cmp.h': '主流云待办，和拾事有什么不同',
      'cmp.col0': '', 'cmp.col1': '主流云待办', 'cmp.col2': '拾事 PickDone',
      'cmp.r0': '开始使用', 'cmp.r0a': '注册账号，绑定邮箱或手机号', 'cmp.r0b': '下载即用，无需任何账号',
      'cmp.r1': '数据存在哪', 'cmp.r1a': '厂商的云端服务器', 'cmp.r1b': '你电脑里的一个加密数据库文件',
      'cmp.r2': '断网时', 'cmp.r2a': '功能受限，同步报错', 'cmp.r2b': '完整可用，本就为离线而生',
      'cmp.r3': '数据导出', 'cmp.r3a': '格式受限，部分功能要会员', 'cmp.r3b': '数据库文件 + 数据表格 + 长图，随时带走',
      'cmp.r4': 'AI 接入', 'cmp.r4a': '封闭，或仅限官方助手', 'cmp.r4b': '开放 CLI，任何 AI 助手都能替你管任务',
      'cmp.r5': '复盘', 'cmp.r5a': '统计图表与数字', 'cmp.r5b': '基于个人基线的叙事式周报',
      'cmp.r6': '价格', 'cmp.r6a': '免费版受限 + 订阅 / 买断', 'cmp.r6b': '完全免费，MIT 开源',
      'cmp.note': '云同步不是不好——只是它不该是唯一的选项。你的数据该有第三种去处。',
      'prv.eyebrow': '数据所有权',
      'prv.h': '你的数据，只有你能看见',
      'prv.lede': '没有服务器，就没有泄露；没有账号，就没有画像。备份文件即完整数据，拷走即迁移。',
      'prv1.h': '本地加密存储', 'prv1.p': '任务、专注记录与统计全部落在一台设备的加密数据库里，不采集、不上传、不分析。',
      'prv2.h': '自动备份分级保留', 'prv2.p': '近期高频快照 + 更早的低频锚点，内容去重不占空间；清空回收站这类危险操作前自动留底。',
      'prv3.h': '随时带走', 'prv3.p': '数据表格一键导出，分享卡片随出随用；哪天不用了，删掉软件，文件还在你手里。',
      'dl.eyebrow': '立即开始',
      'dl.h': '下载拾事，双击即用',
      'dl.lede': '安装版支持应用内自动更新；便携版单文件免安装，拷进 U 盘也能跑。',
      'dl.c1h': '安装版', 'dl.c1p': '标准安装，支持应用内自动更新。适合大多数用户。', 'dl.go': '前往下载',
      'dl.c2h': '便携版', 'dl.c2p': '免安装，不写注册表，放在哪都能跑，更新需手动下载。', 'dl.go2': '前往下载',
      'dl.sys1': '系统要求：Windows 10 / 11（64 位）。', 'dl.sys2': '查看全部版本与更新日志 →',
      'dl.tut': '装好后，先看《5 分钟上手：你的第一个番茄》→',
      'dl.sha': '每个版本附带 SHA256SUMS.txt 校验文件，安装包可自行核对。',
      'faq.eyebrow': '常见问题', 'faq.h': '你可能想问',
      'q1.q': '拾事是离线应用吗？',
      'q1.a': '是，离线优先是产品设计而非限制。没有账号体系与云端服务器，任务、专注记录、统计全部存储在本机加密数据库；联网仅用于检查更新，可在设置中关闭。',
      'q2.q': '换电脑或重装系统，数据怎么办？',
      'q2.a': '你的全部数据就是一个数据库文件，加上自动备份目录。新机器装好应用后把文件拷回去即可；应用还内置一键从备份恢复，误删了也能找回。',
      'q3.q': '免费的，那靠什么维持？',
      'q3.a': '拾事是开源项目，MIT 协议，代码全部公开，不设付费墙、不塞广告。如果它对你有用，去 GitHub 点个 Star 就是最大的支持。',
      'q4.q': '支持 macOS / Linux 吗？',
      'q4.a': '当前版本支持 Windows 10 / 11；macOS 与 Linux 适配在路线图中，欢迎到 GitHub 提 issue 反馈需求，甚至参与适配。',
      'q5.q': '系统自带的时钟就有番茄钟，为什么还要用拾事？',
      'q5.a': '系统时钟是个计时器，拾事是一套工作流：番茄和任务绑定、时长自动算到具体事项上，24 小时时间轴和叙事式周报帮你复盘——计时只是最浅的一层。',
      'q6.q': '「让 AI 替我管任务」具体怎么用？',
      'q6.a': '拾事内置 CLI，所有命令支持 JSON 输出。把它注册成 Claude、Cursor 等 AI 助手的工具后，你可以直接说「帮我把周报加到周五并提醒我」，AI 会调用 CLI 完成——人和 AI 操作同一个本地库，无需任何云同步。',
      'fin.h': '从今天起，<br>把专注<span class="hl">留在自己手里</span>',
      'fin.p': '免费、开源、离线可用——5 分钟跑起来。',
      'fin.cta': '免费下载', 'fin.cta2': 'GitHub 仓库',
      'foot.tag': '计划、专注、复盘，一气呵成的待办 · 日程 · 番茄桌面应用。数据只属于你。',
      'foot.c1': '产品', 'foot.c2a': '版本发布', 'foot.c2b': '问题反馈', 'foot.c2c': '参与贡献',
      'foot.c3': '协议', 'foot.c3a': '安全说明', 'foot.c3b': '更新日志', 'foot.c3d': '素材署名',
      'foot.made': '用 Electron + Vue3 打造 · 数据留在你的电脑里',
      'nav.docs': '文档', 'nav.blog': '更新',
      'p2.b4': '<b>成就徽章</b>：里程碑与连续坚持，值得被记录',
      'q7.q': '怎么让记录这件事坚持下去？',
      'q7.a': '拾事专门为「坚持不下去」设计了兜底：托盘常驻随时回得来、桌面小组件让清单躺在桌面上、全局快捷键一秒记一条、悬浮窗提醒你正在专注；每周的叙事复盘会拉你回来看一眼自己走了多远。',
      _title: '拾事 PickDone — 计划、专注、复盘，一气呵成',
      _htmlLang: 'zh-CN',
      'd.h1': '文档中心', 'd.lede': '从安装到进阶，五分钟学会把拾事用顺手。深入内容都在 GitHub 仓库里。',
      'd.side.quick': '快速上手', 'd.side.features': '功能指南', 'd.side.cli': 'CLI 参考', 'd.side.data': '数据与隐私', 'd.side.trouble': '疑难排查',
      'd.q.h': '快速上手',
      'd.q.s1t': '下载并安装', 'd.q.s1p': '到 GitHub Releases 下载安装版（支持自动更新）或便携版（单文件免安装）。系统要求 Windows 10 / 11 64 位。',
      'd.q.s2t': '完成首次设置', 'd.q.s2p': '首次启动会引导选择界面语言、颜色模式与默认清单，全程 30 秒，之后随时可以在设置里改。',
      'd.q.s3t': '记下第一条待办', 'd.q.s3p': '在顶部输入框写内容、按回车就建好了；也可以随时用全局快捷键唤起迷你输入条，想到什么一秒记下。',
      'd.q.s4t': '开始第一个番茄', 'd.q.s4p': '点击任务右侧的番茄按钮开始专注，悬浮窗会缩到角落报进度；结束时时长自动记到这个任务头上。',
      'd.q.s5t': '看看你的复盘', 'd.q.s5p': '侧边栏进入「数据复盘」：叙事周报告诉你这周怎么样，热力图记录每一次坚持。',
      'd.f.h': '功能指南',
      'd.f.today': '今日清单', 'd.f.todayp': '列表与四象限矩阵双视图一键切换；昨天没做完的会询问是否移到今天；完成任务 5 秒内可撤销。',
      'd.f.cal': '日程月历', 'd.f.calp': '月 / 周 / 时间块视图，农历、节假日与调休齐全；把任务拖到某天就排到某天；重复任务支持按农历重复、跳过节假日。',
      'd.f.tag': '分类、标签与过滤器', 'd.f.tagp': '用分类归组、用标签打点、用过滤器保存常用筛选（比如「今天到期且高优先级」），侧边栏一点直达。',
      'd.f.widget': '桌面小组件与悬浮窗', 'd.f.widgetp': '半透明日历、待办卡可以钉在桌面上；专注时悬浮窗缩在角落随时报进度，都可以随时开关。',
      'd.f.backup': '自动备份与恢复', 'd.f.backupp': '应用自动做内容去重的分级备份（近期更密、更早更稀），危险操作前还会先留快照；设置里可以一键从备份恢复。',
      'd.cli.h': 'CLI 参考',
      'd.cli.p': '所有核心能力都开放为命令行原语，人和 AI 用同一套入口。命令支持结构化输出，方便脚本与 AI 助手（Claude、Cursor 等）直接调用。完整手册见仓库内 CLI 文档。',
      'd.cli.t1h': '命令', 'd.cli.t2h': '作用', 'd.cli.t3h': '示例',
      'd.cli.c1': '总览今天', 'd.cli.c1e': 'todo-cli overview',
      'd.cli.c2': '列出任务', 'd.cli.c2e': 'todo-cli list --undone',
      'd.cli.c3': '添加任务', 'd.cli.c3e': 'todo-cli add "写周报" --date tomorrow',
      'd.cli.c4': '完成/撤销完成', 'd.cli.c4e': 'todo-cli done "周报"',
      'd.cli.c5': '统计概要', 'd.cli.c5e': 'todo-cli stats',
      'd.cli.more': '以上仅为常用子集；20+ 命令覆盖任务、子任务、统计与回收站全域，完整清单见 GitHub 仓库的 CLI 手册。',
      'd.data.h': '数据与隐私',
      'd.data.s1t': '数据存在哪', 'd.data.s1p': '全部数据就是一个本机加密数据库文件（应用数据目录下的 todos.db），外加同目录的 backups/ 自动备份。不采集、不上传、不分析。',
      'd.data.s2t': '怎么备份', 'd.data.s2p': '应用内自动完成，无需配置；备份文件本身即完整数据，拷到别的机器就完成迁移。',
      'd.data.s3t': '怎么导出', 'd.data.s3p': '支持导出数据表格（Excel）与 PDF，统计与日历支持生成分享长图；数据随时带得走。',
      'd.data.s4t': '卸载会丢数据吗', 'd.data.s4p': '不会。卸载应用不删除数据目录；只要数据库文件还在，重装后数据原样回来。',
      'd.t.h': '疑难排查',
      'd.t.s1t': '界面没反应 / 白屏', 'd.t.s1p': '先完全退出应用（托盘右键退出）再启动；若反复出现，请带日志到 GitHub 提 issue。',
      'd.t.s2t': '误删了任务 / 清空了回收站', 'd.t.s2p': '完成的任务 5 秒内可撤销；删除的内容在回收站；清空回收站前应用会自动留快照，可从备份恢复。',
      'd.t.s3t': '怎么反馈问题', 'd.t.s3p': 'GitHub Issues 是唯一官方渠道，带上班本与日志回复会更快；功能建议同样欢迎。',
      'd.back': '← 返回首页',
      'b.h1': '发布与手记', 'b.lede': '首个公开发布正在准备中——开发里的想法、决策与版本记录，都会沉淀在这里。',
      'b.cl.h': '更新日志',
      'b.cl.date': '即将发布',
      'b.cl.i1': '<b>完整功能首发</b>：今日清单（列表 / 四象限 / 卡片堆叠）、日程月历（农历 + 节假日 + 拖拽改期）、番茄专注全套、叙事式数据复盘',
      'b.cl.i2': '<b>内置 AI CLI</b>：20+ 命令全部支持 --json，可注册为 Claude / Cursor 的工具，让 AI 直接替你记任务',
      'b.cl.i3': '<b>桌面体验</b>：悬浮专注窗、桌面小组件、全局快捷键、深色模式、中英双语、自动备份',
      'b.mtag': '方法论',
      'b.m1t': '番茄工作法入门：为什么是 25 分钟',
      'b.m1p1': '这个方法的开头一点也不严肃。1980 年代末，罗马的大学生 Francesco Cirillo 坐在书桌前，怎么都进入不了学习状态——每个学生都熟悉的时刻。他随手从厨房拿来一个番茄形状的计时器，跟自己打了个赌：能不能就专注这么一小会儿？这个赌局后来演变成《番茄工作法》，被写成书、翻译成多种语言，成了全世界流传最广的专注方法之一。',
      'b.m1p2': '为什么偏偏是 25 分钟？那是 Cirillo 自己一次次试出来的数。它足够长，长到能让你穿过开头那阵不情愿，真正进入事情里面；又足够短，短到你不好意思拒绝——再难的任务，答应先做 25 分钟总是容易的。但比数字更重要的是方法里的另外两步：每颗番茄开始前，必须明确「这一颗要做什么」；结束后，必须记一笔账。计时只是外壳，真正的内核是把注意力变成可观察、可清点的单位。',
      'b.m1h1': '原版方法其实有五步，不止一只计时器',
      'b.m1p3': '很多人不知道，Cirillo 的原版是一套完整的闭环，计时只是其中一环。流程是这样的：早上坐下来，先列出今天要做的事，并给每件事预估「大概要几颗番茄」；一天里执行，同时记下每件事实际用掉几颗；晚上收工前，把预估和实际摆在一起对账。对账那一刻，方法才真正兑现价值——你不但知道了今天专注了几颗，还知道了自己对时间的判断准不准。练上几周，预估会越来越准；再往后，「这件事要两颗番茄」就不是感觉，而是经验。',
      'b.m1h2': '一颗番茄的完整生命周期',
      'b.m1p4': '开始前：从清单里选一件事。如果它预估超过五六颗，先拆小——拆到一两颗能出一个可见结果为止。然后明确这颗番茄的完成线：「这一颗写到第二章前两节」，而不是「这一颗写论文」。写论文没法专注，写前两节可以。',
      'b.m1p5': '期间：守两条边界。外面的打断——消息、来电、同事提问——能推迟的全部推迟，手机翻面扣在桌上。心里的打断更常见也更隐蔽：专注到一半，突然想起「要买洗衣液」「该回一条消息」。原版的做法很朴素：在手边的纸上记一笔，然后回来，不让它带走注意力。规矩里只有一条是硬的：如果真的被彻底打断，这颗番茄作废，不算数。作废不可惜——它保护的是「一颗番茄＝一段完整专注」这个记账单位的价值。一旦开始允许「被打断的也算」，账目就失去意义了。',
      'b.m1p6': '响铃后：即使感觉正好，也停一下。这几分钟可以用来做一次快速回顾——刚才这段的脉络是什么，下一步从哪接——Cirillo 把这叫「过度学习」，它让下一颗番茄不用重新热身。然后一定要休息：站起来，接杯水，看看窗外。休息不是奖励，是流程的一半；连续四五颗之后，来一次 15–30 分钟的长休息。',
      'b.m1h3': '四种最常见的错法',
      'b.m1p7': '一是用成纯倒计时：打断不管、结束不记，番茄沦为一件计时道具。二是贪多：第一天雄心勃勃定十二颗，下午就崩了，第二天连方法一起放弃。三是把它当考勤：只数数量不看内容——四颗回邮件的番茄和四颗写方案的番茄，不是一个东西。四是休息时间刷手机：大脑没有得到真正的空档，下一颗的质量自然往下掉，最后归结为「这方法对我没用」。',
      'b.m1p8': '上手建议从每天 4 颗开始，别贪多。计时用什么无所谓，厨房计时器反而最正宗。坚持一两周，你会得到一个比任何效率技巧都值钱的数字：自己的真实容量——「一天到底能做几颗」。有了它，排日程就不再是许愿：答应别人「周五给」之前，你先知道周四之前该排几颗。',
      'b.m1r1': 'Francesco Cirillo，《The Pomodoro Technique: The Acclaimed Time-Management System》（初版 2006）',
      'b.m1r2': 'Wikipedia: Pomodoro Technique',
      'b.m2t': '四象限法则实操：重要不紧急的事为什么总被拖垮',
      'b.m2p1': '1954 年，艾森豪威尔在伊利诺伊州埃文斯顿的世界教会联合会大会上，引用了一位大学校长送他的话。这句话精准说出了他作为盟军统帅和总统都逃不开的困境，后来被引用了无数次：',
      'b.m2q': '「我有两种问题：紧急的，和重要的。紧急的问题往往不重要，重要的问题从来不紧急。」',
      'b.m2qc': '— Dwight D. Eisenhower 引 J. Roscoe Miller，1954',
      'b.m2p2': '这句话在三十多年后被斯蒂芬·柯维发展成了著名的四象限矩阵：按「重要 / 紧急」两个轴把任务分进四格。方法简单到五分钟就能学会，但先把它讲完整——四个格其实是四种不同的动作：',
      'b.m2h1': '四格，四种动作',
      'b.m2p3': '第一格「重要且紧急」——危机、临期交付、突发的要紧事。这一格的动作是处理，不需要纠结，但优秀和不优秀的人的区别在于：优秀的人这一格是满的但稳定，不优秀的人整天住在这里。第二格「重要不紧急」——健身、复盘、深度学习、关系维护、重要但不迫的项目。这一格的动作是排程：把它们当成约会写进日程。第三格「紧急不重要」——大多数消息、别人的临时求助、可开可不开的会。这一格的动作是缩手：能委托的委托，能拒绝的拒绝，能压缩成一封消息的别开成会。第四格「两者都不占」——无意识的刷手机、纯消磨。这一格的动作是删除，不用愧疚，删就是了。',
      'b.m2p4': '很多人对四象限的理解止于「分类」，但真正的收益发生在格与格之间：把第三格推掉、第四格删掉，省下来的不是「空闲」，而是可以成块喂给第二格的时间。分类只是手段，腾时间是目的。',
      'b.m2h2': '为什么「重要不紧急」总是输',
      'b.m2p5': '因为第二象限带着两重与生俱来的劣势。其一，它没有截止日期。紧急的事自带「现在就要」的压迫感，重要的事只有「迟早要做」的模糊感——没有人会在周五下午通知你「下周该复盘了」。其二，它的回报是延迟的。回完一条消息立刻清净，跑完一次步要几周后才见体能变化；第三格的完成感是即时的，第二象限的收益是慢性的。一天里靠感觉驱动做事的人，天然偏向紧急——这不是性格缺陷，是所有人的默认设置。所以它只能靠结构保护：写进日程、像约会一样不可挪动，而不能指望「有空再做」——那一天永远不会有空。',
      'b.m2h3': '两个隐蔽的错法',
      'b.m2p6': '误区一：把整理四象限本身当成工作。画格子花掉半小时，任务在格间挪来挪去，真正的第二象限一条没动——矩阵是判断工具，不是劳动。误区二：以为四象限是每天要画的表格。柯维的本意是每周看一眼，而不是每天分类：这周的时间，真的落在第二格了吗？分类花掉的时间应该以分钟计，超过分钟的分类就是在逃避真正的任务。',
      'b.m2p7': '实操只有两条纪律：每天早上花两分钟，把今日任务按重要 / 紧急过一遍——纸、表格或任何工具都行；然后保证每天都留出一段属于第二象限的时间，像对待约会一样写进日程。给自己做一个一周实验：只记录一件事——每天那段「第二象限时间」有没有兑现。一周后回看，答案通常比想象中刺眼，也正因为刺眼，它才成了改变的开端。检验标准只有一个：本周结束回头看，时间真的花在第二象限了吗？',
      'b.m2r1': '艾森豪威尔总统图书馆对这句引语的出处考证：eisenhowerlibrary.gov',
      'b.m2r2': 'Stephen R. Covey，《The 7 Habits of Highly Effective People》（1989），第三习惯「要事第一」',
      'b.m3t': '周复盘怎么写：三行就够了',
      'b.m3p1': '复盘不是什么新发明。软件行业有个延续几十年的仪式叫「回顾会」：每个迭代结束，整个团队停下来回答三个问题——什么做得好，什么做得不好，下次改什么。规则只有一条：讨论必须落到「下次要改变的那一件事」上，否则不散会。发起这件事的 Norman Kerth 在《Project Retrospectives》里立过一条后来被无数团队写在墙上的原则：',
      'b.m3q': '「无论回顾中发现了什么，我们都相信：以当时所知、所能、所处的局面，每个人已经尽了全力。」',
      'b.m3qc': '— Norman Kerth，Project Retrospectives（2001）',
      'b.m3h1': '两种最常见的死法',
      'b.m3p3': '个人周复盘的死法与之同源。第一种死成打卡数字：「完成 23 项，连续 5 天」。数字的问题不在假，而在没有对照、没有出口——它记录了「做了多少」，却不回答「所以呢」。第二种死成检讨书：「这周又拖延了，状态很差，下周要更自律」。检讨书的问题在方向反了：复盘应该指向系统——流程、环境、习惯哪里可以调；而不是指向人格——我懒、我拖延。指责系统的复盘能写出改动，指责自己的复盘只能写出愧疚，愧疚撑不过周二。两种死法共享同一个病根：它们都绕开了复盘真正要回答的三个问题。',
      'b.m3h2': '三个问题，一层比一层深',
      'b.m3p4': '第一问是事实层：这周实际发生了什么？要求写事实、不写形容词——「方案写了三颗番茄，中断两次」是事实，「这周效率不高」是感觉。感觉无法改进，事实才能。第二问是对比层：和之前比，是更好还是更差？这一问藏着一个容易被忽略的前提——基线。没有基线，「好不好」全凭当天的情绪：状态差的时候看什么都是退步，状态好的时候处处是进步。基线不需要复杂，上周的完成量、上个月的专注时长，任何稳定的参照都行，重点是从「和自己比」开始，而不是和任何人比。第三问是行动层：下周只改变哪一件事？只写一件，而且要具体到可执行——「下周更专注」不是改动，「下周每天上午十点前不开邮箱、先做一小时最重要的任务」才是。复盘的价值不在仪式感，全在最后这一行。',
      'b.m3h3': '一页纸长什么样',
      'b.m3p5': '举个虚构的例子。小周周五下午四点做复盘，翻完这周的记录，写下三行：这周——方案写完两版（预估四颗番茄，实际用了五颗），健身两次，周三下午被三个临时会议切碎；对比——专注度比上周好（中断从五次降到两次），健身少了一次，周三的会占了原定的深度工作时间；下周只改一件事——周三下午设为无会议时段，深活不挪窝。三行，不超过五分钟。周一早上，他把「周三下午无会议」写进日历——到这里，一次复盘才算闭环。至于那「一件事」下周有没有做到？它就是下周复盘的第一问。',
      'b.m3p6': '「写下来真的有用吗」，有人认真研究过。哈佛商学院的 Di Stefano 等人做过一组实验：一组员工每天下班前花 15 分钟反思当天学到的东西，另一组照常多干 15 分钟。结果反思组随后的绩效高出两成多——研究者把它叫作「以思促学」：同样的经历，多看一眼的人学到了更多。',
      'b.m3p7': '落地只要一页纸：每周固定一个时间，花 15 分钟翻一遍这周的记录，写下三行——这周实际做了什么、和之前比怎么样、下周只改哪一件事。两个提醒：写超过一页通常说明在写作而不是复盘；翻不出这周的事实记录，复盘就会退化成凭感觉打分——所以唯一的要求是事实来自真实记录，纸笔、表格还是应用，都不重要。',
      'b.m3r1': 'Norman L. Kerth，《Project Retrospectives: A Handbook for Team Reviews》（2001）',
      'b.m3r2': 'Di Stefano, Gino, Pisano & Staats，《Learning by Thinking: How Reflection Aids Performance》（Harvard Business School Working Paper, 2014）',
      'b.m4t': '时间轴复盘：这一天到底去哪了',
      'b.m4p1': '「这一天怎么就过去了？」——这个问题人类已经问了自己一个世纪。早在 1930 年代，研究者就在用「时间日记」回答它：请人们像记账一样，把每段时间花在了哪里如实写下。心理学家米哈里·契克森米哈赖在 1970 年代把这条路走到了极端——他给受试者配发会随机响铃的提醒器，铃一响就记录「此刻在做什么、感觉如何」。靠着这套后来被称为「经验取样法」的手段，他发现了那个著名的概念：心流。',
      'b.m4p2': '这条研究传统留下一句朴素的经验：回忆靠不住，记录靠得住。回忆会被感觉改写——忙乱的一天事后想起来觉得充实，摸鱼的一天觉得漫长而空洞；而事实上忙乱的那天可能什么都没推进。只有当天留下的记录不会说谎。这也是时间轴复盘的全部原理：把一天还原成一条可见的轨道，每一分钟都在上面，好与坏让轨道自己说话，不给回忆辩解的机会。',
      'b.m4h1': '把一天铺在一条轨道上',
      'b.m4p3': '做法不难：把一天铺成 24 小时的时间轴，左边铺事实——每段专注按任务分类着色，做了什么一目了然；右边铺计划——这天原本打算怎么过。计划和事实并排放着，偏差不需要分析，看一眼就有数：日程上写了「上午两小时深度工作」，轨道上却只有 25 分钟落了色，落差就是问题本身。应用外的会议、通勤、临时插进来的事，事后补录几笔，轨道不会缺块——缺块的轨道只会再次放大感觉的发言权。',
      'b.m4h2': '坚持两周，你会看到三种模式',
      'b.m4p4': '第一种是高效时段。多数人的专注色块明显集中在一天里的某一两个小时——而你未必猜得到是哪两个。看到自己的轨道之后，把最重要的任务往那个时段放，是所有调整里回报最高的一步。第二种是碎片化：下午的轨道被会议切成几段，每段之间只塞得下消息和摸鱼——问题不在会议本身，在于碎片之间原本可以完整的时间被你随手交给了最不重要的事。第三种是虚假忙碌：感觉忙到飞起的一天，轨道上安静得很——情绪和事实对不上账的时刻，恰恰是复盘最有价值的时刻，它逼你回答「那种忙，到底忙的是什么」。',
      'b.m4p5': '时间管理作家 Laura Vanderkam 让读者记录时间日志时常说：人们以为自己知道时间去哪了，直到看见记录——大多数时候，两者相差很远。相差的那一段，就是我们凭感觉过日子所付出的价格。',
      'b.m4p6': '最后是态度：轨道不是给自己打分的考卷。Kerth 那条回顾会原则在这里同样成立——以当时所知、所能，你已经尽了力。看见轨道的意义不是自责「又浪费了一天」，而是下一次把色块排得更接近自己想要的样子。看得见，才管理得了；先看得见，其余都好谈。',
      'b.m4r1': 'Csikszentmihalyi & Larson，《Validating the Experience Sampling Method》（1987）',
      'b.m4r2': 'Laura Vanderkam，《168 Hours: You Have More Time Than You Think》（2010）',
      'b.p1tag': '开发手记', 'b.p1date': '2026-09-01',
      'b.p1t': '为什么我做一个「不出网」的待办应用',
      'b.p1p1': '市面上不缺待办应用，缺的是「敢把数据留在你电脑里」的待办应用。主流产品几乎都默认把你的任务、习惯、专注记录放进云端：注册、登录、同步，一条龙。方便吗？方便。代价呢？你的数据躺在别人的服务器上，断网时半残，导出时设置重重关卡。',
      'b.p1p2': '我不反对云同步，我反对的是「没有别的选项」。拾事就是那个别的选项：零账号、零联网，全部数据是一个本机加密数据库文件，备份即迁移，删除即离开。它免费、开源，你可以自己编译，也可以随时走。',
      'b.p1p3': '如果你也受够了「用个待办还得先注册」，试试拾事。',
      'b.p2tag': '开发手记', 'b.p2date': '2026-09-01',
      'b.p2t': '让 AI 替你管任务：CLI 的设计笔记',
      'b.p2p1': '拾事内置了一套 CLI，最初的目的很自私：我想让自己的 AI 助手帮我记任务。后来发现这件事的意义远大于初衷——当应用的所有能力都开放为命令行原语，人和 AI 就有了同一套入口，不需要为 AI 单独开发接口，也不需要把数据交出去。',
      'b.p2p2': '设计上守着三条：第一，每个能力都是一个可独立调用的原语，支持结构化输出，Agent 拿到 JSON 就能干活；第二，人和 AI 读写同一个本地库，不存在「AI 那边一份、我这边一份」的同步问题；第三，危险操作走和界面一致的确认与撤销路径，AI 不能绕过安全栏。',
      'b.p2p3': '「帮我把周报加到周五，提前一天提醒我」——这句话现在真的可以落地。这是我在这个项目里最喜欢的一件事。',
      'b.p3tag': '版本发布', 'b.p3date': '即将发布',
      'b.p3t': '0.1.0：第一个公开版本里有什么',
      'b.p3p1': '首个公开版本会包含：今日清单（列表 / 四象限）、日程月历（农历 + 节假日 + 拖拽改期）、番茄工作流全套（专注轮转、悬浮窗、白噪音、24h 时间轴）、叙事式数据复盘（周报 / 热力图 / 成就徽章 / 分享卡片）、子任务与多重提醒、智能重复、自动备份、桌面小组件、全局快捷键、深色模式、中英双语，以及给 AI 用的 CLI。',
      'b.p3p2': '免费，开源，Windows 10 / 11 可用。发布日子一旦定了，会在这里和 GitHub Releases 同步公布。',
      'dc.n1': '入门', 'dc.n2': '使用指南', 'dc.n3': 'CLI 参考', 'dc.n4': '数据与安全', 'dc.n5': '常见问题',
      'dc.next': '下一步', 'fq.more': '更多问题 → 完整 FAQ 与技术排查',
      'mk.date': '今天 · 9月2日 周二', 'mk.sub': '5 件待办 · 已完成 2', 'mk.dark': '深色', 'mk.light': '浅色',
      'mk.t1': '完成实验报告', 'mk.t2': '写周报并发到群里', 'mk.t3': '整理桌面与收件箱', 'mk.t4': '给妈妈打电话',
      'mk.today': '今天', 'mk.done': '已完成', 'mk.prio': '高', 'mk.sub1': '子任务 1/3', 'mk.tag': '#工作 · 预计 2 个番茄',
      'mk.focus': '专注中', 'mk.focusTask': '准备季度产品评审会', 'mk.harvest': '8/10', 'mk.qa': '想做点什么？回车即记，一秒捕获',
      'gs.h1': '拾事文档', 'gs.lede': '从安装到进阶。按「教程 → 指南 → 参考 → 阐释」组织，每一页只回答一个问题。',
      'gs.install.h': '安装',
      'gs.install.p': '拾事提供两个版本：<b>安装版</b>（PickDone-Setup，标准安装，支持应用内自动更新）与<b>便携版</b>（PickDone-Portable，单文件免安装，拷到哪都能跑，更新需手动重新下载）。两者功能完全一致。',
      'gs.install.req': '系统要求：Windows 10 / 11（64 位）。卸载应用不会删除你的数据目录。',
      'gs.tut.h': '快速上手：你的第一个番茄',
      'gs.tut.s1t': '1 · 创建一个任务', 'gs.tut.s1p': '在顶部输入框写下要做的事，按回车。可以在编辑面板里补充描述、设优先级、加子任务、估计番茄数——也可以什么都不填，先记下来再说。',
      'gs.tut.s2t': '2 · 把它排到今天', 'gs.tut.s2p': '新任务默认进入待办箱；把它拖到日历的某一天，或在编辑面板里设日期。到了「今日待办」页面就能看到它。',
      'gs.tut.s3t': '3 · 开始专注', 'gs.tut.s3p': '点击任务右侧的番茄按钮开始专注：悬浮窗缩到角落报进度，可以配上白噪音。想提前结束？就地放弃并记下原因，专注过的分钟数照样入账。',
      'gs.tut.s4t': '4 · 完成并撤销', 'gs.tut.s4p': '做完点勾即可完成；5 秒内发现点错了？底部弹出通知里点「撤销」，或按 Ctrl+Z。',
      'gs.tut.s5t': '5 · 看你的复盘', 'gs.tut.s5p': '进入「数据复盘」：一段叙事周报告诉你这周怎么样，热力图上会多出一格颜色。这就是拾事的完整闭环：计划 → 专注 → 复盘。',
      'gs.ui.h': '界面导览',
      'gs.ui.today': '今日待办', 'gs.ui.todayp': '今天的主场：昨日未完成、今天与已完成三组；左侧是 24 小时时间轨，专注记录一眼可见。',
      'gs.ui.calendar': '日程概览', 'gs.ui.calendarp': '月 / 周 / 时间块月历，农历与节假日齐全，拖拽改期。',
      'gs.ui.todobox': '待办箱', 'gs.ui.todoboxp': '所有没有排期的任务住在这里，等你有空再把它们安排进具体的日子。',
      'gs.ui.done': '已达成', 'gs.ui.donep': '按完成时间分组的成就墙，坚持了多久一目了然。',
      'gs.ui.insights': '数据复盘', 'gs.ui.insightsp': '叙事周报、热力图、成就徽章与分享卡片，全部基于你自己的数据。',
      'gs.map.h': '继续阅读',
      'gs.map.guide': '使用指南', 'gs.map.guidep': '按任务找做法：组织、重复、番茄、复盘、桌面体验。',
      'gs.map.cli': 'CLI 参考', 'gs.map.clip': '全部命令与约定，给人和给 AI 的完整手册。',
      'gs.map.data': '数据与安全', 'gs.map.datap': '数据存在哪、怎么备份、怎么迁移、会不会联网。',
      'gs.map.faq': '常见问题', 'gs.map.faqp': '使用疑问与技术排查，以及怎么反馈问题。',
      'gd.h1': '使用指南', 'gd.lede': '按目标组织的操作手册：找到你想做的事，照着步骤做即可。',
      'gd.tasks.h': '任务管理',
      'gd.tasks.createt': '创建与编辑', 'gd.tasks.createp': '顶部快速输入条回车即建；点击任务打开编辑面板，可改标题、描述、日期、分类、优先级（高 / 低）与截止时间。',
      'gd.tasks.subt': '子任务', 'gd.tasks.subp': '在编辑面板里拆步骤，勾选进度自动显示「已完成 / 总数」；完成父任务默认连带勾选全部子任务。',
      'gd.tasks.priot': '优先级与四象限', 'gd.tasks.priop': '优先级分高 / 低两档，与四象限矩阵的「重要」双向打通；今日页可在列表和四象限之间一键切换。',
      'gd.tasks.movet': '改期与排序', 'gd.tasks.movep': '在日历里拖任务到目标日期即改期；今日清单支持手动排序，顺序即刻生效。',
      'gd.org.h': '组织：分类、标签与过滤器',
      'gd.org.catt': '分类', 'gd.org.catp': '侧边栏管理分类，每条任务归入一个分类，分类色会贯穿时间轨与复盘图。',
      'gd.org.tagt': '标签', 'gd.org.tagp': '在描述里写 #标签 即自动识别，侧边栏按标签聚合统计。',
      'gd.org.filtert': '过滤器', 'gd.org.filterp': '把常用筛选条件（如「今天到期且高优先级」）存成过滤器，挂在侧边栏一点直达。',
      'gd.org.inboxt': '待办箱与已达成', 'gd.org.inboxp': '没有日期的任务都在待办箱；已完成的按完成时间进入「已达成」，随时回看自己的积累。',
      'gd.sched.h': '日程与重复',
      'gd.sched.calt': '月历视图', 'gd.sched.calp': '月 / 周 / 时间块三种视图；点击「今天」回到当天；悬停截断的事件可看完整标题。',
      'gd.sched.dragt': '拖拽改期', 'gd.sched.dragp': '把任务拖到任意日期格子即完成改期，周 / 月视图通用。',
      'gd.sched.repeatt': '重复任务', 'gd.sched.repeatp': '支持天 / 周 / 月 / 年组合，可按农历重复（如生日、节气），可设置跳过节假日；完成当前实例后自动续期下一个。',
      'gd.sched.remindt': '多重提醒', 'gd.sched.remindp': '一个任务可以设多个提醒时间点（如提前一天 + 当天早上），互不覆盖。',
      'gd.focus.h': '番茄专注',
      'gd.focus.startt': '开始与轮转', 'gd.focus.startp': '点击任务旁的番茄按钮开始专注，结束后自动进入休息并轮转；专注与休息时长都可以在设置里调整。',
      'gd.focus.floatt': '悬浮窗与白噪音', 'gd.focus.floatp': '专注时悬浮窗缩到屏幕角落显示倒计时与任务名；内置 10 类真实录音白噪音与完成提示音，都可在设置试听更换。',
      'gd.focus.giveupt': '放弃与补录', 'gd.focus.giveupp': '中途放弃就地点「放弃」并可选记原因——专注过的分钟数仍会计入账本；忘记开番茄了？右键任务可以直接补录一段专注。',
      'gd.focus.timelinet': '24 小时时间轴', 'gd.focus.timelinep': '今日页左侧的时间轨记录每一段专注与休息（休息为橙色），支持点击回看与编辑关联任务。',
      'gd.rev.h': '数据复盘',
      'gd.rev.ranget': '切换周期', 'gd.rev.rangep': '本周 / 上周 / 本月 / 上月 / 近 7 天 / 近 30 天一键切换，也支持自定义日期区间（最长 366 天）。',
      'gd.rev.storyt': '叙事周报', 'gd.rev.storyp': '每次复盘先给你一段基于个人基线的总结：完成多少、专注多久、比平时更投入还是松懈——先读故事，再看数字。',
      'gd.rev.heat': '热力图与成就', 'gd.rev.heatp': 'GitHub 风格活跃热力图记录每一次完成；里程碑与连续坚持会点亮成就徽章。',
      'gd.rev.share': '分享卡片', 'gd.rev.sharep': '一键把本周成绩生成分享长图，可以发到社交媒体留存。',
      'gd.desk.h': '桌面体验',
      'gd.desk.shortcut': '全局快捷键', 'gd.desk.shortcutp': '任何界面用快捷键唤起迷你输入条，想到什么一秒记下；键位可在设置中查看与修改。',
      'gd.desk.widget': '桌面小组件', 'gd.desk.widgetp': '半透明日历、待办卡可以钉在桌面上，回到桌面就能看到今天的安排，无需打开主窗口。',
      'gd.desk.dark': '深色模式与双语', 'gd.desk.darkp': '跟随系统或手动切换深浅色；界面语言中英一键切换，数据与设置互不影响。',
      'cr.h1': 'CLI 参考', 'cr.lede': '拾事的全部核心能力都以命令行原语开放，人和 AI 用同一套入口。本页与仓库内 CLI 手册保持一致，示例均可直接运行。',
      'cr.pre.h': '运行前提',
      'cr.pre.p1': '需要 Node.js ≥ 20；命令在仓库的 todo-app 目录下执行：',
      'cr.pre.p2': '给 AI 助手用时始终加 --json：输出 {ok, command, data} 包络，写操作附带 next 字段提示后续命令。',
      'cr.conv.h': '通用约定',
      'cr.conv.hdate': '日期参数',
      'cr.conv.herr': '错误与退出码',
      'cr.conv.hlimit': '返回与级联',
      'cr.conv.haudit': '审计流水',
      'cr.sync': '应用正在运行时，CLI 写入约 2 秒内自动同步到界面，无需重启。',
      'cr.conv.date': '日期参数统一支持：today / tomorrow / +3d / YYYY-MM-DD / "YYYY-MM-DD HH:mm"。',
      'cr.conv.err': '错误走 stderr 并带非零退出码。常见错误码：AMBIGUOUS_MATCH（关键词命中多条，换更精确关键词或用完整 taskId，不要猜）、TASK_NOT_FOUND、NEEDS_CONFIRM（危险操作缺确认）。',
      'cr.conv.limit': 'list / search 默认最多返回 200 条（--limit 可调，上限 500）；完成父任务默认连带勾选全部子任务（--no-sub-cascade 关闭）。',
      'cr.conv.audit': '每次写操作自动落审计流水（数据目录 cli-audit.jsonl），log 命令可查询——向别人汇报「AI 改了什么」时引用它。',
      'cr.read.h': '读取命令',
      'cr.write.h': '写入命令',
      'cr.tomato.h': '番茄命令',
      'cr.ai.h': '接入 AI 助手',
      'cr.ai.p': '把 CLI 注册成 Claude、Cursor 等 AI 助手的工具，它就能直接替你管任务。仓库内附带现成的技能描述文件（todo-app/cli/SKILL.md），助手的接入配置可直接引用。人和 AI 读写同一个本地库，不存在第二份需要同步的数据。',
      'cr.t.h': '命令表',
      'cr.t.desc': '作用',
      'cr.t.ex': '示例',
      'cr.r1': '今日总览：完成度 / 逾期 / 无日期 / 回收站计数',
      'cr.r2': '列任务：支持 --all|today|tomorrow|week|overdue|future、--done|--undone、--category、--keyword、--limit',
      'cr.r3': '全库搜索：按关键词搜内容与描述',
      'cr.r4': '查看单个任务完整字段（支持 taskId 或关键词定位）',
      'cr.r5': '分类列表（id 与名称）',
      'cr.r6': '统计：每日完成量 + 专注分钟（默认近 7 天，可 --from/--to 指定区间）',
      'cr.r7': '回收站列表',
      'cr.r8': '环境自检（数据目录、依赖与配置体检）',
      'cr.r9': '审计流水查询：外部写操作历史（--n 条数，--action 过滤）',
      'cr.w1': '新增任务：--desc 描述、--date、--reminder、--category、--difficulty',
      'cr.w2': '完成任务（写 completedAt）',
      'cr.w3': '撤销完成',
      'cr.w4': '编辑：--content 新标题、--desc、--date、--reminder、--category',
      'cr.w5': '删除（进回收站，可恢复）',
      'cr.w6': '从回收站恢复',
      'cr.w7': '从其他应用一键迁移：滴答清单 / TickTick / Todoist 备份 CSV；--dry-run 先预览，重复任务自动去重',
      'cr.purge.warn': '<b>purge 是本接口唯一不可恢复的操作。</b>清空回收站前必须：先跑 <span class="code-inline">purge --dry-run</span> 看清单 → 用户明确确认 → 带 <span class="code-inline">--yes</span> 执行。三者缺一不可。',
      'cr.t1': '开始专注（可 --task 附着任务、--minutes 自定义时长）',
      'cr.t2': '停止 / 放弃（默认按已专注时长落账，--reason 记原因）',
      'cr.t3': '给进行中的番茄换绑 / 取消附着任务（--none）',
      'cr.t4': '查看番茄状态（倒计时 / 附着任务 / 今日收成）',
      'cr.e1': 'todo-cli overview --json',
      'cr.e2': 'todo-cli list today --undone --json',
      'cr.e3': 'todo-cli search "周报" --json',
      'cr.e4': 'todo-cli get "写周报" --json',
      'cr.e5': 'todo-cli categories --json',
      'cr.e6': 'todo-cli stats --from 2026-08-01 --json',
      'cr.e7': 'todo-cli recycle --json',
      'cr.e8': 'todo-cli doctor',
      'cr.e9': 'todo-cli log --n 20 --json',
      'cr.we1': 'todo-cli add "写周报" --date friday --category 工作',
      'cr.we2': 'todo-cli done "周报" --json',
      'cr.we3': 'todo-cli undo "周报"',
      'cr.we4': 'todo-cli edit "周报" --date monday',
      'cr.we5': 'todo-cli delete "旧任务"',
      'cr.we6': 'todo-cli restore "旧任务"',
      'cr.we7': 'todo-cli import ticktick-backup.csv --dry-run',
      'cr.te1': 'todo-cli tomato start --task "写周报" --json',
      'cr.te2': 'todo-cli tomato stop --reason "被人打断"',
      'cr.te3': 'todo-cli tomato attach "新任务"',
      'cr.te4': 'todo-cli tomato status --json',
      'dt.h1': '数据与安全', 'dt.lede': '拾事没有服务器。这一页讲清楚你的数据在哪、怎么被保护、怎么带走。',
      'dt.store.h': '存储位置',
      'dt.store.p': '全部数据落在一个本机加密数据库文件（SQLite，WAL 模式）与自动备份目录中，位于系统应用数据目录下：',
      'dt.store.l1': '数据库：todos.db',
      'dt.store.l2': '自动备份：backups/',
      'dt.store.l3': 'CLI 审计流水：cli-audit.jsonl',
      'dt.store.note': '加密存储意味着即便有人拿到这个文件，也无法直接读出你的任务内容。',
      'dt.backup.h': '备份体系',
      'dt.backup.p1': '应用自动备份，无需配置：内容去重（相同内容不重复占空间）+ 分级保留（近期备份更密、久远备份更稀），危险操作（如清空回收站）执行前还会先打事件快照。',
      'dt.backup.h2': '从备份恢复',
      'dt.backup.s1': '打开 设置 → 备份；',
      'dt.backup.s2': '选择一个备份点（列表带时间与说明）；',
      'dt.backup.s3': '一键恢复，当前数据会先被再次快照，不怕恢复错。',
      'dt.migrate.h': '换机与重装',
      'dt.migrate.p': '备份文件即完整数据：把数据目录（含数据库与 backups/）拷到新机器同位置，或在新机器上用「从备份恢复」指向拷过来的备份，即完成迁移。重装系统、卸载重装同理——卸载应用从不删除数据目录。',
      'dt.export.h': '导出',
      'dt.export.p': '任务数据可导出 Excel 表格与 PDF；统计与日历支持生成分享长图。导出的文件属于你，想放哪放哪。',
      'dt.net.h': '网络行为声明',
      'dt.net.p': '拾事没有账号体系与云端服务器，正常运行全程不联网。唯一可能的外部请求是检查应用更新（访问 GitHub Releases），可在设置中改为手动检查。',
      'fq.h1': '常见问题', 'fq.lede': '使用疑问与技术排查。没找到答案？GitHub Issues 见。',
      'fq.use.h': '使用相关',
      'fq.tech.h': '技术排查',
      'fq.t1q': '打开后白屏或无响应怎么办？',
      'fq.t1a': '先从托盘图标完全退出（右键 → 退出）再重新启动。若反复出现，带上日志到 GitHub Issues 反馈，通常当轮就能定位。',
      'fq.t2q': 'CLI 写入后界面没变化？',
      'fq.t2a': '应用运行中会监听数据库变化并自动刷新（约 2 秒内）；未生效时先确认 CLI 与应用操作的是同一个数据目录（doctor 命令可体检），再尝试手动刷新。',
      'fq.t3q': '怎么确认我的备份能恢复？',
      'fq.t3a': '设置 → 备份 里选择任意一个历史备份点做一次演练恢复：恢复前当前数据会先被快照，试错零成本。建议大版本更新前演练一次。',
      'fq.t4q': '全局快捷键和别的软件冲突了？',
      'fq.t4a': '快捷键可在设置中修改；若冲突未被系统接收，拾事会静默退避重试并给一次性提示，改一个不冲突的组合即可。',
      'fq.t5q': '怎么反馈 bug 或提功能建议？',
      'fq.t5a': 'GitHub Issues 是唯一官方渠道：报 bug 请附版本号、复现步骤与日志；功能建议同样欢迎，会进 roadmap 讨论。',
    },
    en: {
      'nav.demo': 'Live demo', 'dl.tag': 'Portable · single file', 'fl.task': 'Morning sync — weekly plan', 'fl.count': 'Today 10/8 pomodoros', 'demo.note': 'Runs on demo data built into your browser. It stays on your device — nothing is uploaded.', 'nav.features': 'Features', 'nav.cli': 'AI CLI', 'nav.compare': 'Compare', 'nav.privacy': 'Privacy', 'nav.faq': 'FAQ', 'nav.download': 'Download',
      'hero.badge': 'Open source · MIT · Available on Windows',
      'hero.h1': 'Plan, focus, review —<br><span class="em">one flow</span>',
      'hero.sub': 'PickDone turns to-dos, schedule, pomodoro focus and review into a single workflow: every focus session is logged against its task automatically, and the weekly report tells your week as a story. Zero account, no cloud — your data never leaves this machine.',
      'hero.cta1': 'Download for Windows', 'hero.cta2': 'View on GitHub',
      'hero.m1': 'Portable version available', 'hero.m2': 'No <b>account</b> required', 'hero.m3': 'Up and running in <b>5 minutes</b>',
      'brand.name': 'PickDone<small>PLAN · FOCUS · REVIEW</small>',
      'hero.chip1': 'focus logged to the task', 'hero.chip2': 'your data is never sent anywhere',
      'hero.chip1t': 'Pomodoro +1', 'hero.chip2t': 'Zero upload',
      'cli.plain': 'Not a terminal person? No problem — this section is for AI agents and power users. Skipping it changes nothing about everyday use.',
      'cmp.r7': 'Multi-device sync', 'cmp.r7a': 'Real-time sync everywhere', 'cmp.r7b': 'Desktop-first; your data is one file — copy it anywhere and it works',
      'cmp.r8': 'Migrating from your old app', 'cmp.r8a': "Re-enter tasks by hand, or export formats that don't interoperate", 'cmp.r8b': 'One-click import of backup CSVs from mainstream to-do apps, duplicates auto-skipped',
      'q8.q': "I'm using dida365 / TickTick / Todoist — can I move my data over?",
      'q8.a': 'Yes. Settings → Data → "Migrate from another app": pick a backup CSV exported from any of them and import in one click — lists become categories, subtasks and completion states are kept, duplicates are skipped, and you can preview first. Prefer the terminal? The CLI import command supports the same formats.',
      'gr.h': 'Afraid you won’t stick with it?', 'gr.link': 'See the anti-graveyard details →',
      'gr.p': 'Tray icon, desktop widgets, one-second capture, float-window nudges — PickDone is built with a safety net for people who fall off; the weekly review pulls you back to see how far you’ve come.',
      'dt.net.p2': 'Don’t take our word for it: quit the app and check network connections yourself (netstat), or block PickDone in your firewall and keep using it. The source is public — search the network call sites.',
      'dt.enc.h': 'How encryption works',
      'dt.enc.p': 'The database is fully encrypted with a SQLCipher-family driver (better-sqlite3-multiple-ciphers); the key file <span class="path">db.key</span> sits in the same folder and travels with your backups and migrations — no password to remember.',
      'dt.enc.p2': 'Honest boundary: this protects against someone reading the single database file. If an attacker can already read your entire user directory, the key is right there and this layer does not help (a system-level option is under evaluation). We write the boundary down because encryption is not magic.',
      'trust.t1': 'MIT open source', 'trust.t2': 'No account, no cloud', 'trust.t3': 'Your data is one local file', 'trust.t4': 'CLI for AI agents', 'trust.t5': 'Bilingual · Dark mode',
      'pillars.eyebrow': 'Why PickDone',
      'pillars.h2': 'Pomodoro is not a plugin.<br>It is the <span class="hl">skeleton</span>.',
      'pillars.lede': 'From the today list to the 24-hour timeline, every focus/break cycle runs through the whole app — every pomodoro lands on a concrete task.',
      'p1.eyebrow': 'Pomodoro focus',
      'p1.h': 'A complete workflow, not just a timer',
      'p1.p': 'Focus and break cycles that rotate on their own — durations are yours to set — with a desktop float window, white noise and chimes. Pick a task, focus, and the time is logged against it automatically: at day’s end, the timeline shows where every minute went.',
      'p1.b1': '<b>Float window</b>: a tiny corner window reporting progress',
      'p1.b2': '<b>White noise</b>: 10 real recordings for deep focus',
      'p1.b3': '<b>24h timeline</b>: focus & rest at a glance, with back-filling',
      'p1.cap': 'Today list · 24-hour track on the left',
      'p2.eyebrow': 'Weekly review',
      'p2.h': 'Reviews that tell a story, not a wall of numbers',
      'p2.p': 'A narrative weekly report based on your own baseline: how this week went, whether you pushed harder than usual, and what to adjust next. No vanity metrics — reviews in plain words.',
      'p2.b1': '<b>Narrative report</b>: read the story first, then the numbers',
      'p2.b2': '<b>Activity heatmap</b>: GitHub-style, streaks made visible',
      'p2.b3': '<b>Share cards</b>: one-click images of your progress',
      'p2.cap': 'Weekly review · light',
      'p2.capDark': 'Weekly review · dark',
      'p3.eyebrow': 'Schedule',
      'p3.h': 'Plan on a calendar, reschedule by dragging',
      'p3.p': 'Month / week / time-grid views with lunar dates and holidays. Drop a task on a day and it lives there; repeats support day / week / month / year — even lunar repeats.',
      'p3.b1': '<b>Drag to reschedule</b>: planning as easy as moving a sticky note',
      'p3.b2': '<b>Lunar & holidays</b>: repeats that follow the Chinese calendar',
      'p3.b3': '<b>Multiple reminders</b>: several reminder times per task',
      'p3.cap': 'Calendar · lunar dates + holidays',
      'cli.eyebrow': 'AI-Ready CLI',
      'cli.h': 'You and your AI,<br>one <span class="hl">shared interface</span>',
      'cli.p': 'Every core capability of PickDone is exposed as a CLI primitive with structured output. Register it as a tool in Claude, Cursor or any agent and you can delegate tasks to your AI — no custom API needed.',
      'cli.b1': '<b>20+ commands</b>: tasks, subtasks, stats, recycle bin',
      'cli.b2': '<b>--json output</b>: agents get structured data, ready to act',
      'cli.b3': '<b>One dataset</b>: you and your AI read the same local store',
      'cli.term': 'Terminal — PickDone CLI',
      'cli.c1': 'todo-cli add "Submit project proposal" --date today --remind -1h',
      'cli.o1': '✓ Added to "Today", reminder set 1 hour ahead',
      'cli.c2': 'todo-cli overview',
      'cli.o2': '<span class="k">today</span>: 5 tasks · 2 done · <span class="k">focus</span>: 10 pomodoros / 250 min',
      'cli.c3': 'todo-cli done "proposal"',
      'cli.o3': '✓ Completed (undo within 5s)',
      'cli.c4': 'todo-cli log --n 5 --json',
      'cli.o4': '✓ Audit trail: every write your AI just made is on record',
      'feat.eyebrow': 'For the detail-obsessed',
      'feat.h': 'Every detail of a to-do app, taken seriously',
      'f1.h': 'Eisenhower matrix view', 'f1.p': 'Switch the today list between list and matrix in one click.',
      'f2.h': 'Multiple reminders', 'f2.p': 'Set several reminder times per task, so nothing important slips your mind.',
      'f3.h': 'Smart repeats', 'f3.p': 'Daily / weekly / monthly / yearly, with lunar repeats and holiday skipping.',
      'f4.h': 'Subtasks & estimates', 'f4.p': 'Break steps down, estimate pomodoros, know the cost of every task.',
      'f5.h': 'Desktop widgets', 'f5.p': 'Pin translucent calendar & to-do cards onto your desktop.',
      'f6.h': 'Global shortcuts', 'f6.p': 'Summon a mini input bar from anywhere; capture a thought in a second.',
      'f7.h': 'Dark mode', 'f7.p': 'A fully polished dark theme, easy on late-night eyes.',
      'f8.h': 'Undo & recycle bin', 'f8.p': 'Undo completions and deletes; deleted items stay restorable in the recycle bin.',
      'f9.h': 'Automatic backups', 'f9.p': 'Deduplicated, tiered retention with snapshots before risky actions.',
      'cmp.eyebrow': 'A different choice',
      'cmp.h': 'Cloud to-dos vs. PickDone',
      'cmp.col0': '', 'cmp.col1': 'Typical cloud to-do', 'cmp.col2': 'PickDone',
      'cmp.r0': 'Getting started', 'cmp.r0a': 'Register an account, bind email or phone', 'cmp.r0b': 'Download and use — no account at all',
      'cmp.r1': 'Where data lives', 'cmp.r1a': 'Vendor’s cloud servers', 'cmp.r1b': 'One encrypted database file on your PC',
      'cmp.r2': 'When offline', 'cmp.r2a': 'Limited features, sync errors', 'cmp.r2b': 'Fully functional — born offline',
      'cmp.r3': 'Data export', 'cmp.r3a': 'Limited formats, some paywalled', 'cmp.r3b': 'Database file + spreadsheets + images, take it all',
      'cmp.r4': 'AI access', 'cmp.r4a': 'Closed, or vendor’s assistant only', 'cmp.r4b': 'Open CLI — any AI agent can manage your tasks',
      'cmp.r5': 'Review', 'cmp.r5a': 'Charts and raw numbers', 'cmp.r5b': 'Narrative weekly report on your own baseline',
      'cmp.r6': 'Price', 'cmp.r6a': 'Limited free tier + subscription', 'cmp.r6b': 'Completely free, MIT open source',
      'cmp.note': 'Cloud sync isn’t bad — it just shouldn’t be the only option. Your data deserves a third home.',
      'prv.eyebrow': 'Data ownership',
      'prv.h': 'Your data, seen only by you',
      'prv.lede': 'No server, nothing to leak; no account, no profiling. A backup file is the whole dataset — copy it and you have migrated.',
      'prv1.h': 'Encrypted local storage', 'prv1.p': 'Tasks, focus records and stats live in one encrypted database on your device. Nothing collected, nothing uploaded.',
      'prv2.h': 'Tiered auto backups', 'prv2.p': 'Frequent recent snapshots plus sparser older anchors, deduplicated; snapshots taken before risky actions.',
      'prv3.h': 'Leave anytime', 'prv3.p': 'Export spreadsheets in one click, generate share cards. If you ever leave, delete the app — the files stay yours.',
      'dl.eyebrow': 'Get started',
      'dl.h': 'Download PickDone, double-click, done',
      'dl.lede': 'The installer updates itself in-app; the portable build is a single file that even runs from a USB stick.',
      'dl.c1h': 'Installer', 'dl.c1p': 'Standard installation with in-app auto-updates. Best for most users.', 'dl.go': 'Download',
      'dl.c2h': 'Portable', 'dl.c2p': 'No installation, nothing written to the registry. Update manually.', 'dl.go2': 'Download',
      'dl.sys1': 'Requires Windows 10 / 11 (64-bit).', 'dl.sys2': 'View all releases & changelog →',
      'dl.tut': 'After installing, start with “Quick start: your first pomodoro” →',
      'dl.sha': 'Every release ships with a SHA256SUMS.txt checksum file — verify the installer yourself.',
      'faq.eyebrow': 'FAQ', 'faq.h': 'You might be wondering',
      'q1.q': 'Is PickDone an offline app?',
      'q1.a': 'Yes — offline-first is a design choice, not a limitation. There is no account system and no cloud servers: tasks, focus records and stats live in an encrypted local database. Networking is used only for update checks and can be disabled in settings.',
      'q2.q': 'What about my data if I change computers?',
      'q2.a': 'Your entire dataset is one database file plus an auto-backup folder. Install the app on the new machine and copy the files over — there’s also one-click restore from a backup.',
      'q3.q': 'It’s free — how is it sustained?',
      'q3.a': 'PickDone is open source under MIT. No paywalls, no ads, all code public. If it helps you, a GitHub Star is the best support.',
      'q4.q': 'Is macOS / Linux supported?',
      'q4.a': 'The current release supports Windows 10 / 11. macOS and Linux are on the roadmap — file an issue on GitHub to help prioritize, or join the porting effort.',
      'q5.q': 'My OS already ships with a timer. Why PickDone?',
      'q5.a': 'A system clock is a timer; PickDone is a workflow: pomodoros bind to tasks, time is booked to concrete items, and the 24-hour timeline plus narrative weekly report close the loop. Timing is just the shallowest layer.',
      'q6.q': 'How does “let AI manage my tasks” actually work?',
      'q6.a': 'PickDone ships a CLI where every command supports JSON output. Register it as a tool in Claude, Cursor or any agent, then just say “add the weekly report to Friday and remind me” — the agent calls the CLI. You and the AI share one local store, no cloud sync.',
      'fin.h': 'From today on,<br>keep focus <span class="hl">in your own hands</span>',
      'fin.p': 'Free, open source, fully offline — running in 5 minutes.',
      'fin.cta': 'Download free', 'fin.cta2': 'GitHub repository',
      'foot.tag': 'Plan, focus, review — one seamless flow for to-dos, schedule and pomodoro. Your data belongs to you.',
      'foot.c1': 'Product', 'foot.c2a': 'Releases', 'foot.c2b': 'Issues', 'foot.c2c': 'Contributing',
      'foot.c3': 'License', 'foot.c3a': 'Security', 'foot.c3b': 'Changelog', 'foot.c3d': 'Asset credits',
      'foot.made': 'Built with Electron + Vue3 · your data stays on your machine',
      'nav.docs': 'Docs', 'nav.blog': 'Updates',
      'p2.b4': '<b>Achievement badges</b>: milestones and streaks, worth recording',
      'q7.q': 'How do I make journaling a habit that sticks?',
      'q7.a': 'PickDone is built for exactly that failure mode: the tray icon keeps it one click away, desktop widgets keep your list in view, a global shortcut captures a thought in a second, the float window keeps focus visible — and the weekly narrative review pulls you back to see how far you’ve come.',
      _title: 'PickDone — plan, focus, review, all in one flow',
      _htmlLang: 'en',
      'd.h1': 'Documentation', 'd.lede': 'From install to power use — five minutes to make PickDone yours. Deeper material lives in the GitHub repo.',
      'd.side.quick': 'Getting started', 'd.side.features': 'Features guide', 'd.side.cli': 'CLI reference', 'd.side.data': 'Data & privacy', 'd.side.trouble': 'Troubleshooting',
      'd.q.h': 'Getting started',
      'd.q.s1t': 'Download & install', 'd.q.s1p': 'Grab the installer (with in-app auto-updates) or the portable build (single file, no install) from GitHub Releases. Windows 10 / 11 64-bit required.',
      'd.q.s2t': 'First-run setup', 'd.q.s2p': 'The wizard walks you through language, color mode and default list in about 30 seconds — changeable anytime in Settings.',
      'd.q.s3t': 'Capture your first task', 'd.q.s3p': 'Type in the quick-add bar and press Enter. Or summon the mini input bar with a global shortcut from anywhere — capture a thought in a second.',
      'd.q.s4t': 'Start your first pomodoro', 'd.q.s4p': 'Click the tomato button next to a task to start focusing. The float window reports progress in the corner; the time is booked to that task automatically.',
      'd.q.s5t': 'Read your review', 'd.q.s5p': 'Open “Insights” in the sidebar: a narrative weekly report tells you how the week went, and the heatmap records every streak.',
      'd.f.h': 'Features guide',
      'd.f.today': 'Today list', 'd.f.todayp': 'Switch between list and Eisenhower matrix in one click; unfinished items from yesterday can be carried over with one tap; completions are undoable for 5 seconds.',
      'd.f.cal': 'Calendar', 'd.f.calp': 'Month / week / time-grid views with lunar dates and holidays; drag a task onto a day to schedule it; repeats support lunar cycles and holiday skipping.',
      'd.f.tag': 'Categories, tags & filters', 'd.f.tagp': 'Group with categories, mark with tags, and save frequently used filters (like “due today & high priority”) to the sidebar for one-click access.',
      'd.f.widget': 'Desktop widgets & float window', 'd.f.widgetp': 'Pin translucent calendar and to-do cards onto your desktop; the float window reports focus progress from the corner. Toggle them anytime.',
      'd.f.backup': 'Auto backup & restore', 'd.f.backupp': 'Backups run automatically — deduplicated and tiered (denser recently, sparser for the past) — with snapshots before risky actions; restore from any backup in Settings.',
      'd.cli.h': 'CLI reference',
      'd.cli.p': 'Every core capability is exposed as a CLI primitive — one shared interface for you and your AI. Commands support structured output so scripts and assistants (Claude, Cursor, …) can call them directly. Full manual lives in the repo.',
      'd.cli.t1h': 'Command', 'd.cli.t2h': 'What it does', 'd.cli.t3h': 'Example',
      'd.cli.c1': 'Overview today', 'd.cli.c1e': 'todo-cli overview',
      'd.cli.c2': 'List tasks', 'd.cli.c2e': 'todo-cli list --undone',
      'd.cli.c3': 'Add a task', 'd.cli.c3e': 'todo-cli add "Weekly report" --date tomorrow',
      'd.cli.c4': 'Complete / undo', 'd.cli.c4e': 'todo-cli done "report"',
      'd.cli.c5': 'Stats summary', 'd.cli.c5e': 'todo-cli stats',
      'd.cli.more': 'These are the everyday subset; 20+ commands cover tasks, subtasks, stats and the recycle bin. See the CLI manual in the GitHub repo for the full list.',
      'd.data.h': 'Data & privacy',
      'd.data.s1t': 'Where data lives', 'd.data.s1p': 'Everything is one encrypted local database file (todos.db in the app data folder) plus an auto-backup folder next to it. Nothing collected, nothing uploaded.',
      'd.data.s2t': 'How backup works', 'd.data.s2p': 'Automatic and zero-config; a backup file is the complete dataset — copying it to another machine is a full migration.',
      'd.data.s3t': 'How export works', 'd.data.s3p': 'Export spreadsheets (Excel) and PDF; stats and calendar views generate shareable images. Your data always leaves with you.',
      'd.data.s4t': 'Does uninstall lose data?', 'd.data.s4p': 'No. Uninstalling never deletes the data folder; as long as the database file exists, a fresh install picks up right where you left off.',
      'd.t.h': 'Troubleshooting',
      'd.t.s1t': 'Blank screen / unresponsive', 'd.t.s1p': 'Quit fully from the tray icon and relaunch. If it persists, file a GitHub issue with the log attached.',
      'd.t.s2t': 'Deleted something by mistake', 'd.t.s2p': 'Completions are undoable for 5 seconds; deletes go to the recycle bin; emptying the bin takes a snapshot first, so restore from backup is always possible.',
      'd.t.s3t': 'How to report a problem', 'd.t.s3p': 'GitHub Issues is the only official channel — attach version and logs for a faster reply. Feature ideas are equally welcome.',
      'd.back': '← Back to home',
      'b.h1': 'Notes & releases', 'b.lede': 'First public release coming soon — ideas, decisions and release notes will all land here.',
      'b.cl.h': 'Changelog',
      'b.cl.date': 'Coming soon',
      'b.cl.i1': '<b>Full feature debut</b>: today list (list / quadrant / card deck), calendar (lunar + holidays + drag to reschedule), full pomodoro workflow, narrative review',
      'b.cl.i2': '<b>Built-in AI CLI</b>: 20+ commands, all with --json — register them as Claude / Cursor tools and let AI manage tasks for you',
      'b.cl.i3': '<b>Desktop experience</b>: focus float window, desktop widgets, global shortcuts, dark mode, bilingual UI, automatic backups',
      'b.mtag': 'Methodology',
      'b.m1t': 'Pomodoro basics: why 25 minutes',
      'b.m1p1': 'The origin of this method is anything but solemn. In the late 1980s, Francesco Cirillo, a university student in Rome, sat at his desk unable to get into studying — a moment every student knows. He grabbed a tomato-shaped kitchen timer and made a bet with himself: could he focus for just this little while? That bet grew into the Pomodoro Technique — written into a book, translated into many languages, and now one of the most widely used focus methods in the world.',
      'b.m1p2': 'Why 25 minutes exactly? It was the number Cirillo arrived at through trial and error. It is long enough to push through the initial resistance and get into the work, yet short enough that you cannot honestly refuse — however hard the task, agreeing to do 25 minutes first is always easy. But more important than the number are the other two steps: before each pomodoro, you must state what this one is for; after it ends, you must record it. The timer is only the shell — the real core is turning attention into something observable and countable.',
      'b.m1h1': 'The original method has five steps — not just a timer',
      'b.m1p3': 'Few people know that Cirillo’s original method is a complete loop, of which the timer is only one part. The flow: sit down in the morning, list what needs doing today, and estimate how many pomodoros each task will take. Through the day, work and note how many each task actually used. Before you finish, put estimate and actual side by side and settle the account. That moment is where the method pays off — you not only learn how many pomodoros you focused today, but how good your sense of time actually is. After a few weeks your estimates sharpen; then “this will take two pomodoros” stops being a feeling and becomes experience.',
      'b.m1h2': 'The full life cycle of one pomodoro',
      'b.m1p4': 'Before: pick one thing from the list. If it estimates beyond five or six pomodoros, split it first — until one or two pomodoros can produce a visible result. Then define the finish line for this pomodoro: “write sections one and two of chapter two,” not “work on the thesis.” You cannot focus on a thesis; you can focus on two sections.',
      'b.m1p5': 'During: hold two boundaries. External interruptions — messages, calls, colleagues — postpone whatever can be postponed; flip the phone face-down. Internal interruptions are more common and sneakier: mid-focus you suddenly remember “need laundry detergent” or “should reply to that message.” The original remedy is plain: jot it on a sheet of paper within reach, then come back — don’t let it carry your attention away. Only one rule is absolute: if you truly get derailed, the pomodoro is void and does not count. Voiding is not a loss — it protects the value of the unit “one pomodoro = one stretch of complete focus.” Once broken pomodoros are allowed to count, the ledger stops meaning anything.',
      'b.m1p6': 'When the bell rings: stop even if it feels good. Spend the pause on a quick review — what was the thread of that session, where does the next one pick up. Cirillo calls this “overlearning,” and it means the next pomodoro needs no warm-up. Then really rest: stand up, get water, look out the window. Rest is not a reward; it is half the process. After four or five pomodoros in a row, take a long break of 15–30 minutes.',
      'b.m1h3': 'The four most common mistakes',
      'b.m1p7': 'First, using it as a pure countdown: interruptions ignored, nothing recorded — the pomodoro degenerates into a timer. Second, greed: twelve pomodoros on day one, collapsed by afternoon, method abandoned by day two. Third, treating it as attendance: counting quantity, ignoring content — four pomodoros of email are not four pomodoros of proposal. Fourth, scrolling your phone during breaks: the brain never gets a real gap, the next pomodoro gets worse, and the verdict becomes “this doesn’t work for me.”',
      'b.m1p8': 'Start with 4 pomodoros a day; do not be greedy. Any timer will do — a kitchen timer is the most faithful to the original. Keep it up for a week or two and you gain a number more valuable than any productivity trick: your real capacity, how many pomodoros a day you actually do. With it, planning stops being wishful thinking: before you promise “Friday,” you know how many pomodoros Thursday has to hold.',
      'b.m1r1': 'Francesco Cirillo, “The Pomodoro Technique: The Acclaimed Time-Management System” (first ed. 2006)',
      'b.m1r2': 'Wikipedia: Pomodoro Technique',
      'b.m2t': 'The four quadrants in practice: why “important, not urgent” always loses',
      'b.m2p1': 'In 1954, at the Second Assembly of the World Council of Churches in Evanston, Illinois, Dwight D. Eisenhower quoted a line a university president had given him. It captured precisely the predicament he could not escape as Allied commander and as president, and it has been quoted countless times since:',
      'b.m2q': '“I have two kinds of problems: the urgent and the important. The urgent are not important, and the important are never urgent.”',
      'b.m2qc': '— Dwight D. Eisenhower, quoting J. Roscoe Miller, 1954',
      'b.m2p2': 'Three decades later Stephen Covey turned that line into the famous four-quadrant matrix: sort tasks along two axes — important / urgent. The method takes five minutes to learn, but let us tell it fully — the four boxes are really four different actions:',
      'b.m2h1': 'Four boxes, four actions',
      'b.m2p3': 'Box one, “important and urgent” — crises, imminent deadlines, genuine surprises. The action here is to handle; no agonizing. The difference between good and poor performers: the good have a full but stable box one; the poor live in it. Box two, “important, not urgent” — exercise, review, deep learning, relationships, significant but unhurried projects. The action is to schedule: put them on the calendar like appointments. Box three, “urgent, unimportant” — most messages, someone else’s last-minute asks, meetings that could be emails. The action is to let go: delegate what you can, decline what you can, compress meetings into messages. Box four, “neither” — mindless scrolling, pure drift. The action is to delete, guilt-free.',
      'b.m2p4': 'Most people stop at “sorting,” but the real gain happens between the boxes: push box three away, delete box four, and what you save is not “free time” — it is block time you can feed to box two. Sorting is the means; reclaiming time is the point.',
      'b.m2h2': 'Why “important, not urgent” always loses',
      'b.m2p5': 'The second quadrant carries two built-in disadvantages. First, it has no deadline. Urgent things arrive with a “now” pressure; important things carry only an “eventually” haze — nobody pings you on Friday that “review is due next week.” Second, its payoff is delayed. A replied message feels instantly clean; a workout shows up weeks later. Box three gives immediate completion; box two pays in the slow currency. A day driven by feeling naturally tilts toward the urgent — not a character flaw, just everyone’s factory settings. Which is why it must be protected by structure — written into the calendar, immovable as an appointment — and can never rely on “when there’s free time,” because that day never comes.',
      'b.m2h3': 'Two subtle mistakes',
      'b.m2p6': 'Mistake one: turning the sorting itself into work — half an hour drawing boxes, tasks shuffled between quadrants, and not one real second-quadrant item moved. The matrix is a judgment tool, not labor. Mistake two: thinking the matrix is a daily table. Covey’s intent was a weekly glance, not daily classification: this week, did your time actually land in box two? Sorting should cost minutes; sorting that costs more is procrastination in disguise.',
      'b.m2p7': 'Only two rules in practice: every morning, spend two minutes sorting today’s tasks by important / urgent — paper, a spreadsheet, any tool will do; and every day, reserve a block for the second quadrant and put it on the calendar like an appointment. Run a one-week experiment: record only one thing — did that second-quadrant block actually happen each day? A week later, the answer is usually sharper than expected — and that sharpness is where change begins. One test: at the end of the week, did your time actually land in the second quadrant?',
      'b.m2r1': 'Eisenhower Presidential Library on the origin of the quote: eisenhowerlibrary.gov',
      'b.m2r2': 'Stephen R. Covey, “The 7 Habits of Highly Effective People” (1989), Habit 3: Put First Things First',
      'b.m3t': 'Weekly reviews, in three lines',
      'b.m3p1': 'The review is not a new invention. Software teams have kept a ritual for decades called the retrospective: at the end of every iteration the whole team stops and answers three questions — what went well, what did not, what will we change next time. One rule above all: the discussion must land on the one concrete change for next time. Norman Kerth, who wrote the book on retrospectives, laid down a principle that teams have since put on their walls:',
      'b.m3q': '“Regardless of what we discover, we understand and truly believe that everyone did the best job they could, given what they knew at the time, their skills and abilities, the resources, and the situation at hand.”',
      'b.m3qc': '— Norman Kerth, Project Retrospectives (2001)',
      'b.m3h1': 'The two most common ways reviews die',
      'b.m3p3': 'Personal weekly reviews die the same ways. Death one: the attendance sheet — “23 tasks done, 5-day streak.” The problem with numbers is not that they are false but that they have no comparison and no exit — they record “how much” and never answer “so what.” Death two: the self-criticism — “procrastinated again, awful state, next week I’ll be more disciplined.” The problem is the direction: a review should point at systems — which process, environment, or habit to adjust — not at personality — I’m lazy, I procrastinate. Reviews that blame systems produce changes; reviews that blame the self produce guilt, and guilt never survives Tuesday. Both deaths share one root: they dodge the three questions a review must actually answer.',
      'b.m3h2': 'Three questions, one layer deeper each time',
      'b.m3p4': 'Question one, facts: what actually happened this week? Facts, not adjectives — “two versions drafted, three pomodoros, two interruptions” is a fact; “this week was inefficient” is a feeling. Feelings cannot be improved; facts can. Question two, comparison: better or worse than before? This one hides a premise — a baseline. Without one, “good” is just today’s mood: in a bad state everything looks like decline; in a good state everything looks like progress. A baseline need not be fancy — last week’s completion count, last month’s focus hours, any stable reference — the point is to compare with yourself, not with anyone else. Question three, action: which one thing will you change next week? One thing only, concrete enough to execute — “be more focused” is not a change; “no email before 10 a.m., one hour on the most important task first” is. The value of a review lives entirely in that last line.',
      'b.m3h3': 'What one page looks like',
      'b.m3p5': 'A fictional example. Xiao Zhou runs his review on Friday at 4 p.m., flips through the week’s records, and writes three lines: This week — two drafts of the proposal done (estimated four pomodoros, took five), two workouts, Wednesday afternoon shredded by three ad-hoc meetings. Compared to last week — focus better (interruptions down from five to two), one workout less, Wednesday’s meetings ate the planned deep-work time. One change next week — Wednesday afternoon becomes a no-meeting block; deep work does not move. Three lines, under five minutes. Monday morning he puts “Wednesday: no meetings” on the calendar — only now is the review complete. And whether that “one thing” actually happens? That is question one of next week’s review.',
      'b.m3p6': 'Does writing things down actually help? Someone studied it seriously. Di Stefano and colleagues at Harvard Business School ran an experiment: one group of employees spent the last 15 minutes of each day reflecting on what they had learned; another group simply worked 15 minutes more. The reflecting group’s subsequent performance was more than 20 percent higher — what the researchers called “learning by thinking”: same experiences, but those who looked at them once more learned more.',
      'b.m3p7': 'It fits on one page: pick a fixed time each week, spend 15 minutes going over the week’s records, and write three lines — what actually happened, whether it was better or worse than before, and the one thing you will change next week. Two cautions: needing more than a page usually means you are writing prose, not reviewing; and with no real records to flip through, a review decays into grading your feelings — so the only requirement is that facts come from real records. Paper, a spreadsheet, or an app, it does not matter.',
      'b.m3r1': 'Norman L. Kerth, “Project Retrospectives: A Handbook for Team Reviews” (2001)',
      'b.m3r2': 'Di Stefano, Gino, Pisano & Staats, “Learning by Thinking: How Reflection Aids Performance” (Harvard Business School Working Paper, 2014)',
      'b.m4t': 'Timeline review: where did the day actually go',
      'b.m4p1': '“Where did the day go?” — humanity has been asking this question for a century. As early as the 1930s, researchers answered it with “time diaries”: asking people to record, like bookkeeping, where each stretch of time actually went. In the 1970s the psychologist Mihaly Csikszentmihalyi pushed the approach to its extreme — he gave subjects pagers that beeped at random moments, and at each beep they noted what they were doing and how they felt. With this method, later known as the Experience Sampling Method, he discovered the famous concept of flow.',
      'b.m4p2': 'That research tradition leaves behind one plain lesson: memory is unreliable; records are not. Memory gets rewritten by feeling — a frantic day feels productive in hindsight, an idle day feels long and hollow, when in fact the frantic one may have moved nothing forward. Only the record made that day does not lie. That is the entire principle of the timeline review: restore the day into a visible track where every minute sits, and let the track speak — no appeal for memory.',
      'b.m4h1': 'Lay the day out on one track',
      'b.m4p3': 'The method is simple: lay the day out on a 24-hour timeline. On the left, the fact — each focus block colored by its task category, so what you actually did is legible at a glance; on the right, the plan — how the day was meant to go. With plan and fact side by side, drift needs no analysis: the schedule says “two hours of deep work in the morning,” the track shows 25 minutes colored — the gap is the problem. Meetings, commutes, things that got inserted — add them afterwards so the track has no holes; a holed track only gives feeling the microphone again.',
      'b.m4h2': 'Keep it up two weeks and three patterns appear',
      'b.m4p4': 'First, peak hours. Most people’s focus blocks cluster in one or two hours of the day — and you probably cannot guess which two. Once you see your track, moving the most important tasks into that window is the single highest-return adjustment available. Second, fragmentation: the afternoon track is cut into slivers by meetings, and the slivers only fit messages and drifting. The problem is not the meetings themselves; it is that the potentially whole time between them got handed to whatever mattered least. Third, false busyness: a day that felt frantic shows a silent track — the moments where emotion and fact disagree are exactly where review pays most, because they force the question: that busyness — what was it busy with, exactly?',
      'b.m4p5': 'The time diarist Laura Vanderkam likes to say that people believe they know where their time goes — until they see the record, and the two are usually far apart. The distance between them is the price of living by feel.',
      'b.m4p6': 'Finally, the attitude: the track is not a report card. Kerth’s retrospective principle applies here too — given what you knew at the time, you did your best. The point of seeing the track is not to scold yourself for “another wasted day,” but to lay the next day’s blocks a little closer to the shape you want. You cannot manage what you cannot see — and once you can see, the rest is negotiable.',
      'b.m4r1': 'Csikszentmihalyi & Larson, “Validating the Experience Sampling Method” (1987)',
      'b.m4r2': 'Laura Vanderkam, “168 Hours: You Have More Time Than You Think” (2010)',
      'b.p1tag': 'Dev notes', 'b.p1date': 'Sep 1, 2026',
      'b.p1t': 'Why I built a to-do app that never phones home',
      'b.p1p1': 'The market doesn’t lack to-do apps; it lacks to-do apps that dare to keep data on your machine. Mainstream products default to cloud: register, log in, sync. Convenient? Yes. The cost? Your tasks and focus records live on someone else’s servers, half-broken when offline, gated when you try to leave.',
      'b.p1p2': 'I’m not against cloud sync — I’m against having no other option. PickDone is that other option: no account, no cloud, one encrypted local file. Backup means migration; deleting the app means leaving. It’s free and open source — compile it yourself if you like, and walk away anytime.',
      'b.p1p3': 'If you’re tired of registering an account just to write down a task, give PickDone a try.',
      'b.p2tag': 'Dev notes', 'b.p2date': 'Sep 1, 2026',
      'b.p2t': 'Designing a CLI your AI can use',
      'b.p2p1': 'PickDone ships a CLI, and the original motive was selfish: I wanted my AI assistant to manage my tasks. It turned out to matter far beyond that — when every capability is a command-line primitive with structured output, human and AI share the same interface. No bespoke API, no handing over your data.',
      'b.p2p2': 'Three rules held throughout: every capability is an independently callable primitive with structured output so agents can act on JSON; human and AI read and write the same local store, so there is nothing to sync; and dangerous operations go through the same confirm-and-undo path as the UI — the AI cannot bypass the guardrails.',
      'b.p2p3': '“Add the weekly report to Friday and remind me a day ahead.” That sentence actually works now. It’s the thing I love most about this project.',
      'b.p3tag': 'Release', 'b.p3date': 'Coming soon',
      'b.p3t': '0.1.0: what’s shipping in the first public release',
      'b.p3p1': 'The first public release includes: the today list (list / Eisenhower matrix), the calendar (lunar dates, holidays, drag to reschedule), the full pomodoro workflow (focus cycles, float window, white noise, 24-hour timeline), the narrative review (weekly report, heatmap, achievement badges, share cards), subtasks and multiple reminders, smart repeats, auto backups, desktop widgets, global shortcuts, dark mode, bilingual UI — and the CLI for your AI.',
      'b.p3p2': 'Free, open source, Windows 10 / 11. Once the release date is set, it will be announced here and on GitHub Releases.',
      'dc.n1': 'Getting started', 'dc.n2': 'How-to guide', 'dc.n3': 'CLI reference', 'dc.n4': 'Data & safety', 'dc.n5': 'FAQ',
      'dc.next': 'Keep going', 'fq.more': 'More questions → full FAQ & troubleshooting',
      'mk.date': 'Today · Tue, Sep 2', 'mk.sub': '5 tasks · 2 done', 'mk.dark': 'Dark', 'mk.light': 'Light',
      'mk.t1': 'Finish lab report', 'mk.t2': 'Write weekly report', 'mk.t3': 'Clean desktop & inbox', 'mk.t4': 'Call mom',
      'mk.today': 'Today', 'mk.done': 'Done', 'mk.prio': 'High', 'mk.sub1': '1/3 subtasks', 'mk.tag': '#Work · 2 pomodoros',
      'mk.focus': 'Focusing', 'mk.focusTask': 'Prepare quarterly review', 'mk.harvest': '8/10', 'mk.qa': 'What needs doing? Press Enter to capture',
      'gs.h1': 'PickDone documentation', 'gs.lede': 'From install to power use, organized as “tutorial → how-to → reference → explanation”. Every page answers exactly one question.',
      'gs.install.h': 'Installation',
      'gs.install.p': 'PickDone ships in two builds: the <b>installer</b> (PickDone-Setup, standard install with in-app auto-updates) and the <b>portable build</b> (PickDone-Portable, a single file that runs anywhere, updated by re-downloading). Both are feature-identical.',
      'gs.install.req': 'Requires Windows 10 / 11 (64-bit). Uninstalling never deletes your data folder.',
      'gs.tut.h': 'Quick start: your first pomodoro',
      'gs.tut.s1t': '1 · Create a task', 'gs.tut.s1p': 'Type into the quick-add bar and press Enter. Open the editor to add notes, priority, subtasks or a pomodoro estimate — or skip all of it; capturing is what matters.',
      'gs.tut.s2t': '2 · Schedule it', 'gs.tut.s2p': 'New tasks land in the todo box. Drag one onto a calendar day or set a date in the editor — it now shows on your Today list.',
      'gs.tut.s3t': '3 · Focus', 'gs.tut.s3p': 'Click the tomato button next to the task to start focusing: the float window reports progress, white noise optional. Ending early? Click Abandon, optionally add a reason — the minutes you focused still count.',
      'gs.tut.s4t': '4 · Complete and undo', 'gs.tut.s4p': 'Check it off when done. Mis-clicked? Hit “Undo” in the toast within 5 seconds, or press Ctrl+Z.',
      'gs.tut.s5t': '5 · Read your review', 'gs.tut.s5p': 'Open Insights: a narrative weekly report tells you how the week went, and the heatmap gains a new cell. That is the whole loop — plan, focus, review.',
      'gs.ui.h': 'A tour of the app',
      'gs.ui.today': 'Today', 'gs.ui.todayp': 'Your home base: carried over, today and completed groups; the 24-hour focus track on the left shows every session at a glance.',
      'gs.ui.calendar': 'Calendar', 'gs.ui.calendarp': 'Month / week / time-grid views with lunar dates and holidays; drag to reschedule.',
      'gs.ui.todobox': 'Todo box', 'gs.ui.todoboxp': 'Where unscheduled tasks wait until you slide them into a real day.',
      'gs.ui.done': 'Completed', 'gs.ui.donep': 'A wall of achievements grouped by completion time — everything you’ve finished, in one place.',
      'gs.ui.insights': 'Insights', 'gs.ui.insightsp': 'Narrative reports, heatmap, badges and share cards, all built from your own data.',
      'gs.map.h': 'Keep reading',
      'gs.map.guide': 'How-to guide', 'gs.map.guidep': 'Task-oriented: organizing, repeats, focus, reviews, desktop experience.',
      'gs.map.cli': 'CLI reference', 'gs.map.clip': 'Every command and convention — the manual for humans and AI agents.',
      'gs.map.data': 'Data & safety', 'gs.map.datap': 'Where data lives, backups, migration, and the network statement.',
      'gs.map.faq': 'FAQ', 'gs.map.faqp': 'Usage questions, troubleshooting, and how to report problems.',
      'gd.h1': 'How-to guide', 'gd.lede': 'Goal-oriented manual: find what you want to do, follow the steps.',
      'gd.tasks.h': 'Managing tasks',
      'gd.tasks.createt': 'Create & edit', 'gd.tasks.createp': 'Enter in the quick-add bar to create. Click a task to open the editor: title, notes, date, category, priority (high / low) and deadline.',
      'gd.tasks.subt': 'Subtasks', 'gd.tasks.subp': 'Break work into steps in the editor; progress shows as “done / total”. Completing a parent checks all subtasks by default.',
      'gd.tasks.priot': 'Priority & the matrix', 'gd.tasks.priop': 'Priority is high / low and stays in sync with the Eisenhower matrix’s “important” axis; the Today page toggles between list and matrix.',
      'gd.tasks.movet': 'Reschedule & reorder', 'gd.tasks.movep': 'Drag a task onto any calendar day to reschedule; the Today list supports manual ordering that sticks.',
      'gd.org.h': 'Organizing: categories, tags & filters',
      'gd.org.catt': 'Categories', 'gd.org.catp': 'Manage categories in the sidebar; each task belongs to one, and its color carries through the timeline and review charts.',
      'gd.org.tagt': 'Tags', 'gd.org.tagp': 'Write #tag in the notes and it is recognized automatically; the sidebar aggregates counts per tag.',
      'gd.org.filtert': 'Filters', 'gd.org.filterp': 'Save frequently used conditions (like “due today & high priority”) as filters pinned to the sidebar.',
      'gd.org.inboxt': 'Todo box & completed', 'gd.org.inboxp': 'Undated tasks live in the box; completed ones flow into “Completed”, grouped by when they happened.',
      'gd.sched.h': 'Schedule & repeats',
      'gd.sched.calt': 'Calendar views', 'gd.sched.calp': 'Month / week / time-grid; click “today” to jump back; hover truncated events for the full title.',
      'gd.sched.dragt': 'Drag to reschedule', 'gd.sched.dragp': 'Drop a task on any day cell to reschedule — works in week and month views.',
      'gd.sched.repeatt': 'Repeating tasks', 'gd.sched.repeatp': 'Day / week / month / year patterns, lunar repeats (birthdays, solar terms) and holiday skipping; completing one instance auto-renews the next.',
      'gd.sched.remindt': 'Multiple reminders', 'gd.sched.remindp': 'Set several reminder times per task (e.g. a day ahead plus that morning) without overwriting each other.',
      'gd.focus.h': 'Pomodoro focus',
      'gd.focus.startt': 'Start & cycle', 'gd.focus.startp': 'Click the tomato button to start a focus; a break follows automatically, and both durations are yours to set in Settings.',
      'gd.focus.floatt': 'Float window & white noise', 'gd.focus.floatp': 'During focus the float window sits in the screen corner with the countdown and task name; 10 real-recording noise tracks and completion chimes are built in, previewable in Settings.',
      'gd.focus.giveupt': 'Abandon & back-fill', 'gd.focus.giveupp': 'Abandon a run and optionally note why — focused minutes still count. Forgot to start one? Right-click a task to log a session you forgot to start.',
      'gd.focus.timelinet': '24-hour timeline', 'gd.focus.timelinep': 'The track on the Today page records every focus and rest block (rest in orange); click to inspect or re-link tasks.',
      'gd.rev.h': 'Weekly review',
      'gd.rev.ranget': 'Switch periods', 'gd.rev.rangep': 'This week / last week / month / last month / 7 / 30 days in one click, plus custom ranges up to 366 days.',
      'gd.rev.storyt': 'Narrative report', 'gd.rev.storyp': 'Every review opens with a summary based on your own baseline: how much you finished and focused, harder or softer than usual — story first, numbers second.',
      'gd.rev.heat': 'Heatmap & badges', 'gd.rev.heatp': 'A GitHub-style heatmap records every completion; milestones and streaks light up achievement badges.',
      'gd.rev.share': 'Share cards', 'gd.rev.sharep': 'Turn this week’s results into a shareable image in one click.',
      'gd.desk.h': 'Desktop experience',
      'gd.desk.shortcut': 'Global shortcuts', 'gd.desk.shortcutp': 'Summon the mini input bar from anywhere and capture a thought in a second; keybindings are viewable and editable in Settings.',
      'gd.desk.widget': 'Desktop widgets', 'gd.desk.widgetp': 'Pin translucent calendar and to-do cards onto your desktop — today’s plan visible without opening the main window.',
      'gd.desk.dark': 'Dark mode & bilingual', 'gd.desk.darkp': 'Follow the system or switch manually; toggle Chinese / English anytime without touching your data.',
      'cr.h1': 'CLI reference', 'cr.lede': 'Every core capability of PickDone is exposed as a CLI primitive — the same interface for humans and AI agents. This page mirrors the manual in the repo; all examples run as-is.',
      'cr.pre.h': 'Prerequisites',
      'cr.pre.p1': 'Node.js ≥ 20 required. Commands run from the repo’s todo-app directory:',
      'cr.pre.p2': 'For AI agents always pass --json: the response is an {ok, command, data} envelope, and write commands add a next field suggesting follow-ups.',
      'cr.conv.h': 'Conventions',
      'cr.conv.hdate': 'Date arguments',
      'cr.conv.herr': 'Errors & exit codes',
      'cr.conv.hlimit': 'Returns & cascading',
      'cr.conv.haudit': 'Audit trail',
      'cr.sync': 'While the app is running, CLI writes sync into the UI automatically (within ~2 seconds) — no restart needed.',
      'cr.conv.date': 'Date arguments accept: today / tomorrow / +3d / YYYY-MM-DD / "YYYY-MM-DD HH:mm".',
      'cr.conv.err': 'Errors go to stderr with a non-zero exit code. Common codes: AMBIGUOUS_MATCH (keyword hits multiple tasks — refine the keyword or use the full taskId, never guess), TASK_NOT_FOUND, NEEDS_CONFIRM (risky operation missing confirmation).',
      'cr.conv.limit': 'list / search return at most 200 rows by default (--limit, cap 500). Completing a parent cascades to subtasks by default (--no-sub-cascade to disable).',
      'cr.conv.audit': 'Every write is appended to an audit trail (cli-audit.jsonl in the data folder); query it with log — cite it when reporting “what the AI changed”.',
      'cr.read.h': 'Read commands',
      'cr.write.h': 'Write commands',
      'cr.tomato.h': 'Pomodoro commands',
      'cr.ai.h': 'Hook up an AI assistant',
      'cr.ai.p': 'Register the CLI as a tool in Claude, Cursor or any agent and it can manage your tasks directly. A ready-made skill description ships in the repo (todo-app/cli/SKILL.md) for assistant configuration. Human and agent read the same local store — there is no second copy to sync.',
      'cr.t.h': 'Command tables',
      'cr.t.desc': 'What it does',
      'cr.t.ex': 'Example',
      'cr.r1': 'Today overview: completion / overdue / undated / recycle counts',
      'cr.r2': 'List tasks: --all|today|tomorrow|week|overdue|future, --done|--undone, --category, --keyword, --limit',
      'cr.r3': 'Search all tasks by keyword across content and notes',
      'cr.r4': 'Full fields of one task (by taskId or keyword)',
      'cr.r5': 'List categories (id and name)',
      'cr.r6': 'Stats: daily completions + focus minutes (last 7 days by default; --from/--to for a range)',
      'cr.r7': 'List the recycle bin',
      'cr.r8': 'Environment self-check (data folder, dependencies, config)',
      'cr.r9': 'Audit trail of external writes (--n rows, --action filter)',
      'cr.w1': 'Add a task: --desc, --date, --reminder, --category, --difficulty',
      'cr.w2': 'Complete a task (writes completedAt)',
      'cr.w3': 'Undo a completion',
      'cr.w4': 'Edit: --content new title, --desc, --date, --reminder, --category',
      'cr.w5': 'Delete (to recycle bin, restorable)',
      'cr.w6': 'Restore from the recycle bin',
      'cr.w7': 'One-command migration from other apps: dida365 / TickTick / Todoist backup CSV; preview with --dry-run, duplicates auto-skipped',
      'cr.purge.warn': '<b>purge is the only irreversible operation in this interface.</b> Before emptying the bin: run <span class="code-inline">purge --dry-run</span> and review the list → get explicit user confirmation → execute with <span class="code-inline">--yes</span>. All three, no exceptions.',
      'cr.t1': 'Start focus (--task to attach, --minutes to customize)',
      'cr.t2': 'Stop / abandon (books focused minutes by default; --reason to note why)',
      'cr.t3': 'Re-link or clear the attached task of a running pomodoro (--none)',
      'cr.t4': 'Check pomodoro state (countdown / attached task / pomodoros completed today)',
      'cr.e1': 'todo-cli overview --json',
      'cr.e2': 'todo-cli list today --undone --json',
      'cr.e3': 'todo-cli search "report" --json',
      'cr.e4': 'todo-cli get "weekly report" --json',
      'cr.e5': 'todo-cli categories --json',
      'cr.e6': 'todo-cli stats --from 2026-08-01 --json',
      'cr.e7': 'todo-cli recycle --json',
      'cr.e8': 'todo-cli doctor',
      'cr.e9': 'todo-cli log --n 20 --json',
      'cr.we1': 'todo-cli add "Weekly report" --date friday --category Work',
      'cr.we2': 'todo-cli done "report" --json',
      'cr.we3': 'todo-cli undo "report"',
      'cr.we4': 'todo-cli edit "report" --date monday',
      'cr.we5': 'todo-cli delete "old task"',
      'cr.we6': 'todo-cli restore "old task"',
      'cr.we7': 'todo-cli import ticktick-backup.csv --dry-run',
      'cr.te1': 'todo-cli tomato start --task "Weekly report" --json',
      'cr.te2': 'todo-cli tomato stop --reason "interrupted"',
      'cr.te3': 'todo-cli tomato attach "new task"',
      'cr.te4': 'todo-cli tomato status --json',
      'dt.h1': 'Data & safety', 'dt.lede': 'PickDone has no servers. This page explains where your data lives, how it is protected, and how to take it away.',
      'dt.store.h': 'Storage location',
      'dt.store.p': 'All data lives in one encrypted local database file (SQLite, WAL mode) plus an auto-backup folder, under the system app-data directory:',
      'dt.store.l1': 'Database: todos.db',
      'dt.store.l2': 'Auto backups: backups/',
      'dt.store.l3': 'CLI audit trail: cli-audit.jsonl',
      'dt.store.note': 'Encryption means that even someone holding the file cannot read your tasks directly.',
      'dt.backup.h': 'Backup system',
      'dt.backup.p1': 'Backups run automatically, zero-config: content deduplication (identical content isn’t stored twice) plus tiered retention (denser recently, sparser for the past), and a snapshot is taken before risky actions such as emptying the recycle bin.',
      'dt.backup.h2': 'Restoring from a backup',
      'dt.backup.s1': 'Open Settings → Backup;',
      'dt.backup.s2': 'Pick a restore point (each listed with time and notes);',
      'dt.backup.s3': 'Restore in one click — current data is snapshotted first, so a wrong restore costs nothing.',
      'dt.migrate.h': 'Moving machines & reinstalling',
      'dt.migrate.p': 'A backup file is the complete dataset: copy the data folder (database plus backups/) to the same location on the new machine, or point “Restore from backup” at the copied backup. The same applies to reinstalling — uninstalling never deletes the data folder.',
      'dt.export.h': 'Export',
      'dt.export.p': 'Task data exports to Excel spreadsheets and PDF; stats and calendar views generate shareable images. Exported files are yours — put them anywhere.',
      'dt.net.h': 'Network statement',
      'dt.net.p': 'PickDone has no account system and no cloud servers; normal operation is fully offline. The only possible outbound request is checking for app updates (GitHub Releases), switchable to manual in Settings.',
      'fq.h1': 'FAQ', 'fq.lede': 'Usage questions and technical troubleshooting. Can’t find an answer? Ask on GitHub Issues.',
      'fq.use.h': 'Usage',
      'fq.tech.h': 'Troubleshooting',
      'fq.t1q': 'The window is blank or unresponsive.',
      'fq.t1a': 'Quit fully from the tray icon (right-click → Quit) and relaunch. If it keeps happening, file a GitHub Issue with the log attached — usually diagnosed in a single back-and-forth.',
      'fq.t2q': 'A CLI write didn’t show up in the app.',
      'fq.t2a': 'A running app watches the database and refreshes automatically (within ~2 seconds). If nothing changes, confirm the CLI and app point at the same data folder (run doctor), then refresh manually.',
      'fq.t3q': 'How do I verify my backups actually restore?',
      'fq.t3a': 'In Settings → Backup, pick any historical point and do a rehearsal restore: current data is snapshotted first, so rehearsal is free. Recommended before major upgrades.',
      'fq.t4q': 'A global shortcut conflicts with other software.',
      'fq.t4a': 'Shortcuts are editable in Settings. If a combo is rejected by the system, PickDone backs off and retries silently with a one-time notice — pick a non-conflicting combination.',
      'fq.t5q': 'How do I report a bug or suggest a feature?',
      'fq.t5a': 'GitHub Issues is the only official channel: attach version, repro steps and logs for bugs; ideas are welcome and go into roadmap discussion.'
    }
  }

  var currentLang = 'zh'

  function t (key) { return I18N[currentLang][key] }

  function applyLang (lang) {
    if (!I18N[lang]) return
    currentLang = lang
    try { localStorage.setItem(LS_LANG, lang) } catch (e) { /* 私密模式忽略 */ }
    var nodes = document.querySelectorAll('[data-i18n],[data-i18n-html]')
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i]
      var keyHtml = el.getAttribute('data-i18n-html')
      var key = keyHtml || el.getAttribute('data-i18n')
      var val = t(key)
      if (val == null || val === '') continue
      if (keyHtml) el.innerHTML = val; else el.textContent = val
    }
    // 在线 demo 跟随语言重载(iframe 内应用读 appLocale,由 demo 内种子脚本落)
    var demoFrame = document.querySelector('.demo-frame iframe')
    if (demoFrame && demoFrame.src) { demoFrame.src = demoFrame.src }
    // 截图按语言切换
    var imgs = document.querySelectorAll('img[data-shots]')
    for (var j = 0; j < imgs.length; j++) {
      var map = {}
      try { map = JSON.parse(imgs[j].getAttribute('data-shots')) } catch (e) { continue }
      if (map[lang]) imgs[j].src = map[lang]
    }
    document.documentElement.lang = I18N[lang]._htmlLang
    document.title = I18N[lang]._title
    var bZh = document.getElementById('langZh')
    var bEn = document.getElementById('langEn')
    bZh.classList.toggle('on', lang === 'zh')
    bEn.classList.toggle('on', lang === 'en')
    bZh.setAttribute('aria-pressed', String(lang === 'zh'))
    bEn.setAttribute('aria-pressed', String(lang === 'en'))
  }

  document.getElementById('langZh').addEventListener('click', function () { applyLang('zh') })
  document.getElementById('langEn').addEventListener('click', function () { applyLang('en') })
  var saved = ''
  try { saved = localStorage.getItem(LS_LANG) || '' } catch (e) {}
  // 首访无手选记录时跟随浏览器语言:zh 系→中文,其余→英文
  if (!saved) {
    var navLang = ''
    try { navLang = navigator.language || navigator.userLanguage || '' } catch (e) {}
    saved = /^zh\b|^zh-|^zh_/i.test(navLang) ? 'zh' : 'en'
  }
  if (saved === 'en') applyLang('en')

  /* ---------------- Hero mock：明暗切换 + 活的番茄计时 ---------------- */
  var mock = document.getElementById('mock')
  var mockBtn = document.getElementById('mockTheme')
  if (mock && mockBtn) {
    mockBtn.addEventListener('click', function () {
      var dark = mock.hasAttribute('data-dark')
      if (dark) mock.removeAttribute('data-dark'); else mock.setAttribute('data-dark', '')
      mockBtn.setAttribute('aria-pressed', String(!dark))
      var label = mockBtn.querySelector('span')
      if (label) label.textContent = dark ? t('mk.dark') : t('mk.light')
    })
  }
  var ring = document.getElementById('mockRing')
  var clock = document.getElementById('mockClock')
  if (ring && clock) {
    var CIRC = 100.5
    var TOTAL = 25 * 60
    var remain = 14 * 60 + 32
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    var paint = function () {
      var m = Math.floor(remain / 60), s = remain % 60
      clock.textContent = m + ':' + (s < 10 ? '0' : '') + s
      ring.setAttribute('stroke-dashoffset', (CIRC * (1 - remain / TOTAL)).toFixed(1))
    }
    paint()
    if (!reduced) {
      setInterval(function () {
        remain = remain > 0 ? remain - 1 : TOTAL
        paint()
      }, 1000)
    }
  }

  /* ---------------- 导航滚动状态 ---------------- */
  var nav = document.getElementById('nav')
  var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 12) }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  /* ---------------- 滚动浮现 ---------------- */
  var reveals = document.querySelectorAll('.reveal')
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target) }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
    reveals.forEach(function (el) { io.observe(el) })
  } else {
    reveals.forEach(function (el) { el.classList.add('in') })
  }

  /* ---------------- 浅色/深色截图对：点击把后面那张带到前台 ---------------- */
  document.querySelectorAll('.shot-pair').forEach(function (pair) {
    pair.addEventListener('click', function (e) {
      var frame = e.target.closest('.frame')
      if (!frame) return
      // 点「当前在后台的那张」才切换；点前台大图无动作
      var isBackClicked = frame.classList.contains('shadowing') !== pair.classList.contains('swap')
      if (!isBackClicked) return
      pair.classList.toggle('swap')
    })
  })

  /* ---------------- 手记：卡片只露导语，点击弹窗读全文（不跳页） ---------------- */
  var postList = document.getElementById('postList')
  if (postList) {
    var T = {
      more: { zh: '阅读全文', en: 'Read more' },
      close: { zh: '关闭', en: 'Close' }
    }
    var lang = function () { return document.documentElement.lang === 'en-US' || document.getElementById('langEn').classList.contains('on') ? 'en' : 'zh' }

    // 弹窗壳
    var modal = document.createElement('div')
    modal.className = 'post-modal'
    modal.hidden = true
    modal.innerHTML = '<div class="post-modal-box" role="dialog" aria-modal="true">' +
      '<button type="button" class="post-close" aria-label="close">✕</button>' +
      '<div class="post-body"></div></div>'
    document.body.appendChild(modal)
    var modalBody = modal.querySelector('.post-body')
    var modalBox = modal.querySelector('.post-modal-box')
    var lastFocus = null

    function closePost () {
      var art = modalBody.firstElementChild
      if (art && art._home) art._home.insertBefore(art, art._marker)
      modal.hidden = true
      document.body.style.overflow = ''
      if (lastFocus) lastFocus.focus()
    }
    modal.addEventListener('click', function (e) { if (e.target === modal) closePost() })
    modal.querySelector('.post-close').addEventListener('click', closePost)
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !modal.hidden) closePost() })

    // 每篇文章 → 卡片（标题+导语+阅读全文），全文节点搬进弹窗
    postList.querySelectorAll('.post').forEach(function (art) {
      var head = art.querySelector('.post-head')
      var title = art.querySelector('h2')
      var lead = art.querySelector('p')
      var rest = [].slice.call(art.children).filter(function (el) { return el !== head && el !== title && el !== lead })

      var card = document.createElement('article')
      // JS 动态创建的元素赶不上页面加载时的 reveal 观察,直接带 .in 落位,否则整列 opacity:0 隐身
      card.className = 'post-card reveal in'
      card.setAttribute('tabindex', '0')
      card.setAttribute('role', 'button')
      if (head) card.appendChild(head.cloneNode(true))
      if (title) card.appendChild(title.cloneNode(true))
      if (lead) card.appendChild(lead.cloneNode(true))
      var more = document.createElement('span')
      more.className = 'post-more'
      more.textContent = T.more[lang()]
      card.appendChild(more)

      function open () {
        lastFocus = card
        modal.querySelector('.post-close').setAttribute('aria-label', T.close[lang()])
        more && (more.textContent = T.more[lang()])
        // 收起全文段落，整节点搬入弹窗
        rest.forEach(function (el) { el.classList.add('post-full-only') })
        modalBody.appendChild(art)
        // lazy 图在隐藏容器里会卡死不加载,弹窗打开时强制 eager
        art.querySelectorAll('img[loading="lazy"]').forEach(function (i) { i.loading = 'eager' })
        modal.hidden = false
        document.body.style.overflow = 'hidden'
        modalBox.scrollTop = 0
        modal.querySelector('.post-close').focus()
      }
      card.addEventListener('click', open)
      card.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open() } })
      card._applyLang = function () { more.textContent = T.more[lang()] }
      // 替换前先在原位留锚点，关闭时按锚点归还节点
      art._home = art.parentNode
      art._marker = document.createComment('post:' + art.id)
      art._home.insertBefore(art._marker, art.nextSibling)
      art.replaceWith(card)
      card._article = art
    })

    // 语言切换时同步「阅读全文」文案 + 弹窗内标题等（节点仍在 DOM，data-i18n 自动覆盖）
    var zhBtn = document.getElementById('langZh'), enBtn = document.getElementById('langEn')
    if (zhBtn) zhBtn.addEventListener('click', function () { document.querySelectorAll('.post-card .post-more').forEach(function (m) { m.textContent = T.more.zh }) })
    if (enBtn) enBtn.addEventListener('click', function () { document.querySelectorAll('.post-card .post-more').forEach(function (m) { m.textContent = T.more.en }) })
  }
})()

// 在线演示旁的悬浮小窗:走秒倒计时(纯装饰,与 iframe 内应用互不依赖)
;(function () {
  var el = document.getElementById('fdTime')
  if (!el) return
  var remain = 25 * 60
  setInterval(function () {
    remain = remain > 0 ? remain - 1 : 25 * 60 - 1
    var m = String(Math.floor(remain / 60))
    var sec = String(remain % 60)
    el.textContent = (m.length < 2 ? '0' + m : m) + ':' + (sec.length < 2 ? '0' + sec : sec)
  }, 1000)
})()
