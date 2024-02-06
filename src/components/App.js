import { Canvas } from "@react-three/fiber"
import { Suspense } from 'react'
import DebugController from './debug/Debugs.js'
import Experience from './Experience.js'

function App() {
  return (

    <Canvas
      shadows
    >
        <Suspense fallback={null}>
            <DebugController />
            <Experience/>
        </Suspense>
    </Canvas>

  )
}

export default App