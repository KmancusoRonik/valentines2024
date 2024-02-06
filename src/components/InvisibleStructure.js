import React from 'react'
import * as THREE from "three"

import { RapierRigidBody, quat, vec3, euler, CuboidCollider, Physics, RigidBody } from "@react-three/rapier";
import {PerspectiveCamera, Float, useGLTF, SpotLight, useDepthBuffer ,Shadow, Box, Torus, Tube, Sphere, OrbitControls, Environment, ContactShadows, Grid, PerformanceMonitor } from '@react-three/drei'



let InvisibleOpacity = .1;

// Ground 
const GroundPlane = ({ position, color }) => (
  <RigidBody colliders="cuboid" type="fixed" position={position} restitution={0.3} friction={1} >
    <mesh 
     receiveShadow
      position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} >
      <planeGeometry attach="geometry" args={[200, 200]} receiveShadow />
      <meshStandardMaterial attach="material" color="#ff0000" opacity={InvisibleOpacity} transparent />
    </mesh>
  </RigidBody>
);

// Backdrop
const BackDrop = ({ position, color, rotation }) => (
  <RigidBody colliders="cuboid" type="fixed" position={position} >
    <mesh 
      castShadow 
      receiveShadow 
      position={[0, 0, 0]} 
      rotation={rotation}
    >
      <planeGeometry attach="geometry" args={[200, 200]}/>
      <meshStandardMaterial attach="material" color="#ff0000" opacity={InvisibleOpacity} transparent />
    </mesh>
  </RigidBody>
);

const Invisible = ({position, type, rotation}) => {
    if( type == 'wall'){
      return (
        <>
          <RigidBody colliders="cuboid" type="fixed" position={position} restitution={.5}>
            <mesh
              rotation={[0, -Math.PI / 2, 0]}
              castShadow 
              receiveShadow
            >
              <boxGeometry args={[5, 20, 1]} />
              <meshStandardMaterial attach="material" color="#ff0000" opacity={InvisibleOpacity} transparent />
            </mesh>
          </RigidBody>
        </>
      )
    }  
  
    if( type == 'bumper'){
      return (
        <>
          <RigidBody colliders="cuboid" type="fixed" position={position} restitution={.5}>
            <mesh
              rotation={rotation}
              castShadow 
              receiveShadow
            >
              <boxGeometry args={[6, 2, .4]} />
              <meshStandardMaterial attach="material" color="#ff0000" opacity={InvisibleOpacity} transparent />
            </mesh>
          </RigidBody>
        </>
      )
    }
  
    if( type == 'floor_slope'){
      return (
        <>
          <RigidBody colliders="cuboid" type="fixed" position={position} restitution={.5}>
            <mesh
              rotation={rotation}
              castShadow 
              receiveShadow
            >
              <boxGeometry args={[20, 5, .1]} />
              <meshStandardMaterial attach="material" color="#ff0000" opacity={InvisibleOpacity} transparent />
            </mesh>
          </RigidBody>
        </>
      )
    }
  
    if( type == 'front-half'){
      return (
        <>
          <RigidBody colliders="cuboid" type="fixed" position={position} restitution={.5}>
            <mesh
              rotation={rotation}
              castShadow 
              receiveShadow
            >
              <boxGeometry args={[5, 5, .5]} />
              <meshStandardMaterial attach="material" color="#ff0000" opacity={InvisibleOpacity} transparent />
            </mesh>
          </RigidBody>
        </>
      )
    }
  
    if( type == 'front-horizontal'){
      return (
        <>
          <RigidBody colliders="cuboid" type="fixed" position={position} restitution={.5}>
            <mesh
              rotation={rotation}
              castShadow 
              receiveShadow
            >
              <boxGeometry args={[10, 1.5, .5]} />
              <meshStandardMaterial attach="material" color="#ff0000" opacity={InvisibleOpacity} transparent />
            </mesh>
          </RigidBody>
        </>
      )
    }
}

function InvisibleStructure() {
  const curve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(-2, -1, 0), new THREE.Vector3(-1, 1, 0), new THREE.Vector3(1, 1, 0))


    return (
        <>

            {/* <RigidBody colliders="hull" type="fixed" position={[-3.8, 5, 10]} restitution={.5}>
              <mesh
                castShadow 
                receiveShadow
                rotation={[Math.PI / 90,0,0]} 
              >
                <tubeGeometry args={[curve, 70, 2, 5, false]}  />
                <meshStandardMaterial attach="material" color="#0x00ff00"   />
              </mesh>
            </RigidBody> */}



            <Invisible position={[-3.8, 10, 2]} type="wall" />
            <Invisible position={[6.8, 10, 2]} type="wall" />
            <Invisible position={[0, 3.5, 2]} type="floor_slope" rotation={[Math.PI / 180 * 118 ,0,0]}  />
            <group position={[0, 2, 0]} rotation={[Math.PI / 180 * 28 , 0 ,0]} >        
                <Invisible position={[-1.7, 2, 1.4]} type="bumper" rotation={[0, Math.PI / 180 * 143.1, 0]} />
                <Invisible position={[4.5, 2, 1.4]} type="bumper" rotation={[0, -Math.PI / 180 * 143.1, 0]} />
            </group>

            <group position={[0, 0, -.7]} >        
                <Invisible position={[1.5, 4.7, 5]} type="front-horizontal" />
                <Invisible position={[-2, 2, 5]} type="front-half" />
                <Invisible position={[4.8, 2, 5]} type="front-half" />
                <Invisible position={[1.5, 1.6, 5]} type="front-horizontal" />
            </group>

            <BackDrop color="navy" position={[-2.75, 0, 0]} rotation={[0,0,0]} />
            <GroundPlane color="#6f6f6f" position={[-2.75, 0.1, 0]}  />

        </>
    )
}

export default InvisibleStructure