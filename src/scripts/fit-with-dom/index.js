import config from '../_config';
import vertexShader from './shader.vert';
import fragmentShader from './shader.frag';

(() => {
  const loaderPromises = [];

  // texture
  const texturePath = config.imagesPath + 'common/sample/';
  const textures = [
    { fileName: '1.jpg', tex: undefined },
    { fileName: '2.jpg', tex: undefined },
    { fileName: '3.jpg', tex: undefined },
  ];
  const textureLoader = new THREE.TextureLoader();
  textures.forEach((entry) => {
    loaderPromises.push(
      new Promise((resolve, reject) => {
        textureLoader.load(
          texturePath + entry.fileName,
          (texture) => {
            entry.tex = texture;
            resolve();
          },
          undefined, // onProgress
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
  let scrollY = window.scrollY;
  // 視野角をラジアンに変換
  const fov = 60;
  const fovRad = (fov / 2) * (Math.PI / 180);
  const aspect = window.innerWidth / window.innerHeight;
  const camera = new THREE.PerspectiveCamera(fov, aspect, 1, 2000);
  camera.position.y = -scrollY;
  console.log(scrollY, camera)

  // renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#canvas'),
    antialias: true,
    alpha: true,
  });
  renderer.setClearColor(0x000000, 0);

  // mesh
  const meshList = [];

  function createMesh() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    $('.img_in').each((idx, elm) => {
      const rect = elm.getBoundingClientRect();
      const center = new THREE.Vector2(rect.x + rect.width / 2, rect.y + rect.height / 2);
      const diff = new THREE.Vector2(center.x - width / 2, center.y - height / 2);
      const geometry = new THREE.PlaneGeometry(rect.width, rect.height, 1, 1);
      const material = new THREE.ShaderMaterial({
        uniforms: {},
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(diff.x, -diff.y - scrollY, 0);
      scene.add(mesh);
      meshList.push(mesh);
    });
  }

  function updateMesh() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    $('.img_in').each((idx, elm) => {
      const rect = elm.getBoundingClientRect();
      const center = new THREE.Vector2(rect.x + rect.width / 2, rect.y + rect.height / 2);
      const diff = new THREE.Vector2(center.x - width / 2, center.y - height / 2);
      const geometry = new THREE.PlaneGeometry(rect.width, rect.height, 1, 1);
      const mesh = meshList[idx];
      mesh.geometry.dispose();
      mesh.geometry = geometry;
      mesh.position.set(diff.x, -diff.y - scrollY, 0);
    });
  }

  function render() {
    requestAnimationFrame(render);
    camera.position.y = -scrollY;
    renderer.render(scene, camera);
  }

  function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const dist = (height / 2) / Math.tan(fovRad); // ウィンドウぴったりのカメラ距離
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    camera.position.z = dist;
    camera.far = dist * 2;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    updateMesh();
  }

  function scroll() {
    scrollY = window.scrollY;
  }

  createMesh();
  window.addEventListener('resize', resize);
  window.addEventListener('scroll', scroll);
  resize();

  Promise.all(loaderPromises).then(
    () => {
      render();
    },
    (err) => {
      console.log(err);
    }
  );
})();
