
import { useGLTF, useAnimations, meshBounds } from "@react-three/drei";
import { useEffect } from "react";

export default function Fox({foxActions, handleClick, position}){

    useEffect(() => {
        let action; 
        if (foxActions){
            if (foxActions === 2){
                action = animations.actions.Run
                action.reset().fadeIn(0.5).play()
            } else if (foxActions === 1){
                action = animations.actions.Walk
                action.reset().fadeIn(0.5).play()
            } 
        } else {
            action = animations.actions.Walk
        }
        return () => {
            action.fadeOut(0.5)
        }
    },[foxActions])

    const fox = useGLTF('/models/Fox/Fox.gltf')
    const animations = useAnimations(fox.animations, fox.scene)

    return <primitive 
        object={ fox.scene } 
        scale={ 0.01 }
        position={position}
        rotation-y={ 0.3 }
        raycast={meshBounds}
        onClick={handleClick}
        />}
        