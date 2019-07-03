import Cloud from './_Cloud';

class Sky {
  constructor() {
    this.mesh = new THREE.Object3D();
    this.nClouds = 20;

    const stepAngle = (Math.PI * 2) / this.nClouds;
    for (let i = 0; i < this.nClouds; i++) {
      const cloud = new Cloud();
      const angle = stepAngle * i;
      const height = 750 + Math.random() * 200; // 雲までの高さ（軸からの距離）
      const size = 1 + Math.random() * 2;

      cloud.mesh.position.y = Math.sin(angle) * height;
      cloud.mesh.position.x = Math.cos(angle) * height;
      cloud.mesh.position.z = -400 - Math.random() * 400;
      cloud.mesh.rotation.z = angle + Math.PI / 2;
      cloud.mesh.scale.set(size, size, size);

      this.mesh.add(cloud.mesh);
    }
  }
}

export default Sky;
