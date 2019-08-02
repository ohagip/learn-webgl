import game from './_game';
import Colors from './_Colors';

class Ennemy {
  constructor() {
    // 四面体形状（半径, 数値分四面体から頂点が増える）
    // https://threejs.org/docs/#api/en/geometries/TetrahedronGeometry
    const geom = new THREE.TetrahedronBufferGeometry(8, 2);
    const mat = new THREE.MeshPhongMaterial({
      color: Colors.red,
      shininess: 0,
      specular: 0xffffff,
      shading: THREE.FlatShading,
    });

    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.castShadow = true;
    this.angle = 0;
    this.dist = 0;
  }
}

class EnnemiesHolder {
  constructor(airplane, particles, ambientLight) {
    this.airplane = airplane;
    this.particles = particles;
    this.ambientLight = ambientLight;

    this.mesh = new THREE.Object3D();
    this.ennemiesInUse = [];

    for (let i = 0; i < 10; i++) {
      game.ennemiesPool.push(new Ennemy());
    }
  }

  spawnEnnemies() {
    const nEnnemies = game.v.level;
    for (let i = 0; i < nEnnemies; i++) {
      let ennemy;
      if (game.ennemiesPool.length) {
        ennemy = game.ennemiesPool.pop();
      } else {
        ennemy = new Ennemy();
      }

      // ギリギリの位置から生成
      ennemy.angle = -(i * 0.1);
      ennemy.distance =
        game.v.seaRadius +
        game.v.planeDefaultHeight +
        (-1 + Math.random() * 2) * (game.v.planeAmpHeight - 20);
      ennemy.mesh.position.y =
        -game.v.seaRadius + Math.sin(ennemy.angle) * ennemy.distance;
      ennemy.mesh.position.x = Math.cos(ennemy.angle) * ennemy.distance;

      this.mesh.add(ennemy.mesh);
      this.ennemiesInUse.push(ennemy);
    }
  }

  rotateEnnemies() {
    for (let i = 0; i < this.ennemiesInUse.length; i++) {
      const ennemy = this.ennemiesInUse[i];
      ennemy.angle += game.v.speed * game.deltaTime * game.v.ennemiesSpeed;

      if (ennemy.angle > Math.PI * 2) {
        ennemy.angle -= Math.PI * 2;
      }

      ennemy.mesh.position.y =
        -game.v.seaRadius + Math.sin(ennemy.angle) * ennemy.distance;
      ennemy.mesh.position.x = Math.cos(ennemy.angle) * ennemy.distance;
      ennemy.mesh.rotation.z += Math.random() * 0.1;
      ennemy.mesh.rotation.y += Math.random() * 0.1;

      // 飛行機と敵とのあたり判定
      const diffPos = this.airplane.mesh.position
        .clone()
        .sub(ennemy.mesh.position.clone());
      const d = diffPos.length();
      if (d < game.v.ennemyDistanceTolerance) {
        this.particles.spawnParticles(
          ennemy.mesh.position.clone(),
          15,
          Colors.red,
          3
        );

        game.ennemiesPool.unshift(this.ennemiesInUse.splice(i, 1)[0]);
        this.mesh.remove(ennemy.mesh);
        game.v.planeCollisionSpeedX = (100 * diffPos.x) / d;
        game.v.planeCollisionSpeedY = (100 * diffPos.y) / d;
        this.ambientLight.intensity = 2; // 明度

        game.removeEnergy();
        i--;
      } else if (ennemy.angle > Math.PI) {
        // 見切れたらけす
        game.ennemiesPool.unshift(this.ennemiesInUse.splice(i, 1)[0]);
        this.mesh.remove(ennemy.mesh);
        i--;
      }
    }
  }
}

export default EnnemiesHolder;
