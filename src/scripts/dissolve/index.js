import config from '../_config';
import vertexShader from './shader.vert';
import fragmentShader from './shader.frag';

(() => {
  // gui
  const gui = new dat.GUI();
  const guiParams = {
    dispFactor: 0.5,
  };
  gui
    .add(guiParams, 'dispFactor', -1.0, 1.0)
    .onChange((value) => {
      material.uniforms.uDispFactor.value = value;
    });

  // texture
  const texturePath = config.imagesPath + 'common/sample/';
  const textures = [
    { fileName: '1.jpg', val: undefined },
    { fileName: '2.jpg', val: undefined },
    { fileName: '3.jpg', val: undefined },
  ];
  const texturePromises = [];
  const loader = new THREE.TextureLoader();
  const textureResolution = new THREE.Vector2(2048, 1536);
  textures.forEach((entry) => {
    texturePromises.push(
      new Promise((resolve, reject) => {
        loader.load(
          texturePath + entry.fileName,
          (texture) => {
            entry.val = texture;
            resolve();
          },
          undefined,
          (err) => {
            reject(err);
          }
        );
      })
    );
  });

  // scene
  const scene = new THREE.Scene();

  // camera
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1);

  // renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#canvas'),
    antialias: true,
  });

  // mesh
  const geometry = new THREE.PlaneGeometry(2, 2, 1, 1);
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uResolution: { type: 'v2', value: new THREE.Vector2() },
      uTexResolution: { type: 'v2', value: textureResolution },
      uTexture1: { type: 't', value: undefined },
      uTexture2: { type: 't', value: undefined },
      uDispFactor: { type: 'f', value: guiParams.dispFactor },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
  });
  const plane = new THREE.Mesh(geometry, material);
  scene.add(plane);

  function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }

  function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    material.uniforms.uResolution.value.x = width;
    material.uniforms.uResolution.value.y = height;
  }

  window.addEventListener('resize', resize);
  resize();

  Promise.all(texturePromises).then(
    () => {
      material.uniforms.uTexture1.value = textures[0].val;
      material.uniforms.uTexture2.value = textures[1].val;
      render();
    },
    (err) => {
      console.log(err);
    }
  );
})();
