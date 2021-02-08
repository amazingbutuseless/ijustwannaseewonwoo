import fs from 'fs';
import { app, BrowserWindow, ipcMain } from 'electron';
import installExtension, { REDUX_DEVTOOLS } from 'electron-devtools-installer';
import YoutubeDownloader from './youtube_downloader';

declare const MAIN_WINDOW_WEBPACK_ENTRY: any;
const VIDEO_DOWNLOADED_DIR = `${app.getPath('userData')}/temp`;

if (require('electron-squirrel-startup')) {
  app.quit();
}

app.whenReady().then(() => {
  fs.mkdirSync(VIDEO_DOWNLOADED_DIR);

  installExtension(REDUX_DEVTOOLS)
    .then((name) => console.log({ name }))
    .catch((err) => console.log({ err }));
});

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    height: 800,
    width: 1080,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      nativeWindowOpen: true,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainWindow.webContents.openDevTools();
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  fs.truncateSync(VIDEO_DOWNLOADED_DIR);
  fs.rmdirSync(VIDEO_DOWNLOADED_DIR);

  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

function VideoChannelHandler(event, message) {
  switch (message.action) {
    case 'download':
      const downloader = new YoutubeDownloader(message.videoId);
      downloader.run(event);
      break;
  }
}

ipcMain.on('video', VideoChannelHandler);
