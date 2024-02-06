import { useControls } from 'leva'
import { Environment } from '@react-three/drei'

import DebugDirectional from './DebugDirectional';
import DebugSpotlight from './DebugSpotlight';
import DebugAmbient from './DebugAmbient';


function DebugScene() {
    // First Scene boxGeometry Mesh
    const { scene, blur, near, far, resolution } = useControls('Environment HDR Selection', {
        scene: { options: [ 'sky' ] },
        blur:
        {
            value: .5,
            step: 0.01,
            min: 0,
            max: 1
        },
        near:
        {
            value: 1,
            step: 0.01,
            min: 0,
            max: 1000
        },
        far:
        {
            value: 1000,
            step: 1,
            min: 0,
            max: 10000
        },
        resolution:
        {
            value: 256,
            step: 1,
            min: 50,
            max: 360
        }
    })   
    const sceneURL = `./models/MainScene/${scene}.hdr`;
    return (
        <>
            {/* Affects Background no lighting */}
            <Environment
                near={near}
                far={far}
                resolution={resolution}
                files={sceneURL}
                background={'only'}
                blur={blur}
            />
            <DebugDirectional 
                scene='ronik'
                pos={{x: 5, y:8, z: 5}}
                name='Ronik Scene Directional Light'
            />
            <DebugSpotlight 
                scene='ronik'
                pos={{x: 0, y:30, z: 10}}
                name='Ronik Scene Spot Light'
            />
            <DebugAmbient 
                scene='ronik'
                name='Ronik Scene Ambient Light'
            />





        </>
    )

}

export default DebugScene