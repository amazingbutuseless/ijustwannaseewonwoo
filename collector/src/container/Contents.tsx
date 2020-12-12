import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from '@emotion/styled';

import Videos from './Videos';

const ContentsWrapper = styled.div`
  margin-left: 8.4rem;
  padding: 1rem;
  z-index: 1;
`;

export default function Contents() {
  return (
    <ContentsWrapper>
      <Switch>
        <Route exact path="/" component={Videos} />
        <Route path="/channel/:channelId" component={Videos} />
      </Switch>
    </ContentsWrapper>
  );
}
