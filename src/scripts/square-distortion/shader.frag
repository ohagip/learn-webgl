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
  //  prevUv = vec2(vTexUv.x - uProgress * (disp * uDispFactor), vTexUv.y);
  //  nextUv = vec2(vTexUv.x + (1.0 - uProgress) * (disp * uDispFactor), vTexUv.y);

  // → to ←
  //  prevUv = vec2(vTexUv.x + uProgress * (disp * uDispFactor), vTexUv.y);
  //  nextUv = vec2(vTexUv.x - (1.0 - uProgress) * (disp * uDispFactor), vTexUv.y);

  // ↓ to ↑
  //  prevUv = vec2(vTexUv.x, vTexUv.y - uProgress * (disp * uDispFactor));
  //  nextUv = vec2(vTexUv.x, vTexUv.y + (1.0 - uProgress) * (disp * uDispFactor));

  // ↑ to ↓
  //  nextUv = vec2(vTexUv.x, vTexUv.y - (1.0 - uProgress) * (disp * uDispFactor));
  //  prevUv = vec2(vTexUv.x, vTexUv.y + uProgress * (disp * uDispFactor));

  if (disp2 < 0.05) {
    // ↓ to ↑
    prevUv = vec2(vTexUv.x, vTexUv.y - uProgress * (disp * uDispFactor));
    nextUv = vec2(vTexUv.x, vTexUv.y + (1.0 - uProgress) * (disp * uDispFactor));
  } else if (disp2 < 0.1) {
    // ← to →
    prevUv = vec2(vTexUv.x - uProgress * (disp * uDispFactor), vTexUv.y);
    nextUv = vec2(vTexUv.x + (1.0 - uProgress) * (disp * uDispFactor), vTexUv.y);
  } else if (disp2 < 0.65) {
    // → to ←
    prevUv = vec2(vTexUv.x + uProgress * (disp * uDispFactor), vTexUv.y);
    nextUv = vec2(vTexUv.x - (1.0 - uProgress) * (disp * uDispFactor), vTexUv.y);
  } else {
    // ↑ to ↓
    nextUv = vec2(vTexUv.x, vTexUv.y - (1.0 - uProgress) * (disp * uDispFactor));
    prevUv = vec2(vTexUv.x, vTexUv.y + uProgress * (disp * uDispFactor));
  }

  vec4 prevColor = texture2D(uTexturePrev, prevUv);
  vec4 nextColor = texture2D(uTextureNext, nextUv);
  color = mix(prevColor, nextColor, uProgress);

//  color = disp2;
  gl_FragColor = color;
}
