import { useState, useEffect } from 'react';

const EyePrediction = (props) => {
  const [top, setTop] = useState(false);
  const [bottom, setBottom] = useState(false);
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);


  //TODO numbers should be converted to ratio of screen

  useEffect(() => {
    // top of page
    if (props.Yposition < 100) {
      setTop(true);
    } else {
      setTop(false)
    }

    //bottom of page
    if (props.Yposition > 700) {
      setBottom(true)
    } else {
      setBottom(false)
    }

    // left of page
    if (props.Xposition < 150) {
      setLeft(true);
    } else {
      setLeft(false)
    }
    // right of page //
    if (props.Xposition > 950) {
      setRight(true)
    } else {
      setRight(false)
    }

    if (top) {
      if (left) {
        props.setEyeRegion("TOP LEFT")

      } else if (right) {
        props.setEyeRegion("TOP RIGHT")
      } else
        props.setEyeRegion("TOP")
    } else if (bottom) {
      if (left) {
        props.setEyeRegion("BOTTOM LEFT")
      } else if (right) {
        props.setEyeRegion("BOTTOM RIGHT")
      } else
        props.setEyeRegion("BOTTOM")
    } else {
      if (left) {
        props.setEyeRegion("LEFT")
      } else if (right) {
        props.setEyeRegion("RIGHT")
      } else {
        props.setEyeRegion("CENTER")
      }
    }

    // corners ( top + )


  }, [props.Xposition]);


  return (
    <p>Eye Prediction: {props.eyeRegion}</p>)

}

export default EyePrediction;
// const webgazer = window.webgazer //auto accessable from window

// var xPos = 0;
// var yPos = 0;

// const manualPrediction = async () => {
//   const prediction = await webgazer.getCurrentPrediction();
//   xPos = Math.floor(prediction.x);
//   yPos = Math.floor(prediction.y);
//   const eyePosition = [xPos, yPos]

//   return (eyePosition)
// };

