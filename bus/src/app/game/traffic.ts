import * as THREE from 'three';

export class Traffic {
  cars: THREE.Mesh[] = [];

  constructor(scene: THREE.Scene) {
    for (let i = 0; i < 10; i++) {
      const car = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 1, 3),

        new THREE.MeshStandardMaterial({
          color: 0xff0000,
        }),
      );
      car.position.set(Math.random() * 6 - 3, 0.5, -i * 80);
      scene.add(car);
      this.cars.push(car);
    }
  }
  update(speed: number) {
    this.cars.forEach((car) => {
      car.position.z += speed;

      if (car.position.z > 10) {
        car.position.z = -400;
      }
    });
  }
  reset() {
    this.cars.forEach((car, index) => {
      car.position.set(Math.random() * 6 - 3, 0.5, -(index * 80) - 50);
    });
  }
}
