import { React, useRef } from 'react'

import { useFrame, useThree } from "@react-three/fiber"; //useThree, 
// import { WebGLRenderer } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Stars, Sky, Cloud, Environment, useTexture } from "@react-three/drei";
// import { KeyboardControls, PointerLockControls } from '@react-three/drei';
import CustomObject from './customObject';
import Lights from './Scene/Lights/index';
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import {useLoader} from "@react-three/fiber"

// ------------- Object model imports ------------
import Table from './objects/table'
import Seat from './objects/seat'
import Crustaceo from './objects/crustaceo';
import Snail from './objects/gardensnail';
import { DEG2RAD, degToRad } from 'three/src/math/MathUtils';
import { Euler } from 'three';


const World = ({ xyCoord, defaultEyeFeatures, eyeFeatures, userPositionData, playerState, handlePlayerState }) => {
  const floorColorMap = useTexture({ map: 'textures/wood-texture-wild-hardwood-e68adc3402684d76a8f36b4238aaeda4.jpg' })


  //use to access state values (clock, camera, etc)

  const cubeRef = useRef()
  const groupRef = useRef()
  const snailRef = useRef()


  // const [surfaceRef, gravityApi] = usePlane(() => ({ mass: 1 }));
  // const [cubeRef, cubeApi] = useBox(() => ({ mass: 1 }));


  //runs on each frame run (based on framerate -need to account for variable FPS)
  useFrame((state, delta) => {
    // const angle = state.clock.elapsedTime

    //camera controls for webgaze perspective
    if (!playerState) {
      state.camera.fov = (75 - (userPositionData.head.dist)); // decrease field of view (narrows like window)
      state.camera.zoom = 1 - (userPositionData.head.dist / 25) //to compensate for fov (/75 obj. stay the same size) - (/25) to have actual zoom effect
      // state.camera.position.z = 2 + (userPositionData.head.dist / 50)
      state.camera.position.x = 1 - (userPositionData.head.x * 5); // shift side to side with head
      state.camera.position.y = 0.5 - (userPositionData.head.y * 5);  // shift up and down with head
      state.camera.position.z = 2;
      // set z position by keyboard
      // state.camera.position.z = 
    }
    if (playerState) {
      state.camera.fov = 75;
      state.camera.zoom = 1;
      state.camera.position.x = 0
      state.camera.position.y = -.35;
      state.camera.position.z = 0;
      // state.camera.rotation.y = degToRad(90 + userPositionData.head.y * 50)
      // state.camera.rotation.x = degToRad(90 + userPositionData.head.x * 50)
      state.camera.rotateX(degToRad(270 - (userPositionData.head.y * 60)))
      state.camera.rotateY(degToRad(userPositionData.head.x * 60))
    }
    // cubeRef.current.rotation.y += delta
    // groupRef.current.rotation.y -= delta * .5
  })




  return <>
    {/* <PerformanceMonitor /> */}
    {/* <color attach="background" args={["black"]} /> */}
    <PerspectiveCamera makeDefault fov={45} zoom={1} near={0.1} far={200} position={[1, 0.5, 2]} />
    <OrbitControls />
    {/* TODO  - Add custom high res skybox from generated images (Gan360) */}
    <Environment
      background={true} // can be true, false or "only" (which only sets the background) (default: false)
      blur={0} // blur factor between 0 and 1 (default: 0, only works with three 0.146 and up)
      preset="forest"
      scene={undefined} // adds the ability to pass a custom THREE.Scene, can also be a ref
      encoding={undefined} // adds the ability to pass a custom THREE.TextureEncoding (default: THREE.sRGBEncoding for an array of files and THREE.LinearEncoding for a single texture)
    />
    {/* <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} /> */}
    {/* <Sky distance={450000} sunPosition={[0, .5, 1]} inclination={0} azimuth={0.25} />
    <Cloud
      opacity={0.5}
      speed={0.3} // Rotation speed
      width={5} // Width of the full cloud
      depth={5} // Z-dir depth
      segments={10} // Number of particles
      position={[3, 10, -10]}
    />
    <Cloud
      opacity={0.5}
      speed={0.3} // Rotation speed
      width={5} // Width of the full cloud
      depth={10} // Z-dir depth
      segments={5} // Number of particles
      position={[-10, 10, -15]}
    /> */}
    {/* <directionalLight position={[1, 2, 3]} intensity={.5} />
    <pointLight position={[10, 10, 10]} intensity={1} />
    <ambientLight intensity={0.2} color="lightblue" /> */}
    <Lights />
    {/* <group ref={groupRef}>
      <mesh position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color="lightBlue" />
      </mesh>
      <mesh ref={cubeRef} position-x={2} scale={1.5} rotation-y={Math.PI * 0.23}>
        <boxGeometry scale={1.5} />
        <meshStandardMaterial color="lightGreen" />
      </mesh>
    </group> */}
    <Table scale={2} position={[0, -2.2, 0]} />
    <Seat scale={2} position={[1.75, -2.2, 0]} rotation-y={-Math.PI * .75} />
    {/* <Crustaceo scale={.05} position={[.5, -0.5, .5]} /> */}
    <Snail ref={snailRef} position={[0, -.4, 0]} playerState={playerState} handlePlayerState={handlePlayerState} />


    <mesh position-y={-2.2} scale={20} rotation-x={- Math.PI * 0.5}>
      <planeGeometry />
      <meshStandardMaterial {...floorColorMap} />
    </mesh>
    {/* <CustomObject /> */}
  </>
}

export default World;