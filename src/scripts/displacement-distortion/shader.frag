#pragma glslify: random = require(../_modules/glsl/random)

uniform vec2 uResolution;
uniform vec2 uTexResolution;
uniform sampler2D uTexturePrev;
uniform sampler2D uTextureNext;
uniform sampler2D uDisplacementTexture;
uniform float uProgress;

varying vec2 vUv;
varying vec2 vTexUv;

void main() {

  vec4 color = vec4(1.0);

  vec4 disp = texture2D(uDisplacementTexture, vTexUv);

  vec2 prevUv = vec2(vTexUv.x + uProgress * disp.r, vTexUv.y);
  vec2 nextUv = vec2(vTexUv.x - (1.0 - uProgress) * disp.r, vTexUv.y);

  vec4 prevColor = texture2D(uTexturePrev, prevUv);
  vec4 nextColor = texture2D(uTextureNext, nextUv);

  color = mix(prevColor, nextColor, uProgress);

  gl_FragColor = color;
}
