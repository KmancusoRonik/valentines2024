import { useControls } from 'leva'
import DebugMesh from './DebugMesh';
import DebugScene from './DebugScene';


const DebugMode = () => {
    // Global Scene Ambient Light
    const { globalVisible, globalIntensity } = useControls('Global Scene Ambient Light', {
        globalVisible: false,
        globalIntensity:
        {
            value: .1,
            step: 0.01,
            min: 0,
            max: 1
        }
    })
    return (
        <>
            {/* Global Settings */}
            {globalVisible ?  <ambientLight intensity={globalIntensity}/> : null }
            <DebugMesh
                scene='ronik'
                pos={{x: 0, y:20, z: 0}}
                name='Ronik Scene boxGeometry Mesh'
            />
            <DebugScene />      
        </>
    )
}

export default DebugMode
