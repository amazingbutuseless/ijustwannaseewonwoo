import React from 'react';
import { useScrollTrigger, Container } from '@material-ui/core';

import Navbar from 'src/components/Navbar';
import Footer from 'src/components/Footer';

interface ElevationScrollProps {
  window?: () => Window;
  children: React.ReactElement;
}

function ElevationScroll(props: ElevationScrollProps) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 1 : 0,
  });
}

export default function Layout({ children }) {
  return (
    <>
      <ElevationScroll>
        <Navbar />
      </ElevationScroll>
      <Container>{children}</Container>
      <Footer />
    </>
  );
}
