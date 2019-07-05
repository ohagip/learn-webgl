import game from './_game';
import Colors from './_Colors';

class Coin {
  constructor() {
    const geom = new THREE.TetrahedronGeometry(5, 0);
    const mat = new THREE.MeshPhongMaterial({
      color: 0x009999,
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

class CoinsHolder {
  constructor(nCoins, airplane, particles) {
    this.airplane = airplane;
    this.particles = particles;
    this.mesh = new THREE.Object3D();
    this.coinsInUse = [];
    this.coinsPool = [];
    for (let i = 0; i < nCoins; i++) {
      const coin = new Coin();
      this.coinsPool.push(coin);
    }
  }

  spawnCoins() {
    const nCoins = 1 + Math.floor(Math.random() * 10);
    const d = game.v.seaRadius + game.v.planeDefaultHeight + (-1 * Math.random() * 2) * (game.v.planeAmpHeight - 20);
    const amplitude = 10 + Math.round(Math.random() * 10);
    for (let i = 0; i < nCoins; i++) {
      let coin;
      if (this.coinsPool.length) {
        coin = this.coinsPool.pop();
      } else {
        coin = new Coin();
      }
      this.mesh.add(coin.mesh);
      this.coinsInUse.push(coin);
      coin.angle = -(i * 0.02);
      coin.distance = d + Math.cos(i * 0.5) * amplitude;
      coin.mesh.position.y = -game.v.seaRadius + Math.sin(coin.angle) * coin.distance;
      coin.mesh.position.x = Math.cos(coin.angle) * coin.distance;
    }
  }

  rotateCoins() {
    for (let i = 0; i < this.coinsInUse.length; i++) {
      const coin = this.coinsInUse[i];
      coin.angle += game.v.speed * game.deltaTime * game.v.coinsSpeed;
      if (coin.angle > Math.PI * 2) {
        coin.angle -= Math.PI * 2;
      }
      coin.mesh.position.y = -game.v.seaRadius + Math.sin(coin.angle) * coin.distance;
      coin.mesh.position.x = Math.cos(coin.angle) * coin.distance;
      coin.mesh.rotation.z += Math.random() * .1;
      coin.mesh.rotation.y += Math.random() * .1;

      // あたり判定
      const diffPos = this.airplane.mesh.position.clone().sub(coin.mesh.position.clone());
      const d = diffPos.length();
      if (d < game.v.coinDistanceTolerance) {
        this.coinsPool.unshift(this.coinsInUse.splice(i, 1)[0]);
        this.mesh.remove(coin.mesh);
        this.particles.spawnParticles(coin.mesh.position.clone(), 5, 0x009999, 0.8);
        game.addEnergy();
        i--;
      } else if (coin.angle > Math.PI) {
        this.coinsPool.unshift(this.coinsInUse.splice(i, 1)[0]);
        this.mesh.remove(coin.mesh);
        i--;
      }
    }
  }
}

export default CoinsHolder;