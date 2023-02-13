
import { useGLTF, useAnimations, meshBounds } from "@react-three/drei";
import { useEffect } from "react";

export default function Fox({actions, handleClick}){

    useEffect(() => {
        let action;
        if(actions){
            
            if (actions ==='run'){
                action = animations.actions.Run
            } else if (actions === 'walk'){
                action = animations.actions.Walk
            }
            action.reset().fadeIn(0.5).play()  
        }

        return () => {
            action.fadeOut(0.5)
        }

    },[actions])

    const fox = useGLTF('/models/Fox/Fox.gltf')
    const animations = useAnimations(fox.animations, fox.scene)

    return <primitive 
        object={ fox.scene } 
        scale={ 0.005 }
        position={ [ 0.7, 1.8, -0.7 ] }
        rotation-y={ 0.3 }
        raycast={meshBounds}
        onClick={handleClick}
        />}