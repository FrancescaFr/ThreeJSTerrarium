import * as React from 'react';
import './calibrationView.css'
// import '../App.css'
import { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, CardActions, Typography } from '@mui/material';
import CalibrationButtons from './calibrationButtons';

// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';

// Calibration view is intended to capture the following:
// 1. Eye dimensions (pupil x & y) at "average distance" - use for camera zoom/pan reference
// 2. Fine-Tune Gaze Model - use for camera rotation / selection

const webgazer = window.webgazer

export default function CalibrationView({ setWebcamDims, handleCalibrate, defaultEyeFeatures, handleDefaultEyeFeatures }) {
  const [clickCount, setClickCount] = useState(10); // skipping eye calibration for now
  const [faceCapture, setFaceCapture] = useState(0);
  const [webgazerState, setWebgazerState] = useState(false);
  const [buttonVisibility, setbuttonVisibility] = useState(true)
  const buttonCount = 9;


  const setupWebgazer = () => {
    //start webgazer
    // webgazer.setCameraConstraints()
    webgazer.showVideo(false);
    webgazer.setGazeListener(getGaze).begin();
    webgazer.setVideoElementCanvas(getWebcam)
    webgazer.setRegression("ridge"); // does not use movements to calibrate
    webgazer.clearData();
    //require calibration for each session
    webgazer.saveDataAcrossSessions(true);
    // pausing right after begin, then resuming via state prop seems to fix
    // hangup issue on loading
    webgazer.pause();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  useEffect(() => {
    setupWebgazer();
  }, [])


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

    const webcamWidth = capture.getVideoTracks()[0].getSettings().width
    const webcamHeight = capture.getVideoTracks()[0].getSettings().height
    setWebcamDims([webcamWidth, webcamHeight])

    return capture;
  }

  const handleFaceCapture = () => {
    if (faceCapture) {
      handleDefaultEyeFeatures(faceCapture);
    }
    // webgazer.pause()
    // let data = webgazer.getCurrentPrediction();
    // handleDefaultEyeFeatures(data.eyeFeatures);
    // webgazer.resume();
  };

  const getGaze = (data, clock) => {
    try {
      webgazer.util.bound(data); // restricts prediction to the bounds of viewport
      if (data !== null) {
        // console.log(data, clock);
        console.log("Inside of calibration View")

        setFaceCapture(data.eyeFeatures)
      }
    }
    catch (err) { /*console.log('no data')*/ }
  }

  const completeCalibration = () => {
    // webgazer.setGlobalData()
    webgazer.showVideo(false);
    webgazer.clearGazeListener()
    webgazer.removeMouseEventListeners();

    handleCalibrate();
  }
  const handleButtonVisibility = (state) => {
    setbuttonVisibility(state)
  }

  useEffect(() => {
    if (clickCount === 0 || clickCount >= 9) {
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
    // setupWebgazer();
    handleClickCount();
    handleWebgazerState(true);
  }

  const skipCalibration = () => {
    // setupWebgazer()
    setClickCount(10);
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
        <Button onClick={skipCalibration} style={clickCount > 0 ? { visibility: 'hidden' } : { visibility: 'visible' }}> Skip Gaze Calibration</Button>
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

  const abbrInstructions = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          welcome to
        </Typography>
        <Typography variant="h2" component="div">
          ThreeJS Terrarium
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          To get started:
        </Typography>
        <Typography variant="body1">
          1. Allow site to use Webcam (<b>no video will be recorded</b>)
        </Typography>
        <Typography variant="body1">
          2. Wait for video preview and green tracking data to appear.
        </Typography>
        <Typography variant="body1">
          3. Doubleclick 'capture face dimensions'
        </Typography>
      </CardContent>
      <CardActions >
        {defaultEyeFeatures ? <Button onClick={completeCalibration}><b>Start Terrarium</b></Button> :
          <Button onClick={handleFaceCapture}>Capture Face Dims</Button>}
      </CardActions>
    </React.Fragment >
  )

  return (

    <div >
      {/* {handleFaceCapture()} */}

      {clickCount > buttonCount &&
        <div className="main-calibration-view" >
          <Box sx={{ minWidth: 275, boxShadow: 3, maxWidth: 600, margin: 3 }}>
            <Card variant="outlined">{abbrInstructions}</Card>
          </Box>
        </div>
      }
      {/* }      {clickCount > buttonCount &&
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
      } */}
      {
        clickCount > 0 && <CalibrationButtons
          clickCount={clickCount}
          buttonCount={buttonCount}
          handleClickCount={handleClickCount}
          clickMessage={clickMessage}
          handleWebgazerState={handleWebgazerState} />
      }

    </div >)
}