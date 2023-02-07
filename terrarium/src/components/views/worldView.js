import './worldView.css'

import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Button from '@mui/material/Button';
import { List, ListItem, ListItemText } from '@mui/material'; //Item, Drawer, Menu, MenuItem, MenuList,
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import World from '../threeJS/world';
import WebGazerData from '../tracking/webGazer';
import EyePrediction from '../tracking/eyePrediction';

export default function WorldView({ calibrate, handleCalibrate, userState, handleUseState, defaultEyeFeatures }) {
  const webgazer = window.webgazer;
  const [gazeTracking, setGazeTracking] = useState(true);
  const [webgazeData, setWebgazeData] = useState()
  const [showData, setShowData] = useState(false);
  const [showFaceCapture, setShowFaceCapture] = useState(false);
  const [showPrediction, setShowPrediction] = useState(false);
  const [xyCoord, setXYCoord] = useState();
  const [eyeFeatures, setEyeFeatures] = useState(defaultEyeFeatures);
  // const [eyeRegion, setEyeRegion] = useState();
  const [fullScreenState, setFullScreenState] = useState()
  const [userPositionData, setUserPositionData] = useState()

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
  const handleEyePrediction = (currentData) => {
    setUserPositionData(currentData)
  }
  // let baseEyeFeatures;
  // useEffect(() => {
  //   console.log('default eye features: ', defaultEyeFeatures)
  //   baseEyeFeatures = defaultEyeFeatures;
  // }, [])

  useEffect(() => {
    const getCurrentData = async () => {
      const currentData = await EyePrediction(defaultEyeFeatures, eyeFeatures, xyCoord);
      handleEyePrediction(currentData)
    }
    getCurrentData().catch(console.error);

  }, [defaultEyeFeatures, eyeFeatures, xyCoord])

  return <div >
    <WebGazerData
      webgazeData={webgazeData}
      showFaceCapture={showFaceCapture}
      showPrediction={showPrediction}
      handleWebgazeData={handleWebgazeData}
      coordHandler={coordHandler}
      handleEyeFeatures={handleEyeFeatures}
      gazeTracking={gazeTracking} />

    <div className="controls-container">
      <Button onClick={recalibrate}>Recalibrate</Button>
      <Button onClick={handleGazeTracking}>{gazeTracking ? `Pause webgaze` : `Resume webgaze`}</Button>
      <Button onClick={handleFaceCapture}> {showFaceCapture ? 'Hide Face Capture' : 'Show Face Capture'}</Button>
      <Button onClick={handlePrediction}> {showPrediction ? 'Hide Gaze Prediction' : 'Show Gaze Prediction'}</Button>
      <Button onClick={handleTrackingData}> {showData ? 'Hide Tracking Data' : 'Show Tracking Data'}</Button>
      {showData ? <List elevation={2}>
        <ListItem><ListItemText> Gaze (X: {userPositionData.gaze.x} Y: {userPositionData.gaze.y})</ListItemText></ListItem>
        <ListItem><ListItemText>Region: {userPositionData.gaze.region}</ListItemText></ListItem>
        <ListItem><ListItemText> Distance:  {userPositionData.head.dist}</ListItemText></ListItem>
        <ListItem><ListItemText> Head (X: {userPositionData.head.x} Y: {userPositionData.head.y})</ListItemText></ListItem>
      </List> : null}

    </div>


    {/* <EyePrediction Xposition={xyCoord[0]} Yposition={xyCoord[1]} eyeRegion={eyeRegion} setEyeRegion={setEyeRegion} /> */}
    <FullScreen handle={worldFullScreen}>
      <div id="scene-container">
        <Button id="fullscreen-button" onClick={handleFullScreen}>{fullScreenState ? 'Exit Full Screen' : 'Enter Full Screen'}</Button>
        <Canvas camera={cameraSettings}>
          <World userPositionData={userPositionData} xyCoord={xyCoord} defaultEyeFeatures={defaultEyeFeatures} eyeFeatures={eyeFeatures} />
        </Canvas>
      </div >
    </FullScreen>

  </div>

}

