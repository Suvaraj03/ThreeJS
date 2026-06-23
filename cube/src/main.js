import * as THREE from 'three';

const scene = new THREE.Scene();
const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(
  75, // field of view
  width / height, // aspect ratio
  0.1, // near clipping plane
  1000 // far clipping plane
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width,height);

// Add canvas to page
document.body.appendChild(renderer.domElement);

//  Create cube geometry
const geomentry = new THREE.BoxGeometry(1,1,1);

//  Create Material
const material = new THREE.MeshBasicMaterial({
  color:0x00ff00
});

const cube = new THREE.Mesh(geomentry,material);

scene.add(cube);

camera.position.z = 5;

function animate (){
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene,camera);
}
animate();


