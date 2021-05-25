import { app, autoUpdater, dialog } from 'electron';

export default (() => {
  if (!app.isPackaged) return;

  const server = 'https://update.electronjs.org';
  const feed = `${server}/amazingbutuseless/ijustwannaseewonwoo/${process.platform}-${
    process.arch
  }/${app.getVersion()}`;

  autoUpdater.setFeedURL({ url: feed });

  setInterval(() => {
    autoUpdater.checkForUpdates();
  }, 10 * 60 * 1000);

  autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
    const dialogOpts = {
      type: 'info',
      buttons: ['재시작', '나중에'],
      title: 'Application Update',
      message: process.platform === 'win32' ? releaseNotes : releaseName,
      detail: '새로운 버전이 다운로드 되었습니다. 재시작 후 업데이트 버전이 실행됩니다.',
    };

    dialog.showMessageBox(dialogOpts).then((returnValue) => {
      if (returnValue.response === 0) autoUpdater.quitAndInstall();
    });
  });

  autoUpdater.on('error', (message) => {
    console.error('There was a problem updating the application');
    console.error(message);
  });

  return {
    checkForUpdates() {
      autoUpdater.checkForUpdates();
    },
  };
})();
