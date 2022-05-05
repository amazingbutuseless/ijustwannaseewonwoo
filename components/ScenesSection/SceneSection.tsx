import React, { useCallback, useContext } from 'react';
import { Divider, Switch } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { PreferenceContext } from 'contexts/PreferenceContext';
import { SwitchWrapper } from './style';

export default function ScenesSection({ children }: React.PropsWithChildren<{}>) {
  const { autoplay, onAutoplayChange } = useContext(PreferenceContext);

  const { t } = useTranslation('common');

  const handleAutoPlayChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onAutoplayChange(e.target.checked);
  }, []);

  return (
    <>
      <SwitchWrapper control={<Switch checked={autoplay} onChange={handleAutoPlayChange} />} label={t('autoplay')} />
      <Divider sx={{ marginBottom: 1 }} />
      {children}
    </>
  );
}
