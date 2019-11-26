uniform vec2 uResolution;
uniform vec2 uTexResolution;
uniform sampler2D uTexturePrev;
uniform sampler2D uTextureNext;

varying vec2 vUv;
varying vec2 vTexUv; // テクスチャ用

void main() {
  // 画像の縦横比を補正してbackground-size:coverの挙動にする
  vec2 ratio = vec2(
  min((uResolution.x / uResolution.y) / (uTexResolution.x / uTexResolution.y), 1.0),
  min((uResolution.y / uResolution.x) / (uTexResolution.y / uTexResolution.x), 1.0)
  );

  vec2 _vTexUv = vec2(
  uv.x * ratio.x + (1.0 - ratio.x) * 0.5,
  uv.y * ratio.y + (1.0 - ratio.y) * 0.5
  );

  vUv = uv;
  vTexUv = _vTexUv;
  gl_Position = vec4(position, 1.0);
}
