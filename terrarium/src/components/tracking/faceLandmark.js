import { useEffect, useRef } from "react";
import * as ml5 from 'ml5';

const FaceLandmark = (props) => {
  // const ml5 = window.ml5
  const videoElement = useRef();
  const canvas = useRef();
  let video;
  let faceapi;
  let detections;
  let ctx;
  const width = 360;
  const height = 280;

  useEffect(() => {
    if (props.tracker) {
      //stop face tracker
      faceapi.ready = false;
    } else {
      make().then((result) => {
        console.log("made model")
      });
    }
  }, [props.tracker])


  // by default all options are set to true
  const detectionOptions = {
    withLandmarks: true,
    withDescriptors: false,
    MODEL_URLS: {
      // FaceLandmarkModel: 'https://raw.githubusercontent.com/ml5js/ml5-data-and-models/main/models/faceapi/face_landmark_68_model-weights_manifest.json',
      FaceLandmark68TinyNet: 'https://raw.githubusercontent.com/ml5js/ml5-data-and-models/main/models/faceapi/face_landmark_68_tiny_model-weights_manifest.json',
    },
  };

  async function make() {
    // get the video
    video = await getVideo();

    // check that video is valid format
    console.log("Video is HTMLVideo", video instanceof HTMLVideoElement)

    createCanvas(width, height);
    ctx = canvas.current.getContext("2d");

    // initializing faceapi with video source 
    faceapi = ml5.faceApi(video, detectionOptions, modelReady);
  }

  // useEffect(() => {
  //   make().then((result) => {
  //     console.log("made model")
  //   });
  // }, [])

  function modelReady() {
    console.log("model ready!");
    console.log("faceAPI Model:", faceapi)
    faceapi.detect(gotResults)
  };

  async function gotResults(err, result) {
    console.log("in gotResults")
    if (err) {
      console.log("no results", err);
    }
    console.log('detections: ', result)

    //store results in detections
    detections = result;

    // Clear part of the canvas
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);

    ctx.drawImage(video, 0, 0, width, height);

    if (detections) {
      if (detections.length > 0) {
        drawBox(detections);
        drawLandmarks(detections);
      }
    }
    faceapi.detect(gotResults);
  }

  function faceDetect() {
    faceapi.detect(gotResults);
    console.log("Face Detected: ", detections);
  };


  function drawBox(detections) {
    for (let i = 0; i < detections.length; i += 1) {
      const alignedRect = detections[i].alignedRect;
      const x = alignedRect._box._x;
      const y = alignedRect._box._y;
      const boxWidth = alignedRect._box._width;
      const boxHeight = alignedRect._box._height;

      ctx.beginPath();
      ctx.rect(x, y, boxWidth, boxHeight);
      ctx.strokeStyle = "#a15ffb";
      ctx.stroke();
      ctx.closePath();
    }
  }

  function drawLandmarks(detections) {
    for (let i = 0; i < detections.length; i += 1) {
      const mouth = detections[i].parts.mouth;
      const nose = detections[i].parts.nose;
      const leftEye = detections[i].parts.leftEye;
      const rightEye = detections[i].parts.rightEye;
      const rightEyeBrow = detections[i].parts.rightEyeBrow;
      const leftEyeBrow = detections[i].parts.leftEyeBrow;

      drawPart(mouth, true);
      drawPart(nose, false);
      drawPart(leftEye, true);
      drawPart(leftEyeBrow, false);
      drawPart(rightEye, true);
      drawPart(rightEyeBrow, false);
    }
  }

  function drawPart(feature, closed) {
    ctx.beginPath();
    for (let i = 0; i < feature.length; i += 1) {
      const x = feature[i]._x;
      const y = feature[i]._y;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    if (closed === true) {
      ctx.closePath();
    }
    ctx.stroke();
  }

  // // Helper Functions


  // get video from reference to JSX element
  async function getVideo() {
    // Grab elements, create settings, etc.
    videoElement.current.setAttribute("style", "display: none;");
    videoElement.current.width = width;
    videoElement.current.height = height;
    // document.body.appendChild(VideoElement);

    // Create a webcam capture
    const constraints = { video: true };
    const capture = await navigator.mediaDevices.getUserMedia(constraints);
    videoElement.current.srcObject = capture;
    console.log("video Element", videoElement.current);
    return videoElement.current;
  }

  // Create DOM Element and then add 
  // async function getVideo() {
  //   // Grab elements, create settings, etc.
  //   const videoElement = document.createElement("video");
  //   videoElement.setAttribute("style", "display: none;");
  //   videoElement.width = width;
  //   videoElement.height = height;
  //   document.body.appendChild(videoElement);

  //   // Create a webcam capture
  //   const capture = await navigator.mediaDevices.getUserMedia({ video: true });
  //   videoElement.srcObject = capture;
  //   videoElement.play();

  //   return videoElement;
  // }

  function createCanvas(w, h) {
    canvas.current.width = w;
    canvas.current.height = h;
  }

  return (
    <>
      <button onClick={faceDetect}>FaceDetect</button>
      <video ref={videoElement} autoPlay />
      <canvas ref={canvas} />


    </>
  )
}


export default FaceLandmark;