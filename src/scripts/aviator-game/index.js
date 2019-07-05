import game from './_game';
import Sea from './_Sea';
import Sky from './_Sky';
import AirPlane from './_AirPlane';
import { normalize } from './_utils';
import EnnemiesHolder from './_Ennemy';
import ParticlesHolder from './_Particle';
import CoinHolder from './_Coin';

console.log('game', game);


let scene;
let camera;
let fieldOfView;
let aspectRatio;
let nearPlane;
let farPlane;
let renderer;
let controls;

let HEIGHT;
let WIDTH;

let ambientLight;
let hemisphereLight;
let shadowLight;

let sea;
let sky;
let airplane;
let particlesHolder;
let ennemiesHolder;
let coinsHolder;

const mousePos = { x: 0, y: 0 };

const fieldDistanceElm = document.getElementById('distValue');
const energyBarElm = document.getElementById('energyBar');
const replayMessageElm = document.getElementById('replayMessage');
const fieldLevelElm = document.getElementById('levelValue');
const levelCircleElm = document.getElementById('levelCircleStroke');


function createScene() {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  aspectRatio = WIDTH / HEIGHT;

  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);

  fieldOfView = 50;
  nearPlane = 0.1;
  farPlane = 10000;

  camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
  );
  camera.position.x = 0;
  camera.position.y = game.v.planeDefaultHeight;
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

  // デバック用
  // const ch = new THREE.CameraHelper(shadowLight.shadow.camera);
  // scene.add(ch);

  scene.add(ambientLight);
  scene.add(hemisphereLight);
  scene.add(shadowLight);
}

function createPlane() {
  airplane = new AirPlane();
  airplane.mesh.scale.set(0.25, 0.25, 0.25);
  airplane.mesh.position.y = game.v.planeDefaultHeight;
  scene.add(airplane.mesh);
}

function createSea() {
  sea = new Sea();
  sea.mesh.position.y = -game.v.seaRadius;
  scene.add(sea.mesh);
}

function createSky() {
  sky = new Sky();
  sky.mesh.position.y = -game.v.seaRadius;
  scene.add(sky.mesh);
}

function updatePlane() {
  game.v.planeSpeed = normalize(mousePos.x, -.5, .5,
    game.v.planeMinSpeed, game.v.planeMaxSpeed);
  let targetY = normalize(mousePos.y, -0.75, 0.75,
    game.v.planeDefaultHeight - game.v.planeAmpHeight,
    game.v.planeDefaultHeight + game.v.planeAmpHeight);
  let targetX = normalize(mousePos.x, -1, 1,
    -game.v.planeAmpWidth * 0.7, -game.v.planeAmpWidth);

  game.v.planeCollisionDisplacementX += game.v.planeCollisionDisplacementX;
  targetX += game.v.planeCollisionDisplacementX;

  game.v.planeCollisionDisplacementY += game.v.planeCollisionDisplacementY;
  targetY += game.v.planeCollisionDisplacementY;

  airplane.mesh.position.y += (targetY - airplane.mesh.position.y) * game.deltaTime * game.v.planeMoveSensivity;
  airplane.mesh.position.x += (targetX - airplane.mesh.position.x) * game.deltaTime * game.v.planeMoveSensivity;

  airplane.mesh.rotation.z = (targetY - airplane.mesh.position.y) * game.deltaTime * game.v.planeRotXSensivity;
  airplane.mesh.rotation.x = (airplane.mesh.position.y - targetY) * game.deltaTime * game.v.planeRotZSensivity;

  camera.for = normalize(mousePos.x, -1, 1, 40, 80);
  camera.updateProjectionMatrix();
  camera.position.y += (airplane.mesh.position.y - camera.position.y) * game.deltaTime * game.v.cameraSensivity;

  game.v.planeCollisionSpeedX += (0 - game.v.planeCollisionSpeedX)* game.deltaTime * 0.03;
  game.v.planeCollisionDisplacementX += (0 - game.v.planeCollisionDisplacementX)* game.deltaTime * 0.01;
  game.v.planeCollisionSpeedY += (0 - game.v.planeCollisionSpeedY)* game.deltaTime * 0.03;
  game.v.planeCollisionDisplacementY += (0 - game.v.planeCollisionDisplacementY)* game.deltaTime * 0.01;

  airplane.pilot.updateHairs();
}

function createCoins(airplane, particlesHolder) {
  coinsHolder = new CoinHolder(20, airplane, particlesHolder);
  scene.add(coinsHolder.mesh);
}

function createEnnemies(airplane, particles, ambientLight) {
  ennemiesHolder = new EnnemiesHolder(airplane, particles, ambientLight);
  scene.add(ennemiesHolder.mesh);
}

function createParticles() {
  particlesHolder = new ParticlesHolder();
  scene.add(particlesHolder.mesh);
}

// function updateCameraFov() {
//   camera.fov = normalize(mousePos.x, -1, 1, 40, 80);
//   camera.updateProjectionMatrix();
// }

function updateEnergy() {
  game.v.energy -= game.v.speed * game.deltaTime * game.v.ratioSpeedEnergy;
  game.v.energy = Math.max(0, game.v.energy);
  energyBarElm.style.right = (100 - game.v.energy) + '%';
  energyBarElm.style.backgroundColor = (game.v.energy < 50) ? '#f25346' : '#68c3c0';
  if (game.v.energy < 30) {
    energyBarElm.style.animationName = 'blinking';
  } else {
    energyBarElm.style.animationName = 'none';
  }

  if (game.v.energy < 1) {
    console.log('gameover');
    game.v.status = 'gameover';
  }
}

function updateDistance() {
  game.v.distance += game.v.speed * game.deltaTime * game.v.ratioSpeedDistance;
  fieldDistanceElm.innerHTML = Math.floor(game.v.distance);
  const d = 502 * (1 - (game.v.distance % game.v.distanceForLevelUpdate) / game.v.distanceForLevelUpdate);
  levelCircleElm.setAttribute('stroke-dashoffset', d);
}


function showReplay() {
  replayMessageElm.style.display = 'block';
}

function hideReplay() {
  replayMessageElm.style.display = 'none';
}

function loop() {
  game.newTime = Date.now();
  game.deltaTime = game.newTime - game.oldTime;
  game.oldTime = game.newTime;

  if (game.v.status === 'playing') {
    // Add energy coins every 100m;
    if (Math.floor(game.v.distance) % game.v.distanceForCoinsSpawn === 0
      && Math.floor(game.v.distance) > game.v.coinLastSpawn) {
      game.v.coinLastSpawn = Math.floor(game.v.distance);
      coinsHolder.spawnCoins();
    }

    if (Math.floor(game.v.distance) % game.v.distanceForSpeedUpdate === 0
      && Math.floor(game.v.distance) > game.v.speedLastUpdate) {
      game.v.speedLastUpdate = Math.floor(game.v.distance);
      game.v.targetBaseSpeed += game.v.incrementSpeedByTime * game.deltaTime;
    }

    if (Math.floor(game.v.distance) % game.v.distanceForEnnemiesSpawn === 0
      && Math.floor(game.v.distance) > game.v.ennemyLastSpawn) {
      game.v.ennemyLastSpawn = Math.floor(game.v.distance);
      ennemiesHolder.spawnEnnemies();
    }

    if (Math.floor(game.v.distance) % game.v.distanceForLevelUpdate === 0
      && Math.floor(game.v.distance) > game.v.levelLastUpdate) {
      game.v.levelLastUpdate = Math.floor(game.v.distance);
      game.v.level++;
      fieldLevelElm.innerHTML = Math.floor(game.v.level);

      game.v.targetBaseSpeed = game.v.initSpeed + game.v.incrementSpeedByLevel * game.v.level;
    }

    updatePlane();
    updateDistance();
    updateEnergy();


    game.v.baseSpeed += (game.v.targetBaseSpeed - game.v.baseSpeed) * game.deltaTime * 0.02;
    game.v.speed = game.v.baseSpeed * game.v.planeSpeed;
  } else if (game.v.status === 'gameover') {
    game.v.speed *= .99;
    airplane.mesh.rotation.z += ( -Math.PI / 2 - airplane.mesh.rotation.z) * .0002 * game.deltaTime;
    airplane.mesh.rotation.x += 0.0003 * game.deltaTime;
    game.v.planeFallSpeed *= 1.05;
    airplane.mesh.position.y -= game.v.planeFallSpeed * game.deltaTime;

    if (airplane.mesh.position.y < -200) {
      showReplay();
      game.v.status = 'waitingReplay';
    }
  } else if (game.v.status === 'waitingReplay') {
  }


  airplane.propeller.rotation.x += 0.2 + game.v.planeSpeed * game.deltaTime * 0.005;

  sea.mesh.rotation.z += game.v.speed * game.deltaTime;
  if (sea.mesh.rotation.z > Math.PI * 2) {
    sea.mesh.rotation.z -= Math.PI * 2;
  }
  if (sea.mesh.rotation.z > Math.PI * 2) {
    sea.mesh.rotation.z -= Math.PI * 2;
  }

  ambientLight.intensity += (0.5 - ambientLight.intensity) * game.deltaTime * 0.005;

  coinsHolder.rotateCoins();
  ennemiesHolder.rotateEnnemies();
  sky.moveClouds();
  sea.moveWaves();

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

function onMouseUp() {
  if (game.v.status === 'waitingReplay') {
    game.reset();
    hideReplay();
  }
}

function init() {
  hideReplay();
  game.reset();
  fieldLevelElm.innerHTML = Math.floor(game.v.level);

  createScene();
  createLights();
  createPlane();
  createSea();
  createSky();
  createParticles();
  createCoins(airplane, particlesHolder);
  createEnnemies(airplane, particlesHolder, ambientLight);

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

  loop();
}

init();
