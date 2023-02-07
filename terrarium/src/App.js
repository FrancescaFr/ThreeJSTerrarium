import './App.css';
import { React } from 'react'
import { useState } from 'react';
import CalibrationView from './components/calibrationView';
import WorldView from './components/worldView';

function App() {

  const [calibrate, setCalibrate] = useState(false)
  const [userState, setUserState] = useState(true)
  const [defaultEyeFeatures, setDefaultEyeFeatures] = useState(null)
  const webgazer = window.webgazer

  const handleCalibrate = () => {
    webgazer.end();
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
  );
}

export default App;
