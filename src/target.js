import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { CONFIG } from './config.js';
import { scene, camera } from './scene.js';
import { world } from './physics.js';

export class Target {
    #fading = 'none';
    #opacity = 1;
    #ready = true;

    constructor() {
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshPhongMaterial({ color: 0x00ff00, transparent: true, opacity: 1 });
        this.mesh = new THREE.Mesh(geometry, material);
        scene.add(this.mesh);

        if (CONFIG.modelPath) {
            const loader = new GLTFLoader();
            loader.load(CONFIG.modelPath, (gltf) => {
                scene.remove(this.mesh);
                this.mesh = gltf.scene;
                this.#setOpacity(this.#opacity);
                scene.add(this.mesh);
            });
        }

        this.body = new CANNON.Body({
            mass: 1,
            shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1)),
        });
        this.body.velocity.set(
            (Math.random() - 0.5) * CONFIG.targetInitialDrift,
            (Math.random() - 0.5) * CONFIG.targetInitialDrift,
            (Math.random() - 0.5) * CONFIG.targetInitialDrift
        );
        world.addBody(this.body);
    }

    #setOpacity(opacity) {
        this.mesh.traverse((child) => {
            if (child.isMesh) {
                child.material.transparent = true;
                child.material.opacity = opacity;
            }
        });
    }

    triggerFadeOut() {
        if (this.#fading === 'none') {
            this.#fading = 'out';
        }
    }

    #executeTeleport() {
        this.body.position.z = 5;
        this.body.velocity.z = 0.5;
        this.body.position.x = (Math.random() - 0.5) * 10;
        this.body.position.y = (Math.random() - 0.5) * 10;
        this.body.position.x = (Math.random() - 0.5) * 20;
        this.body.position.y = (Math.random() - 0.5) * 20;

        const direction = new CANNON.Vec3();
        const center = new CANNON.Vec3(0, 0, 0);
        center.vsub(this.body.position, direction);
        direction.normalize();
        const speed = CONFIG.targetInitialDrift;
        this.body.velocity.set(
            direction.x * speed,
            direction.y * speed,
            direction.z * speed
        );
        this.#fading = 'in';
    }

    #handleFade() {
        if (this.#fading === 'out') {
            this.#opacity -= CONFIG.fadeSpeed;
            if (this.#opacity <= 0) {
                this.#opacity = 0;
                this.#ready = false;
                setTimeout(() => { this.#ready = true; }, 1000);
                this.#executeTeleport();
            }
            this.#setOpacity(this.#opacity);
        } else if (this.#fading === 'in') {
            this.#opacity += CONFIG.fadeSpeed;
            if (this.#opacity >= 1) {
                this.#opacity = 1;
                this.#fading = 'none';
            }
            this.#setOpacity(this.#opacity);
        }
    }

    #wrapCheck() {
        if (this.#fading !== 'none') return;
        const vector = new THREE.Vector3(this.body.position.x, this.body.position.y, this.body.position.z);
        vector.project(camera);
        const margin = 1.2;
        if (Math.abs(vector.x) > margin || Math.abs(vector.y) > margin) {
            this.triggerFadeOut();
        }
        if (this.body.position.z < CONFIG.depthFar) {
            this.triggerFadeOut();
        }
    }

    update() {
        this.mesh.position.copy(this.body.position);
        this.mesh.quaternion.copy(this.body.quaternion);
        this.#wrapCheck();
        this.#handleFade();
    }
}
