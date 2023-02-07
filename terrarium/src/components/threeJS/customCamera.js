

import { useRef } from 'react'
// import { Canvas } from "@react-three/fiber"; // import everything from react-three
// import { Camera, Group, Scene } from "@react-three/fiber";
import { useFrame, PerspectiveCamera, useThree } from "@react-three/fiber"; //useThree, 
// import { WebGLRenderer } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei";
import CustomObject from './customObject';
// import * as THREE from ' three';
// import { Physics, usePlane, useBox, useSphere } from '@react-three/cannon'

// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import {useLoader} from "@react-three/fiber"
// imports for our first scene
// import {
//   BoxBufferGeometry,
//   Mesh,
//   MeshBasicMaterial,
//   PerspectiveCamera,
//   Color
// } from "@react-three/fiber"

export default function CustomCamera() {
  const { camera, gl } = useThree()

  // camera config
  const sizes = {
    width: 800,
    height: 600
  }

  return <>

    <orbitControls args={[camera, gl.domElement]} />

    {/* ... */}
  </>
}