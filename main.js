import * as THREE from "three";
import "./style.css";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";

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
renderer.setPixelRatio(2);

window.addEventListener('resize', () => {
  adjust.wid = window.innerWidth;
  adjust.hei = window.innerHeight;
  camera.aspect = adjust.wid / adjust.hei;
  camera.updateProjectionMatrix();
  renderer.setSize(adjust.wid, adjust.hei);
})

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 6;

const tl = gsap.timeline({defaults: {duration: 1}});
tl.fromTo(mesh.scale, {x: 0, y: 0, z: 0}, {x: 1, y: 1, z: 1});
tl.fromTo("nav", {y: "-100%"}, {y: "0%"});
tl.fromTo(".heading", {opacity: 0}, {opacity: 1});

let mouseDown = false;
let rgb = [];
window.addEventListener('mousedown', () => (mouseDown = true));
window.addEventListener('mouseup', () => (mouseDown = false));
window.addEventListener('mousemove', (e) => {
  if(mouseDown){
    rgb = [
      Math.round((e.pageX / adjust.wid) * 255),
      Math.round((e.pageY / adjust.hei) * 255), 
      180,
    ]
    let myColor = new THREE.Color(`rgb(${rgb.join(",")})`);
    gsap.to(mesh.material.color, {
      r: myColor.r,
      g: myColor.g,
      b: myColor.b,
    })
  }
})

const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
}
loop();