import { useState, useRef, useEffect, Suspense} from 'react'

import * as THREE from "three"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import {PerspectiveCamera, Float, useGLTF, SpotLight, useDepthBuffer ,Shadow, Box, Torus, Sphere, OrbitControls, Environment, ContactShadows, Grid, PerformanceMonitor } from '@react-three/drei'
import { RapierRigidBody, quat, vec3, euler, CuboidCollider, Physics, RigidBody } from "@react-three/rapier";


const FollowBall = ({valueRef}) => {
    const bodyRef = useRef();
    const cameraRef = useRef();
    const lookAtVec = new THREE.Vector3(0, 0, 0);
    const cameraVector = new THREE.Vector3(0, 0, 0);
    const [gameReset, setGameReset] = useState(true);
    

    useEffect(() => {
      // This is critical we pause the ball from moving..
      if(valueRef.current !== 'win'){
          bodyRef.current.sleep(true);
      }
    }, []);
    

    useFrame((state) => {
        if(!gameReset && valueRef.current == 'win'){
            // setTimeout(() => {
            //     bodyRef.current.sleep(true);
            //     setTimeout(() => {
            //         bodyRef.current.setTranslation({ x: 0, y: 20, z: 0 });
            //     }, 500);
            // }, 500);
            bodyRef.current.addForce({ x: 0, y: 0, z: 0 }, true);
        } else {
            const boxPos = bodyRef.current.translation();
            lookAtVec.set(boxPos.x, boxPos.y, boxPos.z);
            cameraVector.lerp(lookAtVec, 0.1);
            state.camera.lookAt(cameraVector);
            state.camera.updateProjectionMatrix();

            setGameReset(false);
        }

    });
  
    // We enable ball to move.
    const WakeUpBall = () => {
      setGameReset(false);
      bodyRef.current.wakeUp(true);
    }
  
    // Simple function that creates random number based on defiend decimal place.
    const genRand = (min, max, decimalPlaces) => {  
        var rand = Math.random()*(max-min) + min;
        var power = Math.pow(10, decimalPlaces);
        return Math.floor(rand*power) / power;
    }

    return (
        <>  
            <PerspectiveCamera position={[0, 20, 30]} makeDefault ref={cameraRef} />
            <OrbitControls />
            <RigidBody ref={bodyRef} colliders="ball" position={[0, 18, .5]} restitution={.3}
                onCollisionEnter={({ manifold, target, other }) => {    
                    if(  other.rigidBodyObject.name === 'goal1' ) {
                        valueRef.current = 'win';
                        // bodyRef.current.setTranslation({ x: genRand(0, 1, 5), y: 20, z: 0 });
                        setTimeout(() => {
                            // setGameReset(true);
                        }, 50);
                  
                    }
                }}
            >
            <mesh
                castShadow 
                receiveShadow
                onClick={WakeUpBall}
            >
                <sphereGeometry args={[0.4, 30, 30]}  />
                <meshStandardMaterial color="blue" />
            </mesh>
            </RigidBody>
        </>
    );
};

function GameBall({valueRef}) {
  return (
    <FollowBall valueRef={valueRef} />
  )
}

export default GameBall