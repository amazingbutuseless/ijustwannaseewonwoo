import * as fs from 'fs';
import * as path from 'path';

import { Canvas, createCanvas } from 'canvas';

export default {
  DATASET_IMAGE: 160,

  saveFile(memberName: string, fileName: string, buf: Buffer): void {
    const baseDir = `./src/data/references/${memberName}`;

    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir, { recursive: true });
    }

    fs.writeFileSync(path.resolve(baseDir, fileName), buf);
  },

  createAlignedImage(img: HTMLCanvasElement, detection): Canvas {
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

    return croppedCanvas;
  },
};
