import { ipcRenderer } from 'electron';

import React, { ReactElement, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import Store from './store';

import FaceRecognizer, { IFaceRecognitionResult } from './utils/face_recorgnizer';

let videoId = '';
let start: number, end: number;

interface VideoWorkerProps {
  videoId: string;
  start: number;
  end: number;
}

/*/
function VideoWorker({ videoId, start, end }: VideoWorkerProps): ReactElement {
  const videoRef = useRef(null);
  useAuthentication();

  const videoSrc = `video://${videoId}#t=${start}`;

  const { upload } = useImageUploader();

  const onVideoMetadataLoaded = () => {
    const loadedTimer = window.setInterval(() => {
      if (videoRef.current.readyState >= 3 && videoRef.current.paused) {
        window.clearInterval(loadedTimer);
        videoRef.current.play();
      }
    }, 200);
  };

  const onVideoTimeUpdate = () => {
    if (Math.floor(videoRef.current.currentTime) >= end) {
      if (!videoRef.current.paused) {
        videoRef.current.pause();
      }
      return;
    }

    FaceRecognizer.detectFaces(videoRef.current, videoId).then((faces) => {
      faces.forEach(async (detection) => {
        const { name, videoId, timestamp, url } = detection;
        await upload(name, videoId, timestamp, url);
      });
    });
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('timeupdate', onVideoTimeUpdate);
      videoRef.current.addEventListener('loadedmetadata', onVideoMetadataLoaded);
    }

    return () => {
      videoRef.current.removeEventListener('timeupdate', onVideoTimeUpdate);
      videoRef.current.removeEventListener('loadedmetadata', onVideoMetadataLoaded);
    };
  }, [videoRef]);

  return (
    <video ref={videoRef}>
      <source src={videoSrc} />
    </video>
  );
}
/**/

/**/
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
/**/

FaceRecognizer.loadNet().then((net) => {
  ipcRenderer.send('worker', { action: 'ready' });
});

ipcRenderer.on('worker/prepare', (event, message) => {
  videoId = message.videoId;
  start = message.start;
  end = message.end;

  video.src = `video://${videoId}#t=${start}`;
});
