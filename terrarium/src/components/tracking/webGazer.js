
import './webGazer.css';
import { useEffect } from 'react';


const WebGazerComponent = (props) => {

  const webgazer = window.webgazer


  useEffect(() => {
    // webgazer.showVideo(false);
    // webgazer.showPredictionPoints(false)
    // webgazer.setRegression("ridge"); // does not use mouse move to calibrate
    // webgazer.removeMouseEventListeners();
    // webgazer.applyKalmanFilter(true);
    webgazer.setGazeListener(getGaze).begin();
    webgazer.removeMouseEventListeners();
    // pausing right after begin, then resuming via state prop seems to fix
    // hangup issue on loading
    webgazer.pause();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (props.showFaceCapture) {
      webgazer.showVideo(true);
    } else {
      webgazer.showVideo(false);
    }
    if (props.showPrediction) {
      webgazer.showPredictionPoints(true)

    } else {
      webgazer.showPredictionPoints(false)
    }
  }, [props.showFaceCapture, props.showPrediction])

  useEffect(() => {
    if (props.gazeTracking) {
      webgazer.resume()
      webgazer.removeMouseEventListeners();
    } else {
      webgazer.pause()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.gazeTracking])


  let xyCoord = null;
  let localEyeFeatures = null;

  const getGaze = (data, clock) => {
    try {
      webgazer.util.bound(data); // restricts prediction to the bounds of viewport
      if (data !== null) {
        console.log(data, clock);
        xyCoord = [Math.floor(data.x), Math.floor(data.y)]
        props.coordHandler(xyCoord);
        localEyeFeatures = data.eyeFeatures
        props.handleEyeFeatures(localEyeFeatures);

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
        {xyCoord ? <p> Gaze Position: X = {xyCoord[0]} Y = {xyCoord[1]}</p> : null}
        {localEyeFeatures ? <p>Eye Features: Left Width = {localEyeFeatures.left.width}</p> : null}
        {localEyeFeatures ? <p>Eye Features: Left Height = {localEyeFeatures.left.height}</p> : null}
      </div>
    </div>
  )

}

export default WebGazerComponent;