import * as THREE from 'three';

export class Environment {
  trees: THREE.Mesh[] = [];

  constructor(scene: THREE.Scene) {
    for (let i = 0; i < 50; i++) {
      const tree = new THREE.Mesh(
        new THREE.ConeGeometry(0.5, 2, 8),

        new THREE.MeshStandardMaterial({
          color: 0x228b22,
        }),
      );

      tree.position.set(
        i % 2 ? 5 : -5,

        1,

        -i * 10,
      );

      scene.add(tree);

      this.trees.push(tree);
    }
  }

  update(speed: number) {
    this.trees.forEach((t) => {
      t.position.z += speed;

      if (t.position.z > 10) {
        t.position.z = -500;
      }
    });
  }
}
