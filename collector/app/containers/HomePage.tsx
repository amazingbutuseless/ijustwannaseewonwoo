import React from 'react';
import { Link } from 'react-router-dom';

import routes from '../constants/routes.json';

import Header from '../components/Header';

export interface HomePageProps {}

export default function HomePage(args) {
  return (
    <>
      <Header title="ijustwannaseewonwoo" />
      {/*<Link to={routes.COUNTER}>to Counter</Link>*/}
    </>
  );
}
