import { useRef } from 'react'
// import { Canvas } from "@react-three/fiber"; // import everything from react-three
// import { Camera, Group, Scene } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber"; //useThree, 
// import { WebGLRenderer } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
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

  //runs on each frame run (based on framerate -need to account for variable FPS)
  useFrame((state, delta) => {

    cubeRef.current.rotation.y += delta
    groupRef.current.rotation.y -= delta * .1

  })


  return <>
    <OrbitControls />
    <group ref={groupRef}>
      <mesh position-x={-2}>
        <sphereGeometry />
        <meshBasicMaterial color="orange" />
      </mesh>
      <mesh ref={cubeRef} position-x={2} scale={1.5} rotation-y={Math.PI * 0.23}>
        <boxGeometry scale={1.5} />
        <meshBasicMaterial color="darkGreen" />
      </mesh>
    </group>
    <mesh position-y={-1} rotation-x={- Math.PI * 0.5} scale={10}>
      <planeGeometry />
      <meshDepthMaterial color="black" />
    </mesh>
  </>
}

export default World;