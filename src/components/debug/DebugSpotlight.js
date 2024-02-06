import { useRef } from 'react';
import { useControls } from 'leva'
import { useHelper } from '@react-three/drei'
import * as THREE from 'three';

function DebugSpotlight( { pos, name } ) {
    // Spot Light First Scene
    const { sl1POS, sl1Visible, sl1Intensity, sl1Angle, sl1color } = useControls(name, {
        sl1POS:
        {
            value: pos,
            // min: - 4,
            // max: 4,
            step: 0.01,
            joystick: 'invertY'
        },
        sl1Visible: true,
        sl1Intensity:
        {
            value: 275,
            step: 0.01,
            min: 0,
            max: 500
        },
        sl1Angle:
        {
            value: 1,
            step: 0.01,
            min: 0,
            max: 5
        },
        sl1color: '#ffffff',
    })
    // USE REFERENCE
    const spotLight1 = useRef()
    useHelper(spotLight1, THREE.SpotLightHelper, 1)
    return (
        <>
            {sl1Visible ? <spotLight  ref={ spotLight1 } castShadow={true} color={sl1color} angle={sl1Angle} position={[sl1POS.x, sl1POS.y,  sl1POS.z]} intensity={sl1Intensity} /> : null }
        </>
    )
}

export default DebugSpotlight
