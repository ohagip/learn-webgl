//#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)
//#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)
//#pragma glslify: snoise4 = require(glsl-noise/simplex/4d)
//#pragma glslify: cnoise2 = require(glsl-noise/classic/2d)
#pragma glslify: cnoise3 = require(glsl-noise/classic/3d)
//#pragma glslify: cnoise4 = require(glsl-noise/classic/4d)
//#pragma glslify: pnoise2 = require(glsl-noise/periodic/2d)
//#pragma glslify: pnoise3 = require(glsl-noise/periodic/3d)
//#pragma glslify: pnoise4 = require(glsl-noise/periodic/4d)

uniform vec2 uResolution;
uniform vec2 uTexResolution;
uniform sampler2D uTexturePrev;
uniform sampler2D uTextureNext;
uniform float uStep;
uniform float uNoiseX;
uniform float uNoiseY;
uniform float uNoiseZ;
uniform float uEdgeWidth;

varying vec2 vUv;

// vec2 rotate(vec2 v, float a) {
//  float s = sin(a);
//  float c = cos(a);
//  mat2 m = mat2(c, -s, s, c);
//  return m * v;
// }

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

  vec4 colorPrev = texture2D(uTexturePrev, uv);
  vec4 colorNext = texture2D(uTextureNext, uv);

  // ノイズをもとにアルファカットオフののりでテクスチャ切り替え
  vec4 colorFinal = vec4(1.0);
  float noise = (cnoise3(vec3(vUv.x * uNoiseX, vUv.y * uNoiseY, uNoiseZ)) + 1.0) / 2.0; // noise -1〜1 => 0〜1
  noise = noise * (1.0 - uEdgeWidth) + (uEdgeWidth * 0.5); // エッジの幅を考慮して調整 (uEdgeWidth/2)〜(1-uEdgeWidth/2)

  colorPrev = colorPrev * smoothstep(uStep - (uEdgeWidth / 1.0), uStep - (uEdgeWidth / 2.0), noise);
  colorNext = colorNext * smoothstep((1.0 - uStep) - (uEdgeWidth / 1.0), (1.0 - uStep) - (uEdgeWidth / 2.0), 1.0 - noise);

//  vec4 colorEdgeStart = vec4(0, 0.5, 1, 1.0);
//  vec4 colorEdgeEnd = vec4(0.4, 0.8, 1, 1.0);
//  vec4 colorEdge = vec4(0.0);
//  float edgeDist = abs((uStep - (uEdgeWidth / 2.0)) - noise);
//  if (edgeDist < (uEdgeWidth / 4.0)) {
//    float edgeStep = edgeDist / (uEdgeWidth / 2.0);
//    colorEdge =  mix(colorEdgeEnd, colorEdgeStart, edgeStep);
//  }

  colorFinal = colorPrev + colorNext;

  gl_FragColor = colorFinal;
}