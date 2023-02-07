import { useRef } from 'react'
// import { Canvas } from "@react-three/fiber"; // import everything from react-three
// import { Camera, Group, Scene } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber"; //useThree, 
// import { WebGLRenderer } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei";
import CustomObject from './customObject';
// import { Camera } from 'three';
// import * as THREE from ' three';
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



const World = ({ xyCoord, defaultEyeFeatures, eyeFeatures, userPositionData }) => {
  //use to access state values (clock, camera, etc)

  const cubeRef = useRef()
  const groupRef = useRef()

  // const [surfaceRef, gravityApi] = usePlane(() => ({ mass: 1 }));
  // const [cubeRef, cubeApi] = useBox(() => ({ mass: 1 }));

  // // eye calculations:
  // const headDistance = (defaultEyeFeatures.left.width - eyeFeatures.left.width) // distance increases when eye gets smaller
  // // need to map x min/max to reasonable range
  // const Xmin = 0; // rightbound
  // const Xmax = 600; // leftbound
  // const Xrange = Xmax - Xmin // increments
  // const Xavg = (defaultEyeFeatures.left.imagex + defaultEyeFeatures.right.imagex) / 2
  // const XnormAvg = Xavg / Xrange // baseline (center)
  // const Xcurrent = (eyeFeatures.left.imagex + eyeFeatures.right.imagex) / 2
  // const XnormCurrent = ((Xcurrent / Xrange) - XnormAvg) * 2; // deviation from center (+left, -right), max = .5
  // const Ymin = -100; // upperbound
  // const Ymax = 500; // lowerbound
  // const Yrange = Ymax - Ymin // increments
  // const Yavg = (defaultEyeFeatures.left.imagey + defaultEyeFeatures.right.imagey) / 2
  // const YnormAvg = Yavg / Yrange // baseline (center)
  // const Ycurrent = (eyeFeatures.left.imagey + eyeFeatures.right.imagey) / 2
  // const YnormCurrent = ((Ycurrent / Yrange) - YnormAvg) * 2; // deviation from center (+down, -up), max = .5

  //runs on each frame run (based on framerate -need to account for variable FPS)
  useFrame((state, delta) => {
    // console.log('x normalized:', { XnormCurrent })
    // console.log('y normalized:', { YnormCurrent })
    state.camera.fov = (75 - (userPositionData.head.dist)); // decrease field of view (narrows like window)
    state.camera.zoom = 1 - (userPositionData.head.dist / 25) //to compensate for fov (/75 obj. stay the same size) - (/25) to have actual zoom effect
    state.camera.position.x = 1 - (userPositionData.head.x * 5); // shift side to side with head
    state.camera.position.y = 1 - (userPositionData.head.y * 5); // shift up and down with head
    // cubeRef.current.rotation.y += delta
    // groupRef.current.rotation.y -= delta * .5
  })

  // removed from mesh: rotation-y={Math.PI * 0.23} and rotation-x={- Math.PI * 0.5}

  return <>
    {/* <PerformanceMonitor /> */}
    <OrbitControls />
    <directionalLight position={[1, 2, 3]} intensity={.5} />
    <directionalLight position={[-1, -3, 1]} intensity={1} />
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