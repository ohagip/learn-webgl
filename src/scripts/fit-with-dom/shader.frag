#pragma glslify: random = require(../_modules/glsl/random)

uniform vec2 uResolution;
uniform vec2 uTexResolution;
uniform sampler2D uTexture;
uniform float uProgress;
uniform float uOffset;

varying vec2 vUv;
varying vec2 vTexUv;

void main() {
  vec4 color = vec4(0.0, 0.0, 0.0, 0.0);

  float offset = 0.0;
  float dispFactor = 0.08;
  float squareSize = 30.0;

  // aquare UV
  vec2 squareNum = vec2(
  uResolution.x / squareSize,
  uResolution.y / squareSize
  );
  vec2 squareUv = vUv * squareNum;
  vec2 intPos = floor(squareUv);
  float disp = random(intPos * vec2(uOffset)); // 歪ます量
  float disp2 = random(intPos * vec2(uOffset + uOffset + uOffset)); // 歪ます向き

  // distotion
  vec2 prevUv = vec2(1.0);
  vec2 nextUv = vec2(1.0);

  if (disp2 < 0.05) {
    // ↓ to ↑
    prevUv = vec2(vTexUv.x, vTexUv.y - uProgress * (disp * dispFactor));
    nextUv = vec2(vTexUv.x, vTexUv.y + (1.0 - uProgress) * (disp * dispFactor));
  } else if (disp2 < 0.1) {
    // ← to →
    prevUv = vec2(vTexUv.x - uProgress * (disp * dispFactor), vTexUv.y);
    nextUv = vec2(vTexUv.x + (1.0 - uProgress) * (disp * dispFactor), vTexUv.y);
  } else if (disp2 < 0.65) {
    // → to ←
    prevUv = vec2(vTexUv.x + uProgress * (disp * dispFactor), vTexUv.y);
    nextUv = vec2(vTexUv.x - (1.0 - uProgress) * (disp * dispFactor), vTexUv.y);
  } else {
    // ↑ to ↓
    nextUv = vec2(vTexUv.x, vTexUv.y - (1.0 - uProgress) * (disp * dispFactor));
    prevUv = vec2(vTexUv.x, vTexUv.y + uProgress * (disp * dispFactor));
  }

  vec4 nextColor = texture2D(uTexture, nextUv);
  color = mix(color, nextColor, uProgress);

  gl_FragColor = color;
}
