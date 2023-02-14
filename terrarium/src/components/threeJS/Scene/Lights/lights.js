import React from "react";

const Lights = () => {

  return (
    <group>
      <ambientLight position={[0, 4, 0]} intensity={0.3} />
      <directionalLight intensity={0.5} position={[0, 0, 0]} color={0xffffff} />
      <pointLight
        intensity={1.9}
        position={[-6, 3, -6]}
        color={0xffcc77}
      >
      </pointLight>

      <pointLight
        intensity={1.9}
        position={[6, 3, 6]}
        color={0xffcc77}
      >
      </pointLight>

    </group>
  );
};

export default Lights;