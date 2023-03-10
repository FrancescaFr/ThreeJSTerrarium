/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: Zian (https://sketchfab.com/zian_0912)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/wooden-chair-fd172ee34d014291ae0eb68a7b72f4e8
title: Wooden Chair
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function WoodenChair(props) {
  const { nodes, materials } = useGLTF("/models/wooden_chair.glb");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Wood_Chair_01a006__0.geometry}
              material={materials["Scene_-_Root"]}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/modles/wooden_chair.glb");

