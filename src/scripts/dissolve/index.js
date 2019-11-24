import config from '../_config';
import vertexShader from './shader.vert';
import fragmentShader from './shader.frag';

(() => {
  // gui
  const gui = new dat.GUI();
  const controller = {};
  const guiParams = {
    step: 0,
    duration: 2.8,
    noiseX: 8,
    noiseY: 8,
    noiseZ: 1,
    edgeWidth: 0.04,
    animation: true,
  };

  controller.step = gui
    .add(guiParams, 'step', 0, 1, 0.001)
    .onChange((value) => {
      material.uniforms.uStep.value = value;
    });
  gui.add(guiParams, 'duration', 0.5, 10);
  gui.add(guiParams, 'noiseX', 0, 100).onChange((value) => {
    material.uniforms.uNoiseX.value = value;
  });
  gui.add(guiParams, 'noiseY', 0, 100).onChange((value) => {
    material.uniforms.uNoiseY.value = value;
  });
  gui.add(guiParams, 'noiseZ', 0, 100).onChange((value) => {
    material.uniforms.uNoiseZ.value = value;
  });
  gui.add(guiParams, 'edgeWidth', 0, 0.1).onChange((value) => {
    material.uniforms.uEdgeWidth.value = value;
  });
  gui.add(guiParams, 'animation').onChange((value) => {
    if (value === true) {
      startEffect();
    } else {
      stopEffect();
    }
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
          undefined, // onProgress
          (err) => {
            reject(err);
          }
        );
      })
    );
  });

  let textureIdx = 0;
  const textureMax = textures.length - 1;
  function changeTexture() {
    textureIdx += 1;
    if (textureIdx > textureMax) {
      textureIdx = 0;
    }
    let nextIdx = textureIdx + 1;
    if (nextIdx > textureMax) {
      nextIdx = 0;
    }
    material.uniforms.uTexturePrev.value = textures[textureIdx].val;
    material.uniforms.uTextureNext.value = textures[nextIdx].val;
  }

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
      uStep: { type: 'f', value: guiParams.step },
      uNoiseX: { type: 'f', value: guiParams.noiseX },
      uNoiseY: { type: 'f', value: guiParams.noiseY },
      uNoiseZ: { type: 'f', value: guiParams.noiseZ },
      uEdgeWidth: { type: 'f', value: guiParams.edgeWidth },
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

  let tween = null;
  let delayTween = null;
  function startEffect() {
    if (delayTween !== null) {
      delayTween.play();
      return;
    }

    if (tween !== null) {
      tween.play();
      return;
    }

    tween = TweenMax.to(guiParams, guiParams.duration, {
      step: 1,
      onUpdate: () => {
        controller.step.setValue(guiParams.step);
      },
      ease: Power0.easeNone,
      onComplete: () => {
        delayTween = TweenMax.delayedCall(1, () => {
          tween = null;
          delayTween = null;
          guiParams.step = 0;
          controller.step.setValue(guiParams.step);
          changeTexture();
          startEffect();
        });
      },
    });
  }

  function stopEffect() {
    if (delayTween !== null) {
      delayTween.pause();
      return;
    }

    if (tween !== null) {
      tween.pause();
    }
  }

  window.addEventListener('resize', resize);
  resize();

  Promise.all(texturePromises).then(
    () => {
      material.uniforms.uTexturePrev.value = textures[0].val;
      material.uniforms.uTextureNext.value = textures[1].val;
      render();
      if (guiParams.animation === true) {
        startEffect();
      }
    },
    (err) => {
      console.log(err);
    }
  );
})();
