import React from 'react';
import { useScrollTrigger, Container } from '@mui/material';

import Navbar from 'components/Navbar';
import Footer from 'components/Footer';

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
    style: trigger ? { backgroundColor: 'rgba(255, 255, 255, .4)', backdropFilter: 'blur(8px)' } : {},
  });
}

export default function Layout({ children }: { children: React.ReactElement }) {
  return (
    <>
      <ElevationScroll>
        <Navbar />
      </ElevationScroll>
      {children}
      <Footer />
    </>
  );
}
