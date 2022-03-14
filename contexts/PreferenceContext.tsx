import React, { createContext, useState } from 'react';

interface Preference {
  autoplay: boolean;
  setAutoplay: (autoplay: boolean) => void;
  expandAddScenePanel: boolean;
  setAddScenePanelToBeExpanded: (expandAddScenePanel: boolean) => void;
}

export const PreferenceContext = createContext<Preference>({
  autoplay: true,
  setAutoplay: (autoplay: boolean) => {},
  expandAddScenePanel: true,
  setAddScenePanelToBeExpanded: (expandAddScenePanel: boolean) => {},
});

const PreferenceProvider: React.FC = ({ children }) => {
  const [autoplay, setAutoplay] = useState(true);
  const [expandAddScenePanel, setAddScenePanelToBeExpanded] = useState(true);

  return (
    <PreferenceContext.Provider
      value={{
        autoplay,
        setAutoplay,
        expandAddScenePanel,
        setAddScenePanelToBeExpanded,
      }}
    >
      {children}
    </PreferenceContext.Provider>
  );
};

export default PreferenceProvider;
