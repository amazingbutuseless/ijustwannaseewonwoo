import { ipcRenderer } from 'electron';

import FaceRecognizer, {
  IFaceRecognitionResult,
  IFaceRecognitionResultWithGroup,
} from './app/face_recorgnizer';
import ImageCreator from './app/image_creator';

let videoId = '';
let start: number, end: number;

const video = document.querySelector('video');

let detections: Array<IFaceRecognitionResult> = [];

const createThumbnailImage = (
  targetRecognition: IFaceRecognitionResult,
  callback: (thumbnail: string) => void
): void => {
  video.addEventListener(
    'seeked',
    () => {
      const thumbnail = ImageCreator.createThumbnailImage(video);
      callback(thumbnail);
    },
    { once: true }
  );

  video.currentTime = Math.floor(targetRecognition.timestamp);
};

const determineRecognitionResultForThumbnail = (
  results: IFaceRecognitionResultWithGroup
): IFaceRecognitionResult => {
  if (typeof results.wonwoo !== 'undefined') {
    return results.wonwoo[0];
  }

  FaceRecognizer.sortByDistance(detections);
  return detections[0];
};

const sendFaceDetectionResultsToMain = (
  thumbnail: string,
  results: IFaceRecognitionResultWithGroup
) => {
  ipcRenderer.send('from-worker-to-main', {
    channel: 'video',
    action: 'detectFaces',
    videoId: videoId,
    start,
    results,
    thumbnail,
  });
};

const onVideoTimeUpdate = () => {
  if (Math.floor(video.currentTime) >= end) {
    if (!video.paused) {
      video.removeEventListener('timeupdate', onVideoTimeUpdate);
      video.pause();

      const results = FaceRecognizer.groupByMemberName(detections);
      const mainResult = determineRecognitionResultForThumbnail(results);
      createThumbnailImage(mainResult, (thumbnail: string) => {
        sendFaceDetectionResultsToMain(thumbnail, results);
      });
    }

    return;
  }

  FaceRecognizer.detectFaces(video, videoId).then((faces) => {
    detections = detections.concat(faces);
  });
};

const onVideoMetadataLoaded = () => {
  const loadedTimer = window.setInterval(() => {
    if (video.readyState >= 3 && video.paused) {
      window.clearInterval(loadedTimer);

      video.removeEventListener('loadedmetadata', onVideoMetadataLoaded);

      detections = [];
      video.play();
    }
  }, 200);
};

FaceRecognizer.loadNet().then((net) => {
  ipcRenderer.send('worker', { action: 'ready' });
});

ipcRenderer.on('worker/prepare', (event, message) => {
  videoId = message.videoId;
  start = message.start;
  end = message.end;

  video.src = `video://${videoId}#t=${start}`;
  video.addEventListener('timeupdate', onVideoTimeUpdate);
  video.addEventListener('loadedmetadata', onVideoMetadataLoaded);
});
