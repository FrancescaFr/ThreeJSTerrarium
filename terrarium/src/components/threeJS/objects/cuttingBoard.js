/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: GameDev Nick (https://sketchfab.com/GameDevNick)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/wooden-cutting-board-5a1c3385222a4f35b208faad2837c5c9
title: Wooden Cutting Board
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function CuttingBoard(props) {
  const { nodes, materials } = useGLTF("/models/wooden_cutting_board.glb");
  return (
    <group {...props} dispose={null} scale={0.001}>
      <group rotation={[-1.74, -0.39, -0.51]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cutting_board_low_Material_0.geometry}
              material={materials.Material}

            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/wooden_cutting_board.glb");

