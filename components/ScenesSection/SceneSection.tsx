import React, { useCallback } from 'react';
import { Divider, FormControlLabel, Switch } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface Props {
  autoPlay: boolean;
  onAutoPlayChange: (autoPlay: boolean) => void;
}

export default function ScenesSection({ autoPlay, onAutoPlayChange, children }: React.PropsWithChildren<Props>) {
  const { t } = useTranslation('common');

  const handleAutoPlayChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onAutoPlayChange(e.target.checked);
  }, []);

  return (
    <>
      <FormControlLabel
        control={<Switch defaultChecked={autoPlay} onChange={handleAutoPlayChange} />}
        label={t('autoplay')}
      />
      <Divider sx={{ marginBottom: 1 }} />
      {children}
    </>
  );
}
