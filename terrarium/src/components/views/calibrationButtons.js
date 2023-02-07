
import './calibrationView.css'
import Button from '@mui/material/Button';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { useEffect } from 'react';

export default function CalibrationButtons({ clickCount, handleClickCount, clickMessage, handleWebgazerState }) {
  const calibrationFullScreen = useFullScreenHandle();

  // const [calibrated, setCalibrated] = useState(false);

  useEffect(() => {
    if (clickCount > 9) {
      handleWebgazerState(false)
      calibrationFullScreen.exit();
    } else if (clickCount > 0) {
      handleWebgazerState(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickCount])

  const buttonStyle = { fontSize: 20 }

  return (
    <>
      {clickCount === 1 && <div  >
        <Button className="fullscreen-button" sx={{ fontSize: 25 }} onClick={calibrationFullScreen.enter} style={clickCount === 1 ? { visibility: 'visible' } : { visibility: 'hidden', height: '0vh' }} >Please Click Anywhere to Enter Full Screen and Begin Calibration</Button>
      </div>}
      <FullScreen handle={calibrationFullScreen}>
        <div className="button-container" >
          <div className="cali-button" style={clickCount === 6 ? { visibility: 'visible' } : { visibility: 'hidden' }}><Button variant="contained" sx={buttonStyle} onClick={handleClickCount}>Three Left!</Button></div>
          <div className="cali-button" style={clickCount === 2 ? { visibility: 'visible' } : { visibility: 'hidden' }}><Button variant="contained" sx={buttonStyle} onClick={handleClickCount}>{clickMessage}</Button></div>
          <div className="cali-button" style={clickCount === 3 ? { visibility: 'visible' } : { visibility: 'hidden' }}><Button variant="contained" sx={buttonStyle} onClick={handleClickCount}>{clickMessage}</Button></div>
          <div className="cali-button" style={clickCount === 4 ? { visibility: 'visible' } : { visibility: 'hidden' }}><Button variant="contained" sx={buttonStyle} onClick={handleClickCount}>{clickMessage}</Button></div>
          <div className="cali-button" style={clickCount === 5 ? { visibility: 'visible' } : { visibility: 'hidden' }}><Button variant="contained" sx={buttonStyle} onClick={handleClickCount}>{clickMessage}</Button></div>
          <div className="cali-button" style={clickCount === 1 ? { visibility: 'visible' } : { visibility: 'hidden' }}><Button variant="contained" sx={buttonStyle} onClick={handleClickCount}>Click Me to Start!</Button></div>
          <div className="cali-button" style={clickCount === 7 ? { visibility: 'visible' } : { visibility: 'hidden' }}><Button variant="contained" sx={buttonStyle} onClick={handleClickCount}>{clickMessage}</Button></div>
          <div className="cali-button" style={clickCount === 8 ? { visibility: 'visible' } : { visibility: 'hidden' }}><Button variant="contained" sx={buttonStyle} onClick={handleClickCount}>{clickMessage}</Button></div>
          <div className="cali-button" style={clickCount === 9 ? { visibility: 'visible' } : { visibility: 'hidden' }}><Button variant="contained" sx={buttonStyle} onClick={handleClickCount}>Last One</Button></div>
        </div>
      </FullScreen>
    </>)
}
