import { useEffect, useRef, useState } from "react";
// import * as ml5 from 'ml5';


// notes, moved faceapi around so that it is not currently being initialized with video - switch to state or reference again
const FaceLandmark = ({ face }) => {
  // var faceapi = useRef();
  // const videoElement = useRef();
  let video;
  let faceapi;
  let detections;
  const width = 360;
  const height = 280;
  const ml5 = window.ml5
  // let canvas, ctx;

  // by default all options are set to true
  const detectionOptions = {
    withLandmarks: true,
    withDescriptors: false,
    MODEL_URLS: {
      FaceLandmarkModel: 'https://raw.githubusercontent.com/ml5js/ml5-data-and-models/main/models/faceapi/face_landmark_68_model-weights_manifest.json',
      // FaceLandmark68TinyNet: 'https://raw.githubusercontent.com/ml5js/ml5-data-and-models/main/models/faceapi/face_landmark_68_tiny_model-weights_manifest.json',
    },
  };

  // const faceapi = ml5.faceApi(video, detectionOptions);

  async function make() {
    // get the video
    video = await getVideo();

    console.log("Video is HTMLVideo", video instanceof HTMLVideoElement)
    // canvas = createCanvas(width, height);
    // ctx = canvas.getContext("2d");
    faceapi = ml5.faceApi(video, detectionOptions, modelReady);
  }

  // call app.map.init() once the DOM is loaded
  useEffect(() => {
    make().then((result) => {
      console.log("made model")
    });
  }, [])
  // window.addEventListener("DOMContentLoaded", function () {
  //   make();
  // });

  function modelReady() {
    console.log("model ready!");
    console.log(faceapi)
    faceapi.detectSingle(gotResults)
    // ml5.detect(video, (err, results) => {
    //   console.log("results", results);
    // });
  };

  async function gotResults(err, result) {
    console.log("in gotResults")
    if (err) {
      console.log("no results", err);
      return;
    }
    console.log('detections: ', result)
    detections = result;

    // // Clear part of the canvas
    // ctx.fillStyle = "#000000";
    // ctx.fillRect(0, 0, width, height);

    // ctx.drawImage(video, 0, 0, width, height);

    // if (detections) {
    //   if (detections.length > 0) {
    //     drawBox(detections);
    //     drawLandmarks(detections);
    //   }
    // }
    faceapi.detectSingle(gotResults);
  }

  function faceDetect() {
    faceapi.detectSingle(gotResults);
    console.log("Face Detected: ", detections);
  };


  // function drawBox(detections) {
  //   for (let i = 0; i < detections.length; i += 1) {
  //     const alignedRect = detections[i].alignedRect;
  //     const x = alignedRect._box._x;
  //     const y = alignedRect._box._y;
  //     const boxWidth = alignedRect._box._width;
  //     const boxHeight = alignedRect._box._height;

  //     ctx.beginPath();
  //     ctx.rect(x, y, boxWidth, boxHeight);
  //     ctx.strokeStyle = "#a15ffb";
  //     ctx.stroke();
  //     ctx.closePath();
  //   }
  // }

  // function drawLandmarks(detections) {
  //   for (let i = 0; i < detections.length; i += 1) {
  //     const mouth = detections[i].parts.mouth;
  //     const nose = detections[i].parts.nose;
  //     const leftEye = detections[i].parts.leftEye;
  //     const rightEye = detections[i].parts.rightEye;
  //     const rightEyeBrow = detections[i].parts.rightEyeBrow;
  //     const leftEyeBrow = detections[i].parts.leftEyeBrow;

  //     drawPart(mouth, true);
  //     drawPart(nose, false);
  //     drawPart(leftEye, true);
  //     drawPart(leftEyeBrow, false);
  //     drawPart(rightEye, true);
  //     drawPart(rightEyeBrow, false);
  //   }
  // }

  // function drawPart(feature, closed) {
  //   ctx.beginPath();
  //   for (let i = 0; i < feature.length; i += 1) {
  //     const x = feature[i]._x;
  //     const y = feature[i]._y;

  //     if (i === 0) {
  //       ctx.moveTo(x, y);
  //     } else {
  //       ctx.lineTo(x, y);
  //     }
  //   }

  //   if (closed === true) {
  //     ctx.closePath();
  //   }
  //   ctx.stroke();
  // }

  // // Helper Functions
  // async function getVideo() {
  //   // Grab elements, create settings, etc.
  //   videoElement.current.setAttribute("style", "display: none;");
  //   videoElement.current.width = width;
  //   videoElement.current.height = height;
  //   // document.body.appendChild(VideoElement);

  //   // Create a webcam capture

  //   const constraints = { video: true };

  //   const capture = await navigator.mediaDevices.getUserMedia(constraints);
  //   videoElement.current.srcObject = capture;

  //   // const capture = await navigator.mediaDevices.getUserMedia({ video: true });
  //   // VideoElement.srcObject = capture;
  //   console.log("video Element", videoElement.current);
  //   return videoElement.current;
  // }
  async function getVideo() {
    // Grab elements, create settings, etc.
    const videoElement = document.createElement("video");
    videoElement.setAttribute("style", "display: none;");
    videoElement.width = width;
    videoElement.height = height;
    document.body.appendChild(videoElement);

    // Create a webcam capture
    const capture = await navigator.mediaDevices.getUserMedia({ video: true });
    videoElement.srcObject = capture;
    videoElement.play();

    return videoElement;
  }

  // function createCanvas(w, h) {
  //   const canvas = document.createElement("canvas");
  //   canvas.width = w;
  //   canvas.height = h;
  //   document.body.appendChild(canvas);
  //   return canvas;
  // }

  return (
    <>
      <button onClick={faceDetect}>FaceDetect</button>
      {/* <video ref={videoElement} autoPlay /> */}
      {/* <canvas /> */}
    </>
  )
}

export default FaceLandmark;