import { useRef } from 'react';
import { useControls } from 'leva'

function DebugAmbient( { name } ) {
    const {  al1Visible, al1Intensity } = useControls(name, {
        al1Visible: true,
        al1Intensity:
        {
            value: 0,
            step: 0.01,
            min: 0,
            max: 500
        }
    })
    const ambientLight1 = useRef()

    return (
        <>           
            {al1Visible ? <ambientLight ref={ ambientLight1 }  intensity={ al1Intensity } /> : null }
        </>
    )
}
export default DebugAmbient;






