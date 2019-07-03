import Sea from './_Sea';
import Sky from './_Sky';
import AirPlane from './_AirPlane';
import { normalize } from './_utils';

let scene;
let camera;
let fieldOfView;
let aspectRatio;
let nearPlane;
let farPlane;
let HEIGHT;
let WIDTH;
let renderer;

let ambientLight;
let hemisphereLight;
let shadowLight;

let sea;
let sky;
let airplane;

const mousePos = { x: 0, y: 0 };

function createScene() {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  aspectRatio = WIDTH / HEIGHT;

  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);

  fieldOfView = 60;
  nearPlane = 1;
  farPlane = 10000;

  camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
  );
  camera.position.x = 0;
  camera.position.y = 100;
  camera.position.z = 200;

  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#canvas'),
    alpha: true,
    antialias: true,
  });

  renderer.setSize(WIDTH, HEIGHT);
  renderer.shadowMap.enabled = true; // 影を有効にする

  window.addEventListener('resize', resize);
}

function resize() {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  aspectRatio = WIDTH / HEIGHT;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = aspectRatio;
  camera.updateProjectionMatrix();
}

function createLights() {
  // 半球光源（空の色, 地の色, 光の強さ）
  hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9);

  shadowLight = new THREE.DirectionalLight(0xffffff, 0.9); // 平行光源
  shadowLight.position.set(150, 350, 350);
  shadowLight.castShadow = true; // 影を有効にする

  // 影の可視領域を設定
  // https://threejs.org/docs/#api/en/lights/shadows/DirectionalLightShadow
  shadowLight.shadow.camera.left = -400;
  shadowLight.shadow.camera.right = 400;
  shadowLight.shadow.camera.top = 400;
  shadowLight.shadow.camera.bottom = -400;
  shadowLight.shadow.camera.near = 1;
  shadowLight.shadow.camera.far = 1000;

  // 影の解像度を設定
  shadowLight.shadow.mapSize.width = 2048;
  shadowLight.shadow.mapSize.height = 2048;

  // 環境光
  ambientLight = new THREE.AmbientLight(0xdc8874, 0.5);

  scene.add(ambientLight);
  scene.add(hemisphereLight);
  scene.add(shadowLight);
}

function createPlane() {
  airplane = new AirPlane();
  airplane.mesh.scale.set(0.25, 0.25, 0.25);
  airplane.mesh.position.y = 100;
  scene.add(airplane.mesh);
}

function createSea() {
  sea = new Sea();
  sea.mesh.position.y = -600;
  scene.add(sea.mesh);
}

function createSky() {
  sky = new Sky();
  sky.mesh.position.y = -600;
  scene.add(sky.mesh);
}

function updatePlane() {
  const targetY = normalize(mousePos.y, -0.75, 0.75, 25, 175);
  // const targetX = normalize(mousePos.x, -0.75, 0.75, -100, 100);
  airplane.mesh.position.y += (targetY - airplane.mesh.position.y) * 0.1;
  airplane.mesh.rotation.z = (targetY - airplane.mesh.position.y) * 0.0128;
  airplane.mesh.rotation.x = (airplane.mesh.position.y - targetY) * 0.0064;
  airplane.propeller.rotation.x += 0.3;
}

function updateCameraFov() {
  camera.fov = normalize(mousePos.x, -1, 1, 40, 80);
  camera.updateProjectionMatrix();
}

function loop() {
  updatePlane();
  airplane.pilot.updateHairs();
  updateCameraFov();
  sea.moveWaves();
  sky.mesh.rotation.z += 0.01;

  renderer.render(scene, camera);
  requestAnimationFrame(loop);
}

function onMouseMove() {
  // -1〜1に正規化
  const tx = -1 + (event.clientX / WIDTH) * 2;
  const ty = 1 - (event.clientY / HEIGHT) * 2; // y-axisは計算が逆
  mousePos.x = tx;
  mousePos.y = ty;
}

function init() {
  document.addEventListener('mousemove', onMouseMove);
  createScene();
  createLights();
  createPlane();
  createSea();
  createSky();
  loop();
}

init();
