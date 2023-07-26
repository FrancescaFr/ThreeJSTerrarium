
import React, { useRef, forwardRef, useState } from "react";
// import * as THREE from 'three';
import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from '@react-three/fiber';
import { RigidBody } from "@react-three/rapier";
import { useKeyboardControls } from '@react-three/drei';
import { degToRad } from "three/src/math/MathUtils";


const Snail = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF("/models/gardensnail.glb");
  const shellColorMap = useTexture({ map: 'textures/beach-sand-wood-sunlight-texture-leaf-175730-pxhere.com.jpg' })
  const fleshColorMap = useTexture({ map: 'textures/creepy_flesh.jpg' })
  const floorColorMap = useTexture({ map: 'textures/wood-texture-wild-hardwood-e68adc3402684d76a8f36b4238aaeda4.jpg' })


  const snailRef = useRef();
  const [active, setActive] = useState(false)
  const [hover, setHover] = useState(false)

  const [, getKeys] = useKeyboardControls()

  useFrame((state, delta) => {
    if (!snailRef.current) { return; }
    // if (active) {
    const { forward, backward, left, right } = getKeys()
    // console.log(keys)
    const impulseStrength = 0.4 * delta;
    // const torqueStrength = .01 * delta
    const impulse = { x: 0, y: 0, z: 0 }
    const torque = { x: 0, y: 0, z: 0 }

    if (props.playerState) {
      if (forward) {
        impulse.x += impulseStrength
        // const forwardDir = new THREE.Vector3();
        // props.snailBodyRef.current.getWorldDirection(forwardDir)
        // props.snailBodyRef.current.position += forwardDir
        // props.snailBodyRef.current.translateZ(1)
      }
      if (backward) {
        impulse.x -= impulseStrength
      }

      if (left) {
        // torque.y += torqueStrength
        // props.snailBodyRef.current.rotate.y += delta
        impulse.z -= impulseStrength

      }
      if (right) {
        // torque.y -= torqueStrength
        // props.snailBodyRef.current.rotate.y -= delta
        impulse.z += impulseStrength

      }
      props.snailBodyRef.current.applyImpulse(impulse)

      props.snailBodyRef.current.applyTorqueImpulse(torque)
    }
    //For Debugging - Camera parameters
    // const bodyPosition = props.snailBodyRef.current.translation()
    // console.log(bodyPosition)
  })


  return (
    <RigidBody
      ref={props.snailBodyRef}
      position={props.navStart}
      restitution={0}
      friction={0}
      linearDamping={0.75}
      angularDamping={0.9}
      rotation-y={degToRad(-90)}
      onClick={props.clickHandler}
    >
      <group {...props}
        ref={snailRef}
        dispose={null}
        scale={0.004}
        visible={!props.playerState}
        onDoubleClick={() => {
          setActive(!active);
          props.handlePlayerState();
        }} onClick={() => {
          props.snailJump();
        }}
        onPointerOver={() => {
          setHover(true);
        }}
        onPointerOut={() => {
          setHover(false);
        }}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.garden_snail_1.geometry}>
          <meshStandardMaterial {...fleshColorMap} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.garden_snail_1_1.geometry}
          material={materials.body}
        >
          <meshStandardMaterial {...fleshColorMap} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.garden_snail_1_2.geometry}
          material={materials.body}
        ><meshStandardMaterial {...fleshColorMap} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.garden_snail_1_3.geometry}
          material={materials.body}
        ><meshStandardMaterial {...fleshColorMap} /></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.garden_snail_1_4.geometry}
          material={materials.body}
        >{hover ? <meshStandardMaterial {...floorColorMap} /> : <meshStandardMaterial {...shellColorMap} />}</mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.garden_snail_1_5.geometry}
          material={materials.body}
        >{hover ? <meshStandardMaterial {...floorColorMap} /> : <meshStandardMaterial {...shellColorMap} />}</mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.garden_snail_1_6.geometry}
          material={materials.body}
        >{hover ? <meshStandardMaterial color="yellow" /> : <meshStandardMaterial {...shellColorMap} />}</mesh>
      </group >
    </RigidBody>
  );
})

useGLTF.preload("/models/gardensnail.glb");

export default Snail
