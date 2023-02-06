import './App.css';
import { useState, useEffect } from 'react';

import WorldView from './components/worldView';
import CalibrationView from './components/calibrationView';

function App() {

  const [calibrate, setCalibrate] = useState(false)
  const [userState, setUserState] = useState(true)
  const [defaultEyeFeatures, setDefaultEyeFeatures] = useState(null)

  const handleCalibrate = () => {
    setCalibrate(!calibrate);
  }

  const handleUserState = () => {
    //to be built out if authentication is implemented
    setUserState(!userState)
  }

  const handleDefaultEyeFeatures = (data) => {
    setDefaultEyeFeatures(data)
  }

  return (
    <div className="App">
      <div className="App-header">
      </div>
      {/* run calibration page on start. once calibrated, display app*/}
      <div className="page-view">
        {calibrate ?
          <WorldView
            calibrate={calibrate}
            handleCalibrate={handleCalibrate}
            defaultEyeFeatures={defaultEyeFeatures}
            userState={userState}
            handleUserState={handleUserState} /> :
          <CalibrationView
            calibrate={calibrate}
            handleCalibrate={handleCalibrate}
            defaultEyeFeatures={defaultEyeFeatures}
            handleDefaultEyeFeatures={handleDefaultEyeFeatures} />}
      </div>
    </div>

  );
}

export default App;


// <div className="controls-container">
// <button onClick={toggleTracker}>{tracker ? 'Start Facetracker' : 'Start Webgaze'}</button>
// {/* <FaceLandmark face={face} tracker={tracker} /> */}
// <WebGazerComponent
//   Xposition={Xposition}
//   setXhandler={setXhandler}
//   Yposition={Yposition} setYhandler={setYhandler}
//   tracker={tracker}
//   eyeFeatures={eyeFeatures}
//   setEyeFeatures={setEyeFeatures} />
// <EyePrediction Xposition={Xposition} Yposition={Yposition} eyeRegion={eyeRegion} setEyeRegion={setEyeRegion} />
// </div>
// <div id="scene-container">
// <Canvas>
//   <World xPos={Xposition} yPos={Yposition} />
// </Canvas>
// </div >