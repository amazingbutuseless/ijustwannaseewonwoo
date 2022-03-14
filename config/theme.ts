import { createTheme } from '@mui/material';

const theme = createTheme();
theme.typography.h2 = {
  margin: 0,
  padding: 0,
  fontSize: '2.4rem',
  fontWeight: 300,
  lineHeight: '1.5',
};
theme.typography.body1 = {
  fontSize: '1.6rem',
  lineHeight: '1.5',
};
theme.typography.body2 = {
  fontSize: '1.4rem',
  lineHeight: '1.5',
};

export default theme;
