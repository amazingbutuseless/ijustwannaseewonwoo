import React, { createContext, useEffect, useState } from 'react';
import Cookie from 'js-cookie';

interface PreferenceProperties {
  autoplay: boolean;
  onAutoplayChange: (autoplay: boolean) => void;
  expandAddScenePanel: boolean;
  onExpandAddScenePanelChange: (expandAddScenePanel: boolean) => void;
}

export const PreferenceContext = createContext<PreferenceProperties>({
  autoplay: true,
  onAutoplayChange: () => {},
  expandAddScenePanel: true,
  onExpandAddScenePanelChange: () => {},
});

const PREFERENCE_EXPIRE_DAYS = 30;

const PreferenceProvider: React.FC = ({ children }) => {
  const [autoplay, switchAutoplay] = useState(true);
  const [expandAddScenePanel, switchExpandAddScenePanel] = useState(true);

  useEffect(() => {
    const autoplay = Cookie.get('autoplay');
    const expandAddScenePanel = Cookie.get('expandAddScenePanel');
    switchAutoplay(!autoplay ? true : autoplay === 'true');
    switchExpandAddScenePanel(!expandAddScenePanel ? true : expandAddScenePanel === 'true');
  }, []);

  const onAutoplayChange = (autoplay: boolean) => {
    Cookie.set('autoplay', autoplay.toString(), { expires: PREFERENCE_EXPIRE_DAYS });
    switchAutoplay(autoplay);
  };

  const onExpandAddScenePanelChange = (expandAddScenePanel: boolean) => {
    Cookie.set('expandAddScenePanel', expandAddScenePanel.toString(), { expires: PREFERENCE_EXPIRE_DAYS });
    switchExpandAddScenePanel(expandAddScenePanel);
  };

  return (
    <PreferenceContext.Provider
      value={{ autoplay, onAutoplayChange, expandAddScenePanel, onExpandAddScenePanelChange }}
    >
      {children}
    </PreferenceContext.Provider>
  );
};

export default PreferenceProvider;
