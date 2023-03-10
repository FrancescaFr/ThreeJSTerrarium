/*
author: Miaolailai (https://sketchfab.com/Miaolailai)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/deer-sculpture-e97f99c0216a4cae9a8b11d044d2694a
title: Deer Sculpture
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Deer(props) {
  const { nodes, materials } = useGLTF("/models/deer_sculpture.glb");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group
            position={[-3.02, -0.34, 9.99]}
            rotation={[-1.59, 0.01, -2.62]}
            scale={100}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["���������001_Material003_0"].geometry}
              material={materials["Material.003"]}
              onClick={props.clickHandler}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/deer_sculpture.glb");
