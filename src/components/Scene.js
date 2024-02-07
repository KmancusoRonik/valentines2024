import { useState, useRef, useEffect, Suspense} from 'react'

import * as THREE from "three"
import { useLoader, Canvas, useFrame, useThree } from "@react-three/fiber"
import { Center, Text3D, useGLTF, useTexture, useCubeTexture, PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { RapierRigidBody, quat, vec3, euler, CuboidCollider, Physics, RigidBody } from "@react-three/rapier";
import { TextureLoader } from 'three/src/loaders/TextureLoader'

import { gsap } from "gsap";



import GameBall from './GameBall.js'
import ShellModel from './Model'
import InvisibleStructure from './InvisibleStructure.js';


// Pegs
const Cylinders = ({ position, color }) => {
  const texture = useCubeTexture(
    ["px.png", "nx.png", "py.png", "ny.png", "pz.png" ,"nz.png"],
    {path: "./Standard-Cube-Map/"}
  ); 
  
  const [colorMap, displacementMap, normalMap, roughnessMap] = useLoader(TextureLoader, [
    './metal/Metal007_1K-JPG_Color.jpg',
    './metal/Metal007_1K-JPG_Displacement.jpg',
    './metal/Metal007_1K-JPG_NormalGL.jpg',
    './metal/Metal007_1K-JPG_Roughness.jpg',
  ])
  return (
    <RigidBody colliders="hull" type="fixed" position={position} restitution={.5} name="cylinder" >
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]}
        castShadow 
        receiveShadow
      >
        <cylinderGeometry attach="geometry" args={[.05, .05, 2, 32]}  />
        <meshStandardMaterial
            normalMap={normalMap}
            roughnessMap={roughnessMap}
            color = {"#c78200"}
            envMap = {texture}
            envMapIntensity = {.1}
            metalness = {1}
            roughness= {1}
        />
      </mesh>
    </RigidBody>
  );
}

const PegWall = () => {
  let gridHorizontal = [];
  for (let i = 0; i < 10; i++) {
    gridHorizontal.push(
      <group position={[-3, 17, 0.5]}>
        <group position={[0, 0, 0]}>
            <Cylinders position={[ i, 0, 0]} />
        </group>
      </group>
    );
  }
  let gridVertical = [];
  for (let i = 0; i < 13; i++) {
    gridVertical.push(
      <group position={[0, -i, 0.5]}>
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

        console.log(boxPos);
        console.log(boxPos);

          // gsap.to(state.camera.position, {
          //   x: boxPos.x,
          //   y: state.camera.position['y'],
          //   z: state.camera.position['z'],
          //   duration: 10
          // });
          lookAtVec.set(boxPos.x, boxPos.x, boxPos.z);
          cameraVector.lerp(lookAtVec,.5);
          state.camera.lookAt(cameraVector);
          state.camera.updateProjectionMatrix();

        console.log('effect'+valueRef.current);
    }
  });
  return(
    <>
      <GameBall valueRef={valueRef} />
      <RigidBody position={position} colliders="cuboid" type="fixed" restitution={.5} >
        <group >
          <RigidBody ref={newRef} colliders="cuboid" type="fixed" restitution={.5}  name="goal1">
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
      <PerspectiveCamera position={[0, 0, 10]} makeDefault  />
      <OrbitControls />
      <ShellModel />
      <PegWall />
      <InvisibleStructure />

      <group position={[0, 0, 20]}>
        <group position={[0, 0, 0]}>
        <RigidBody colliders="hull" restitution={.5}  name="">
          <Text3D 
            size={.75}
            font={"./fonts/helvetiker_regular.typeface.json"} >
              H
          </Text3D>
        </RigidBody>

        </group>
        <group position={[.75, 0, 0]}>
        <RigidBody colliders="hull" restitution={.5}  name="">
          <Text3D 
            size={.75}
            font={"./fonts/helvetiker_regular.typeface.json"} >
              E
          </Text3D>
        </RigidBody>
        </group>
        <group position={[(.75*2), 0, 0]}>
        <RigidBody colliders="hull" restitution={.5}  name="">
          <Text3D 
            size={.75}
            font={"./fonts/helvetiker_regular.typeface.json"} >
              L
          </Text3D>
        </RigidBody>
        </group>
        <group position={[(.75*3), 0, 0]}>
        <RigidBody colliders="hull" restitution={.5}  name="">
          <Text3D 
            size={.75}
            font={"./fonts/helvetiker_regular.typeface.json"} >
              L
          </Text3D>
        </RigidBody>
        </group>
        <group position={[(.75*3.7), 0, 0]}>
        <RigidBody colliders="hull" restitution={.5}  name="">
          <Text3D 
            size={.75}
            font={"./fonts/helvetiker_regular.typeface.json"} >
              0
          </Text3D>
        </RigidBody>
        </group>
      </group>



      <GoalPosts color="blue" position={[0, 0, 20]} rotation={[0,0,0]}  />
    </group> 
  )
}

export default scene