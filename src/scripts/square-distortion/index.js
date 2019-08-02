import config from '../_config';
import vertexShader from './shader.vert';
import fragmentShader from './shader.frag';

(() => {
  const status = {
    isPlay: false, // エフェクト中
    index: 0, // スライド画像のインデックス
    progress: 0, // エフェクトの進捗
    duration: 1.7, // エフェクトの時間
    // interval: 3, // 次のエフェクトまでの間隔
    squareSize: 40, // 正方形のピクセルサイズ
    distFactor: 0.04, // 歪ます量
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
  // pane.addInput(status, 'interval', {
  //   step: 0.1,
  //   min: 0,
  //   max: 10,
  // });
  pane
    .addInput(status, 'squareSize', {
      step: 10,
      min: 1,
      max: 100,
    })
    .on('change', (value) => {
      material.uniforms.uSquareSize.value = value;
    });
  pane
    .addInput(status, 'distFactor', {
      step: 0.01,
      min: 0,
      max: 0.2,
    })
    .on('change', (value) => {
      material.uniforms.uDispFactor.value = value;
    });
  pane.addButton({ title: 'start' }).on('click', startEffect);

  // texture
  const texturePath = config.imagesPath + 'common/sample/';
  const textures = [
    { fileName: '1.jpg', tex: undefined },
    { fileName: '2.jpg', tex: undefined },
    { fileName: '3.jpg', tex: undefined },
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
      uSquareSize: { type: 'f', value: status.squareSize },
      uDispFactor: { type: 'f', value: status.distFactor },
      uOffset: { type: 'f', value: status.offset },
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
    material.uniforms.uOffset.value = Math.floor(Math.random() * 100);

    TweenMax.to(status, status.duration, {
      progress: 1,
      onUpdate: () => {
        pane.refresh();
      },
      ease: Power3.easeOut,
      onComplete: () => {
        status.isPlay = false;
        status.index = nextIndex;
      },
    });
  }

  window.addEventListener('resize', resize);
  resize();

  Promise.all(texturePromises).then(
    () => {
      material.uniforms.uTexturePrev.value = textures[0].tex;
      material.uniforms.uTextureNext.value = textures[1].tex;
      render();
    },
    (err) => {
      console.log(err);
    }
  );
})();
