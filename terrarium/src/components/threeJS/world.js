import { useRef } from 'react'
// import { Canvas } from "@react-three/fiber"; // import everything from react-three
// import { Camera, Group, Scene } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber"; //useThree, 
// import { WebGLRenderer } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei";
import CustomObject from './customObject';
// import { Physics, usePlane, useBox, useSphere } from '@react-three/cannon'

// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import {useLoader} from "@react-three/fiber"
// imports for our first scene
// import {
//   BoxBufferGeometry,
//   Mesh,
//   MeshBasicMaterial,
//   PerspectiveCamera,
//   Color
// } from "@react-three/fiber"

const World = () => {
  //use to access state values (clock, camera, etc)
  // const three = useThree()

  const cubeRef = useRef()
  const groupRef = useRef()
  // const [surfaceRef, gravityApi] = usePlane(() => ({ mass: 1 }));
  // const [cubeRef, cubeApi] = useBox(() => ({ mass: 1 }));

  //runs on each frame run (based on framerate -need to account for variable FPS)
  useFrame((state, delta) => {
    cubeRef.current.rotation.y += delta
    groupRef.current.rotation.y -= delta * .5
  })

  // removed from mesh: rotation-y={Math.PI * 0.23} and rotation-x={- Math.PI * 0.5}

  return <>
    {/* <PerformanceMonitor /> */}
    <OrbitControls />

    <directionalLight position={[1, 2, 3]} intensity={.5} />
    <directionalLight intensity={.2} />
    <ambientLight intensity={0.2} />
    <group ref={groupRef}>
      <mesh position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color="lightBlue" />
      </mesh>
      <mesh ref={cubeRef} position-x={2} scale={1.5} rotation-y={Math.PI * 0.23}>
        <boxGeometry scale={1.5} />
        <meshStandardMaterial color="lightGreen" />
      </mesh>
    </group>
    <mesh position-y={-1} scale={100} rotation-x={- Math.PI * 0.5}>
      <planeGeometry />
      <meshStandardMaterial color="pink" />
    </mesh>
    <CustomObject />
  </>
}

export default World;