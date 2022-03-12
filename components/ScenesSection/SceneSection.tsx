import React, { useCallback, useContext } from 'react';
import { Divider, Switch } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { PlayerPreferenceContext } from 'contexts/PlayerPreference';
import { SwitchWrapper } from './style';

export default function ScenesSection({ children }: React.PropsWithChildren<{}>) {
  const playerPreference = useContext(PlayerPreferenceContext);

  const { t } = useTranslation('common');

  const handleAutoPlayChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    playerPreference.setAutoplay(e.target.checked);
  }, []);

  return (
    <>
      <SwitchWrapper
        control={<Switch checked={playerPreference.autoplay} onChange={handleAutoPlayChange} />}
        label={t('autoplay')}
      />
      <Divider sx={{ marginBottom: 1 }} />
      {children}
    </>
  );
}
