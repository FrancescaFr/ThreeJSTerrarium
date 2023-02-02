
// import {} from @react-three/fiber


const CustomObject = () => {

  // ten trianges, three points each
  const verticesCount = 10 * 3
  // create array to hold all vertices positions
  // (multiply again by 3 to hold all three coordinates per point)
  const positions = new Float32Array(verticesCount * 3)
  //fill array with random values:

  // for (let i = 0)

  return <mesh>
    <boxGeometry />
    <meshBasicMaterial color="maroon" />
  </mesh>

}

export default CustomObject;