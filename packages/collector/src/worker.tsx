import { ipcRenderer } from 'electron';

import FaceRecognizer, {
  IFaceRecognitionResult,
  IFaceRecognitionResultWithGroup,
} from './app/face_recorgnizer';
import ImageCreator from './app/image_creator';

const determineRecognitionResultForThumbnail = (
  results: IFaceRecognitionResultWithGroup,
  detections: Array<IFaceRecognitionResult>
): IFaceRecognitionResult => {
  if (typeof results.wonwoo !== 'undefined') {
    return results.wonwoo[0];
  }

  FaceRecognizer.sortByDistance(detections);
  return detections[0];
};

const sendFaceDetectionResultsToMain = (
  videoId: string,
  start: number,
  thumbnail: string,
  results: IFaceRecognitionResultWithGroup
) => {
  ipcRenderer.send('from-worker-to-main', {
    channel: 'video',
    action: 'detectFaces',
    videoId,
    start,
    results,
    thumbnail,
  });
};

class FaceRecognizeWorker {
  private video;
  private detections: Array<IFaceRecognitionResult> = [];

  constructor(private videoId: string, private start: number, private end: number) {
    const video = document.createElement('video');
    video.src = `video://${videoId}#t=${start}`;

    this.onVideoMetadataLoaded = this.onVideoMetadataLoaded.bind(this);
    this.onVideoTimeUpdate = this.onVideoTimeUpdate.bind(this);

    video.addEventListener('loadedmetadata', this.onVideoMetadataLoaded);

    document.body.appendChild(video);
    this.video = video;
  }

  onVideoMetadataLoaded() {
    const timer = setInterval(() => {
      if (this.video.readyState >= 3 && this.video.paused) {
        clearInterval(timer);

        this.video.removeEventListener('loadedmetadata', this.onVideoMetadataLoaded);
        this.video.addEventListener('timeupdate', this.onVideoTimeUpdate);

        if (this.video.currentTime !== this.start) {
          this.video.currentTime = this.start;
        }

        this.video.play();
      }
    }, 200);
  }

  onVideoTimeUpdate() {
    if (Math.floor(this.video.currentTime) >= this.end) {
      if (!this.video.paused) {
        this.video.removeEventListener('timeupdate', this.onVideoTimeUpdate);
        this.video.pause();

        if (this.detections.length < 1) {
          console.log(`cannot find any face detections on ${this.start}~${this.end}`);
          this.video.remove();
          return;
        }

        const results = FaceRecognizer.groupByMemberName(this.detections);
        const mainResult = determineRecognitionResultForThumbnail(results, this.detections);

        this.createThumbnailImage(mainResult, (thumbnail: string) => {
          sendFaceDetectionResultsToMain(this.videoId, this.start, thumbnail, results);
          this.video.remove();
        });
      }

      return;
    }

    FaceRecognizer.detectFaces(this.video, this.videoId).then((faces) => {

      this.detections = this.detections.concat(faces);
    });
  }

  createThumbnailImage(
    targetRecognition: IFaceRecognitionResult,
    callback: (thumbnail: string) => void
  ): void {
    this.video.addEventListener(
      'seeked',
      () => {
        const thumbnail = ImageCreator.createThumbnailImage(this.video);
        callback(thumbnail);
      },
      { once: true }
    );

    this.video.currentTime = Math.floor(targetRecognition.timestamp);
  }
}

FaceRecognizer.loadNet().then((net) => {
  ipcRenderer.send('worker', { action: 'ready' });
});

ipcRenderer.on('worker/prepare', (event, message) => {
  new FaceRecognizeWorker(message.videoId, message.start, message.end);
});
