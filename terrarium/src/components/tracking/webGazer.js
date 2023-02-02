
import './webGazer.css';
import { useState } from 'react';


const WebGazerComponent = (props) => {
  const webgazer = window.webgazer //auto accessable from window
  const [gazeTracking, setGazeTracking] = useState(true);

  const startWebgazer = () => {
    // webgazer.setRegression("ridge"); // does not use clicks to calibrate
    webgazer.setGazeListener(getGaze).begin();
    // pausing right after begin, then resuming via state prop seems to fix
    // hangup issue on loading
    webgazer.resume();
    webgazer.pause();
  };

  const getGaze = (data, clock) => {
    try {
      // webgazer.util.bound(data); // restricts prediction to the bounds of viewport
      if (data !== null) {
        console.log(data, clock);
        var xPos = Math.floor(data.x)
        var yPos = Math.floor(data.y)
        props.setXhandler(xPos);
        props.setYhandler(yPos);
      }
    }
    catch (err) { console.log('no data') }
  }

  const webGazeStatus = () => {
    // const webgazer = window.webgazer //auto accessable from window
    gazeTracking ? webgazer.pause() : webgazer.resume();
    setGazeTracking(!gazeTracking)
  }


  return (
    <div id="buttonContainer">
      <button onClick={startWebgazer}>Start Webgazer</button>
      <button onClick={webGazeStatus}>{gazeTracking ? `Pause Tracker` : `Start Tracker`}</button>
      <p> Eye Position: X = {props.Xposition} Y = {props.Yposition}</p>
    </div>
  )


}

export default WebGazerComponent;