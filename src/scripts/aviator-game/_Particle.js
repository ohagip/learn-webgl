import game from './_game';
import Colors from './_Colors';

class Particle {
  constructor() {
    const geom = new THREE.TetrahedronGeometry(3, 0);
    const mat = new THREE.MeshPhongMaterial({
      color: 0x009999,
      shininess: 0,
      specular: 0xffffff,
      shading: THREE.FlatShading,
    });
    this.mesh = new THREE.Mesh(geom, mat);
  }

  explode(pos, color, scale) {
    const p = this.mesh.parent;
    this.mesh.material.color = new THREE.Color(color);
    this.mesh.material.needsUpdate = true;
    this.mesh.scale.set(scale, scale, scale);
    const targetX = pos.x + (-1 + Math.random() * 2) * 50;
    const targetY = pos.y + (-1 + Math.random() * 2) * 50;
    const speed = 0.6 + Math.random() * 0.2;
    TweenMax.to(this.mesh.rotation, speed, {
      x: Math.random() * 12,
      y: Math.random() * 12,
    });
    TweenMax.to(this.mesh.scale, speed, { x: 0.1, y: 0.1, z: 0.1 });
    TweenMax.to(this.mesh.position, speed, {
      x: targetX,
      y: targetY,
      delay: Math.random() * 0.1,
      onComplete: () => {
        if (p) {
          p.remove(this.mesh);
          this.mesh.scale.set(1, 1, 1);
          game.particlesPool.unshift(this);
        }
      }
    });
  }
}

class ParticlesHolder {
  constructor() {
    this.mesh = new THREE.Object3D();
    for (let i = 0; i < 10; i++) {
      const particle = new Particle();
      game.particlesPool.push(particle);
    }
  }

  spawnParticles(pos, density, color, scale) {
    const nParticles = density;
    for (let i = 0; i < nParticles; i++){
      let particle;
      if (game.particlesPool.length) {
        particle = game.particlesPool.pop();
      } else {
        particle = new Particle();
      }
      this.mesh.add(particle.mesh);
      particle.mesh.visible = true;
      particle.mesh.position.x = pos.x;
      particle.mesh.position.y = pos.y;
      particle.explode(pos, color, scale);
    }
  }
}

export default ParticlesHolder;