import { useRef } from 'react';
import { useControls } from 'leva'
import { useHelper } from '@react-three/drei'
import * as THREE from 'three';

function DebugDirectional( { pos, name } ) {
    const { dl1POS, dl1Visible, dl1Intensity } = useControls(name, {
        dl1POS:
        {
            value: pos,
            // min: - 4,
            // max: 4,
            step: 0.01,
            joystick: 'invertY'
        },
        dl1Visible: true,
        dl1Intensity:
        {
            value: 0,
            step: 0.01,
            min: 0,
            max: 500
        }
    })
    const directionalLight1 = useRef()
    useHelper(directionalLight1, THREE.DirectionalLightHelper, 1)
    return (
        <>
            {dl1Visible ? <directionalLight ref={ directionalLight1 }  shadow-mapSize={[1024, 1024]} castShadow={true} position={[dl1POS.x, dl1POS.y,  dl1POS.z]} intensity={ dl1Intensity }><orthographicCamera attach="shadow-camera" args={[-10, 10, 10, -10]} /></directionalLight> : null }
        </>
    )
}
export default DebugDirectional



