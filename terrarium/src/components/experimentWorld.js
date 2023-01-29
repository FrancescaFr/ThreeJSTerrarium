import { useRef, useState } from 'react'
import { useFrame, extend, useThree } from "@react-three/fiber"; //useThree, 
// import { OrbitControls, Environment } from "@react-three/drei";
import { Raycaster } from 'three';
import { Vector2, Camera } from 'three';

// Extend will try to automatically convert a Three.js class into a declarative version and make it available in JSX.
// Call extend() on the OrbitControls class:

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
extend({ OrbitControls });

const ExperimentWorld = () => {
  //use to access state values (clock, camera, etc)
  const three = useThree()
  const { camera, gl } = useThree()

  const cubeRef = useRef()
  const sphereRef = useRef()
  const groupRef = useRef()
  const userRef = useRef()
  const [hover, setHover] = useState(false);

  // const raycaster = new Raycaster();
  const eyePointer = new Vector2();
  const raycaster = new Raycaster();


  // function rayCastSelect(state) {
  //   state.raycaster.setFromCamera(pointerRef, state.camera)
  //   const intersects = raycaster.intersectObjects();

  //   for (let i = 0; i < intersects.length; i++) {
  //     intersects[i].object.material.color.set(0xff0000);
  //   }

  // }

  //runs on each frame run (based on framerate -accounts for variable FPS (delta))

  // const pointer = new Vector2();

  // function onPointerMove(event) {
  //   pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  //   pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
  // }

  // function raycastColor() {

  //   // update the picking ray with the camera and pointer position
  //   raycaster.setFromCamera(pointer, Camera.camera);

  //   // calculate objects intersecting the picking ray
  //   const intersects = raycaster.intersectObjects();

  //   for (let i = 0; i < intersects.length; i++) {

  //     intersects[i].object.material.color.set(0xff0000);

  //   }
  // }

  // Event Listeners (outside of useFrame)
  // window.addEventListener('pointermove', onPointerMove);

  useFrame((state, delta) => {
    cubeRef.current.rotation.y += delta;
    groupRef.current.rotation.y -= delta * .5;
    // raycastColor();
    // rayCastSelect(pointerRef, state)
  }
  );

  const hoverColor = (item) => {
    item.eventObject.material.color = 'black';
  };

  const hoverLeaveColor = (item) => {
    item.eventObject.material.color = 'lightBlue';

  };



  return <>
    <orbitControls args={[camera, gl.domElement]} />
    <directionalLight position={[1, 2, 3]} intensity={.5} />
    <directionalLight intensity={.2} />
    <ambientLight intensity={0.2} />
    <group ref={groupRef}>
      <mesh ref={sphereRef} position-x={-2} onPointerOver={() => { setHover(true) }} onPointerOut={() => { setHover(false) }}>
        <sphereGeometry />
        <meshStandardMaterial color={hover ? "darkBlue" : "lightBlue"} />

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
    <mesh ref={userRef} >
      <boxGeometry />
      <meshStandardMaterial color={Math.random() * 0xffffff} />
    </mesh>
  </>
}

export default ExperimentWorld;