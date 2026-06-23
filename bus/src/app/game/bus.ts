import * as THREE from 'three';

export class Bus {
  mesh: THREE.Group;

  wheels: THREE.Mesh[] = [];

  constructor() {
    this.mesh = new THREE.Group();

    const body = new THREE.Mesh(
      new THREE.BoxGeometry(2.4, 1.5, 5),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.8,
      }),
    );
    body.position.y = 1;
    this.mesh.add(body);
    const glass = new THREE.Mesh(
      new THREE.BoxGeometry(1.8, 0.5, 2),
      new THREE.MeshStandardMaterial({
        color: 0x00aaff,
      }),
    );
    glass.position.set(0, 1.5, -0.3);

    this.mesh.add(glass);

    const light = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 0.3, 0.1),

      new THREE.MeshStandardMaterial({
        color: 0xffff00,
      }),
    );

    light.position.set(0, 1, 2.5);

    this.mesh.add(light);

    // wheels

    for (let i = 0; i < 4; i++) {
      const wheel = new THREE.Mesh(
        new THREE.CylinderGeometry(0.4, 0.4, 0.3, 32),
        new THREE.MeshStandardMaterial({
          color: 0x111111,
        }),
      );
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(i % 2 ? 1.1 : -1.1, 0.5, i < 2 ? -1.3 : 1.3);
      this.mesh.add(wheel);
      this.wheels.push(wheel);
    }
  }
  update(speed: number) {
    this.wheels.forEach((w) => {
      w.rotation.x += speed * 5;
    });
  }
}
