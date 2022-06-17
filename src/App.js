import './App.css';
import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';

function App() {
  const scene = new THREE.Scene;
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);

  // const planeGeometry = new THREE.PlaneGeometry(30, 1);
  // const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
  // const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  

  let mouseDownX;
  let mouseDownY;
  let mouseStat = false;

  let cameraMoveZ = 0;
  let cameraDirection;
  let cameraMoving = false;


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

  for(let i=0; i<50000; i++) {
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
    document.body.appendChild(renderer.domElement);
    window.addEventListener('keydown', function(e) {
      if(e.key === 'w') {
        cameraMoving = true;
        cameraMoveZ = -1;
      }
      if(e.key ==='s') {
        cameraMoveZ = 1;
        cameraMoving = true;
      }
      if(e.key === 'a') {
        camera.translateX(-1);
      }
      if(e.key === 'd') {
        camera.translateX(1);
      }
    });
    window.addEventListener('keyup', function(e) {
      cameraMoving = false;
    })

    window.addEventListener('mousedown', function(e) {
      mouseStat = true;
      mouseDownX = e.screenX;
      mouseDownY = e.screenY;
    });
    window.addEventListener('mousemove', function(e) {
      if(mouseStat) {
        const mouseUpX = e.screenX;
        const mouseUpY = e.screenY;

        const mouseMoveX = mouseUpX - mouseDownX;
        const mouseMoveY = mouseUpY - mouseDownY;

        camera.rotateY(mouseMoveX / window.innerWidth * 3.2 * 0.5);
        camera.rotateX(mouseMoveY / window.innerHeight * 3.2 * 0.5);
        mouseDownX = e.screenX;
        mouseDownY = e.screenY;
      }
    });
    window.addEventListener('mouseup', function(e) {
      mouseStat = false;
    })
  }, []);

  const Animate = () => {
    requestAnimationFrame(Animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    if(cameraMoving) { camera.translateZ(cameraMoveZ); }

    renderer.render(scene, camera);
  }

  Animate();

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
