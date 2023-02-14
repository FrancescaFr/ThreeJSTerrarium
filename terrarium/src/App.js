import './App.css';
import { React, Suspense } from 'react'
import { useState } from 'react';
import CalibrationView from './components/views/calibrationView';
import WorldView from './components/views/worldView';
import LoadingScreen from './components/views/loadingScreen';

const webgazer = window.webgazer

function App() {

  const [calibrate, setCalibrate] = useState(false)
  const [userState, setUserState] = useState(true)
  const [defaultEyeFeatures, setDefaultEyeFeatures] = useState()

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
          webgazer={webgazer}
          calibrate={calibrate}
          handleCalibrate={handleCalibrate}
          defaultEyeFeatures={defaultEyeFeatures}
          handleDefaultEyeFeatures={handleDefaultEyeFeatures}
          userState={userState}
          handleUserState={handleUserState} /> :
        <CalibrationView
          webgazer={webgazer}
          calibrate={calibrate}
          handleCalibrate={handleCalibrate}
          defaultEyeFeatures={defaultEyeFeatures}
          handleDefaultEyeFeatures={handleDefaultEyeFeatures} />}
    </div>
  );
}

export default App;
