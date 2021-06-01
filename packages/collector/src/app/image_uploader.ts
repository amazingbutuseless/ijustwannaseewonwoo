import Amplify, { Storage } from 'aws-amplify';
import configure from '../configure';

Amplify.configure({
  Auth: configure.AUTH,
  Storage: {
    AWSS3: configure.TRAINING_SET_STORAGE,
  },
});

function dataURItoBlob(dataURI: string) {
  const binary = atob(dataURI.split(',')[1]);

  const array: Array<number> = [];

  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }

  return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
}

export function upload(key: string, dataUrl: string) {
  return Storage.put(key, dataURItoBlob(dataUrl), {
    contentType: 'image/jpeg',
  });
}

export function getUrl(key: string): Promise<string> {
  return Storage.get(key).then((imgUrl) => imgUrl) as Promise<string>;
}
