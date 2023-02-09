/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useState } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from '@react-three/fiber';


export default function Snail(props) {
  const { nodes, materials } = useGLTF("/models/gardensnail.glb");
  const shellColorMap = useTexture({ map: 'textures/beach-sand-wood-sunlight-texture-leaf-175730-pxhere.com.jpg' })
  const fleshColorMap = useTexture({ map: 'textures/creepy_flesh.jpg' })
  const floorColorMap = useTexture({ map: 'textures/wood-texture-wild-hardwood-e68adc3402684d76a8f36b4238aaeda4.jpg' })


  const snailRef = useRef();
  const [active, setActive] = useState(false)
  const [hover, setHover] = useState(false)

  useFrame((state, delta) => {
    if (!snailRef.current) {
      return;
    }
  })

  return (
    <group {...props} ref={snailRef} dispose={null} scale={0.002} visible={!props.playerState} onClick={() => {
      setActive(!active);
      props.handlePlayerState();
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
  );
}

useGLTF.preload("/models/gardensnail.glb");

