#pragma glslify: pnoise3 = require("glsl-noise/periodic/3d")

attribute vec3 center;
varying vec2 vUv;
varying vec3 vCenter;
uniform float uTime;
void main() {
  vUv = uv;
  vCenter = center;
  vec3 coord = vec3(vUv, 1.0) * 10.0;
  float noise = 1.0 + pnoise3(vec3(coord.x, coord.y + uTime, coord.z), vec3(10.0));

  float height = 10.0 * noise;
  vec4 pos = vec4(position.x, position.y, height, 1.0);

  gl_Position = projectionMatrix * modelViewMatrix * pos;
}