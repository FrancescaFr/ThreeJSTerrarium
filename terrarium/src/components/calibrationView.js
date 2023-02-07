import * as React from 'react';
import './calibrationView.css'
import '../App.css'
import { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, CardActions, Typography } from '@mui/material';
import CalibrationButtons from './tracking/calibrationButtons';

// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';

// Calibration view is intended to capture the following:
// 1. Eye dimensions (pupil x & y) at "average distance" - use for camera zoom/pan reference
// 2. Fine-Tune Gaze Model - use for camera rotation / selection

export default function CalibrationView({ handleCalibrate, defaultEyeFeatures, handleDefaultEyeFeatures }) {
  const webgazer = window.webgazer;
  const [clickCount, setClickCount] = useState(10); // just for testing
  const [faceCapture, setFaceCapture] = useState(0);
  const [webgazerState, setWebgazerState] = useState(false);
  const [buttonVisibility, setbuttonVisibility] = useState(true)


  useEffect(() => {
    //start webgazer
    webgazer.showVideo(false);
    // webgazer.setCameraConstraints()
    webgazer.setVideoElementCanvas(getWebcam)
    webgazer.setRegression("ridge"); // does not use movements to calibrate
    webgazer.clearData();
    webgazer.setGazeListener(getGaze).begin();
    //require calibration for each session
    webgazer.saveDataAcrossSessions(true);
    // pausing right after begin, then resuming via state prop seems to fix
    // hangup issue on loading
    webgazer.pause();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleWebgazerState = (state) => {
    setWebgazerState(state)
  }

  useEffect(() => {
    if (webgazerState) {
      webgazer.addMouseEventListeners();

    } else {
      webgazer.removeMouseEventListeners();

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webgazerState])

  async function getWebcam() {
    const constraints = {
      video: true,
      // width: { min: 320, ideal: 640, max: 1280 },
      // height: { min: 240, ideal: 480, max: 720 },
      facingMode: "user"
    };
    const capture = await navigator.mediaDevices.getUserMedia(constraints);
    return capture;
  }

  const handleFaceCapture = () => {
    handleDefaultEyeFeatures(faceCapture);
    // webgazer.pause()
    // let data = webgazer.getCurrentPrediction();
    // handleDefaultEyeFeatures(data.eyeFeatures);
    // webgazer.resume();
  };

  const getGaze = (data, clock) => {
    try {
      webgazer.util.bound(data); // restricts prediction to the bounds of viewport
      if (data !== null) {
        console.log(data, clock);
        setFaceCapture(data.eyeFeatures)
      }
    }
    catch (err) { console.log('no data') }
  }

  const completeCalibration = () => {
    // webgazer.setGlobalData()
    webgazer.removeMouseEventListeners();
    // webgazer.setGlobalData();
    handleCalibrate();
  }
  const handleButtonVisibility = (state) => {
    setbuttonVisibility(state)
  }

  useEffect(() => {
    if (clickCount === 0 || clickCount >= 12) {
      webgazer.showVideo(true);
      webgazer.showPredictionPoints(false);
    }
    if (clickCount === 0) {
      handleButtonVisibility(true)
    } else {
      handleButtonVisibility(false)
    }
  }, [clickCount, webgazer])

  const handleClickCount = () => {
    setClickCount(clickCount + 1);
  }


  const clickMessage = 'click me!'

  const startCalibration = () => {
    handleClickCount();
    handleWebgazerState(true);
  }

  const instructions1 = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          welcome to
        </Typography>
        <Typography variant="h2" component="div">
          ThreeJS Terrarium
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          For best results, this experience requires some calibration.
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          To get started:
        </Typography>
        <Typography variant="body1">
          1. Allow site to use Webcam (<b>no video will be recorded</b>)
        </Typography>
        <Typography variant="body1">
          2. Position head so it is centered in the green viewport.
        </Typography>
        <Typography variant="body1">
          3. Click Continue button to follow guided calibration steps.
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={startCalibration} style={clickCount > 0 ? { visibility: 'hidden' } : { visibility: 'visible' }}> Continue</Button>
      </CardActions>
    </React.Fragment >
  )

  const instructions2 = (
    <React.Fragment>
      <CardContent>

        <Typography variant="h4" component="div">
          Final Steps
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Lets get some baseline facial dimensions:
        </Typography>
        <Typography variant="body1">
          1. Again, position head so it is centered in the green viewport.
        </Typography>
        <Typography variant="body1">
          2. Make sure you are facing forward and are a natural distance from your screen.
        </Typography>
        <Typography variant="body1">
          Click below to capture resting position face dimensions:
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleFaceCapture}>Capture Face Dims</Button>
        {defaultEyeFeatures && <Button onClick={completeCalibration}><b>Click to start Terrarium</b></Button>}
      </CardActions>
    </React.Fragment >
  )

  return (
    <div >
      {clickCount > 12 &&
        <div className="main-calibration-view" >
          <Box sx={{ minWidth: 275, boxShadow: 3, maxWidth: 600, margin: 3 }}>
            <Card variant="outlined">{instructions2}</Card>
          </Box>
        </div>
      }
      {
        buttonVisibility &&
        <div className="main-calibration-view">
          <Box sx={{ minWidth: 275, boxShadow: 3, maxWidth: 600, margin: 3 }}>
            <Card variant="outlined">{instructions1}</Card>
          </Box>
        </div>
      }
      {
        clickCount > 0 && <CalibrationButtons
          clickCount={clickCount}
          handleClickCount={handleClickCount}
          clickMessage={clickMessage}
          handleWebgazerState={handleWebgazerState} />
      }

    </div >)
}