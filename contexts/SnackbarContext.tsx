import React, { createContext, useCallback, useMemo, useState } from 'react';
import { Snackbar, SnackbarProps, useMediaQuery } from '@mui/material';

import theme from 'config/theme';

export interface SnackbarContextProps {
  setSnackbarProps: (props: SnackbarProps) => void;
}

export const SnackbarContext = createContext<SnackbarContextProps>({ setSnackbarProps: () => {} });

const SnackbarProvider: React.FC = ({ children }) => {
  const [snackbarProps, setSnackbarProps] = useState<SnackbarProps>();

  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const handleSnackbarClose = useCallback(() => {
    setSnackbarProps({ open: false });
  }, []);

  const anchorOrigin: { vertical: 'bottom' | 'top'; horizontal: 'left' | 'right' | 'center' } = useMemo(
    () => ({ vertical: 'bottom', horizontal: matches ? 'right' : 'center' }),
    [matches]
  );

  return (
    <SnackbarContext.Provider value={{ setSnackbarProps }}>
      {children}
      <Snackbar anchorOrigin={anchorOrigin} autoHideDuration={2000} onClose={handleSnackbarClose} {...snackbarProps} />
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
