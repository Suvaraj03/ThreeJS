import { AfterViewInit, Component, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';

import * as THREE from 'three';

import { Road } from '../game/road';
import { Bus } from '../game/bus';
import { Traffic } from '../game/traffic';
import { Environment } from '../game/enviroment';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cube',

  imports: [CommonModule],

  templateUrl: './cube.html',

  styleUrl: './cube.css',
})
export class Cube implements AfterViewInit {
  constructor(private cd: ChangeDetectorRef) {}

  @ViewChild('canvasContainer')
  container!: ElementRef<HTMLDivElement>;

  keys: any = {};

  speed = 0;

  score = 0;

  health = 100;

  gameOver = false;

  collisionCooldown = false;

  // store objects for restart

  bus!: Bus;

  camera!: THREE.PerspectiveCamera;

  ngAfterViewInit() {
    const scene = new THREE.Scene();

    scene.background = new THREE.Color(0x87ceeb);

    scene.fog = new THREE.Fog(0x87ceeb, 20, 300);

    this.camera = new THREE.PerspectiveCamera(
      60,

      innerWidth / innerHeight,

      0.1,

      1000,
    );

    this.camera.position.set(0, 8, 15);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
    });

    renderer.setSize(
      innerWidth,

      innerHeight,
    );

    if (!this.container) {
      console.error('Canvas container missing');

      return;
    }

    this.container.nativeElement.appendChild(renderer.domElement);

    // LIGHT

    const sun = new THREE.DirectionalLight(0xffffff, 2);

    sun.position.set(5, 10, 5);

    scene.add(sun);

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    // CREATE GAME OBJECTS

    this.bus = new Bus();

    scene.add(this.bus.mesh);

    const road = new Road(scene);

    const traffic = new Traffic(scene);

    const environment = new Environment(scene);

    // CONTROLS

    window.addEventListener(
      'keydown',

      (e) => {
        if (!this.gameOver) {
          this.keys[e.key.toLowerCase()] = true;
        }
      },
    );

    window.addEventListener(
      'keyup',

      (e) => {
        this.keys[e.key.toLowerCase()] = false;
      },
    );

    // RESIZE

    window.addEventListener(
      'resize',

      () => {
        this.camera.aspect = innerWidth / innerHeight;

        this.camera.updateProjectionMatrix();

        renderer.setSize(innerWidth, innerHeight);
      },
    );

    const animate = () => {
      requestAnimationFrame(animate);

      // STOP GAME

      if (this.gameOver) {
        renderer.render(scene, this.camera);

        return;
      }

      // =================
      // SPEED SYSTEM
      // =================

      if (this.keys['w']) {
        this.speed += 0.008;
      } else {
        this.speed *= 0.97;
      }

      if (this.keys['s']) {
        this.speed -= 0.02;
      }

      this.speed = THREE.MathUtils.clamp(
        this.speed,

        0,

        1,
      );

      // SCORE

      if (this.speed > 0) {
        this.score += this.speed * 0.1;
      }

      // =================
      // STEERING
      // =================

      const steer = 0.08;

      if (this.keys['a']) {
        this.bus.mesh.position.x -= steer;
      }

      if (this.keys['d']) {
        this.bus.mesh.position.x += steer;
      }

      // road limit

      this.bus.mesh.position.x = THREE.MathUtils.clamp(
        this.bus.mesh.position.x,

        -3.5,

        3.5,
      );

      // =================
      // WORLD UPDATE
      // =================

      road.update(this.speed);

      traffic.update(this.speed);

      environment.update(this.speed);

      this.bus.update(this.speed);

      // =================
      // COLLISION
      // =================

      traffic.cars.forEach((car) => {
        const distance = this.bus.mesh.position.distanceTo(car.position);

        if (distance < 2 && !this.collisionCooldown) {
          this.health -= 10;

          this.speed = 0;

          this.collisionCooldown = true;

          setTimeout(() => {
            this.collisionCooldown = false;
          }, 1000);

          if (this.health <= 0) {
            this.health = 0;

            this.gameOver = true;
          }
        }
      });

      // =================
      // CAMERA
      // =================

      this.camera.position.lerp(
        new THREE.Vector3(
          this.bus.mesh.position.x,

          6,

          this.bus.mesh.position.z + 14,
        ),

        0.08,
      );

      this.camera.lookAt(this.bus.mesh.position);

      this.cd.detectChanges();

      renderer.render(
        scene,

        this.camera,
      );
    };

    animate();
  }

  restartGame() {
    this.health = 100;

    this.score = 0;

    this.speed = 0;

    this.gameOver = false;

    this.bus.mesh.position.set(
      0,

      0,

      0,
    );

    this.camera.position.set(
      0,

      8,

      15,
    );
  }
}
