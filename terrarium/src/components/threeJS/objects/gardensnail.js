
import React, { useRef, useState } from "react";
import * as THREE from 'three';
import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from '@react-three/fiber';
import { RigidBody } from "@react-three/rapier";
import { useKeyboardControls } from '@react-three/drei';


export default function Snail(props) {
  const { nodes, materials } = useGLTF("/models/gardensnail.glb");
  const shellColorMap = useTexture({ map: 'textures/beach-sand-wood-sunlight-texture-leaf-175730-pxhere.com.jpg' })
  const fleshColorMap = useTexture({ map: 'textures/creepy_flesh.jpg' })
  const floorColorMap = useTexture({ map: 'textures/wood-texture-wild-hardwood-e68adc3402684d76a8f36b4238aaeda4.jpg' })


  const snailRef = useRef();
  const [active, setActive] = useState(false)
  const [hover, setHover] = useState(false)

  const [subscribeKeys, getKeys] = useKeyboardControls()

  useFrame((state, delta) => {
    if (!snailRef.current) { return; }
    // if (active) {
    const keys = getKeys()
    const { forward, backward, left, right } = getKeys()
    console.log(keys)
    const impulseStrength = .04 * delta
    const torqueStrength = .05 * delta
    const impulse = { x: 0, y: 0, z: 0 }
    const torque = { x: 0, y: 0, z: 0 }

    if (forward) {
      impulse.x -= impulseStrength
      // const forwardDir = new THREE.Vector3();
      // props.snailBodyRef.current.getWorldDirection(forwardDir)
      // props.snailBodyRef.current.position += forwardDir
      // props.snailBodyRef.current.translateZ(1)
    }
    if (backward) {
      impulse.x += impulseStrength
    }

    if (left) {
      impulse.z += impulseStrength
      // torque.y += torqueStrength
    }
    if (right) {
      impulse.z -= impulseStrength
      // torque.y -= torqueStrength
    }
    props.snailBodyRef.current.applyImpulse(impulse)

    props.snailBodyRef.current.applyTorqueImpulse(torque)

    //Camera parameters
    const bodyPosition = props.snailBodyRef.current.translation()
    console.log(bodyPosition)

    // }
  })

  return (
    <RigidBody
      ref={props.snailBodyRef}
      restitution={0}
      friction={0}
      linearDamping={0.75}
      angularDamping={0.9}
      position={[0, 1.8, .9]}
    >
      <group {...props} ref={snailRef} dispose={null} scale={0.002} visible={!props.playerState} onDoubleClick={() => {
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
        }}>
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
        >{hover ? <meshStandardMaterial {...floorColorMap} /> : <meshStandardMaterial {...shellColorMap} />} </mesh>
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
        >
          {hover ? <meshStandardMaterial {...floorColorMap} /> : <meshStandardMaterial {...shellColorMap} />}
        </mesh>
      </group >
    </RigidBody>
  );
}

useGLTF.preload("/models/gardensnail.glb");
