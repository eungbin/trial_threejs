import * as THREE from 'three';

export const genCube = (color, position) => {
  /* Cube 객체 생성 */
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: color });
  const cube = new THREE.Mesh(geometry, material);

  cube.position.x = position[0];
  cube.position.y = position[1];
  cube.position.z = position[2];

  return cube;
}

export const rotateCube = (cube, rotation) => {
  cube.rotation.x += rotation[0];
  cube.rotation.y += rotation[1];
  cube.rotation.z += rotation[2];
}
