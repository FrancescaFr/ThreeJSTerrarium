/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function Crustaceo(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/crustaceo.glb");
  const { actions } = useAnimations(animations, group);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group
          name="cangrejo"
          position={[-1.4, 2.37, -4.94]}
          rotation={[2.85, 0.63, -2.46]}
        >
          <mesh
            name="Sphere028"
            castShadow
            receiveShadow
            geometry={nodes.Sphere028.geometry}
            material={materials["crustaceo concha"]}
            morphTargetDictionary={nodes.Sphere028.morphTargetDictionary}
            morphTargetInfluences={nodes.Sphere028.morphTargetInfluences}
          />
          <mesh
            name="Sphere028_1"
            castShadow
            receiveShadow
            geometry={nodes.Sphere028_1.geometry}
            material={materials.faringe}
            morphTargetDictionary={nodes.Sphere028_1.morphTargetDictionary}
            morphTargetInfluences={nodes.Sphere028_1.morphTargetInfluences}
          />
          <mesh
            name="Sphere028_2"
            castShadow
            receiveShadow
            geometry={nodes.Sphere028_2.geometry}
            material={materials.hueco}
            morphTargetDictionary={nodes.Sphere028_2.morphTargetDictionary}
            morphTargetInfluences={nodes.Sphere028_2.morphTargetInfluences}
          />
          <mesh
            name="Sphere028_3"
            castShadow
            receiveShadow
            geometry={nodes.Sphere028_3.geometry}
            material={materials.ensia}
            morphTargetDictionary={nodes.Sphere028_3.morphTargetDictionary}
            morphTargetInfluences={nodes.Sphere028_3.morphTargetInfluences}
          />
          <mesh
            name="Sphere028_4"
            castShadow
            receiveShadow
            geometry={nodes.Sphere028_4.geometry}
            material={materials["crustaceo piel"]}
            morphTargetDictionary={nodes.Sphere028_4.morphTargetDictionary}
            morphTargetInfluences={nodes.Sphere028_4.morphTargetInfluences}
          />
          <mesh
            name="Sphere028_5"
            castShadow
            receiveShadow
            geometry={nodes.Sphere028_5.geometry}
            material={materials["Material.002"]}
            morphTargetDictionary={nodes.Sphere028_5.morphTargetDictionary}
            morphTargetInfluences={nodes.Sphere028_5.morphTargetInfluences}
          />
          <mesh
            name="Sphere028_6"
            castShadow
            receiveShadow
            geometry={nodes.Sphere028_6.geometry}
            material={materials["Material.006"]}
            morphTargetDictionary={nodes.Sphere028_6.morphTargetDictionary}
            morphTargetInfluences={nodes.Sphere028_6.morphTargetInfluences}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/crustaceo.glb");

