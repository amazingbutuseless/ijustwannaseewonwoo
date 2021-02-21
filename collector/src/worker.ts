import { ipcRenderer, IpcRendererEvent } from 'electron';

import FaceRecognizer, { IFaceRecognitionResult } from './face_recorgnizer';

let videoId = '';
const video = document.querySelector('video');

let timer = null;
let detections: Array<IFaceRecognitionResult> = [];

const onVideoPlay = () => {
  detections = [];

  timer = setInterval(async () => {
    const faces = await FaceRecognizer.detectFaces(video, videoId);
    detections = detections.concat(faces);
  }, 500);
};

const onVideoPause = () => {
  clearInterval(timer);

  const results = FaceRecognizer.groupByMemberName(detections);
  FaceRecognizer.sortByDistance(results);

  ipcRenderer.send('from-worker-to-main', {
    channel: 'video',
    action: 'detectFaces',
    videoId: videoId,
    results,
  });
};

video.addEventListener('play', onVideoPlay);
video.addEventListener('pause', onVideoPause);
video.addEventListener('loadeddata', () => {
  if (video.readyState >= 3 && video.paused) {
    video.play();
  }
});

FaceRecognizer.loadNet().then((net) => {
  ipcRenderer.send('worker', { action: 'ready' });
});

function workerChannelHandler(event: IpcRendererEvent, message: any) {
  const { start, end } = message;
  videoId = message.videoId;

  switch (message.action) {
    case 'prepare':
      video.src = `video://${videoId}#t=${start},${end}`;
      break;
  }
}

ipcRenderer.on('worker', workerChannelHandler);
