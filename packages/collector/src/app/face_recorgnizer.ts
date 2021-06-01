import * as tf from '@tensorflow/tfjs';
import * as faceapi from 'face-api.js';

import ImageCreator from './image_creator';

import configure from '../configure';

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
  faceMatcher: null,

  async loadNet(): Promise<faceapi.SsdMobilenetv1> {
    const detectionNet = faceapi.nets.ssdMobilenetv1;
    await detectionNet.load(configure.FACE_API_WEIGHTS);
    await faceapi.loadFaceLandmarkModel(configure.FACE_API_WEIGHTS);
    await faceapi.loadFaceDetectionModel(configure.FACE_API_WEIGHTS);
    await faceapi.loadFaceRecognitionModel(configure.FACE_API_WEIGHTS);

    const faceMatcherFile = await (await fetch(configure.FACE_MATCHER_FILE_URL)).json();
    this.faceMatcher = faceapi.FaceMatcher.fromJSON(faceMatcherFile);

    return detectionNet;
  },

  async detectFaces(
    video: HTMLVideoElement,
    videoId: string
  ): Promise<Array<IFaceRecognitionResult>> {
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
          url: ImageCreator.createAlignedImage(canvas, detection),
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

    Object.values(results).forEach((resultByMember) => {
      this.sortByDistance(resultByMember);
    });

    return results;
  },

  sortByDistance(results: Array<IFaceRecognitionResult>): void {
    results.sort((prev, next) => {
      if (prev.distance < next.distance) return 1;
      if (prev.distance > next.distance) return -1;
    });
  },
};
