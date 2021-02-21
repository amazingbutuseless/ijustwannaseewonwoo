import fs from 'fs';
import { app } from 'electron';
import ytdl from 'ytdl-core';

export default class YoutubeDownloader {
  outputPath: string;

  constructor(private videoId: string) {
    this.outputPath = `${app.getPath('temp')}/${this.videoId}.mp4`;
  }

  async run(renderer) {
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
      if (e.statusCode === 416) {
        renderer.sender.send('video', {
          action: 'download',
          rates: 1,
        });
      }
    });

    video.on('progress', (chunkLength, totalBytesDownloaded, totalBytes) => {
      const downloadRates = totalBytesDownloaded / totalBytes;
      renderer.sender.send('video', {
        action: 'download',
        rates: downloadRates,
      });
    });
  }
}
