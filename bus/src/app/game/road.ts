import * as THREE from 'three';

export class Road {
  parts: THREE.Mesh[] = [];

  constructor(scene: THREE.Scene) {
    for (let i = 0; i < 6; i++) {
      const road = new THREE.Mesh(
        new THREE.PlaneGeometry(10, 60),

        new THREE.MeshStandardMaterial({
          color: 0x202020,
          roughness: 0.8,
        }),
      );
      road.rotation.x = -Math.PI / 2;
      road.position.z = -i * 60;
      scene.add(road);
      //scene.fog(new THREE.Fog(0x87ceeb,20,300))
      this.parts.push(road);
    }
  }

  update(speed: number) {
    this.parts.forEach((r) => {
      r.position.z += speed;

      if (r.position.z > 60) {
        r.position.z -= 360;
      }
    });
  }
}
