import React, { createContext, useState } from 'react';

export const PlayerPreferenceContext = createContext({ autoplay: true, setAutoplay: (autoplay: boolean) => {} });

export default function PlayerPreference({ children }: React.PropsWithChildren<{}>) {
  const [autoplay, setAutoplay] = useState(true);

  return (
    <PlayerPreferenceContext.Provider value={{ autoplay, setAutoplay }}>{children}</PlayerPreferenceContext.Provider>
  );
}
