attribute vec3 center;
varying vec2 vUv;
varying vec3 vCenter;


void main() {
  vUv = uv;
  vCenter = center;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}