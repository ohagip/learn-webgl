varying vec2 vUv;
varying vec3 vCenter;


void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}