import './App.css';
// import  { useEffect, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import World from './components/threeJS/world';
// import FaceLandmark from './components/tracking/faceLandmark';
import { useState } from 'react';
import WebGazerComponent from './components/tracking/webGazer';
import EyePrediction from './components/tracking/eyeprediction'

function App() {

  const [Xposition, setXposition] = useState(0);
  const [Yposition, setYposition] = useState(0);
  const [eyeRegion, setEyeRegion] = useState("undefined");

  // const [face, setFace] = useState(0);
  // FaceLandmark();

  const setXhandler = (position) => { setXposition(position) };
  const setYhandler = (position) => { setYposition(position) };


  // const getEyePrediction = () => {
  //   EyePrediction()
  //     .then(result => {
  //       setEyePosition(result)
  //     })

  // };

  // const getFace = () => {
  //   setFace(face + 1);
  // }

  return (
    <div id="scene-container">
      <div className="App-header">
        <h2>Three JS Terrarium</h2>
        {/* <button onClick={getFace}>Update FaceApi Data</button> */}
        {/* <FaceLandmark face={face} /> */}
        <WebGazerComponent Xposition={Xposition} setXhandler={setXhandler} Yposition={Yposition} setYhandler={setYhandler} />
        <EyePrediction Xposition={Xposition} Yposition={Yposition} eyeRegion={eyeRegion} setEyeRegion={setEyeRegion} />
      </div>
      <Canvas>
        <World xPos={Xposition} yPos={Yposition} />
      </Canvas>
    </div >
  );
}

export default App;
