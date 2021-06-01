import React from 'react';

export default function LandingVideo() {
  const start = Math.floor(Math.random() * 257);

  return (
    <video muted autoPlay loop style={{ objectFit: 'cover' }}>
      <source src={`static:///assets/images/landing.mp4#t=${start}`} />
    </video>
  );
}
