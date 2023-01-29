import { useRef } from 'react'
// import { Canvas } from "@react-three/fiber"; // import everything from react-three
import { Camera, Group, Scene } from "@react-three/fiber";
import { Canvas, useFrame } from "@react-three/fiber"; //useThree, 
import { RaycasterProps } from '@react-three/fiber';
// import { WebGLRenderer } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei";
import { Raycaster } from 'three';
import { Vector2 } from 'three';
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



const World = ({ xPos, yPos }) => {
  //use to access state values (clock, camera, etc)
  // const three = useThree()

  const cubeRef = useRef()
  const groupRef = useRef()
  const pointerRef = useRef()

  // const raycaster = new Raycaster();
  const eyePointer = new Vector2();
  const raycaster = new Raycaster();


  function rayCastSelect(state) {
    state.raycaster.setFromCamera(pointerRef, state.camera)
    const intersects = raycaster.intersectObjects();

    for (let i = 0; i < intersects.length; i++) {
      intersects[i].object.material.color.set(0xff0000);
    }

  }

  //runs on each frame run (based on framerate -need to account for variable FPS)
  useFrame((state, delta) => {
    cubeRef.current.rotation.y += delta;
    groupRef.current.rotation.y -= delta * .5;

    // set pointer mesh position based on eye position
    // pointerRef.current.position.x = (xPos / window.innerWidth) * 2 - 1;
    // pointerRef.current.position.y = (yPos / window.innerHeight) * 2 - 1;
    // pointerRef.current.position = state.raycaster.Vector3;

    eyePointer.x = (xPos / window.innerWidth) * 2 - 1;
    eyePointer.y = (yPos / window.innerHeight) * 2 - 1;
    // rayCastSelect(pointerRef, state)
  }
  );

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
    <mesh position-y={-1} scale={10} rotation-x={- Math.PI * 0.5}>
      <planeGeometry />
      <meshStandardMaterial color="pink" />
    </mesh>
    <mesh ref={pointerRef} >
      <boxGeometry />
      <meshStandardMaterial color={Math.random() * 0xffffff} />
    </mesh>
  </>
}

export default World;