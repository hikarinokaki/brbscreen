import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { CONFIG } from './config.js';
import { scene, camera } from './scene.js';
import { world } from './physics.js';

export class ProjectileManager {
    #projectiles = [];

    constructor(target) {
        this.target = target;
    }

    throw() {
        const radius = 0.4;
        let mesh;
        const randomIndex = Math.floor(Math.random() * CONFIG.projectiles.length);
        const projectileConfig = CONFIG.projectiles[randomIndex];
        const modelPath = projectileConfig.path;
        const loader = new GLTFLoader();
        loader.load(modelPath, (gltf) => {
            mesh = gltf.scene;
            const scale = projectileConfig.scale || CONFIG.defaultProjectileScale;
            mesh.scale.set(scale, scale, scale);
            const bbox = new THREE.Box3().setFromObject(mesh);
            const center = new THREE.Vector3();
            bbox.getCenter(center);
            mesh.position.sub(center);
            scene.add(mesh);
            this.#setupProjectilePhysics(mesh, radius);
        }, undefined, (error) => {
            console.error('Error loading projectile model:', error);
        });
    }

    #setupProjectilePhysics(mesh, radius) {
        const body = new CANNON.Body({
            mass: 0.2,
            shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1)),
        });
        const edge = Math.floor(Math.random() * 4);
        const ndcPosition = new THREE.Vector3();
        switch (edge) {
            case 0:
                ndcPosition.set(-1, Math.random() * 2 - 1, 0);
                break;
            case 1:
                ndcPosition.set(1, Math.random() * 2 - 1, 0);
                break;
            case 2:
                ndcPosition.set(Math.random() * 2 - 1, 1, 0);
                break;
            case 3:
                ndcPosition.set(Math.random() * 2 - 1, -1, 0);
                break;
        }
        const worldStart = ndcPosition.unproject(camera);
        body.position.set(worldStart.x, worldStart.y, worldStart.z);
        mesh.position.copy(worldStart);
        const direction = new THREE.Vector3();
        direction.subVectors(this.target.mesh.position, worldStart).normalize();
        body.velocity.set(
            direction.x * CONFIG.projectileSpeed,
            direction.y * CONFIG.projectileSpeed,
            direction.z * CONFIG.projectileSpeed
        );
        world.addBody(body);
        this.#projectiles.push({
            mesh,
            body,
            spawnTime: Date.now()
        });
    }

    update() {
        this.#projectiles.forEach(({ body, mesh }, index) => {
            if (body.position.z < CONFIG.depthFar) {
                scene.remove(mesh);
                world.removeBody(body);
                this.#projectiles.splice(index, 1);
            }
        });
        const now = Date.now();
        for (let i = this.#projectiles.length - 1; i >= 0; i--) {
            const p = this.#projectiles[i];
            if (now - p.spawnTime > CONFIG.projectileLifetime) {
                scene.remove(p.mesh);
                world.removeBody(p.body);
                this.#projectiles.splice(i, 1);
                continue;
            }
            p.mesh.position.copy(p.body.position);
            p.mesh.quaternion.copy(p.body.quaternion);
        }
    }
}
