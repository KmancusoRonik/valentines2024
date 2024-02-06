import React from 'react'
import Scene from './Scene.js'
import { Physics, RigidBody } from "@react-three/rapier";



const MainScene = () =>  {
    return (
        <>
            {/* Overall Physics */}
            <Physics debug gravity={[0.1 , -30, 0]} interpolation={true} colliders={true}> 
                {/* Overall 3D Scene */}
                <Scene />
            </Physics>
        </>
    )
}
export default MainScene
