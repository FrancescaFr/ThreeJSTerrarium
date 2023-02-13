import { useGLTF, useAnimations, meshBounds } from "@react-three/drei";
import { useEffect } from "react";

export default function Plane({actions, clickHandler}){
    useEffect(() => {
        animations.actions.Scene.play()
    },[])

    //TODO: Attach plane to camera like snail

    const airplane = useGLTF('/models/Airplane/scene.gltf')

    // console.log(airplane)
    const animations = useAnimations(airplane.animations, airplane.scene)

    return <primitive 
        object={ airplane.scene } 
        scale={ 0.005 }
        rotation-y={ 0.3 }
        raycast={meshBounds}
        onClick={clickHandler}
        />}