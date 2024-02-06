import { useControls } from 'leva'

function DebugMesh({scene, pos, name}) {
    // First Scene boxGeometry Mesh
    const { position, color, visible, scale } = useControls(name, {
        position:
        {
            value: pos,
            // min: - 4,
            // max: 4,
            step: 0.01,
            joystick: 'invertY'
        },
        color: 'orange',
        visible: false,
        scale:
        {
            value: 1.5,
            step: 0.01,
            min: 0,
            max: 5
        }
    })   
    return (
        <>
            <mesh castShadow position={[ position.x, position.y, position.z]} visible={visible} scale={scale}>
                <boxGeometry />
                <meshStandardMaterial color={color}></meshStandardMaterial>
            </mesh>
        </>
    )
}

export default DebugMesh