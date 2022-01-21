import * as React from 'react';
import GoogleButton from 'react-google-button';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const Copyright: React.FC = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 8, mb: 4 }}>
      {'Copyright © '}
      <Link color="inherit" href=""></Link> {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

const theme = createTheme();

export const SignUpPage: React.FC<{ onClickGoogleSignIn: () => void }> = ({
  onClickGoogleSignIn,
}) => (
  <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5"></Typography>
        <Typography component="h2" variant="h5">
          Sign Up
        </Typography>
        <Box sx={{ mt: 1 }}>
          <GoogleButton onClick={onClickGoogleSignIn} label="Continue with Google" />
        </Box>
      </Box>
      <Copyright />
    </Container>
  </ThemeProvider>
);
