import { NextApiRequest, NextApiResponse } from 'next';
import { CognitoJwtVerifier } from 'aws-jwt-verify';

import { getCookie } from 'helpers/request';

async function hasAuthenticated(cookies: string) {
  const authBaseKey = `CognitoIdentityServiceProvider.${process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID}`;

  const lastAuthUser = getCookie(cookies, `${authBaseKey}.LastAuthUser`);
  if (!lastAuthUser) return false;

  const idToken = getCookie(cookies, `${authBaseKey}.${lastAuthUser}.idToken`);
  if (!idToken) return false;

  const verifier = CognitoJwtVerifier.create({
    userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID || '',
    tokenUse: 'id',
    clientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID,
  });

  try {
    await verifier.verify(idToken);
    return true;
  } catch (err) {
    return false;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const permission = req.query.permission || 'read';
  const reqUrl = `${process.env.CMS_HOST}/cms/${permission}/ko-KR`;

  const authorization = (async () => {
    if (permission === 'read') {
      return process.env.CMS_PUBLIC_API_KEY;
    }

    if (!(await hasAuthenticated(req.headers.cookie || ''))) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    return process.env.CMS_PRIVATE_API_KEY;
  })();

  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${await authorization}`,
      'Content-Type': 'application/json',
    },
    body: req.body,
  };

  const response = await fetch(reqUrl, options);

  const data = await response.json();

  res.status(response.status).json(data.data || data.errors);
}
