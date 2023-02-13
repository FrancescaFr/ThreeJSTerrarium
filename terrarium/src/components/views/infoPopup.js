import './worldView.css'

import { useState, useRef } from 'react'
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';


export default function InfoPopup({ containerRef }) {

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div >
      <Button aria-describedby={id} onClick={handleClick}>
        <InfoOutlinedIcon />
      </Button>
      <Popover
        container={containerRef.current}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <div className="popup">
          <Typography sx={{ p: 2 }}>
            <body>
              <p><b>Move </b>[Arrow Keys / WASD]</p>
              <p><b>Flip View</b> [Spacebar]</p>d
              <p><b>Reset View </b> [X]</p>
              <p><b>Pivot Controls</b> [C]</p>
              <p><b>Reset Scene</b> [R]</p>
              <p><b>Mouse Controls</b> [Shift]</p>
            </body>

          </Typography>
        </div>
      </Popover >
    </div >)
}