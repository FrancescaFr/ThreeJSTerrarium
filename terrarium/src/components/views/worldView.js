import './worldView.css'

import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stats, KeyboardControls } from '@react-three/drei';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import KalmanFilter from "kalmanjs";

//MUI Imports
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { List, ListItem, ListItemText } from '@mui/material'; //Item, Drawer, Menu, MenuItem, MenuList,
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

// Components, custom function imports
import World from '../threeJS/world';
import WebGazerData from '../tracking/webGazerData';
import EyePrediction from './eyePrediction';
import FilterSlider from './filterSlider';


const webgazer = window.webgazer

export default function WorldView({ calibrate, handleCalibrate, userState, handleUseState, defaultEyeFeatures, handleDefaultEyeFeatures }) {
  const [gazeTracking, setGazeTracking] = useState(true);
  const [webgazeData, setWebgazeData] = useState()
  const [showControls, setShowControls] = useState(false)
  const [showData, setShowData] = useState(false);
  const [showFaceCapture, setShowFaceCapture] = useState(false);
  const [showPrediction, setShowPrediction] = useState(false);
  const [xyCoord, setXYCoord] = useState([1, 1]);
  const [eyeFeatures, setEyeFeatures] = useState(defaultEyeFeatures);
  const [fullScreenState, setFullScreenState] = useState();
  const [userPositionData, setUserPositionData] = useState();
  const [filtering, setFiltering] = useState(true);
  const [playerState, setPlayerState] = useState(false)
  const [r, setR] = useState(0.0001); //might not update
  const [q, setQ] = useState(0.02);
  const [a, setA] = useState(0.95);
  const [gazeR, setGazeR] = useState(0.0001); //might not update
  const [gazeQ, setGazeQ] = useState(10); // much more measurement noise (post calc gaze)
  const [gazeA, setGazeA] = useState(0.95);
  const [fX, setFx] = useState(new KalmanFilter({ R: r, Q: q, A: a }))
  const [fY, setFy] = useState(new KalmanFilter({ R: r, Q: q, A: a }))
  const [fD, setFd] = useState(new KalmanFilter({ R: r, Q: q, A: a }))
  //const [fG, setFg] = useState(new KalmanFilter({ R: gazeR, Q: gazeQ, A: gazeA}))
  const [fGx, setFgx] = useState(new KalmanFilter({ R: gazeR, Q: gazeQ, A: gazeA }))
  const [fGy, setFgy] = useState(new KalmanFilter({ R: gazeR, Q: gazeQ, A: gazeA }))

  // Library Details: https://www.wouterbulten.nl/posts/lightweight-javascript-library-for-noise-filtering
  // Kalman Filter default parameters - for position control (increase state effect val for rotation control)
  // let r = 0.0001 // models system noise (negligible)
  // let q = 0.02 // models measurement noise (may be significant)
  // let a = 0.95 // models state effects (what we are trying to actually smooth is change btwn measurements)
  // <1 applies dampening effect (less jittery/less responsive to movement)
  // filter can also accommodate a control function matrix (could be customized for particular applications)

  const updateGazeFilters = () => {
    // setFg(new KalmanFilter({ R: r, Q: q, A: a }));
    setFgx(new KalmanFilter({ R: r, Q: q, A: a }));
    setFgy(new KalmanFilter({ R: r, Q: q, A: a }));

  }

  const updateFilters = () => {
    setFx(new KalmanFilter({ R: r, Q: q, A: a }));
    setFy(new KalmanFilter({ R: r, Q: q, A: a }));
    setFd(new KalmanFilter({ R: r, Q: q, A: a }));
  }

  useEffect(() => { updateFilters() }, [a, r, q]);

  useEffect(() => { updateGazeFilters() }, [gazeA, gazeQ, gazeR]);

  useEffect(() => {

    const getCurrentData = async () => {
      const currentData = await EyePrediction(defaultEyeFeatures, eyeFeatures, xyCoord);
      handleEyePrediction(currentData)
    }
    getCurrentData().catch(console.error);


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultEyeFeatures, eyeFeatures, xyCoord])


  const coordHandler = (xycoord) => { setXYCoord(xycoord) };

  const handleWebgazeData = (data) => { setWebgazeData(data) };

  const handleEyeFeatures = (data) => { setEyeFeatures(data) };

  const recalibrateFace = () => { handleDefaultEyeFeatures(eyeFeatures) };

  const handleGazeTracking = () => { setGazeTracking(!gazeTracking) };

  const handleShowControls = () => { setShowControls(!showControls) };

  const handleTrackingData = () => { setShowData(!showData) };

  const handleFiltering = () => { setFiltering(!filtering) };

  const handleFaceCapture = () => { setShowFaceCapture(!showFaceCapture) };

  const handlePlayerState = () => { setPlayerState(!playerState) };

  const handlePrediction = () => { setShowPrediction(!showPrediction) };

  const handleEyePrediction = (currentData) => {
    if (filtering) {
      currentData.head.x = fX.filter(currentData.head.x).toFixed(4)
      currentData.head.y = fY.filter(currentData.head.y).toFixed(4)
      currentData.head.dist = fD.filter(currentData.head.dist).toFixed(3)
      currentData.gaze.x = fGx.filter(currentData.gaze.x).toFixed(1)
      currentData.gaze.y = fGy.filter(currentData.gaze.y).toFixed(1)
    }
    setUserPositionData(currentData)
  };

  const worldFullScreen = useFullScreenHandle();

  // TODO: still need to switch screen state button text when minimizing with escape key (not working)
  // const handleKeyDown = event => {
  //   console.log(event.key);
  //   if (event.key === "Escape") {
  //     setFullScreenState(false);
  //   }
  // };

  const handleFullScreen = () => {
    setFullScreenState(!fullScreenState);
    if (fullScreenState) {
      worldFullScreen.exit();
    } else {
      worldFullScreen.enter();
    }
  }

  const recalibrate = () => {
    webgazer.clearData();
    webgazer.end();
    handleCalibrate();
  }

  return <div >
    <WebGazerData
      webgazeData={webgazeData}
      showFaceCapture={showFaceCapture}
      showPrediction={showPrediction}
      handleWebgazeData={handleWebgazeData}
      coordHandler={coordHandler}
      handleEyeFeatures={handleEyeFeatures}
      gazeTracking={gazeTracking} />

    <FullScreen handle={worldFullScreen}>
      <div className="controls-container">
        <Box>
          <Button sx={{ color: "blue" }} onClick={handleShowControls}>{showControls ? `Hide Controls` : `Controls`}</Button>
          {/* <Button onClick={recalibrate}>Recalibrate</Button> */}

          <Button onClick={handleFullScreen}>{fullScreenState ? <FullscreenExitIcon /> : <FullscreenIcon />}</Button>
          {showControls ?
            <>
              <Button onClick={handleGazeTracking}>{gazeTracking ? `Pause webgaze` : `Resume webgaze`}</Button>
              <Button onClick={handleFiltering}>{filtering ? `Disable Kalman Filter` : `Enable Kalman Filter`}</Button>
              <Box sx={{}} id="filter-slider">
                {filtering ? <FilterSlider q={q} setQ={setQ} a={a} setA={setA} /> : null}
              </Box>
              <Button onClick={handleFaceCapture}> {showFaceCapture ? 'Hide Face Capture' : 'Show Face Capture'}</Button>
              {showFaceCapture ? <Button sx={{ color: "blue" }} onClick={recalibrateFace}>Recalibrate Face Mesh</Button> : null}
              <Button onClick={handlePrediction}> {showPrediction ? 'Hide Gaze Prediction' : 'Show Gaze Prediction'}</Button>

              <Button onClick={handleTrackingData}> {showData ? 'Hide Tracking Data' : 'Show Tracking Data'}</Button>
              {showData ? <List sx={{ color: "blue" }} elevation={-1}>
                <ListItem><ListItemText> Gaze (X: {userPositionData.gaze.x} Y: {userPositionData.gaze.y})</ListItemText></ListItem>
                <ListItem><ListItemText>Eye Region: {userPositionData.gaze.region}</ListItemText></ListItem>
                <ListItem><ListItemText> Distance:  {userPositionData.head.dist}</ListItemText></ListItem>
                <ListItem><ListItemText> Head (X: {userPositionData.head.x} Y: {userPositionData.head.y})</ListItemText></ListItem>
              </List> : null}
            </> : null}
        </Box>
      </div>

      <div id="scene-container">
        {playerState ?
          <Box id="fullscreen-buttons">
            <Button onClick={handlePlayerState}> Escape Snail </Button>
          </Box> : null}
        <KeyboardControls
          map={[
            { name: "forward", keys: ["ArrowUp", "KeyW"] },
            { name: "backward", keys: ["ArrowDown", "KeyS"] },
            { name: "left", keys: ["ArrowLeft", "KeyA"] },
            { name: "right", keys: ["ArrowRight", "KeyD"] },
            { name: "space", keys: ["Space"] },
            { name: "control", keys: ["KeyC", "Control"] },
            { name: "escape", keys: ["Escape"] },
            { name: "x", keys: ["KeyX"] },
            { name: "reset", keys: ["KeyR"] },
            { name: "shift", keys: ["Shift"] }
          ]}>
          <Canvas>
            {/* helper tools for development */}
            <axesHelper args={[10]} />
            <Stats />
            <World
              userPositionData={userPositionData}
              gazeTracking={gazeTracking}
              playerState={playerState}
              handlePlayerState={handlePlayerState}
              handleCalibrate={handleCalibrate}
              setFullScreenState={setFullScreenState} />
            {/* <PointerLockControls /> */}
          </Canvas>
        </KeyboardControls>
      </div >
    </FullScreen>

  </div>

}

