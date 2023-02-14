import './calibrationView.css'
import * as React from 'react';

//MUI Imports
import { Box, Card, CardContent, Typography } from '@mui/material';

const loadingMessage = (
  <React.Fragment>
    <CardContent>
      <Typography variant="h2" component="div">
        Scene is Loading...
      </Typography>
      <Typography variant="body1">
        ...it may take a minute
      </Typography>
    </CardContent>
  </React.Fragment >)

const LoadingScreen = () => {

  <div className="loading-screen" >
    <Box sx={{ minWidth: 275, boxShadow: 3, maxWidth: 600, margin: 3 }}>
      <Card variant="outlined">{loadingMessage}</Card>
    </Box>
  </div>
}

export default LoadingScreen;
