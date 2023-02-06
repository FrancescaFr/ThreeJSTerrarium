
// import {} from @react-three/fiber
import { useState } from 'react'


const CustomObject = () => {
  const [active, setActive] = useState(false);
  const [hover, setHover] = useState(false);

  // ten trianges, three points each
  const verticesCount = 10 * 3
  // create array to hold all vertices positions
  // (multiply again by 3 to hold all three coordinates per point)
  const positions = new Float32Array(verticesCount * 3)
  //fill array with random values:

  // for (let i = 0)

  return <mesh onClick={() => {
    setActive(!active);
  }}
    onPointerOver={() => {
      setHover(true);
    }}
    onPointerOut={() => {
      setHover(false);
    }} scale={hover ? 1.5 : 1}>
    <coneGeometry />
    <meshBasicMaterial color={active || hover ? "yellow" : "maroon"} />
  </mesh>

}

export default CustomObject;