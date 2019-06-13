uniform vec2 uResolution;
uniform vec2 uTexResolution;
uniform sampler2D uTexturePrev;
uniform sampler2D uTextureNext;
uniform float uProgress;
uniform float uTime;

varying vec2 vUv;

vec2 mirrored(vec2 v) {
  vec2 m = mod(v, 2.0);
  return mix(m, 2.0 - m, step(1.0, m));
}

float tri(float p) {
  return mix(p, 1.0 - p, step(0.5, p)) * 2.0;
}

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

  vec2 accel = vec2(0.5, 2.0);
  float progress = uProgress;

  float delayValue = progress * 7.0 - vUv.y * 2.0 + vUv.x - 2.0;
  delayValue = clamp(delayValue, 0.0, 1.0);

  vec2 translateValue = progress + delayValue * accel;
  vec2 translateValuePrev = vec2(-0.5, 1.0) * translateValue;
  vec2 translateValueNext = vec2(-0.5, 1.0) * (translateValue - 1.0 - accel);

  vec2 w = sin(sin(uTime) * vec2(0.0, 0.3) + vUv.yx * vec2(0.0, 4.0)) * vec2(0.0, 0.5);
  vec2 xy = w * (tri(uProgress) * 0.5 + tri(delayValue) * 0.5);

  vec2 uvPrev = uv + translateValuePrev + xy;
  vec2 uvNext = uv + translateValueNext + xy;

  vec4 colorPrev = texture2D(uTexturePrev, mirrored(uvPrev));
  vec4 colorNext = texture2D(uTextureNext, mirrored(uvNext));

  gl_FragColor = mix(colorPrev, colorNext, delayValue);
}