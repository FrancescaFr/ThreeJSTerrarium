
import './webGazer.css';
import { useEffect, useState } from 'react';


const WebGazerComponent = (props) => {

  const webgazer = window.webgazer
  webgazer.showVideo(false);
  webgazer.showPredictionPoints(false)

  useEffect(() => {
    // webgazer.setRegression("ridge"); // does not use mouse move to calibrate
    webgazer.setGazeListener(getGaze).begin();
    webgazer.removeMouseEventListeners();

    // pausing right after begin, then resuming via state prop seems to fix
    // hangup issue on loading
    webgazer.pause();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (props.gazeTracking) {
      webgazer.resume()
    } else {
      webgazer.pause()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.gazeTracking])


  const getGaze = (data, clock) => {
    try {
      webgazer.util.bound(data); // restricts prediction to the bounds of viewport
      if (data !== null) {
        console.log(data, clock);
        let xyCoord = [Math.floor(data.x), Math.floor(data.y)]
        props.coordHandler(xyCoord);
        props.handleEyeFeatures(data.eyeFeatures);

      }
    }
    catch (err) { console.log('no data') }
  }


  return (
    <div id="webGazeResults">
      {/* <div id="buttonContainer">
        <button onClick={webGazeStatus}>{props.gazeTracking ? `Pause webgaze` : `Resume webgaze`}</button>
      </div> */}
      <div id="featureTracker">
        <p> Gaze Position: X = {props.Xposition} Y = {props.Yposition}</p>
        {props.eyeFeatures ? <p>Eye Features: Left Width = {props.eyeFeatures.left.width}</p> : null}
        {props.eyeFeatures ? <p>Eye Features: Left Height = {props.eyeFeatures.left.height}</p> : null}
      </div>
    </div>
  )

}

export default WebGazerComponent;