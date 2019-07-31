#pragma glslify: random = require(../_modules/glsl/random)

uniform vec2 uResolution;
uniform vec2 uTexResolution;
uniform sampler2D uTexturePrev;
uniform sampler2D uTextureNext;
uniform float uProgress;
uniform float uSquareSize;
uniform float uDispFactor;
uniform float uOffset;

varying vec2 vUv;
varying vec2 vTexUv;

void main() {
  vec4 color = vec4(1.0);

  float dispfactor = 1.0;

  // aquare UV
  vec2 squareNum = vec2(
  uResolution.x / uSquareSize,
  uResolution.y / uSquareSize
  );
  vec2 squareUv = vUv * squareNum;
  vec2 intPos = floor(squareUv);
  float disp = random(intPos * vec2(uOffset)); // 歪ます量
  float disp2 = random(intPos * vec2(uOffset + uOffset)) / 3.0; // 歪ますタイミング
  float disp3 = random(intPos * vec2(uOffset + uOffset + uOffset)); // 歪ます向き

  // distotion
  vec2 prevUv = vec2(1.0);
  vec2 nextUv = vec2(1.0);

  if (disp3 < 0.25) {
    prevUv = vec2(vUv.x + uProgress * (disp * uDispFactor), vUv.y);
    nextUv = vec2(vUv.x - (1.0 - uProgress) * (disp * uDispFactor), vUv.y);
  } else if (disp3 < 0.5) {
    prevUv = vec2(vUv.x - uProgress * (disp * uDispFactor), vUv.y);
    nextUv = vec2(vUv.x + (1.0 - uProgress) * (disp * uDispFactor), vUv.y);
  } else if (disp3 < 0.75) {
    prevUv = vec2(vUv.x, vUv.y + uProgress * (disp * uDispFactor));
    nextUv = vec2(vUv.x, vUv.y - (1.0 - uProgress) * (disp * uDispFactor));
  } else {
    prevUv = vec2(vUv.x, vUv.y - uProgress * (disp * uDispFactor));
    nextUv = vec2(vUv.x, vUv.y + (1.0 - uProgress) * (disp * uDispFactor));
  }

  vec4 prevColor = texture2D(uTexturePrev, prevUv);
  vec4 nextColor = texture2D(uTextureNext, nextUv);
  color = mix(prevColor, nextColor, uProgress);

//  color = disp2;
  gl_FragColor = color;
}
