import './App.css';
import React, { useEffect } from 'react';
import * as THREE from 'three';
import { PointerLockControls } from "./lib/PointerLock";
import Ready from "./components/Ready";
import $ from "jquery";

/* libs import */
import { genCube, rotateCube } from './components/objects/Cube';
/* *********** */

function App() {
  // Scene, Camera, Renderer 변수 선언 (three js로 3차원 세계를 표현하기 위한 필수 요소 3가지)
  // scene에 오브젝트들을 추가, renderer에 scene과 camera를 담아 render()
  const scene = new THREE.Scene;
  /* --- Camera Params ---
    Camera(a, b, c, d)
    a(field of view): 디스플레이에 표시되는 장면의 범위 도(degree) 단위
    b(aspect ratio): 대부분 요소의 너비를 높이로 나눈 값을 사용
    c(near 클리핑 평면): 카메라에서 near보다 가까운 객체는 렌더링X
    d(far 클리핑 평면): 카메라에서 far보다 멀리 있는 객체는 렌더링X 
  */
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();

  /* Add First Person View (1인칭 카메라) */
  const controls = new PointerLockControls(camera, document.body);

  /* Camera 움직임 제어 객체 */
  let CameraMoving = {
    cameraMoveZ: 0,
    cameraMovingZ: false,
    zSpeed: 0.1,
    cameraMoveX: 0,
    cameraMovingX: false,
    xSpeed: 0.1,
  }

  const centerCube = genCube(0x00ff00, [0, 0, 0]);

  renderer.setSize(window.innerWidth, window.innerHeight);
  scene.add(centerCube);
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
    const positionX = getRandomPosition(2000);
    const positionY = getRandomPosition(2000);
    const positionZ = getRandomPosition(2000);

    scene.add(genCube(0xFFFFFF, [positionX, positionY, positionZ]));
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

    if(CameraMoving.cameraMovingZ) { camera.translateZ(CameraMoving.cameraMoveZ); }
    if(CameraMoving.cameraMovingX) { camera.translateX(CameraMoving.cameraMoveX); }

    rotateCube(centerCube, [0.01, 0.01, 0]);

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
