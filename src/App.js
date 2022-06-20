import './App.css';
import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { PointerLockControls } from "./lib/PointerLock";
import Ready from "./components/Ready";
import $ from "jquery";

function App() {
  const scene = new THREE.Scene;
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();

  /* Add First Person View */
  const controls = new PointerLockControls(camera, document.body);

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);

  let CameraMoving = {
    cameraMoveZ: 0,
    cameraMovingZ: false,
    zSpeed: 1,
    cameraMoveX: 0,
    cameraMovingX: false,
    xSpeed: 1,
  }


  renderer.setSize(window.innerWidth, window.innerHeight);

  scene.add(cube);
  // scene.add(plane);
  scene.background = new THREE.Color(0x19324a);
  camera.position.z = 20;

  const getRandomPosition = (limit) => {
    if(Math.floor(Math.random()*2) === 0) {
      return Math.random() * limit;
    } else {
      return Math.random() * limit * -1;
    }
  }

  for(let i=0; i<20000; i++) {
    const starMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    const star = new THREE.Mesh(geometry, starMaterial);
    
    const positionX = getRandomPosition(2000);
    const positionY = getRandomPosition(2000);
    const positionZ = getRandomPosition(2000);

    star.position.x = positionX;
    star.position.y = positionY;
    star.position.z = positionZ;

    scene.add(star);
  }
  

  useEffect(() => {
    const instruction = document.getElementById("instruction");
    document.body.appendChild(renderer.domElement);
    window.addEventListener('keydown', function(e) {
      if(e.key === 'w') {
        CameraMoving.cameraMovingZ = true;
        CameraMoving.cameraMoveZ = -1 * CameraMoving.zSpeed;
      }
      if(e.key ==='s') {
        CameraMoving.cameraMoveZ = CameraMoving.zSpeed;
        CameraMoving.cameraMovingZ = true;
      }
      if(e.key === 'a') {
        CameraMoving.cameraMoveX = -1 * CameraMoving.xSpeed;
        CameraMoving.cameraMovingX = true;
      }
      if(e.key === 'd') {
        CameraMoving.cameraMoveX = CameraMoving.xSpeed;
        CameraMoving.cameraMovingX = true;
      }
    });
    window.addEventListener('keyup', function(e) {
      if(e.key === 'w' || e.key === 's') {
        CameraMoving.cameraMovingZ = false;
      }
      if(e.key === 'a' || e.key === 'd') {
        CameraMoving.cameraMovingX = false;
      }
    });

    instruction.addEventListener('click', function() {
      controls.lock();
    });

    controls.addEventListener('lock', function() {
      instruction.style.display = 'none';
      $("canvas").css({"opacity": "1"});
    });
    controls.addEventListener('unlock', function() {
      instruction.style.display = '';
      $("canvas").css({"opacity": "0.9"});
    });
  }, []);

  const Animate = () => {
    requestAnimationFrame(Animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    if(CameraMoving.cameraMovingZ) { camera.translateZ(CameraMoving.cameraMoveZ); }
    if(CameraMoving.cameraMovingX) { camera.translateX(CameraMoving.cameraMoveX); }

    renderer.render(scene, camera);
  }

  Animate();

  return (
    <div className="App">
      <Ready />
    </div>
  );
}

export default App;
