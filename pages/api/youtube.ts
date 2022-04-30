import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).end();
    return;
  }

  const { playlistId, pageToken } = req.query;

  if (!playlistId) {
    res.status(400).json({ message: 'playlistId is required' });
    return;
  }

  let reqUrl = `${process.env.CACHED_YT_HOST}/dev/playlist/${playlistId}`;

  if (pageToken) {
    reqUrl += `?pageToken=${pageToken}`;
  }

  const response = await fetch(reqUrl, {
    headers: { 'x-api-key': process.env.CACHED_YT_API_KEY || '' },
  });
  const data = await response.json();

  res.status(response.status).json(data);
}
