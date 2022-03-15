import { useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { SnackbarContext } from 'contexts/SnackbarContext';

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
        message: t('scene.share.success'),
      });
    },
    [basePath]
  );

  return {
    show,
  };
}
