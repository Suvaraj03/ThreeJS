import { AfterViewInit, Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-cube',
  imports: [],
  templateUrl: './cube.html',
  styleUrl: './cube.css',
})
export class Cube implements AfterViewInit {
  @ViewChild('canvasContainer')
  container!: ElementRef;

  ngAfterViewInit(): void {
    const scene = new THREE.Scene();

    scene.background = new THREE.Color(0x87ceeb);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );

    camera.position.set(0, 5, 15);

    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.nativeElement.appendChild(renderer.domElement);
    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(5, 10, 5);

    scene.add(light);
    const roadGeometry = new THREE.PlaneGeometry(8, 100);

    const roadMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });

    const road = new THREE.Mesh(roadGeometry, roadMaterial);

    road.rotation.x = -Math.PI / 2;
    scene.add(road);

    const busGeometry = new THREE.BoxGeometry(2, 1, 4);

    const busMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });

    const bus = new THREE.Mesh(busGeometry, busMaterial);

    bus.position.y = 0.6;
    bus.position.z = 0;

    scene.add(bus);

    const mountainGeometry = new THREE.ConeGeometry(4, 5, 4);

    const mountainMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
    const mountain = new THREE.Mesh(mountainGeometry, mountainMaterial);
    mountain.position.set(-7, 2, -10);

    scene.add(mountain);

    const mountain2 = mountain.clone();
    mountain2.position.x = 7;

    scene.add(mountain2);

    for (let i = 0; i < 10; i++) {
      const tree = new THREE.Mesh(
        new THREE.ConeGeometry(0.5, 2, 8),
        new THREE.MeshStandardMaterial({ color: 0x228b22 }),
      );
      tree.position.set(i % 2 === 0 ? -5 : 5, 1, -i * 5);
      scene.add(tree);
    }
    function animate() {
      requestAnimationFrame(animate);
      bus.position.z += 0.05;
      if (bus.position.z > 10) {
        bus.position.z = -20;
      }
      renderer.render(scene, camera);
    }
    animate();
  }
}