import game from './_game';
import Colors from './_Colors';

class Sea {
  constructor() {
    // 円柱（上半径、下半径、高さ、円のセグメント、高さのセグメント）
    const geom = new THREE.CylinderGeometry(
      game.v.seaRadius,
      game.v.seaRadius,
      game.v.seaLength,
      40,
      10
    );

    // x軸で回転させる
    // applyMatrix(Matrix4) -> マトリックス変換を適用
    // https://threejs.org/docs/#api/en/core/Object3D.applyMatrix
    // https://threejs.org/docs/#api/en/math/Matrix4.makeRotationX
    geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));

    // 頂点をマージすることで波の連続性を確保
    geom.mergeVertices();

    const l = geom.vertices.length;
    this.waves = [];

    for (let i = 0; i < l; i++) {
      const v = geom.vertices[i];
      this.waves.push({
        y: v.y,
        x: v.x,
        z: v.z,
        ang: Math.random() * Math.PI * 2,
        amp:
          game.v.wavesMinAmp +
          Math.random() * (game.v.wavesMaxAmp - game.v.wavesMinAmp), // 距離
        speed:
          game.v.wavesMinSpeed +
          Math.random() * (game.v.wavesMaxSpeed - game.v.wavesMinSpeed),
      });
    }

    // 光沢のあるマテリアル
    // https://threejs.org/docs/#api/en/materials/MeshPhongMaterial
    const mat = new THREE.MeshPhongMaterial({
      color: Colors.blue,
      transparent: true,
      opacity: 0.8,
      shading: THREE.FlatShading,
    });

    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.name = 'waves';
    this.mesh.receiveShadow = true; // 影を有効にする
  }

  moveWaves() {
    const verts = this.mesh.geometry.vertices;
    const l = verts.length;

    for (let i = 0; i < l; i++) {
      const v = verts[i];
      const vprops = this.waves[i];

      v.x = vprops.x + Math.cos(vprops.ang) * vprops.amp;
      v.y = vprops.y + Math.sin(vprops.ang) * vprops.amp;
      vprops.ang += vprops.speed;
    }

    // three.jsではジオメトリをチャックするため、変更有効にするための設定
    this.mesh.geometry.verticesNeedUpdate = true;
  }
}

export default Sea;
