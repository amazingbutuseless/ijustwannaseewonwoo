import fs from 'fs';
import { app, IpcMainEvent } from 'electron';
import ytdl from 'ytdl-core';

export default class YoutubeDownloader {
  outputPath: string;

  errorCode: {
    [key: string]: number;
  };

  constructor(private videoId: string) {
    this.outputPath = `${app.getPath('temp')}/${this.videoId}.mp4`;
    this.errorCode = {
      ALREADY_DOWNLOADED: 416,
    };
  }

  private sendMessageToRenderer(renderer: IpcMainEvent, rates: number): void {
    renderer.sender.send('video/download', {
      videoId: this.videoId,
      rates,
    });
  }

  async run(renderer: IpcMainEvent) {
    let downloaded = 0;

    if (fs.existsSync(this.outputPath)) {
      downloaded = fs.statSync(this.outputPath).size;
    }

    const info = await ytdl.getInfo(this.videoId);

    const format = ytdl.chooseFormat(info.formats, {
      quality: '136',
      filter: (format) => format.container === 'mp4',
    });

    const video = ytdl(`https://www.youtube.com/watch?v=${this.videoId}`, {
      range: {
        start: downloaded,
      },
      format,
    });

    video.pipe(fs.createWriteStream(this.outputPath, { flags: 'a' }));

    video.on('error', (e) => {
      if (e.statusCode === this.errorCode.ALREADY_DOWNLOADED) {
        this.sendMessageToRenderer(renderer, 1);
      }
    });

    video.on('progress', (chunkLength, totalBytesDownloaded, totalBytes) => {
      const downloadRates = totalBytesDownloaded / totalBytes;
      this.sendMessageToRenderer(renderer, downloadRates);
    });
  }
}
