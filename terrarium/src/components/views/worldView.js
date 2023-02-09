import './worldView.css'

import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
// import { KeyboardControls, PointerLockControls } from '@react-three/drei';
import Button from '@mui/material/Button';
import { List, ListItem, ListItemText } from '@mui/material'; //Item, Drawer, Menu, MenuItem, MenuList,
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import World from '../threeJS/world';
import WebGazerData from '../tracking/webGazerData';
import EyePrediction from './eyePrediction';

import KalmanFilter from "kalmanjs";
// Library Details: https://www.wouterbulten.nl/posts/lightweight-javascript-library-for-noise-filtering
// Kalman Filter parameters
const r = 0.001 // models system noise (negligible)
const q = 0.001 // models measurement noise (may be significant)
const a = 1.05 // models state effects (what we are trying to actually smooth is change btwn measurements)
// presuming that you will keep moving in same direction, applies growth
const fX = (new KalmanFilter({ R: r, Q: q, A: a }))
const fY = (new KalmanFilter({ R: r, Q: q, A: a }))


export default function WorldView({ calibrate, handleCalibrate, userState, handleUseState, defaultEyeFeatures }) {
  const webgazer = window.webgazer;
  const [gazeTracking, setGazeTracking] = useState(true);
  const [webgazeData, setWebgazeData] = useState()
  const [showData, setShowData] = useState(false);
  const [showFaceCapture, setShowFaceCapture] = useState(false);
  const [showPrediction, setShowPrediction] = useState(false);
  const [xyCoord, setXYCoord] = useState([1, 1]);
  const [eyeFeatures, setEyeFeatures] = useState(defaultEyeFeatures);
  const [fullScreenState, setFullScreenState] = useState();
  const [userPositionData, setUserPositionData] = useState();
  const [filtering, setFiltering] = useState(false);
  const [playerState, setPlayerState] = useState(false)


  const worldFullScreen = useFullScreenHandle();

  // still need to switch screen state button text when minimizing with escape key
  // const handleKeyDown = event => {
  //   console.log(event.key);
  //   if (event.key === "Escape") {
  //     setFullScreenState(false);
  //   }
  // };

  const coordHandler = (xycoord) => { setXYCoord(xycoord) };

  const handleWebgazeData = (data) => { setWebgazeData(data) };

  const handleEyeFeatures = (data) => { setEyeFeatures(data) };

  const handleGazeTracking = () => { setGazeTracking(!gazeTracking) };

  const handleTrackingData = () => { setShowData(!showData) };

  const handleFiltering = () => { setFiltering(!filtering) };

  const handleFaceCapture = () => { setShowFaceCapture(!showFaceCapture) };

  const handlePrediction = () => { setShowPrediction(!showPrediction) };

  const handleEyePrediction = (currentData) => {
    if (filtering) {
      currentData.head.x = fX.filter(currentData.head.x).toFixed(3)
      currentData.head.y = fX.filter(currentData.head.y).toFixed(3)
    }
    setUserPositionData(currentData)
  };

  const recalibrate = () => {
    webgazer.clearData();
    webgazer.end();
    handleCalibrate();
  }

  const handleFullScreen = () => {
    setFullScreenState(!fullScreenState);

    if (fullScreenState) {
      worldFullScreen.exit();
    } else {
      worldFullScreen.enter();
    }
  }

  const handlePlayerState = () => {
    setPlayerState(!playerState)
  }

  useEffect(() => {

    // if (!filterX) {
    //   const buildFilters = async () => {
    //     const filterStatus = await setKalmanFilters();
    //     console.log(filterStatus)
    //   }
    //   buildFilters().catch(console.error);
    // }

    const getCurrentData = async () => {
      const currentData = await EyePrediction(defaultEyeFeatures, eyeFeatures, xyCoord, filtering, fX, fY);
      handleEyePrediction(currentData)
    }
    getCurrentData().catch(console.error);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultEyeFeatures, eyeFeatures, xyCoord, fX, fY])

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
      <Button onClick={handleFiltering}>{filtering ? `Disable Kalman Filter` : `Enable Kalman Filter`}</Button>
      <Button onClick={handleFaceCapture}> {showFaceCapture ? 'Hide Face Capture' : 'Show Face Capture'}</Button>
      <Button onClick={handlePrediction}> {showPrediction ? 'Hide Gaze Prediction' : 'Show Gaze Prediction'}</Button>
      <Button onClick={handleTrackingData}> {showData ? 'Hide Tracking Data' : 'Show Tracking Data'}</Button>
      {showData ? <List elevation={2}>
        <ListItem><ListItemText> Gaze (X: {userPositionData.gaze.x} Y: {userPositionData.gaze.y})</ListItemText></ListItem>
        <ListItem><ListItemText>Eye Region: {userPositionData.gaze.region}</ListItemText></ListItem>
        <ListItem><ListItemText> Distance:  {userPositionData.head.dist}</ListItemText></ListItem>
        <ListItem><ListItemText> Head (X: {userPositionData.head.x} Y: {userPositionData.head.y})</ListItemText></ListItem>
      </List> : null}
    </div>


    <FullScreen handle={worldFullScreen}>
      <div id="scene-container">
        <div id="fullscreen-buttons">
          <Button className="fs-button" onClick={handlePlayerState}>{playerState ? 'Escape Snail' : null}</Button>
          <Button className="fs-button" onClick={handleFullScreen}>{fullScreenState ? 'Exit Full Screen' : 'Enter Full Screen'}</Button>
        </div>
        {/* <KeyboardControls
          map={[
            { name: "forward", keys: ["ArrowUp", "w", "W"] },
            { name: "backward", keys: ["ArrowDown", "s", "S"] },
            { name: "left", keys: ["ArrowLeft", "a", "A"] },
            { name: "right", keys: ["ArrowRight", "d", "D"] },
            { name: "jump", keys: ["Space"] },
          ]}> */}
        <Canvas>
          <World userPositionData={userPositionData} xyCoord={xyCoord} defaultEyeFeatures={defaultEyeFeatures} eyeFeatures={eyeFeatures} playerState={playerState} handlePlayerState={handlePlayerState} />
          {/* <PointerLockControls /> */}
        </Canvas>
        {/* </KeyboardControls> */}
      </div >
    </FullScreen>

  </div>

}

