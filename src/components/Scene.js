import { useState, useRef, useEffect, Suspense} from 'react'

import * as THREE from "three"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import {PerspectiveCamera, Float, useGLTF, SpotLight, useDepthBuffer ,Shadow, Box, Torus, Sphere, OrbitControls, Environment, ContactShadows, Grid, PerformanceMonitor } from '@react-three/drei'
import { RapierRigidBody, quat, vec3, euler, CuboidCollider, Physics, RigidBody } from "@react-three/rapier";

import { gsap } from "gsap";



import GameBall from './GameBall.js'
import ShellModel from './Model'
import InvisibleStructure from './InvisibleStructure.js';


// Pegs
const Cylinders = ({ position, color }) => (
  <RigidBody colliders="hull" type="fixed" position={position} restitution={.5} name="cylinder" >
    <mesh 
      rotation={[-Math.PI / 2, 0, 0]}
      castShadow 
      receiveShadow
    >
      <cylinderGeometry attach="geometry" args={[.05, .05, 2, 32]}  />
      <meshNormalMaterial attach="material" />
    </mesh>
  </RigidBody>
)

const PegWall = () => {
  let gridHorizontal = [];
  for (let i = 0; i < 10; i++) {
    gridHorizontal.push(
      <group position={[-3, 17, 0]}>
        <group position={[0, 0, 0]}>
            <Cylinders position={[ i, 0, 0]} />
        </group>
      </group>
    );
  }
  let gridVertical = [];
  for (let i = 0; i < 13; i++) {
    gridVertical.push(
      <group position={[0, -i, 0]}>
        <group position={[0, 0, 0]}>
        {gridHorizontal}
        </group>
      </group>
    );
  }
  return (
    <>
      {gridVertical}
    </>
  );
}


// Simple Goal
const GoalPosts = ({ position, color, rotation }) => {
  const newRef = useRef();
  const lookAtVec = new THREE.Vector3(0, 0, 0);
  const cameraVector = new THREE.Vector3(0, 0, 0);
  const [gameReset, setGameReset] = useState(true);
  const [gameWin, setGameWin] = useState(false);


  const valueRef = useRef("lose");


  useFrame((state) => {
      if(valueRef.current == 'win'){
        const boxPos = newRef.current.translation();
          gsap.to(state.camera.position, {
            x: boxPos.x,
            y: state.camera.position['y'],
            z: state.camera.position['z'],
            duration: 2
          });
          // lookAtVec.set(boxPos.x, boxPos.x, boxPos.z);
          // cameraVector.lerp(lookAtVec,.5);
          // state.camera.lookAt(cameraVector);
          // state.camera.updateProjectionMatrix();

        console.log('effect'+valueRef.current);
    }
  });
  return(
    <>
      <GameBall valueRef={valueRef} />
      <RigidBody ref={newRef} position={position} colliders="cuboid" type="fixed" restitution={.5} >
        <group >
          <RigidBody colliders="cuboid" type="fixed" restitution={.5}  name="goal1">
            <mesh
              rotation={rotation}
              castShadow 
              receiveShadow
            >
              <boxGeometry args={[4, .2, 4]} />
              <meshStandardMaterial color={color} />
            </mesh>
          </RigidBody>

        </group>
      </RigidBody>
    </>
  )
}




function scene() {  
  return (
    <group rotation={[0,0,0]} >
      <PerspectiveCamera position={[0, 20, 10]} makeDefault  />
      <OrbitControls />
      <ShellModel />
      <PegWall />
      <InvisibleStructure />
      {/* <GoalPosts color="blue" position={[-10, 0, 0]} rotation={[0,0,0]}  /> */}
    </group> 
  )
}

export default scene