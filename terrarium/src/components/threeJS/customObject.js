
// import {} from @react-three/fiber
import { useFrame } from '@react-three/fiber';
import { useState, useRef } from 'react'






const CustomObject = () => {


  const coneRef = useRef();
  const [active, setActive] = useState(false);
  const [hover, setHover] = useState(false);

  useFrame((state, delta) => {
    if (!coneRef.current) {
      return;
    }

    // coneRef.current.rotation.z += delta;
  })


  // ten trianges, three points each
  const verticesCount = 10 * 3
  // create array to hold all vertices positions
  // (multiply again by 3 to hold all three coordinates per point)
  const positions = new Float32Array(verticesCount * 3)
  //fill array with random values:

  // for (let i = 0)

  return <mesh ref={coneRef} onClick={() => {
    setActive(!active);
  }}
    onPointerOver={() => {
      setHover(true);
    }}
    onPointerOut={() => {
      setHover(false);
    }} scale={hover ? 1.5 : 1}>
    <coneGeometry />
    <meshStandardMaterial color={active || hover ? "lightGreen" : "maroon"} />
  </mesh>

}

export default CustomObject;