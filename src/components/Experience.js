import React from 'react'
import MainScene from './MainScene.js'
import { Environment, ContactShadows } from '@react-three/drei'


function Experience() {
  return (
    <>
        {/* Fog */}
        <fog attach="fog" args={['#202020', 5, 200]} />

        {/* Environment */}
        {/* <Environment
            near={1}
            far={1000}
            resolution={256}
            files="./models/MainScene/sky.hdr"
            background={true}
            blur={.5}
        /> */}
  
        {/* Lights */}
        {/* <ambientLight intensity={0.1} /> */}
        {/* <directionalLight castShadow position={[5, 8, 5]} shadow-mapSize={[1024, 1024]}>
          <orthographicCamera attach="shadow-camera" args={[-10, 10, 10, -10]} />
        </directionalLight> */}

        {/* Main Scene */}
        <MainScene />
        <ContactShadows opacity={1} scale={10} blur={1} far={10} resolution={256} color="#000000" />
    </>
  )
}

export default Experience