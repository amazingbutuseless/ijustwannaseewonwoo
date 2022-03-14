import { request, gql } from 'graphql-request';

export default function graphqlFetcher(permission: 'read' | 'manage', query: string, variables?: { [k: string]: any }) {
  return (headers: Record<string, string> = {}) =>
    request({
      url: `${process.env.NEXT_PUBLIC_GRAPHQL_HOST}/cms/${permission}/ko-KR`,
      document: gql`
        ${query}
      `,
      variables,
      requestHeaders: headers,
    });
}
