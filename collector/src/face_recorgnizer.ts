import * as tf from '@tensorflow/tfjs';
import * as faceapi from 'face-api.js';

import ImageCreator from './ImageCreator';

faceapi.env.monkeyPatch({
  Canvas: HTMLCanvasElement,
  Image: HTMLImageElement,
  ImageData: ImageData,
  Video: HTMLVideoElement,
  createCanvasElement: () => document.createElement('canvas'),
  createImageElement: () => document.createElement('img'),
});

export interface IFaceRecognitionResult {
  videoId: string;
  timestamp: number;
  name: string;
  distance: number;
  url: string;
}

export interface IFaceRecognitionResultWithGroup {
  [name: string]: Array<IFaceRecognitionResult>;
}

export default {
  faceMatcher: faceapi.FaceMatcher.fromJSON(require('./data/faceMatcher.json')),

  async loadNet() {
    const detectionNet = faceapi.nets.ssdMobilenetv1;
    await detectionNet.load('/data/weights');
    await faceapi.loadFaceLandmarkModel('/data/weights');
    await faceapi.loadFaceDetectionModel('/data/weights');
    await faceapi.loadFaceRecognitionModel('/data/weights');

    return detectionNet;
  },

  async detectFaces(video, videoId: string): Promise<Array<IFaceRecognitionResult>> {
    const canvas = faceapi.createCanvasFromMedia(video);

    const detections = await faceapi
      .detectAllFaces(video)
      .withFaceLandmarks()
      .withFaceDescriptors();

    const results: Array<IFaceRecognitionResult> = [];

    detections.forEach((detection) => {
      const bestMatch = this.faceMatcher.findBestMatch(detection.descriptor);

      if (bestMatch.label !== 'unknown') {
        results.push({
          videoId,
          timestamp: video.currentTime,
          name: bestMatch.label,
          distance: bestMatch.distance,
          url: ImageCreator.createAlignedImage(canvas, detection).toDataURL(),
        });
      }
    });

    return results;
  },

  groupByMemberName(detections: Array<IFaceRecognitionResult>): IFaceRecognitionResultWithGroup {
    const results: IFaceRecognitionResultWithGroup = {};

    detections.forEach((detection) => {
      const memberName = detection.name;
      if (!Object.keys(results).includes(memberName)) results[memberName] = [];

      results[memberName].push(detection);
    });

    return results;
  },

  sortByDistance(results: IFaceRecognitionResultWithGroup): void {
    Object.entries(results).forEach(([memberName, result]) => {
      result.sort((prev, next) => {
        if (prev.distance < next.distance) return 1;
        if (prev.distance > next.distance) return -1;
      });
    });
  },
};
