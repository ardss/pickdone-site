# systemd 单元模板 —— 官网站点 / GoatCounter / 下载统计定时任务
# 放置: /etc/systemd/system/  →  systemctl daemon-reload && systemctl enable --now <name>

# ============ pickdone-goatcounter.service (GoatCounter 自托管, SQLite 单文件) ============
# [Unit]
# Description=GoatCounter analytics
# After=network.target
# [Service]
# User=www-data
# ExecStart=/usr/local/bin/goatcounter serve -listen 127.0.0.1:8080 -db sqlite+/srv/pickdone/goatcounter.db
# Restart=always
# [Install]
# WantedBy=multi-user.target

# ============ pickdone-stats.timer (每日 06:00 聚合 Releases 下载量) ============
# [Unit]
# Description=PickDone download stats daily
# [Timer]
# OnCalendar=*-*-* 06:00:00
# Persistent=true
# [Install]
# WantedBy=timers.target
#
# pickdone-stats.service:
# [Service]
# Type=oneshot
# User=www-data
# WorkingDirectory=/srv/pickdone/ops
# ExecStart=/usr/bin/node dl-stats.mjs db /srv/pickdone/stats/stats.db

# ============ 部署一键脚本 (deploy.sh, 本地运行) ============
# rsync -avz --delete --exclude tools/ --exclude serve.log website/ user@server:/srv/pickdone/website/
# ssh user@server 'systemctl reload caddy'   # 或 caddy reload --config Caddyfile
