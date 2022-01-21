import { Button, Typography } from '@mui/material';

export const WebsitePage: React.FC<{ onGetStartedPath: string }> = ({ onGetStartedPath }) => (
  <body>
    <div id="GetStarted">
      <div>
        <Typography component="h1"></Typography>
      </div>
      <div>
        <a href={onGetStartedPath}>
          <Button variant="contained">
            <Typography>Get Started</Typography>
          </Button>
        </a>
      </div>
    </div>
  </body>
);
