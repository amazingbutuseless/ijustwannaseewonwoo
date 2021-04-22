import { app, BrowserWindow, ipcMain, protocol } from 'electron';
import installExtension, { REDUX_DEVTOOLS } from 'electron-devtools-installer';
import YoutubeDownloader from './app/youtube_downloader';

declare const MAIN_WINDOW_WEBPACK_ENTRY: any;
declare const WORKER_WINDOW_WEBPACK_ENTRY: any;

if (require('electron-squirrel-startup')) {
  app.quit();
}

app.whenReady().then(() => {
  protocol.registerFileProtocol('video', (request, callback) => {
    const url = /video:\/\/([^#]+)(#t=.+)?/.exec(request.url);
    const videoPath = `${app.getPath('temp')}${url[1]}.mp4`;
    callback({ path: videoPath });
  });

  installExtension(REDUX_DEVTOOLS)
    .then((name) => console.log({ name }))
    .catch((err) => console.log({ err }));
});

let mainWindow: BrowserWindow = null;
let workerWindow: BrowserWindow = null;

const createWindow = (): void => {
  mainWindow = new BrowserWindow({
    height: 720,
    width: 1280,
    frame: false,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      nativeWindowOpen: true,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  workerWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });

  workerWindow.loadURL(WORKER_WINDOW_WEBPACK_ENTRY);

  mainWindow.webContents.openDevTools();
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on('video/download', async (event, message) => {
  console.log(`download ${message.videoId}`);
  const downloader = new YoutubeDownloader(message.videoId);
  await downloader.run(event);
});

ipcMain.on('from-main-to-worker', (event, message) => {
  workerWindow.webContents.send(`worker/${message.action}`, message);
});

ipcMain.on('from-worker-to-main', (event, message) => {
  mainWindow.webContents.send(`${message.channel}/${message.action}`, message);
});
