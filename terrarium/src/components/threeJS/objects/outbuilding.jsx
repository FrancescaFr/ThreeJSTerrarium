/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: quizzes (https://sketchfab.com/quizzes)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/outbuilding-26d9395801dd49629a49a2886d6c7257
title: Outbuilding
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Outbuilding(props) {
  const { nodes, materials } = useGLTF("/models/outbuilding.glb");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group
            position={[1487.27, 229.09, 42.48]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.wood_planks_tile_wood_planks_tile_0.geometry}
              material={materials.wood_planks_tile}
            />
          </group>
          <group
            position={[1487.27, 229.09, 4.13]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Metal_metal_0.geometry}
              material={materials.metal}
            />
          </group>
          <group
            position={[1546.43, 143.69, -20.68]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Beam_beam_0.geometry}
              material={materials.beam}
            />
          </group>
          <group
            position={[1447.12, 221.03, 390.01]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.fabrick003_fabrick_0.geometry}
              material={materials.fabrick}
            />
          </group>
          <group
            position={[1461.27, 361.65, 3.6]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Metal_rust001_Metal_rust_0.geometry}
              material={materials.Metal_rust}
            />
          </group>
          <group
            position={[1487.27, 229.09, 42.48]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.wood_planks_wood_planks_0.geometry}
              material={materials.wood_planks}
            />
          </group>
          <group
            position={[1461.27, 361.65, 3.6]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Metal_rust002_Metal_rust_0.geometry}
              material={materials.Metal_rust}
            />
          </group>
          <group
            position={[1461.27, 361.65, 3.6]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.metal_metal_0.geometry}
              material={materials.metal}
            />
          </group>
          <group
            position={[1657.6, 93.98, -181.67]}
            rotation={[-Math.PI / 2, 1.27, 0]}
            scale={100}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Metal_rust_Metal_rust_0.geometry}
              material={materials.Metal_rust}
            />
          </group>
          <group
            position={[1447.12, 221.03, 390.01]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.rope_fabrick_0.geometry}
              material={materials.fabrick}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/outbuilding.glb");