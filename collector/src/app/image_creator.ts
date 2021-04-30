import * as fs from 'fs';
import * as path from 'path';

import { Canvas, createCanvas } from 'canvas';

export default {
  DATASET_IMAGE: 160,

  saveFile(memberName: string, fileName: string, buf: Buffer): void {
    const baseDir = `./tmp/data/references/${memberName}`;

    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir, { recursive: true });
    }

    fs.writeFileSync(path.resolve(baseDir, fileName), buf);
  },

  createThumbnailImage(video: HTMLVideoElement): string {
    const videoWidth = video.clientWidth;
    const videoHeight = video.clientHeight;
    const scale = 360 / videoWidth;

    const thumbnailCanvas = document.createElement('canvas');
    thumbnailCanvas.width = 360;
    thumbnailCanvas.height = videoHeight * scale;

    const thumbnailCtx = thumbnailCanvas.getContext('2d');
    thumbnailCtx.drawImage(video, 0, 0, videoWidth, videoHeight, 0, 0, 360, videoHeight * scale);

    return thumbnailCanvas.toDataURL('image/jpeg');
  },

  createAlignedImage(img: HTMLCanvasElement, detection): string {
    const { x, y, width, height } = detection.alignedRect.box;

    const croppedCanvas = createCanvas(img.width, img.height);
    const croppedCtx = croppedCanvas.getContext('2d');
    croppedCanvas.width = this.DATASET_IMAGE;
    croppedCanvas.height = this.DATASET_IMAGE;

    const square = Math.max(width, height);
    const newX = x + (width - square) / 2;
    const newY = y + (height - square) / 2;

    croppedCtx.drawImage(
      img,
      newX,
      newY,
      square,
      square,
      0,
      0,
      this.DATASET_IMAGE,
      this.DATASET_IMAGE
    );

    return croppedCanvas.toDataURL('image/jpeg');
  },
};
