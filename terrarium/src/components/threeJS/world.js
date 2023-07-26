/* eslint-disable no-unused-vars */
import { React, useRef, useState, Suspense } from 'react'
import * as THREE from 'three';
import { degToRad } from 'three/src/math/MathUtils';
// import { useControls } from 'leva';
import { Physics, CylinderCollider, RigidBody, Debug } from '@react-three/rapier'

import { useFrame, useThree } from "@react-three/fiber"; //useThree,
import {
  OrbitControls, PivotControls, useKeyboardControls,
  PerspectiveCamera, useProgress,
  Stars, Sky, Cloud, Environment, useTexture, Float, Html,
  MeshReflectorMaterial,
  useGLTF, Clone, useAnimations,
  meshBounds
} from "@react-three/drei";

import LoadingScreen from '../views/loadingScreen';

//--- Imports for incomplete or commented-out features
// import { FirstPersonControls, FirstPersonControlsProps } from '@react-three/drei';
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import {useLoader} from "@react-three/fiber"

// ------------- model / scene asset imports ------------
import PineForest from './Scene/Terrain/pineForest';
import Outbuilding from './objects/outbuilding';
import OldTable from './objects/oldTable';
import StumpAxe from './objects/stumpAxe';
import Bucket from './objects/bucket';
import Bookshelves from './objects/bookshelves';
import Bench from './objects/bench';
import CuttingBoard from './objects/cuttingBoard';
import Stool from './objects/stool';
import WoodenChair from './objects/woodenChair';
import WoodenTable from './objects/woodenTable';
import Log from './objects/log';


import Table from './objects/table';
import Seat from './objects/seat';

import Snail from './objects/gardensnail';
import Fox from './objects/fox';
import Deer from './objects/deer';
import Plane from './objects/plane';
// import CustomObject from './customObject';
import Lights from './Scene/Lights/lights';
import { MeshStandardMaterial } from 'three';


const World = ({ userPositionData, playerState, handlePlayerState, orbitState, handleOrbitState, gazeTracking, handleCalibrate, setFullScreenState, setPlayerState }) => {

  //For Debugging - leva controller
  // const { humanPosition, zoomFactor, } = useControls({
  //   humanPosition: {
  //     value: 3,
  //     min: 1,
  //     max: 6,
  //     step: 0.01
  //   },
  //   zoomFactor: {
  //     value: 1,
  //     min: 0.01,
  //     max: 1,
  //     step: .01
  //   },
  //   // fovFactor: {
  //   //   value: 0.1,
  //   //   min: 0.1,
  //   //   max: 5,
  //   //   step: 0.01
  //   // }
  // }
  // )

  const snailRef = useRef()
  const snailBodyRef = useRef()
  const customRef = useRef()
  const deerRef = useRef()
  const flightRef = useRef()
  const planeRef = useRef()

  const [side, setSide] = useState(true)
  const [focusPoint, setFocusPoint] = useState();
  const [xShift, setXshift] = useState(0);
  const [zShift, setZshift] = useState(0);
  const [pivotView, setPivotView] = useState(false);
  const [foxActions, setFoxActions] = useState(0);
  const [navStart, setNavStart] = useState([4, 3, 1.5]);



  // create an AudioListener and add it to the camera
  // useEffect(() => {
  //   const listener = new THREE.AudioListener();
  //     // create a global audio source
  //   const sound = new THREE.Audio(listener);
  // }, []);

  // useThree(({ camera }) => {
  //   camera.add(listener);
  // });



  // // load a sound and set it as the Audio object's buffer
  // const audioLoader = new THREE.AudioLoader();
  // audioLoader.load('audio/forestSounds.mp3', function (buffer) {
  //   sound.setBuffer(buffer);
  //   sound.setLoop(true);
  //   sound.setVolume(0.5);
  //   sound.play();
  // });


  const floorColorMap = useTexture({ map: 'textures/wood-texture-wild-hardwood-e68adc3402684d76a8f36b4238aaeda4.jpg' })
  const wallColorMap = useTexture({ map: 'textures/logWall.jpg' })

  //keyboard Controls
  const [subscribeKeys, getKeys] = useKeyboardControls()

  // TODO: First person player controls (Relative Movement)
  // const playerControls = new FirstPersonControls()

  //Runs on each frame run (based on framerate -need to account for variable FPS)
  useFrame((state, delta) => {

    // Flight ANIMATION CONTROLS
    const time = state.clock.getElapsedTime()
    const angle = time / 3
    const eulerRotation = new THREE.Euler(0, -(angle + degToRad(90)), 0)
    const quaternionRotation = new THREE.Quaternion()
    quaternionRotation.setFromEuler(eulerRotation) // rotation around y
    flightRef.current.setNextKinematicRotation(quaternionRotation)
    const x = -Math.cos(angle) * 15
    const z = -Math.sin(angle) * 15
    flightRef.current.setNextKinematicTranslation({ x: x, y: 11, z: z })

    // BUTTON PRESSES
    // check for scene reset
    subscribeKeys(
      (state) => { return state.reset },
      (value) => {
        if (value) {
          console.log('reset scene')
          handleCalibrate();
        }
      }
    )

    // check for orbit state
    subscribeKeys(
      (state) => { return state.shift },
      (value) => {
        if (value) {
          console.log('shift key')
          if (!playerState) {
            handleOrbitState();
          }
          // setInspectorView(!inspectorView);
        }
      }
    )

    // check for X press
    subscribeKeys(
      (state) => { return state.x },
      (value) => {
        if (value) {
          console.log('reset position')
          setFocusPoint(null)
          setPlayerState(false)
          state.camera.position.x = 0
          state.camera.position.y = 2.2
          state.camera.position.z = 2
          setXshift(0);
          setZshift(0)
        }
      }
    )

    // check for space press
    subscribeKeys(
      (state) => { return state.space },
      (value) => {
        if (value) {
          console.log('spacebar function')
          //Flip Navigation View
          if (!playerState) {
            setSide(!side)
          }
        }
      }
    )
    // check for control (c) press
    subscribeKeys(
      (state) => { return state.control },
      (value) => {
        if (value) {
          if (!playerState) {
            setPivotView(!pivotView)
          }
        }
      }
    )
    // check for escape (from fullscreen)
    subscribeKeys(
      (state) => { return state.escape },
      (value) => {
        if (value) {
          console.log("escape") // TODO - still not logging in full screen
          setFullScreenState(false)
        }
      }
    )
    // CAMERA CONTROLS
    //camera controls for Inspect Mode
    if (!orbitState) {
      if (!playerState) {

        //keyboard controls
        const { forward, backward, left, right } = getKeys()
        const shiftSpeed = 3;

        if (forward) {
          setZshift(zShift - delta * shiftSpeed)
          console.log(zShift)
        }
        if (backward) {
          setZshift(zShift + delta * shiftSpeed)
          console.log(zShift)
        }
        if (left) {
          setXshift(xShift + delta * shiftSpeed)
          console.log(xShift)
        }
        if (right) {
          setXshift(xShift - delta * shiftSpeed)
          console.log(xShift)
        }

        let orient = 1
        if (!side) {
          orient = -1
        }
        state.camera.fov = 75 - ((userPositionData.head.dist)); // decrease field of view (narrows like window)
        state.camera.zoom = 1 - (userPositionData.head.dist / (25)) //to compensate for fov (/75 obj. stay the same size) - (/25) to have actual zoom effect
        state.camera.position.y = 2.2 - (userPositionData.head.y * 20);  // shift up and down with head

        // default camera positions
        // state.camera.position.z = orient * (2 + (userPositionData.head.dist / 50))
        // state.camera.position.x = 1 - orient * (userPositionData.head.x * 20); // shift side to side with head

        // dynamic camera position (relative to focal point)
        let focusX = 0
        let focusZ = 2
        if (focusPoint) {
          focusX = focusPoint.x
          focusZ = focusPoint.z
        }
        state.camera.position.z = focusZ + orient * (2 + zShift + (userPositionData.head.dist / 50))
        state.camera.position.x = focusX - orient * (xShift + (userPositionData.head.x * 20));

        if (!focusPoint) {
          state.camera.lookAt(0, 2.2, 0)
        } else {
          state.camera.lookAt(focusPoint) // must be Vector3
        }
      }

      // Navigate View Camera Controls (Snail View)
      if (playerState) {
        state.camera.fov = 75;
        state.camera.zoom = 1;

        //TODO: make Generic (so you can switch between snail and plane)
        const playerPosition = snailBodyRef.current.translation()
        const playerCamera = new THREE.Vector3()
        playerCamera.copy(playerPosition)
        playerCamera.y += 0.2;

        const playerCameraTarget = new THREE.Vector3()
        playerCameraTarget.copy(playerPosition)
        playerCameraTarget.z -= 0.25 + (userPositionData.head.y * 5)
        playerCameraTarget.x += 0.25 + (userPositionData.head.x * 5)
        playerCameraTarget.y += 0.1

        state.camera.position.copy(playerCamera)
        state.camera.lookAt(playerCameraTarget)

        // Independent Local Rotation Method
        const xAxis = new THREE.Vector3(1, 0, 0)
        const yAxis = new THREE.Vector3(0, 1, 0)
        const zAxis = new THREE.Vector3(0, 0, 1) // maybe use for plane?
        state.camera.rotateOnAxis(xAxis, -(userPositionData.head.y * 5))
        state.camera.rotateOnAxis(yAxis, degToRad(userPositionData.head.x * 100))

        // Dependent Sequential Local Rotation Method
        // state.camera.rotateX(degToRad(180 + (userPositionData.head.y * 60)))
        // state.camera.rotateY(-degToRad(userPositionData.head.x * 60))
        // state.camera.rotateZ(degToRad(180))
      }
    }
  })

  // function Loader() {
  //   const { active, progress, errors, item, loaded, total } = useProgress()
  //   return <Html center>{progress}.toFixed(0) % loaded</Html>
  // }

  const clickHandler = (event) => {
    setFocusPoint(event.point);
    setZshift(0);
    setXshift(0);
    if (event.object.name === "fox") {
      if (foxActions === 2) {
        setFoxActions(0);
      } else {
        setFoxActions(foxActions + 1);
      }
    }
    console.log('assigned focus');
    console.log(event);

  }

  // object-specific functions
  const snailJump = () => {
    const mass = snailBodyRef.current.mass()
    snailBodyRef.current.applyImpulse({ x: 0, y: 0.5 * mass, z: 0 })
  }

  return <>
    {/* Debugging Only */}
    {/* <PerformanceMonitor /> */}
    {/* Aerial view camera */}
    {/* <PerspectiveCamera makeDefault position={[0, 50, 0]} zoom={1} near={0.1} far={200} /> */}
    {/* <color attach="background" args={["black"]} /> */}

    <PerspectiveCamera makeDefault fov={45} zoom={1} near={0.1} far={200} position={[1, 0, 3]} />
    {/* leveraging orbitcontrols for camera orientation preservation in player mode, movement options overridden - TODO: extract relevant functionality and remove*/}
    {playerState ? <OrbitControls /> : null}
    {/* Full orbit controls in explorer mode */}
    {orbitState ? <OrbitControls /> : null}
    {/* TODO  - Add custom high res skybox from generated images (Gan360) */}
    {/* <Environment
      background={true} // can be true, false or "only" (which only sets the background) (default: false)
      blur={0} // blur factor between 0 and 1 (default: 0, only works with three 0.146 and up)
      preset="forest"
      scene={undefined} // adds the ability to pass a custom THREE.Scene, can also be a ref
    /> */}
    {/* <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} /> */}
    {/* <Sky distance={450000} sunPosition={[0, .5, 1]} inclination={0} azimuth={0.25} /> */}
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
    />
    {/* <Lights /> */}
    <directionalLight position={[1, 2, 3]} intensity={.5} />
    <pointLight position={[10, 10, 10]} intensity={1} />
    <ambientLight intensity={0.2} color="lightblue" />
    <Suspense fallback={<LoadingScreen />}>
      <PineForest position={[-1, 0, -2]} scale={1.1} rotation-y={degToRad(-45)} />
    </Suspense>
    <Suspense>
      <Outbuilding scale={1.25} position={[-14, 0, -1]} />
    </Suspense>
    <Physics>
      {/* <Debug /> */}
      {/* floor colliders */}
      <RigidBody type="fixed">
        <mesh position-y={-0.5} scale={1}>
          <boxGeometry args={[50, 1, 50]} />
          <meshStandardMaterial transparent={true} opacity={0} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" >
        <mesh position={[4.2, 0.35, -0.85]} scale={1}>
          <boxGeometry args={[2.5, 0.1, 7.3]} />
          <meshStandardMaterial transparent={true} opacity={0} />
          {/* <MeshReflectorMaterial  {...wallColorMap} /> */}
        </mesh>
      </RigidBody>
      <Suspense>
        <RigidBody scale={3} position={[-1, -0.28, 0]} type="fixed">
          <Log />
        </RigidBody>
        <RigidBody type="fixed">
          <OldTable scale={0.25} position={[3.9, 1.2, -4]} rotation-y={degToRad(-90)} onClick={clickHandler} />
        </RigidBody>
        <RigidBody type="fixed">
          <Bookshelves position={[5.2, 0.4, -4]} />
          <Bench position={[3.8, 0.4, 3.1]} rotation-y={degToRad(-90)} onClick={clickHandler} />
        </RigidBody>
        <RigidBody position={[3.5, 0.4, 1]} type="fixed">
          <WoodenChair rotation-y={degToRad(80)} onClick={clickHandler} />
        </RigidBody>
        <RigidBody position={[4.4, 0.4, 1]} type="fixed">
          <WoodenChair rotation-y={degToRad(-110)} onClick={clickHandler} />
        </RigidBody>
        <RigidBody position={[4, 0.85, 1]} type="fixed">
          <WoodenTable scale={0.75} onClick={clickHandler} />
        </RigidBody>
      </Suspense>
      <Suspense>
        {/* non-fixed scene objects */}
        <PivotControls anchor={[0, 0, 0]} visible={pivotView} opacity={0.5}>
          <RigidBody position={[5, 2.6, -1.5]} colliders={false}>
            <CylinderCollider args={[.19, 0.20]} position={[0, -0.15, 0]} />
            <Bucket scale={0.7} onClick={clickHandler} />
          </RigidBody>
        </PivotControls>
        <PivotControls anchor={[0, 0, 0]} visible={pivotView} opacity={0.5}>
          <RigidBody>
            <CuttingBoard position={[3.5, 1.4, -3.8]} onClick={clickHandler} />
          </RigidBody>
        </PivotControls>
        <RigidBody>
          <Stool position={[5.5, 0.5, -2.7]} onClick={clickHandler} />
        </RigidBody>
        <group >
          <Snail
            navStart={navStart}
            ref={snailRef}
            userPositionData={userPositionData}
            getKeys={getKeys}
            snailJump={snailJump}
            snailBodyRef={snailBodyRef}
            playerState={playerState}
            handlePlayerState={handlePlayerState}
            clickHandler={clickHandler} />
          <PivotControls anchor={[0, 0, 0]} visible={pivotView} opacity={0.5}>
            <Snail
              navStart={[0, 2, 0]}
              getKeys={getKeys}
              snailJump={snailJump}
              clickHandler={clickHandler} />
          </PivotControls>
        </group>
      </Suspense>
      <RigidBody
        ref={flightRef}
        rotation-y={degToRad(90)}
        friction={0}
        type="kinematicPosition">
        <group >
          <Plane clickHandler={clickHandler} />
        </group>
      </RigidBody>
      {/* <CustomObject ref={customRef} /> */}
      {/* <group >
          <RigidBody type='fixed'>
            <mesh position-y={-0.5} scale={1} >
              <boxGeometry args={[10, 1, 10]} />
        <MeshReflectorMaterial
          resolution={512}
          blur={[1000, 1000]}
          mixBlur={1}
          mirror={0.25}
          {...floorColorMap} />
      </mesh>
    </RigidBody>
    <RigidBody type='fixed'>
      <mesh position-z={-5} position-y={2.5} scale={1} rotation-x={degToRad(90)} >
        <boxGeometry args={[10, .2, 5]} />

        <meshStandardMaterial
          // <MeshReflectorMaterial
          //   resolution={512}
          //   blur={[1000, 1000]}
          //   mixBlur={2}
          //   mirror={0.15}
          {...wallColorMap} />
      </mesh>
    </RigidBody>
    <RigidBody type='fixed'>
      <mesh
        scale={1}
        // position-z={-5}
        position-y={2.5}
        position-x={5}
        rotation-x={degToRad(90)}
        rotation-z={degToRad(-90)} >
        <boxGeometry args={[10, .2, 5]} />
        <meshStandardMaterial
          // <MeshReflectorMaterial
          //   resolution={512}
          //   blur={[1000, 1000]}
          //   mixBlur={2}
          //   mirror={0.15}
          {...wallColorMap} />
      </mesh>
    </RigidBody>
  </group> */}
    </Physics >
    <PivotControls anchor={[0, 0, 0]} visible={pivotView} opacity={0.5}>
      <Fox position={[- 8, 0.5, -1]} handleClick={clickHandler} foxActions={foxActions} />
    </PivotControls>
    <PivotControls anchor={[0, 0, 0]} visible={pivotView} opacity={0.5}>
      <Deer ref={deerRef} position={[-8, 0.5, 15]} scale={1.5} clickHandler={clickHandler} />
    </PivotControls>
  </>
}

export default World;