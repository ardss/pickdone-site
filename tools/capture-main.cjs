// 官网截图专用临时浏览器：把 Electron 当 Chromium 用，加载 5175 浏览器调试宿主。
// 不碰真实应用数据库（数据全在宿主 localStorage），用完即关。
// 用法: cd todo-app && npx electron ../website/tools/capture-main.cjs --remote-debugging-port=9777
const { app, BrowserWindow } = require('electron')

const PORT = (process.argv.find(a => a.startsWith('--remote-debugging-port=')) || '').split('=')[1] || '9777'
app.commandLine.appendSwitch('remote-debugging-port', PORT)
// 单实例与真实应用互不干扰
app.disableHardwareAcceleration()

app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 1600,
    height: 1000,
    useContentSize: true,
    show: true,
    title: 'PickDone Capture',
    webPreferences: { backgroundThrottling: false, contextIsolation: true, nodeIntegration: false }
  })
  win.loadURL(process.env.CAPTURE_URL || 'http://127.0.0.1:5175/')
  let booted = false
  win.webContents.on('did-finish-load', () => {
    if (!booted) { booted = true; console.log('CAPTURE_WINDOW_READY') }
  })
})
