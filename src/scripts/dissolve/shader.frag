#pragma glslify: snoise2 = require("glsl-noise/simplex/2d")

uniform vec2 uResolution;
uniform vec2 uTexResolution;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform float uDispFactor;

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

  vec4 color1 = texture2D(uTexture1, uv);
  vec4 color2 = texture2D(uTexture2, uv);


  // ノイズをもとにアルファカットオフする
  vec4 color = vec4(1.0);
  float noise = snoise2(vUv * 3.0); // -1 〜 1

  if (noise > uDispFactor) {
    color = color1;
  } else if (noise > uDispFactor - 0.05) {
    color = vec4(1.0, 0.2, 0.2, 1.0);
  } else {
    color = vec4(0.0);
  }

  gl_FragColor = color;
}