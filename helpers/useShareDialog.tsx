import { useCallback, useContext } from 'react';
import { SnackbarContext } from 'contexts/SnackbarContext';
import { useTranslation } from 'react-i18next';

import theme from 'config/theme';

function getHost() {
  const { protocol, host } = window.location;
  return `${protocol}//${host}`;
}

export default function useSceneShareSnackbar(basePath: string) {
  const snackback = useContext(SnackbarContext);
  const { t } = useTranslation('video');

  const show = useCallback(
    (startTime: number) => {
      navigator.clipboard.writeText(`${getHost()}${basePath}?t=${startTime}`);
      snackback.setSnackbarProps({
        open: true,
        message: t('scene.shareSuccess'),
      });
    },
    [basePath]
  );

  return {
    show,
  };
}
