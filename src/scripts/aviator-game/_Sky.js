import game from './_game';
import Cloud from './_Cloud';

class Sky {
  constructor() {
    this.mesh = new THREE.Object3D();
    this.nClouds = 20;
    this.clouds = [];

    const stepAngle = (Math.PI * 2) / this.nClouds;
    for (let i = 0; i < this.nClouds; i++) {
      const cloud = new Cloud();
      const angle = stepAngle * i;
      const height = game.v.seaRadius + 150 + Math.random() * 200;
      const size = 1 + Math.random() * 2;

      cloud.mesh.position.y = Math.sin(angle) * height;
      cloud.mesh.position.x = Math.cos(angle) * height;
      cloud.mesh.position.z = -300 - Math.random() * 500;
      cloud.mesh.rotation.z = angle + Math.PI / 2;
      cloud.mesh.scale.set(size, size, size);

      this.mesh.add(cloud.mesh);
      this.clouds.push(cloud);
    }
  }

  moveClouds() {
    for (let i = 0; i < this.nClouds; i++) {
      const c = this.clouds[i];
      c.rotate();
    }
    this.mesh.rotation.z += game.v.speed * game.deltaTime;
  }
}

export default Sky;
