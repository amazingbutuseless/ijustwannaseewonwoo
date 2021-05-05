import { Auth, Signer } from 'aws-amplify';

import { APIClientRequestParameters, APIClientRequestConfig } from '../types';

import Configure from '../configure';

export default async function APIClient(
  endpoint: string,
  { body, ...customConfig }: APIClientRequestParameters = {}
) {
  const headers = { 'Content-Type': 'application/json' };

  const config: APIClientRequestConfig = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig?.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  let data;
  try {
    const response = await window.fetch(endpoint, config);
    data = await response.json();
    if (response.ok) {
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data);
  }
}

APIClient.get = function (endpoint: string, customConfig = {}) {
  return APIClient(endpoint, { ...customConfig, method: 'GET' });
};

APIClient.post = function (endpoint: string, body = {}, customConfig = {}) {
  return APIClient(endpoint, { ...customConfig, body });
};

APIClient.graphql = async (body = {}) => {
  const credentials = await Auth.currentCredentials();

  const { headers } = Signer.sign(
    {
      url: Configure.GRAPHQL_SERVER,
      method: 'POST',
      data: JSON.stringify(body),
    },
    {
      access_key: credentials.accessKeyId,
      secret_key: credentials.secretAccessKey,
      session_token: credentials.sessionToken,
    }
  );

  return APIClient(Configure.GRAPHQL_SERVER, { headers, body });
};
