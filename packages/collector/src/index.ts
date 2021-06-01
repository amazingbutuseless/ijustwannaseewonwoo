import { app, BrowserWindow, ipcMain, protocol, Menu } from 'electron';
import installExtension, { REDUX_DEVTOOLS } from 'electron-devtools-installer';
import YoutubeDownloader from './app/youtube_downloader';

import path from 'path';
import fs from 'fs';

declare const MAIN_WINDOW_WEBPACK_ENTRY: any;
declare const WORKER_WINDOW_WEBPACK_ENTRY: any;

const REFRESH_TOKEN_PATH = path.resolve(app.getPath('appData'), 'tokens.json');

if (require('electron-squirrel-startup')) {
  app.quit();
}

require('update-electron-app')();

Menu.setApplicationMenu(null);

app.whenReady().then(() => {
  protocol.registerFileProtocol('video', (request, callback) => {
    const url = /video:\/\/([^#]+)(#t=.+)?/.exec(request.url);
    const videoPath = `${app.getPath('temp')}${url[1]}.mp4`;
    callback({ path: videoPath });
  });

  protocol.registerFileProtocol('static', (request, callback) => {
    const url = /static:\/\/([^#]+)(#t=.+)?/.exec(request.url);
    const filePath = path.join(app.getAppPath(), '.webpack/renderer', url[1]);
    callback(filePath);
  });

  if (!app.isPackaged) {
    installExtension(REDUX_DEVTOOLS)
      .then((name) => console.log({ name }))
      .catch((err) => console.log({ err }));
  }
});

let mainWindow: BrowserWindow = null;
let workerWindow: BrowserWindow = null;

const createWindow = (): void => {
  mainWindow = new BrowserWindow({
    height: 720,
    width: 1280,
    resizable: false,
    frame: process.platform === 'win32',
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      nativeWindowOpen: true,
      enableRemoteModule: true,
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

  mainWindow.on('closed', () => {
    workerWindow.close();
  });

  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
    workerWindow.webContents.openDevTools();
  }
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    app.quit();
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

ipcMain.on('auth/storeToken', (event, message) => {
  fs.writeFileSync(REFRESH_TOKEN_PATH, JSON.stringify(message), {
    encoding: 'utf8',
    flag: 'w',
  });
});

ipcMain.on('auth/fetchToken', (event, message) => {
  if (!fs.existsSync(REFRESH_TOKEN_PATH)) {
    event.returnValue = {};
    return;
  }

  const tokens = fs.readFileSync(REFRESH_TOKEN_PATH, { encoding: 'utf8' });
  event.returnValue = JSON.parse(tokens);
});

ipcMain.on('from-main-to-worker', (event, message) => {
  workerWindow.webContents.send(`worker/${message.action}`, message);
});

ipcMain.on('from-worker-to-main', (event, message) => {
  mainWindow.webContents.send(`${message.channel}/${message.action}`, message);
});
