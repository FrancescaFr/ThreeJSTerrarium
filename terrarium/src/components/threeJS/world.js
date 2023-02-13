import { React, useRef, useState, useEffect } from 'react'
import { Suspense } from 'react'
import { useControls } from 'leva';
import { TransformControls, PointerLock, PivotControls, useKeyboardControls } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame, useThree } from "@react-three/fiber"; //useThree, 
import { FirstPersonControls, FirstPersonControlsProps } from '@react-three/drei';
import { Physics, RigidBody, Debug } from '@react-three/rapier'
// import { WebGLRenderer } from "@react-three/fiber"
import {
  OrbitControls, PerspectiveCamera,
  Stars, Sky, Cloud, Environment, useTexture,
  Text, Float,
  MeshReflectorMaterial,
  useGLTF, Clone, useAnimations,
  meshBounds
} from "@react-three/drei";
// import { KeyboardControls, PointerLockControls } from '@react-three/drei';
import CustomObject from './customObject';
import Lights from './Scene/Lights/index';
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import {useLoader} from "@react-three/fiber"

// ------------- Object model imports ------------
import Table from './objects/table'
import Seat from './objects/seat'
import Snail from './objects/gardensnail';
import Fox from './objects/fox';
import Deer from './objects/deer';
import Plane from './objects/plane';
import { degToRad } from 'three/src/math/MathUtils';
import { CatmullRomCurve3, Group, MeshStandardMaterial } from 'three';



const World = ({ userPositionData, playerState, handlePlayerState, getKeys, gazeTracking }) => {

  const [focusPoint, setFocusPoint] = useState();

  //keyboard Controls
  const [subscribeKeys] = useKeyboardControls()

  useEffect(() => {
    subscribeKeys(
      (state) => {
        return state.space
      },
      (value) => {
        if (value)
          console.log('spacebar function')

      }
    )
  }, [])

  // First person player controls
  // const playerControls = new FirstPersonControls()
  // playerControls.movementSpeed = 1



  const floorColorMap = useTexture({ map: 'textures/wood-texture-wild-hardwood-e68adc3402684d76a8f36b4238aaeda4.jpg' })

  //leva controller
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

  //use to access state values (clock, camera, etc)

  const cubeRef = useRef()
  const groupRef = useRef()
  const snailRef = useRef()
  const snailBodyRef = useRef()
  const customRef = useRef()
  const deerRef = useRef()
  const flightRef = useRef()
  const planeRef = useRef()




  //   const points = curve.getPoints( 16 );

  // for (let i = 0; i < points.length; i++) {
  //     const point = points[i];
  //     const norm = i / points.length;
  //     const tan = curve.getTangent(norm);
  //     console.log(tan);

  //     const geometry = new BoxGeometry();
  //     this.cube = new Mesh(geometry, material);
  //     this.cube.position.set(point.x, point.y, point.z);
  //     this.cube.lookAt(tan);
  //     this.canvas.scene.add(this.cube);
  // }


  //runs on each frame run (based on framerate -need to account for variable FPS)
  useFrame((state, delta) => {
    // Flight ANIMATION CONTROLS
    const time = state.clock.getElapsedTime()
    const angle = time / 3
    const eulerRotation = new THREE.Euler(0, -(angle + degToRad(90)), 0)
    const quaternionRotation = new THREE.Quaternion()
    quaternionRotation.setFromEuler(eulerRotation) // rotation around y
    flightRef.current.setNextKinematicRotation(quaternionRotation)
    const x = -Math.cos(angle) * 10
    const z = -Math.sin(angle) * 10
    flightRef.current.setNextKinematicTranslation({ x: x, y: 8, z: z })


    // CAMERA CONTROLS
    //camera controls for webgaze perspective
    if (!playerState) {
      // if (gazeTracking) {
      const fovFactor = 5
      state.camera.fov = 75 - ((userPositionData.head.dist)); // decrease field of view (narrows like window)
      state.camera.zoom = 1 - (userPositionData.head.dist / (25)) //to compensate for fov (/75 obj. stay the same size) - (/25) to have actual zoom effect
      // }
      state.camera.position.z = 2 + (userPositionData.head.dist / 50)
      state.camera.position.x = 1 - (userPositionData.head.x * 20); // shift side to side with head
      state.camera.position.y = 2.2 - (userPositionData.head.y * 20);  // shift up and down with head
      state.camera.position.z = 2.5;
      // state.camera.lookAt(focusPoint);
      //TODO: update to mouse pointer or gaze prediction (raycaster)
      state.camera.lookAt(0, 2.2, 0)
      // state.camera.rotateX(0)
      // state.camera.rotateY(0)
      // set z position by keyboard
      // state.camera.position.z = 
    }
    if (playerState) {
      state.camera.fov = 75;
      state.camera.zoom = 1;

      const playerPosition = snailBodyRef.current.translation()
      const playerCamera = new THREE.Vector3()
      playerCamera.copy(playerPosition)
      playerCamera.y += 0.2;


      const playerCameraTarget = new THREE.Vector3()
      playerCameraTarget.copy(playerPosition)
      playerCameraTarget.z -= 0.25
      playerCameraTarget.x += 0.25
      playerCameraTarget.y += 0.1

      state.camera.position.copy(playerCamera)
      state.camera.lookAt(playerCameraTarget)



      // state.camera.position.x = snailBodyRef.current.position.x + 0
      // state.camera.position.y = 2.2;
      // state.camera.position.z = 0;
      // state.camera.rotation.y = degToRad(90 + userPositionData.head.y * 50)
      // state.camera.rotation.x = degToRad(90 + userPositionData.head.x * 50)
      // const rotationAxies = new THREE.Vector3()
      // rotationAxies.copy(snailBodyRef.current.)
      // state.camera.rotateOnAxis()
      state.camera.rotateX(degToRad(180 + (userPositionData.head.y * 60)))
      state.camera.rotateY(-degToRad(userPositionData.head.x * 60))
      state.camera.rotateZ(degToRad(180))
    }
    // cubeRef.current.rotation.y += delta
    // groupRef.current.rotation.y -= delta * .5
  })

  const clickHandler = (event) => {
    // setFocusPoint(event.point);
    // THREE.state.camera.lookAt(event.point);
    console.log('clicked something');
    console.log(event);

  }

  const snailJump = () => {
    console.log(snailBodyRef.current)
    const mass = snailBodyRef.current.mass()
    snailBodyRef.current.applyImpulse({ x: 0, y: 0.5 * mass, z: 0 })
  }




  return <>
    {/* <Float>
      {/* <Text position={[0, 6, -8]} rotation-x={degToRad(45)} fontSize={1} color="black">ThreeJS Terrarium</Text> */}
    {/* </Float> */}
    {/* <PerformanceMonitor /> */}
    {/* <color attach="background" args={["black"]} /> */}
    <PerspectiveCamera makeDefault fov={45} zoom={1} near={0.1} far={200} position={[1, 0, 3]} />

    {/* Debugging Only - aerial view camera */}
    {/* <PerspectiveCamera makeDefault position={[0, 50, 0]} zoom={1} near={0.1} far={200} /> */}
    {/* // enabling orbit controls allows for some movement, but also pins orientation to 0,0,0 */}
    {playerState ? <OrbitControls /> : null}
    {/* TODO  - Add custom high res skybox from generated images (Gan360) */}
    {/* <Environment
      background={true} // can be true, false or "only" (which only sets the background) (default: false)
      blur={0} // blur factor between 0 and 1 (default: 0, only works with three 0.146 and up)
      preset="forest"
      scene={undefined} // adds the ability to pass a custom THREE.Scene, can also be a ref
      encoding={undefined} // adds the ability to pass a custom THREE.TextureEncoding (default: THREE.sRGBEncoding for an array of files and THREE.LinearEncoding for a single texture)
    /> */}
    {/* <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} /> */}
    <Sky distance={450000} sunPosition={[0, .5, 1]} inclination={0} azimuth={0.25} />
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
    <Physics>
      {/* <Debug /> */}
      <Suspense>
        <Table scale={2} position={[0, 0, 0]} />
        <Seat scale={2} />
        <Snail ref={snailRef} userPositionData={userPositionData} getKeys={getKeys} snailJump={snailJump} snailBodyRef={snailBodyRef} playerState={playerState} handlePlayerState={handlePlayerState} />
        <PivotControls anchor={[0, 0, 0]} visible={true}>
          <Deer ref={deerRef} position={[5, 0, -6]} scale={3} />
        </PivotControls>
        <Fox handleClick={clickHandler} actions='walk' />


        <RigidBody
          ref={flightRef}
          position={[0, 10, -8]}
          rotation-y={degToRad(90)}
          friction={0}
          type="kinematicPosition">
          <group >
            <Plane handleClick={clickHandler} />
            {/* <mesh position={[0, 10, 8]}>
              <sphereGeometry />
            </mesh> */}
          </group>
        </RigidBody>
      </Suspense>

      {/* <Clone object={<Seat />} /> */}

      <RigidBody type='fixed'>
        <mesh position-y={0} scale={1} >
          <boxGeometry args={[100, .2, 100]} />
          {/* <meshStandardMaterial color="black" /> */}
          <MeshReflectorMaterial
            resolution={512}
            blur={[1000, 1000]}
            mixBlur={1}
            mirror={0.25}
            {...floorColorMap} />
        </mesh>
      </RigidBody>
    </Physics>
    <CustomObject ref={customRef} />
  </>
}

export default World;