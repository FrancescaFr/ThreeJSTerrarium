import { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Typography } from '@mui/material';

export default function FilterSlider({ q, setQ, a, setA }) {

  // const [valueQ, setValueQ] = useState(q);
  // const [valueA, setValueA] = useState(a);

  const handleQ = (event, q) => {
    // setValueQ(q)
    setQ(q);
  }

  const handleA = (event, a) => {
    // setValueA(valueA)
    setA(a);
  }

  const marksQ = [
    {
      value: 0,
      label: 'noisy',
    },
    {
      value: 0.1,
      label: 'smooth',
    }
  ]

  const marksA = [
    {
      value: 0.80,
      label: 'sluggish',
    },
    {
      value: 1,
      label: 'neutral'
    },
    {
      value: 1.2,
      label: 'fast',
    }
  ]


  return (
    <>
      <Typography>Noise</Typography>
      <Slider
        aria-label="De-noise"
        defaultValue={0.02}
        value={q}
        onChange={handleQ}
        valueLabelDisplay="auto"
        size="small"
        step={0.01}
        marks={marksQ}
        min={0}
        max={0.1}
      />
      <Typography>Responsiveness</Typography>
      <Slider
        aria-label="State Effect"
        defaultValue={0.95}
        value={a}
        onChange={handleA}
        valueLabelDisplay="auto"
        size="small"
        step={0.05}
        marks={marksA}
        min={0.80}
        max={1.2}
      />
    </>
  );
}