import config from '../_config';
import vertexShader from './shader.vert';
import fragmentShader from './shader.frag';

(() => {
  const status = {
    isPlay: false, // エフェクト中
    index: 0, // スライド画像のインデックス
    progress: 0, // エフェクトの進捗
    duration: 0.8, // エフェクトの時間
    displacement: 7, // displacement画像のインデックス
  };

  const pane = new Tweakpane();

  pane
    .addInput(status, 'progress', {
      // label: 'progress',
      min: 0,
      max: 1,
    })
    .on('change', (value) => {
      material.uniforms.uProgress.value = value;
    });
  pane.addInput(status, 'duration', {
    step: 0.1,
    min: 0,
    max: 10,
  });
  pane
    .addInput(status, 'displacement', {
      label: 'disp',
      options: {
        '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8,
        '9': 9, '10': 10, '11': 11, '12': 12, '13': 13, '14': 14, '15': 15,
      },
    })
    .on('change', (value) => {
      material.uniforms.uDisplacementTexture.value = displacementImages[value].tex;
    });
  pane.addButton({ title: 'start' }).on('click', startEffect);


  const loaderPromises = [];

  // texture
  const texturePath = config.imagesPath + 'common/sample/';
  const textures = [
    { fileName: '1.jpg', tex: undefined },
    { fileName: '2.jpg', tex: undefined },
    { fileName: '3.jpg', tex: undefined },
  ];
  const textureLoader = new THREE.TextureLoader();
  const textureResolution = new THREE.Vector2(2048, 1536);
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

  // displacement
  const displacementPath = config.imagesPath + 'displacement-distortion/';
  const displacementImages = [
    { fileName: '1.jpg', tex: undefined },
    { fileName: '2.jpg', tex: undefined },
    { fileName: '3.jpg', tex: undefined },
    { fileName: '4.png', tex: undefined },
    { fileName: '5.png', tex: undefined },
    { fileName: '6.jpg', tex: undefined },
    { fileName: '7.jpg', tex: undefined },
    { fileName: '8.jpg', tex: undefined },
    { fileName: '9.jpg', tex: undefined },
    { fileName: '10.jpg', tex: undefined },
    { fileName: '11.jpg', tex: undefined },
    { fileName: '12.jpg', tex: undefined },
    { fileName: '13.jpg', tex: undefined },
    { fileName: '14.jpg', tex: undefined },
    { fileName: '15.jpg', tex: undefined },
    { fileName: '16.jpg', tex: undefined },
  ];
  const displacementLoader = new THREE.TextureLoader();
  displacementImages.forEach((entry) => {
    loaderPromises.push(
      new Promise((resolve, reject) => {
        displacementLoader.load(
          displacementPath + entry.fileName,
          (texture) => {
            console.log(texture)
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(4, 4);
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
      uTexturePrev: { type: 't', value: undefined },
      uTextureNext: { type: 't', value: undefined },
      uProgress: { type: 'f', value: status.progress },
      uDisplacementTexture: { type: 'f', value: undefined },
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

  function startEffect() {
    if (status.isPlay === true) {
      return;
    }

    status.isPlay = true;
    const prevIndex = status.index;
    const nextIndex = prevIndex + 1 < textures.length ? prevIndex + 1 : 0;

    material.uniforms.uTexturePrev.value = textures[prevIndex].tex;
    material.uniforms.uTextureNext.value = textures[nextIndex].tex;
    status.progress = 0;
    material.uniforms.uProgress.value = 0;

    TweenMax.to(status, status.duration, {
      progress: 1,
      onUpdate: () => {
        pane.refresh();
      },
      ease: Power2.easeOut,
      onComplete: () => {
        status.isPlay = false;
        status.index = nextIndex;
      },
    });
  }

  window.addEventListener('resize', resize);
  resize();

  Promise.all(loaderPromises).then(
    () => {
      material.uniforms.uTexturePrev.value = textures[0].tex;
      material.uniforms.uTextureNext.value = textures[1].tex;
      material.uniforms.uDisplacementTexture.value = displacementImages[status.displacement].tex;
      render();
    },
    (err) => {
      console.log(err);
    }
  );
})();
