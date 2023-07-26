import './world.css'
// import {} from @react-three/fiber
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { TransformControls, PivotControls } from '@react-three/drei';
import { useState, useRef, useMemo, useEffect } from 'react'
import * as THREE from 'three';

const CustomObject = () => {

  // use to associate 
  const geometryRef = useRef();

  // ten triangles, three points each
  const verticesCount = 10 * 3;

  // memoize position so as to not update each time, unless a dependency changes
  const positions = useMemo(() => {

    // create array to hold all vertices positions
    // (multiply again by 3 to hold all three coordinates per point)
    const positions = new Float32Array(verticesCount * 3);
    //fill array with random values:

    for (let i = 0; i < verticesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) / 3;
    }
    return positions

  }, [ /*where you would add variables that could change position*/])

  const customRef = useRef();

  // generate normals for custom object upon geometry change
  // called after first draw, will have a current to reference
  useEffect(() => {
    // now triangles should have normals associated with faces ( for light, physics)
    geometryRef.current.computeVertexNormals()
  }, [positions])


  const [active, setActive] = useState(false);
  const [hover, setHover] = useState(false);

  useFrame((state, delta) => {
    // prevents errors on first run or if objects aren't added yet
    if (!customRef.current) {
      return;
    }

    // frame-based stuff 
  })

  return (
    <>
      <PivotControls anchor={[0, 0, 0]} depthTest={false}>
        <mesh ref={customRef} position={[0, 2.2, 0]} onClick={() => {
          setActive(!active);
        }}
          onPointerOver={() => {
            setHover(true);
          }}
          onPointerOut={() => {
            setHover(false);
          }} scale={hover ? 1.5 : 1}>

          <bufferGeometry ref={geometryRef}>
            <bufferAttribute
              attach="attributes-position"
              count={verticesCount} // verticies
              itemSize={3} // items from array which compose a vertex
              array={positions} // verticies array
            />
          </bufferGeometry>
          <meshStandardMaterial
            color={active || hover ? "lightGreen" : "maroon"}
            side={THREE.DoubleSide} />
          {/* <Html
            wrapperClass="label"
            position={[.2, .2, -0.1]}
            center
            distanceFactor={4}
          // occlude={[]}
          >
            Custom Object
          </Html> */}
        </mesh>
      </PivotControls>
      {/* <TransformControls object={customRef} mode="translate" /> */}
    </>
  )
}

export default CustomObject;