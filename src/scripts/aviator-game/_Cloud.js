import Colors from './_Colors';

class Cloud {
  constructor() {
    this.mesh = new THREE.Object3D();
    this.mesh.name = 'cloud';

    // 直方体 https://threejs.org/docs/#api/en/geometries/BoxGeometry
    const geom = new THREE.BoxGeometry(20, 20, 20);

    const mat = new THREE.MeshPhongMaterial({
      color: Colors.white,
    });

    // ランダムで複製
    const nBlocs = 3 + Math.floor(Math.random() * 3);
    for (let i = 0; i < nBlocs; i++) {
      const mesh = new THREE.Mesh(geom, mat);
      const size = 0.1 + Math.random() * 0.9;

      mesh.position.x = i * 15;
      mesh.position.y = Math.random() * 10;
      mesh.position.z = Math.random() * 10;
      mesh.rotation.z = Math.random() * Math.PI * 2;
      mesh.rotation.y = Math.random() * Math.PI * 2;
      mesh.scale.set(size, size, size);

      mesh.castShadow = true;
      mesh.receiveSadow = true;

      this.mesh.add(mesh);
    }
  }

  rotate() {
    const l = this.mesh.children.length;
    for (let i = 0; i < l; i++) {
      const m = this.mesh.children[i];
      m.rotation.z += Math.random() * 0.005 * (i + 1);
      m.rotation.y += Math.random() * 0.002 * (i + 1);
    }
  }
}

export default Cloud;
