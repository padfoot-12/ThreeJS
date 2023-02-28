import * as THREE from "three";
import "./style.css";

const scene = new THREE.Scene();

const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const adjust = {
  wid: window.innerWidth,
  hei: window.innerHeight,
}

const camera = new THREE.PerspectiveCamera(45, adjust.wid/adjust.hei, 0.1, 100);
camera.position.z=20;
scene.add(camera);

const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 10, 10);
scene.add(light);

const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(adjust.wid, adjust.hei);
renderer.render(scene, camera);

window.addEventListener('resize', () => {
  adjust.wid = window.innerWidth;
  adjust.hei = window.innerHeight;
  camera.aspect = adjust.wid / adjust.hei;
  camera.updateProjectionMatrix();
  renderer.setSize(adjust.wid, adjust.hei);
})

const loop = () => {
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
}
loop();