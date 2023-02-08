/* This function is intended to smooth and simplify raw webgazer data to
make it more usable for ThreeJS scene control.

Output includes:
- Normalized and Kalman Filtered head position data (for camera movement)
- Reduced resolution gaze data - error range of 100px, extraneous data unneccesary.
- General Eye Gaze Region prediction based on gaze data.

output object:
  - Head Data
*/

// TODO: need to apply Kalman Filtering
// might want to create globally? so they don't lose calibration data?
// Library Details: https://www.wouterbulten.nl/posts/lightweight-javascript-library-for-noise-filtering
import KalmanFilter from "kalmanjs"


async function EyePrediction(defaultEyeFeatures, eyeFeatures, XYCoord, filterX, filterY) {

  //toggle filtering
  const filtering = false
  // Kalman Filter parameters
  const r = 0.001 // models system noise (negligible)
  const q = 0.001 // models measurement noise (may be significant)
  const a = 1.1 // models state effects (what we are trying to actually smooth is change btwn measurements)
  // presuming that you will keep moving in same direction, applies growth

  // create seperate filters for each axis
  const kalmanFilterX = new KalmanFilter({ R: r, Q: q, A: a })
  const kalmanFilterY = new KalmanFilter({ R: r, Q: q, A: a })
  const kalmanFilterD = new KalmanFilter({ R: 0.001, Q: 4, A: 1 })

  const userPositionData = {}

  userPositionData.head = await headCalculations(defaultEyeFeatures, eyeFeatures, kalmanFilterX, kalmanFilterY, kalmanFilterD, filtering)
  userPositionData.gaze = await gazeCalculations(XYCoord)
  // console.log(userPositionData);
  return (userPositionData)

}

async function headCalculations(defaultEyeFeatures, eyeFeatures, kalmanFilterX, kalmanFilterY, kalmanFilterD, filtering, filterX, filterY) {
  // -Head Position Calculations:
  //distance currently defined relative to neutral head position eye width, not distance from screen
  const headDistance = 1.00 * (defaultEyeFeatures.left.width - eyeFeatures.left.width) // distance increases when eye gets smaller
  // need to map x min/max to reasonable range
  const Xmin = 0; // rightbound
  const Xmax = 600; // leftbound
  const Xrange = Xmax - Xmin // increments
  const Xavg = (defaultEyeFeatures.left.imagex + defaultEyeFeatures.right.imagex) / 2
  const XnormAvg = Xavg / Xrange // baseline (center)
  const Xcurrent = (eyeFeatures.left.imagex + eyeFeatures.right.imagex) / 2
  const XnormCurrent = ((Xcurrent / Xrange) - XnormAvg) * 2; // deviation from center (+left, -right), max = .5
  const Ymin = -100; // upperbound
  const Ymax = 500; // lowerbound
  const Yrange = Ymax - Ymin // increments
  const Yavg = (defaultEyeFeatures.left.imagey + defaultEyeFeatures.right.imagey) / 2
  const YnormAvg = Yavg / Yrange // baseline (center)
  const Ycurrent = (eyeFeatures.left.imagey + eyeFeatures.right.imagey) / 2
  const YnormCurrent = ((Ycurrent / Yrange) - YnormAvg) * 2; // deviation from center (+down, -up), max = .5
  const decimels = 4; // precision

  let filteredX = XnormCurrent;
  let filteredY = YnormCurrent;
  let filteredD = headDistance;
  //filtered data
  if (filtering) {
    filteredX = kalmanFilterX.filter(XnormCurrent);
    filteredY = kalmanFilterY.filter(YnormCurrent);
    // filteredD = kalmanFilterD.filter(headDistance);
  }

  return (
    {
      baseX: XnormAvg.toFixed(decimels),
      baseY: YnormAvg.toFixed(decimels),
      x: filteredX.toFixed(decimels),
      y: filteredY.toFixed(decimels),
      baseDist: 0,
      dist: filteredD
    }
  )

}


async function gazeCalculations(XYCoord) {
  //TODO numbers should be converted to ratio of screen
  const Xposition = Math.floor(XYCoord[0]);
  const Yposition = Math.floor(XYCoord[1]);
  let top, bottom, left, right, localEyeRegion

  // top of page
  if (Yposition < 100) {
    top = (true);
  } else {
    top = (false)
  }

  //bottom of page
  if (Yposition > 700) {
    bottom = (true)
  } else {
    bottom = (false)
  }

  // left of page
  if (Xposition < 150) {
    left = (true);
  } else {
    left = (false)
  }
  // right of page //
  if (Xposition > 950) {
    right = (true)
  } else {
    right = (false)
  }

  if (top) {
    if (left) {
      localEyeRegion = ("TOP LEFT")

    } else if (right) {
      localEyeRegion = ("TOP RIGHT")
    } else
      localEyeRegion = ("TOP")
  } else if (bottom) {
    if (left) {
      localEyeRegion = ("BOTTOM LEFT")
    } else if (right) {
      localEyeRegion = ("BOTTOM RIGHT")
    } else
      localEyeRegion = ("BOTTOM")
  } else {
    if (left) {
      localEyeRegion = ("LEFT")
    } else if (right) {
      localEyeRegion = ("RIGHT")
    } else {
      localEyeRegion = ("CENTER")
    }
  }


  return (
    {
      x: Xposition,
      y: Yposition,
      region: localEyeRegion
    }
  )

}

export default EyePrediction;


//final data object should look like:

  // const userPositionData = {
  //   head: {
  //     baseX : XnormAvg,
  //     baseY : YnormAvg,
  //     x: XnormCurrent,
  //     y: YnormCurrent,
  //     baseDist : 0, // not being used right now
  //     dist: headDistance
  //   },
  //   gaze: {
  //     x: Xposition,
  //     y: Yposition,
  //     region: eyeRegion
  //   },
  // }
