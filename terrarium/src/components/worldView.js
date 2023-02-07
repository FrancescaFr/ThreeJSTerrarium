import './worldView.css'

import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Button from '@mui/material/Button';
import { List, ListItem, ListItemText } from '@mui/material'; //Item, Drawer, Menu, MenuItem, MenuList,
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import World from './threeJS/world';
import WebGazerComponent from './tracking/webGazer';
// import EyePrediction from './tracking/eyeprediction';

export default function WorldView({ calibrate, handleCalibrate, userState, handleUseState, defaultEyeFeatures }) {
  const webgazer = window.webgazer;
  const [gazeTracking, setGazeTracking] = useState(true);
  const [webgazeData, setWebgazeData] = useState()
  const [showData, setShowData] = useState(false);
  const [showFaceCapture, setShowFaceCapture] = useState(false);
  const [showPrediction, setShowPrediction] = useState(false);
  const [xyCoord, setXYCoord] = useState();
  const [eyeFeatures, setEyeFeatures] = useState(defaultEyeFeatures);
  const [fullScreenState, setFullScreenState] = useState()

  const worldFullScreen = useFullScreenHandle();

  // still need to switch screen state button text when minimizing with escape key
  // const handleKeyDown = event => {
  //   console.log(event.key);
  //   if (event.key === "Escape") {
  //     setFullScreenState(false);
  //   }
  // };

  const coordHandler = (xycoord) => { setXYCoord(xycoord) };

  const recalibrate = () => {
    webgazer.clearData();
    webgazer.end();
    handleCalibrate();
  }

  const handleWebgazeData = (data) => {
    setWebgazeData(data);
  }

  const handleGazeTracking = () => {
    setGazeTracking(!gazeTracking);
  }

  const handleEyeFeatures = (data) => {
    setEyeFeatures(data);
  }

  const handleTrackingData = () => {
    setShowData(!showData);
  }

  const handleFullScreen = () => {
    setFullScreenState(!fullScreenState);

    if (fullScreenState) {
      worldFullScreen.exit();
    } else {
      worldFullScreen.enter();
    }
  }

  const cameraSettings = {
    fov: 45,
    zoom: 1,
    near: 0.1,
    far: 200,
    position: [1, 1, 10]
  }

  const handleFaceCapture = () => {
    setShowFaceCapture(!showFaceCapture);
  }

  const handlePrediction = () => {
    setShowPrediction(!showPrediction)
  }


  return <div >

    <div className="controls-container">
      <Button onClick={recalibrate}>Recalibrate</Button>
      <Button onClick={handleGazeTracking}>{gazeTracking ? `Pause webgaze` : `Resume webgaze`}</Button>
      <Button onClick={handleFaceCapture}> {showFaceCapture ? 'Hide Face Capture' : 'Show Face Capture'}</Button>
      <Button onClick={handlePrediction}> {showPrediction ? 'Hide Gaze Prediction' : 'Show Gaze Prediction'}</Button>
      <Button onClick={handleTrackingData}> {showData ? 'Hide Tracking Data' : 'Show Tracking Data'}</Button>
      {showData ? <List elevation={2}>
        <ListItem><ListItemText>Gaze X: {xyCoord[0]} Y: {xyCoord[1]}</ListItemText></ListItem>
        <ListItem><ListItemText> Eye Size (Distance): {eyeFeatures.left.width}</ListItemText></ListItem>
        <ListItem><ListItemText> Head X: {Math.floor((eyeFeatures.left.imagex + eyeFeatures.right.imagex) / 2)} </ListItemText></ListItem>
        <ListItem><ListItemText> Head Y: {Math.floor((eyeFeatures.left.imagey + eyeFeatures.right.imagey) / 2)}</ListItemText> </ListItem>
      </List> : null}

    </div>
    <WebGazerComponent
      webgazeData={webgazeData}
      showFaceCapture={showFaceCapture}
      showPrediction={showPrediction}
      handleWebgazeData={handleWebgazeData}
      coordHandler={coordHandler}
      handleEyeFeatures={handleEyeFeatures}
      gazeTracking={gazeTracking} />
    {/* <EyePrediction Xposition={xyCoord[0]} Yposition={xyCoord[1]} eyeRegion={eyeRegion} setEyeRegion={setEyeRegion} /> */}
    <FullScreen handle={worldFullScreen}>
      <div id="scene-container">
        <Button id="fullscreen-button" onClick={handleFullScreen}>{fullScreenState ? 'Exit Full Screen' : 'Enter Full Screen'}</Button>
        <Canvas camera={cameraSettings}>
          <World xyCoord={xyCoord} defaultEyeFeatures={defaultEyeFeatures} eyeFeatures={eyeFeatures} />
        </Canvas>
      </div >
    </FullScreen>

  </div>

}

