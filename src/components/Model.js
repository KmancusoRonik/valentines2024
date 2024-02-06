/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export default function Model(props) {
  const { nodes, materials } = useGLTF("./models/MainScene/model_scene.gltf");
  return (
    <group {...props} dispose={null} scale={5} position={[0,0,2.4]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.FLOOR.geometry}
        material={nodes.FLOOR.material}
        position={[0, -0.001, 5.707]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BACK.geometry}
        material={nodes.BACK.material}
        position={[0, 3.316, -0.481]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pachinko1.geometry}
        material={materials.Mat}
        position={[0.288, -0.037, 0.446]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane002_Plane.geometry}
        material={nodes.Plane002_Plane.material}
        position={[-5.581, 0.293, 0.103]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tube.geometry}
        material={nodes.tube.material}
        position={[0, 0, 5.177]}
      />
    </group>
  );
}

useGLTF.preload("./models/MainScene/model_scene.gltf");