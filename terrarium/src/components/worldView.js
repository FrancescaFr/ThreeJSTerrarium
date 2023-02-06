import './worldView.css'

import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import World from './threeJS/world';
import WebGazerComponent from './tracking/webGazer';
import EyePrediction from './tracking/eyeprediction';

export default function WorldView({ calibrate, handleCalibrate, userState, handleUseState, defaultEyeFeatures }) {
  const webgazer = window.webgazer;
  const [gazeTracking, setGazeTracking] = useState(true);
  const [webgazeData, setWebgazeData] = useState()
  const [xyCoord, setXYCoord] = useState();
  const [eyeFeatures, setEyeFeatures] = useState();
  const [eyeRegion, setEyeRegion] = useState("undefined");


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

  return <div>
    <h1>World View</h1>
    <div className="controls-container">
      <button onClick={recalibrate}>Recalibrate</button>
      <button onClick={handleGazeTracking}>{gazeTracking ? `Pause webgaze` : `Resume webgaze`}</button>
    </div>
    <WebGazerComponent
      webgazeData={webgazeData}
      handleWebgazeData={handleWebgazeData}
      coordHandler={coordHandler}
      handleEyeFeatures={handleEyeFeatures}
      gazeTracking={gazeTracking} />
    {/* <EyePrediction Xposition={xyCoord[0]} Yposition={xyCoord[1]} eyeRegion={eyeRegion} setEyeRegion={setEyeRegion} /> */}

    <div id="scene-container">
      <Canvas>
        <World xyCoord={xyCoord} defaultEyeFeatures={defaultEyeFeatures} eyeFeatures={eyeFeatures} />
      </Canvas>
    </div >

  </div>

}

