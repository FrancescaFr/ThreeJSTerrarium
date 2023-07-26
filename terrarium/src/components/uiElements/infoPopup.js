import '../views/worldView.css'

import { useState, useRef } from 'react'
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box } from '@mui/material';


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
    <div>
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
        }}>
        <Box className="popup" sx={{ padding: "1rem" }}>
          {/* <Typography sx={{ p: 2 }}> */}
          <Typography><b>Move </b>[Arrow Keys / WASD]</Typography>
          <Typography><b>Flip View</b> [Spacebar]</Typography>
          <Typography><b>Reset View </b> [X]</Typography>
          <Typography><b>Pivot Controls</b> [C]</Typography>
          <Typography><b>Reset Scene</b> [R]</Typography>
          <Typography><b>Mouse Controls</b> [Shift]</Typography>
          {/* </Typography> */}
        </Box>
      </Popover>
    </div>)
}