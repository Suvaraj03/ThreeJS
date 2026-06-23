import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

@Component({
  selector: 'app-sheet-model',
  imports: [],
  templateUrl: './sheet-model.html',
  styleUrl: './sheet-model.css',
})
export class SheetModel implements AfterViewInit {
  @ViewChild('canvasContainer')
  canvas!: ElementRef;

  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;
  controls!: OrbitControls;
  sheet!: THREE.Mesh;
  laser!: THREE.Mesh;

  animationStep = 0;

  ngAfterViewInit(): void {
    this.CreateScene();
    this.CreateSheet();
    this.animate();
  }

  CreateScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xdfe7ef);
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    this.camera.position.set(0, 2, 5);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, 600);
    this.canvas.nativeElement.appendChild(this.renderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(5, 5, 5);
    this.scene.add(light);
    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambient);
  }

  CreateSheet() {
    //Sheet Dimension
    const geometry = new THREE.BoxGeometry(4, 0.05, 2);
    //Metal Material
    const material = new THREE.MeshStandardMaterial({
      color: 0x9fa7ad,
      metalness: 1,
      roughness: 0.2,
    });
    this.sheet = new THREE.Mesh(geometry, material);
    this.sheet.position.y = 0.2;
    this.scene.add(this.sheet);

    //Laser beam
    const LaserGeometry = new THREE.BoxGeometry(0.05, 0.1, 2.2);
    const laserMaterial = new THREE.MeshStandardMaterial({
      color: 0xff0000,
    });
    this.laser = new THREE.Mesh(LaserGeometry, laserMaterial);
    this.laser.position.y = 0.4;
    this.laser.position.x = -2;
    this.scene.add(this.laser);
  }
  BendSheet() {
    //rotate like bending
    this.sheet.rotation.x = Math.PI / 2;
    this.sheet.position.y = 1;
  }

  animateProcess() {
    if (this.animationStep < 80) {
      //laser moving
      this.laser.position.x += 0.05;
    } else if (this.animationStep < 140) {
      //bending animation
      this.sheet.rotation.z += 0.02;
    } else if (this.animationStep < 200) {
      //folding
      this.sheet.rotation.x += 0.01;
    }
    this.animationStep++;

    this.camera.position.x = Math.sin(this.animationStep * 0.01) * 5;
    this.camera.lookAt(0, 0, 0);
  }
  animate() {
    requestAnimationFrame(() => this.animate());
    this.animateProcess();
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}
