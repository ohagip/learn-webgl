#pragma glslify: pnoise3 = require("glsl-noise/periodic/3d")

varying vec2 vUv;

void main() {
  gl_FragColor = vec4(vUv.x, vUv.y, 0.0, 1.0);
}