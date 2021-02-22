import { ipcRenderer } from 'electron';

import FaceRecognizer, { IFaceRecognitionResult } from './face_recorgnizer';

let videoId = '';
let start: number, end: number;

const video = document.querySelector('video');

let detections: Array<IFaceRecognitionResult> = [];

const sendFaceDetectionResultsToMain = () => {
  const results = FaceRecognizer.groupByMemberName(detections);
  FaceRecognizer.sortByDistance(results);

  ipcRenderer.send('from-worker-to-main', {
    channel: 'video',
    action: 'detectFaces',
    videoId: videoId,
    results,
  });
};

const onVideoTimeUpdate = () => {
  if (Math.floor(video.currentTime) >= end) {
    if (!video.paused) {
      video.pause();

      sendFaceDetectionResultsToMain();
    }

    return;
  }

  FaceRecognizer.detectFaces(video, videoId).then((faces) => {
    detections = detections.concat(faces);
  });
};

video.addEventListener('timeupdate', onVideoTimeUpdate);

video.addEventListener('loadedmetadata', () => {
  const loadedTimer = window.setInterval(() => {
    if (video.readyState >= 3 && video.paused) {
      window.clearInterval(loadedTimer);

      detections = [];
      video.play();
    }
  }, 200);
});

FaceRecognizer.loadNet().then((net) => {
  ipcRenderer.send('worker', { action: 'ready' });
});

ipcRenderer.on('worker/prepare', (event, message) => {
  videoId = message.videoId;
  start = message.start;
  end = message.end;

  video.src = `video://${videoId}#t=${start}`;
});
