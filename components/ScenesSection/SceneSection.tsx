import React, { useCallback, useContext } from 'react';
import { Divider, FormControlLabel, Switch } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { PlayerPreferenceContext } from 'contexts/PlayerPreference';

export default function ScenesSection({ children }: React.PropsWithChildren<{}>) {
  const playerPreference = useContext(PlayerPreferenceContext);

  const { t } = useTranslation('common');

  const handleAutoPlayChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    playerPreference.setAutoplay(e.target.checked);
  }, []);

  return (
    <>
      <FormControlLabel
        control={<Switch checked={playerPreference.autoplay} onChange={handleAutoPlayChange} />}
        label={t('autoplay')}
        sx={{ fontSize: '1.2rem' }}
      />
      <Divider sx={{ marginBottom: 1 }} />
      {children}
    </>
  );
}
