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

  // aquare UV
  vec2 squareNum = vec2(
  uResolution.x / uSquareSize,
  uResolution.y / uSquareSize
  );
  vec2 squareUv = vUv * squareNum;
  vec2 intPos = floor(squareUv);
  float disp = random(intPos * vec2(uOffset)); // 歪ます量
  float disp2 = random(intPos * vec2(uOffset + uOffset + uOffset)); // 歪ます向き

  // distotion
  vec2 prevUv = vec2(1.0);
  vec2 nextUv = vec2(1.0);

  // ← to →
  //  prevUv = vec2(vUv.x - uProgress * (disp * uDispFactor), vUv.y);
  //  nextUv = vec2(vUv.x + (1.0 - uProgress) * (disp * uDispFactor), vUv.y);

  // → to ←
  //  prevUv = vec2(vUv.x + uProgress * (disp * uDispFactor), vUv.y);
  //  nextUv = vec2(vUv.x - (1.0 - uProgress) * (disp * uDispFactor), vUv.y);

  // ↓ to ↑
  //  prevUv = vec2(vUv.x, vUv.y - uProgress * (disp * uDispFactor));
  //  nextUv = vec2(vUv.x, vUv.y + (1.0 - uProgress) * (disp * uDispFactor));

  // ↑ to ↓
  //  nextUv = vec2(vUv.x, vUv.y - (1.0 - uProgress) * (disp * uDispFactor));
  //  prevUv = vec2(vUv.x, vUv.y + uProgress * (disp * uDispFactor));

  if (disp2 < 0.2) {
    // ↓ to ↑
    prevUv = vec2(vUv.x, vUv.y - uProgress * (disp * uDispFactor));
    nextUv = vec2(vUv.x, vUv.y + (1.0 - uProgress) * (disp * uDispFactor));
  } else if (disp2 < 0.3) {
    // → to ←
    prevUv = vec2(vUv.x + uProgress * (disp * uDispFactor), vUv.y);
    nextUv = vec2(vUv.x - (1.0 - uProgress) * (disp * uDispFactor), vUv.y);
  } else if (disp2 < 0.4) {
    // ← to →
    prevUv = vec2(vUv.x - uProgress * (disp * uDispFactor), vUv.y);
    nextUv = vec2(vUv.x + (1.0 - uProgress) * (disp * uDispFactor), vUv.y);
  } else {
    // ↑ to ↓
    nextUv = vec2(vUv.x, vUv.y - (1.0 - uProgress) * (disp * uDispFactor));
    prevUv = vec2(vUv.x, vUv.y + uProgress * (disp * uDispFactor));
  }

  vec4 prevColor = texture2D(uTexturePrev, prevUv);
  vec4 nextColor = texture2D(uTextureNext, nextUv);
  color = mix(prevColor, nextColor, uProgress);

//  color = disp2;
  gl_FragColor = color;
}
