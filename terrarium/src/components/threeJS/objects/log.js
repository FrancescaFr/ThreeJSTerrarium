/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: Yu (https://sketchfab.com/FFT_kedar)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/log-ba0d8dee477a4035afe87a328a9bd3bf
title: Log
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Log(props) {
  const { nodes, materials } = useGLTF("/models/log.glb");
  return (
    <group {...props} dispose={null}>
      <group position={[0, 0, 0]} rotation={[-1.48, 0, 0]} scale={0.07}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials.wood_LOW}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/log.glb");