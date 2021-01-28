import { APIClientRequestParameters, APIClientRequestConfig } from '../types';

import Configure from '../configure';

export async function APIClient(
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

APIClient.graphql = function (body = {}) {
  return APIClient(`${Configure.GRAPHQL_SERVER}/graphql`, {
    headers: {
      Accept: 'application/json',
    },
    body,
  });
};
