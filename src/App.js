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

  let mouseDownX;
  let mouseDownY;


  renderer.setSize(window.innerWidth, window.innerHeight);
  scene.add(cube);
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
        camera.position.z -= 1;
      } else if(e.key ==='s') {
        camera.position.z += 1;
      } else if(e.key === 'a') {
        camera.position.x -= 1;
      } else if(e.key === 'd') {
        camera.position.x += 1;
      } else if(e.key === 'q') {
        // total 3.2
        camera.rotateY(0.1);
      } else if(e.key === 'e') {
        camera.rotateY(-0.1);
      }
    });

    window.addEventListener('mousedown', function(e) {
      mouseDownX = e.screenX;
      mouseDownY = e.screenY;
    });
    window.addEventListener('mouseup', function(e) {
      const mouseUpX = e.screenX;
      const mouseUpY = e.screenY;

      const mouseMoveX = mouseUpX - mouseDownX;
      const mouseMoveY = mouseUpY - mouseDownY;

      camera.rotateY(mouseMoveX / window.innerWidth * 3.2);
      camera.rotateX(mouseMoveY / window.innerHeight * 3.2);
    })
  }, []);

  const Animate = () => {
    requestAnimationFrame(Animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
  }

  Animate();

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
