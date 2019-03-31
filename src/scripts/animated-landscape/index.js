/**
 *  @file animated-landscapeページのスクリプト
 */

import terrainVertexShader from './terrain.vert';
import terrainFragmentShader from './wireframe.frag';

(() => {
  let width = window.innerWidth;
  let height = window.innerHeight;

  // scene
  const scene = new THREE.Scene();
  const fogColor = new THREE.Color(0x00000);
  scene.background = fogColor;
  scene.fog = new THREE.Fog(fogColor, 10, 400);

  // camera
  const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 10000);
  camera.position.y = 20;
  camera.position.z = 4;

  // renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#canvas'),
    antialias: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // terrain
  let geometry = new THREE.PlaneBufferGeometry(100, 400, 200, 200);
  geometry = geometry.toNonIndexed();
  setCenter2Attributes(geometry);
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { type: 'f', value: 1.0 },
    },
    vertexShader: terrainVertexShader,
    fragmentShader: terrainFragmentShader,
  });
  material.extensions.derivatives = true; // wireframeで利用

  const terrain = new THREE.Mesh(geometry, material);
  terrain.position.z = -180;
  terrain.rotation.x = -Math.PI / 2;

  scene.add(terrain);

  function render() {
    requestAnimationFrame(render);
    material.uniforms.uTime.value = performance.now() * 0.001;
    renderer.render(scene, camera);
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
  }

  /**
   * 属性にcenterを設定（wireframe用）
   * @param {Object} geometry
   */
  function setCenter2Attributes(geometry) {
    const vectors = [
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(0, 0, 1),
    ];
    const position = geometry.attributes.position;
    const centers = new Float32Array(position.count * 3);
    for (let i = 0, l = position.count; i < l; i += 1) {
      vectors[i % 3].toArray(centers, i * 3);
    }
    geometry.addAttribute('center', new THREE.BufferAttribute(centers, 3));
  }

  window.addEventListener('resize', resize);
  resize();
  render();
})();
