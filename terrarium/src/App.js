import './App.css';
// import  { useEffect, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import World from './components/world';
import { useState, useEffect } from 'react';
// import EyePrediction from './components/eyeprediction'



function App() {


  const [Xposition, setXposition] = useState();
  const [Yposition, setYposition] = useState();
  const [gazeTracking, setGazeTracking] = useState(true);

  useEffect(() => {
    const webgazer = window.webgazer //auto accessable from window
    webgazer.setRegression("ridge"); // does not use clicks to calibrate

    webgazer.setGazeListener((data, clock) => {
      console.log(data, clock);
      webgazer.util.bound(data); // restricts prediction to the bounds of viewport
      var xPos = Math.floor(data.x)
      var yPos = Math.floor(data.y)
      setXposition(xPos);
      setYposition(yPos);
    }).begin()
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
