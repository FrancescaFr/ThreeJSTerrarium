import { useEffect, useState } from "react";


// Calibration view is intended to capture the following:
// 1. Eye dimensions (pupil x & y) at "average distance" - use for camera zoom/pan reference
// 2. Fine-Tune Gaze Model - use for camera rotation / selection


export default function CalibrationView({ handleCalibrate, defaultEyeFeatures, handleDefaultEyeFeatures }) {

  const webgazer = window.webgazer;
  const [clickCount, setClickCount] = useState(0);
  const [faceCapture, setFaceCapture] = useState();

  useEffect(() => {
    //start webgazer
    webgazer.showVideo(true);
    // webgazer.setCameraConstraints()
    webgazer.setVideoElementCanvas(getWebcam)
    webgazer.setRegression("ridge"); // does not use clicks to calibrate
    webgazer.setGazeListener(getGaze).begin();
    webgazer.saveDataAcrossSessions(false);
    // pausing right after begin, then resuming via state prop seems to fix
    // hangup issue on loading
    webgazer.pause();
    //stop webgazer

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getWebcam() {
    const constraints = {
      video: true,
      // width: { min: 320, ideal: 640, max: 1280 },
      // height: { min: 240, ideal: 480, max: 720 },
      facingMode: "user"
    };
    const capture = await navigator.mediaDevices.getUserMedia(constraints);
    return capture;
  }


  const handleFaceCapture = () => {
    handleDefaultEyeFeatures(faceCapture);
    // webgazer.pause()
    // let data = webgazer.getCurrentPrediction();
    // handleDefaultEyeFeatures(data.eyeFeatures);
    // webgazer.resume();
  };

  const getGaze = (data, clock) => {
    try {
      webgazer.util.bound(data); // restricts prediction to the bounds of viewport
      if (data !== null) {
        console.log(data, clock);
        setFaceCapture(data.eyeFeatures)
      }
    }
    catch (err) { console.log('no data') }
  }

  const completeCalibration = () => {
    // webgazer.setGlobalData()
    webgazer.removeMouseEventListeners();
    // webgazer.setGlobalData();
    handleCalibrate();
  }

  return (
    <>
      <h1> Calibration View</h1>
      <div className="controls-container">
        {/* <button onClick={setClickCount(clickCount + 1)}> Count {clickCount} </button> */}
        <p>Window Width {window.innerWidth} Window Height {window.innerHeight}</p>
        <button onClick={handleFaceCapture}>Capture Face Dims</button>
        <button onClick={completeCalibration}>Calibrate</button>
      </div>
      <div className="button-grid">
      </div>
    </>)
}