import './App.css';
// import  { useEffect, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import World from './components/world';
import { useState, useEffect } from 'react';
// import EyePrediction from './components/eyeprediction'
const webgazer = window.webgazer //auto accessable from window



function App() {


  const [Xposition, setXposition] = useState(0);
  const [Yposition, setYposition] = useState(0);
  const [gazeTracking, setGazeTracking] = useState(true);

  useEffect(() => {
    // webgazer.setRegression("ridge"); // does not use clicks to calibrate
    // webgazer.clearData();
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
  }, []);

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

  return (
    <div id="scene-container">
      <div className="App-header">
        {/* <h1>Three JS Terrarium</h1> */}
        <button onClick={webGazeStatus}>{gazeTracking ? `Pause Tracker` : `Resume Tracker`}</button>
        <p> Eye Position: X = {Xposition} Y = {Yposition}</p>
      </div>
      <Canvas>
        <World xPos={Xposition} yPos={Yposition} />
      </Canvas>
    </div>
  );
}

export default App;
