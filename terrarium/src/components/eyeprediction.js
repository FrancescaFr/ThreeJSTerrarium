

const webgazer = window.webgazer //auto accessable from window

var xPos = 0;
var yPos = 0;

const EyePrediction = async () => {
  const prediction = await webgazer.getCurrentPrediction();
  xPos = Math.floor(prediction.x);
  yPos = Math.floor(prediction.y);
  const eyePosition = [xPos, yPos]

  return (eyePosition)
};

export default EyePrediction;