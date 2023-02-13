
import './webGazerData.css';
import { useEffect } from 'react';

const WebGazerData = (props) => {

  const webgazer = window.webgazer

  const configureWebgazer = () => {
    webgazer.showVideo(false);
    webgazer.showPredictionPoints(false)
    // webgazer.setRegression("ridge"); // does not use mouse move to calibrate
    // webgazer.removeMouseEventListeners();
    // webgazer.loadGlobalData();
    webgazer.setGazeListener(getGaze).begin();
    // do not use if, custom filtering applied in worldView
    webgazer.applyKalmanFilter(true);

    // webgazer.removeMouseEventListeners();
    // pausing right after begin, then resuming via state prop seems to fix
    // hangup issue on loading

  }

  useEffect(() => {
    configureWebgazer();
    webgazer.pause();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (props.showFaceCapture) {
      webgazer.showVideo(true);
    } else {
      webgazer.begin();
      webgazer.showVideo(false);

    }
    if (props.showPrediction) {
      webgazer.showPredictionPoints(true)

    } else {
      webgazer.showPredictionPoints(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.showFaceCapture, props.showPrediction])

  useEffect(() => {
    if (props.gazeTracking) {
      webgazer.resume()
      // webgazer.removeMouseEventListeners();
    } else {
      webgazer.pause()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.gazeTracking])


  let xyCoord = null;

  const getGaze = (data, clock) => {
    try {
      webgazer.util.bound(data); // restricts prediction to the bounds of viewport
      if (data !== null) {
        // console.log(data, clock);
        xyCoord = [Math.floor(data.x), Math.floor(data.y)]
        props.coordHandler(xyCoord);
        const localEyeFeatures = data.eyeFeatures
        props.handleEyeFeatures(localEyeFeatures);

      }
    } catch (err) { console.log("getGaze", err) }
  }

  return (
    <div id="webGazeResults"></div>
  )

}

export default WebGazerData;