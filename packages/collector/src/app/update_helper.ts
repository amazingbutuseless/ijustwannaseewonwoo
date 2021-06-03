import { app, autoUpdater, dialog, Notification } from 'electron';

export default (() => {
  if (!app.isPackaged) return;

  const server = 'https://hazel-lake.vercel.app';
  const feed = `${server}/update/${process.platform}/${app.getVersion()}`;

  autoUpdater.setFeedURL({ url: feed });

  setInterval(() => {
    autoUpdater.checkForUpdates();
  }, 10 * 60 * 1000);

  autoUpdater.on('update-available', () => {
    const notification = {
      title: 'Check for Updates',
      body: '업데이트 가능한 버전이 있습니다. 다운로드 완료 후 자동으로 설치가 진행됩니다.',
    };

    new Notification(notification).show();
  });

  autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
    const dialogOpts = {
      type: 'info',
      buttons: ['재시작', '나중에'],
      title: 'Application Update',
      message: process.platform === 'win32' ? releaseNotes : releaseName,
      detail: '새로운 버전으로 업데이트 되었습니다. 재시작 후 업데이트 버전이 실행됩니다.',
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
      autoUpdater.once('update-not-available', () => {
        const notification = {
          title: 'Check for Updates',
          body: '최신 버전을 사용중입니다.',
        };

        new Notification(notification).show();
      });

      autoUpdater.checkForUpdates();
    },
  };
})();
