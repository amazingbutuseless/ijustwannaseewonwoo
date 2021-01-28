export interface APIClientRequestParameters {
  body?: {
    [key: string]: any;
  };
  [key: string]: any;
}

export interface APIClientRequestConfig {
  method: 'GET' | 'POST';
  headers: {
    [key: string]: string;
  };
  body?: string;
}
