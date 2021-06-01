import styled from '@emotion/styled';

export const BreadcrumbWrapper = styled.nav`
  padding: 0 0.8rem;

  a {
    display: inline-block;
    padding: 0.8rem 0;
    font-size: 1.2rem;
    color: var(--silver-chalice);
    text-decoration: none;

    &:after {
      display: inline-block;
      margin: 0 0.8rem;
      color: var(--jet);
      content: '/';
    }

    &:last-of-type:after {
      content: '';
    }
  }
`;
