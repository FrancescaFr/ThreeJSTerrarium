/* This function is intended to smooth and simplify raw webgazer data to
make it more usable for ThreeJS scene control.

Output includes:
- Normalized head position data (for camera movement)
- Reduced resolution gaze data - error range of 100px, extraneous data unneccesary.
- General Eye Gaze Region prediction based on gaze data.

final data object should look like:

  const userPositionData = {
    head: {
      baseX : XnormAvg,
      baseY : YnormAvg,
      x: XnormCurrent,
      y: YnormCurrent,
      baseDist : 0, // not being used right now
      dist: headDistance
    },
    gaze: {
      x: Xposition,
      y: Yposition,
      region: eyeRegion
    },
  }
*/

async function EyePrediction(defaultEyeFeatures, eyeFeatures, XYCoord) {

  const userPositionData = {}

  userPositionData.head = await headCalculations(defaultEyeFeatures, eyeFeatures)
  userPositionData.gaze = await gazeCalculations(XYCoord)
  // console.log(userPositionData);
  return (userPositionData)

}

async function headCalculations(defaultEyeFeatures, eyeFeatures) {
  // -Head Position Calculations:
  //distance currently defined relative to neutral head position eye width, not distance from screen
  let headDistance = 1.00 * (defaultEyeFeatures.left.width - eyeFeatures.left.width) // distance increases when eye gets smaller
  // const neutralStablePoint = 5; // define range in which zoom does not change (reduce jitter effect for neutral position without filtering)
  // if (headDistance < neutralStablePoint && headDistance > -(2)) {
  //   headDistance = 0;
  // }
  // TODO need to map x min/max to reasonable range
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
  const decimels = 3; // precision

  return (
    {
      baseX: XnormAvg.toFixed(decimels),
      baseY: YnormAvg.toFixed(decimels),
      x: XnormCurrent.toFixed(decimels),
      y: YnormCurrent.toFixed(decimels),
      baseDist: 0,
      dist: headDistance,
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


