export async function request<ResponseType = {}, RequestType = {}>(
  apiPath: string,
  init?: Omit<RequestInit, 'body'> & {
    body?: RequestType | string;
  }
): Promise<Response & ResponseType> {
  const HOST = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://wonwoo.video';

  const requestInit = { ...init };
  if (requestInit.method === 'POST' && init?.body) {
    requestInit.body = typeof init.body === 'string' ? init.body : JSON.stringify(init.body);
  }

  const response = await fetch(`${HOST}${apiPath}`, requestInit as RequestInit);
  return response.json();
}
