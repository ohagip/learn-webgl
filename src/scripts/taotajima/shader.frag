uniform vec2 uResolution;
uniform vec2 uTexResolution;
uniform sampler2D uTexturePrev;
uniform sampler2D uTextureNext;
uniform float uProgress;

varying vec2 vUv;

void main() {
  // 画像の縦横比を補正してbackground-size:coverの挙動にする
  vec2 ratio = vec2(
    min((uResolution.x / uResolution.y) / (uTexResolution.x / uTexResolution.y), 1.0),
    min((uResolution.y / uResolution.x) / (uTexResolution.y / uTexResolution.x), 1.0)
  );

  vec2 uv = vec2(
    vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
    vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
  );

  float colorProgress = uProgress * 8.0 - vUv.y * 5.0 + vUv.x * 2.0 + -2.0;
  colorProgress = clamp(colorProgress, 0.0, 1.0);


  vec4 colorPrev = texture2D(uTexturePrev, vec2(uv.x, uv.y + colorProgress));
  vec4 colorNext = texture2D(uTextureNext, vec2(uv.x, uv.y + colorProgress - 1.0));


  gl_FragColor = mix(colorPrev, colorNext, colorProgress);
  // gl_FragColor = vec4(vec3(colorProgress), 1.0);
}