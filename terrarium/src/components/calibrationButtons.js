import './Calibration.css'
const CalibrationButtons = ({ clickCount }) => {

  //TODO auto-generate array of buttons one at a time
  const positions = [[100, 100], [-100, -100]]
  return (
    <div className='calibrationButton'>
      <button style={{ bottom: positions[clickCount][0], right: positions[clickCount][0] }}>Calibrated!</button>
    </div>
  )
}

export default CalibrationButtons;