import './App.css';
// < !-- < link rel = "icon" href = "%PUBLIC_URL%/favicon.ico" /> -->
import { Canvas } from '@react-three/fiber';
import World from './components/world';
// import CalibrationButtons from './components/calibrationButtons';
import { useState, useEffect } from 'react';
import ExperimentWorld from './components/experimentWorld';
// import EyePrediction from './components/eyeprediction'
const webgazer = window.webgazer //auto accessable from window

function App() {
  const [Xposition, setXposition] = useState(0);
  const [Yposition, setYposition] = useState(0);
  const [gazeTracking, setGazeTracking] = useState(true);
  // TODO: Build Calibration Screen
  // const [calibrationCount, setCalibrationCount] = useState(0);
  // const [calibrated, setCalibrated] = useState(false);
  // const clickCount = 1;


  const webgazerSetup = () => {
    // TODO: Refine webgazer (calibration and continued monitoring)
    webgazer.setRegression("weightedRidge"); // "ridge" does not use clicks to calibrate
    webgazer.clearData();
    // const constraints = {
    //   video: {}
    // }
    // webgazer.setCameraConstraints(constraints)
    webgazer.params.showVideo = false;
    webgazer.setGazeListener((data, clock) => {
      try {
        console.log(data, clock);
        // webgazer.util.bound(data); // restricts prediction to the bounds of viewport
        var xPos = Math.floor(data.x)
        var yPos = Math.floor(data.y)
        setXposition(xPos);
        setYposition(yPos);
      }
      catch (err) { console.log('Could not start GazeListener') }
    }).begin();
    //pausing right after begin, then resuming via state prop seems to fix
    //hangup issue on loading
    webgazer.pause();
  }

  // const getEyePrediction = () => {
  //   EyePrediction()
  //     .then(result => {
  //       setEyePosition(result)
  //     })

  // };

  const webGazeStatus = () => {
    const webgazer = window.webgazer //auto accessable from window
    gazeTracking ? webgazer.pause() : webgazer.resume();
    setGazeTracking(!gazeTracking)
  }

  useEffect(() => {
    // webgazerSetup();

  }, []);




  return (
    <div id="scene-container">
      {/* <CalibrationButtons clickCount={clickCount} /> */}
      <div className="App-header">
        {/* <h1>Three JS Terrarium</h1> */}
        <div> {/* WebGazer Controls */}
          {/* <button onClick={webGazeStatus}>{gazeTracking ? `Pause Tracker` : `Resume Tracker`}</button> */}
          {/* <p> Eye Position: X = {Xposition} Y = {Yposition}</p> */}
        </div>
      </div>
      {/* ThreeJS content */}
      <Canvas>
        {/* <World xPos={Xposition} yPos={Yposition} /> */}
        <ExperimentWorld />
      </Canvas>

    </div>
  );
}

export default App;
