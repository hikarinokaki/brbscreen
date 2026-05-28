import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import tmi from 'tmi.js';

import bomb from './models/cc0_-_bomb.glb';
import doge from './models/doggy_meme_dog_ps1.glb';
import maxwell from './models/maxwell_the_cat_dingus.glb';
import monsterMango from './models/monster_energy_drink_mango.glb';
import monsterWhite from './models/monster_zero_ultra.glb';
import popcorn from './models/popcorn.glb';
import nokia from './models/psx_nokia.glb';
import bananaCat from './models/puss_in_banana_suit_3d_model.glb';
import shrek from './models/shrek.glb';
import thinking from'./models/thinking_emoji.glb';
import acan from './models/acan.glb';

import bgTexture from '/textures/Large 1024x1024/Blue Nebula/Blue Nebula 1 - 1024x1024.png';

// --- Configuration ---
const CONFIG = {
    targetInitialDrift: 0.5,
    projectileSpeed: 15,
    projectileLifetime: 30000, // 30 seconds
    twitchChannel: 'theaking51', // Set this to your channel
    wrapMargin: 1.2, // Extra space before teleporting
    modelPath: acan, // Path to your .glb or .gltf model (e.g., '/model.glb')
    depthFar: -25, // Distance from origin where it teleports
    teleportZ: 20, // Position behind camera (camera is at 15)
    fadeSpeed: 0.05,
    backgroundTexturePath: bgTexture,
    projectiles: [
		{ path: bomb, scale: 3.0 },
		{ path: doge, scale: 1.0 },
		{ path: maxwell, scale: 0.03 },
		{ path: monsterMango, scale: 1.0 },
		{ path: monsterWhite, scale: 1.0 },
		{ path: popcorn, scale: 0.2 },
		{ path: nokia, scale: 2.0 },
		{ path: bananaCat, scale: 1.0 },
		{ path: shrek, scale: 1.0 },
		{ path: thinking, scale: 1.0 },
	], // Add your GLTF/GLB model paths here
    defaultProjectileScale: 0.03, // Default scaling for loaded projectile models
};

// --- State ---
const targetState = {
    fading: 'none', // 'none', 'out', 'in'
    opacity: 1,
    shouldTeleport: false
};

// --- Scene Setup ---
// ... (rest of setup)
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 15;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();

// Load background texture
const textureLoader = new THREE.TextureLoader();
textureLoader.load(CONFIG.backgroundTexturePath, (texture) => {
    scene.background = texture;
});

const ambientLight = new THREE.AmbientLight(0xffffff, 1.8); // Increased intensity
scene.add(ambientLight);

//const pointLight = new THREE.PointLight(0xffffff, 1.5); // Increased intensity
//pointLight.position.set(5, 5, 5);
//scene.add(pointLight);

// --- Physics Setup ---
const world = new CANNON.World();
world.gravity.set(0, 0, 0); // Zero gravity for floating
world.angularDamping = 0.9; // Allow subtle spinning and slow it down

// --- Target ---
let targetMesh;
const targetGeometry = new THREE.BoxGeometry(2, 2, 2);
const targetMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00, transparent: true, opacity: 1 });
targetMesh = new THREE.Mesh(targetGeometry, targetMaterial);
scene.add(targetMesh);

function setTargetOpacity(opacity) {
    targetState.opacity = opacity;
    targetMesh.traverse((child) => {
        if (child.isMesh) {
            child.material.transparent = true;
            child.material.opacity = opacity;
        }
    });
}

if (CONFIG.modelPath) {
const loader = new GLTFLoader();
const fontLoader = new FontLoader();

let textMesh;

fontLoader.load(helvetikerRegularFont, (font) => {
    const textGeometry = new TextGeometry('Hello', {
        font: font,
        size: 2, // Scale of the text
        height: 0.5, // Thickness of the text
        curveSegments: 12, // Number of points on each curve
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.05,
        bevelOffset: 0
    });

    const textMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
    textMesh = new THREE.Mesh(textGeometry, textMaterial);

    // Position the text - adjust these values as needed
    textGeometry.computeBoundingBox();
    textGeometry.boundingBox.getCenter(textMesh.position);
    textMesh.position.multiplyScalar(-1); // Center the text
    textMesh.position.z = -5; // Position it in front of the camera
    textMesh.position.y = 3; // Slightly above center

    scene.add(textMesh);
});
    loader.load(CONFIG.modelPath, (gltf) => {
        scene.remove(targetMesh);
        targetMesh = gltf.scene;
        setTargetOpacity(targetState.opacity);

    // --- Text Entity ---
    const fontLoader = new FontLoader();
    fontLoader.load(helvetikerRegularFont, (font) => {
        const textGeometry = new TextGeometry('Hello', {
            font: font,
            size: 2, // Scale of the text
            height: 0.5, // Thickness of the text
            curveSegments: 12, // Number of points on each curve
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.05,
            bevelOffset: 0
        });

        const textMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);

        // Position the text - adjust these values as needed
        textGeometry.computeBoundingBox();
        textGeometry.boundingBox.getCenter(textMesh.position);
        textMesh.position.multiplyScalar(-1); // Center the text
        textMesh.position.z = -5; // Position it in front of the camera
        textMesh.position.y = 3; // Slightly above center

        scene.add(textMesh);
    });

    // --- Text Entity ---
    const fontLoader = new FontLoader();
    fontLoader.load(helvetikerRegularFont, (font) => {
        const textGeometry = new TextGeometry('Hello', {
            font: font,
            size: 2, // Scale of the text
            height: 0.5, // Thickness of the text
            curveSegments: 12, // Number of points on each curve
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.05,
            bevelOffset: 0
        });

        const textMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);

        // Position the text - adjust these values as needed
        textGeometry.computeBoundingBox();
        textGeometry.boundingBox.getCenter(textMesh.position);
        textMesh.position.multiplyScalar(-1); // Center the text
        textMesh.position.z = -5; // Position it in front of the camera
        textMesh.position.y = 3; // Slightly above center

        scene.add(textMesh);
    });

    // --- Text Entity ---
    const fontLoader = new FontLoader();
    fontLoader.load(helvetikerRegularFont, (font) => {
        const textGeometry = new TextGeometry('Hello', {
            font: font,
            size: 2, // Scale of the text
            height: 0.5, // Thickness of the text
            curveSegments: 12, // Number of points on each curve
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.05,
            bevelOffset: 0
        });

        const textMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);

        // Position the text - adjust these values as needed
        textGeometry.computeBoundingBox();
        textGeometry.boundingBox.getCenter(textMesh.position);
        textMesh.position.multiplyScalar(-1); // Center the text
        textMesh.position.z = -5; // Position it in front of the camera
        textMesh.position.y = 3; // Slightly above center

        scene.add(textMesh);
    });
    });
}

const targetBody = new CANNON.Body({
    mass: 1,
    shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1)),
});
// Initial random drift
targetBody.velocity.set(
    (Math.random() - 0.5) * CONFIG.targetInitialDrift,
    (Math.random() - 0.5) * CONFIG.targetInitialDrift,
    (Math.random() - 0.5) * CONFIG.targetInitialDrift
);
world.addBody(targetBody);

// --- Projectiles ---
const projectiles = [];

function throwProjectile() {
    const radius = 0.4; // Default radius for sphere and physics body
    let mesh;

	// Load a random GLTF model
	const randomIndex = Math.floor(Math.random() * CONFIG.projectiles.length);
	const projectileConfig = CONFIG.projectiles[randomIndex];
	const modelPath = projectileConfig.path;

	const loader = new GLTFLoader();
	loader.load(modelPath, (gltf) => {
		mesh = gltf.scene;
					const scale = projectileConfig.scale || CONFIG.defaultProjectileScale;
		mesh.scale.set(scale, scale, scale);

    // Center the model based on its bounding box
    const bbox = new THREE.Box3().setFromObject(mesh);
    const center = new THREE.Vector3();
    bbox.getCenter(center);
    mesh.position.sub(center);

    scene.add(mesh);
    // Continue with physics setup after model is loaded
    setupProjectilePhysics(mesh, radius);

    // --- Text Entity ---
    const fontLoader = new FontLoader();
    fontLoader.load(helvetikerRegularFont, (font) => {
        const textGeometry = new TextGeometry('Hello', {
            font: font,
            size: 2, // Scale of the text
            height: 0.5, // Thickness of the text
            curveSegments: 12, // Number of points on each curve
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.05,
            bevelOffset: 0
        });

        const textMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);

        // Position the text - adjust these values as needed
        textGeometry.computeBoundingBox();
        textGeometry.boundingBox.getCenter(textMesh.position);
        textMesh.position.multiplyScalar(-1); // Center the text
        textMesh.position.z = -5; // Position it in front of the camera
        textMesh.position.y = 3; // Slightly above center

        scene.add(textMesh);
    });

        }, undefined, (error) => {
            console.error('Error loading projectile model:', error);
            // Fallback to default sphere on error
            //createDefaultSphereProjectile(radius);
        });
}

function createDefaultSphereProjectile(radius) {
    const geometry = new THREE.SphereGeometry(radius, 16, 16);
    const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    setupProjectilePhysics(mesh, radius);
}

function setupProjectilePhysics(mesh, radius) {
    const body = new CANNON.Body({
        mass: 0.2,
        //shape: new CANNON.Sphere(radius), // Use sphere shape for physics
		shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1)),
    });

    // Randomize start position along screen edges
    const edge = Math.floor(Math.random() * 4); // 0 = Left, 1 = Right, 2 = Top, 3 = Bottom
    const ndcPosition = new THREE.Vector3();

    switch (edge) {
        case 0: // Left edge
            ndcPosition.set(-1, Math.random() * 2 - 1, 0);
            break;
        case 1: // Right edge
            ndcPosition.set(1, Math.random() * 2 - 1, 0);
            break;
        case 2: // Top edge
            ndcPosition.set(Math.random() * 2 - 1, 1, 0);
            break;
        case 3: // Bottom edge
            ndcPosition.set(Math.random() * 2 - 1, -1, 0);
            break;
    }

    // Convert NDC to world coordinates
    const worldStart = ndcPosition.unproject(camera);
    console.log('NDC before unproject:', ndcPosition, 'World Start:', worldStart);
    console.log('Projectile start position:', worldStart);
    body.position.set(worldStart.x, worldStart.y, worldStart.z);
    mesh.position.copy(worldStart); // Initialize mesh position as well

    // Calculate direction to target
    const direction = new THREE.Vector3();
    direction.subVectors(targetMesh.position, worldStart).normalize();
    console.log('Direction to Target:', direction, 'Target Position:', targetMesh.position);

    // Assign velocity toward the target
    body.velocity.set(
        direction.x * CONFIG.projectileSpeed,
        direction.y * CONFIG.projectileSpeed,
        direction.z * CONFIG.projectileSpeed
    );
	//body.angularVelocity.set(1, 0, 0);

    world.addBody(body);
    
    const projectileData = {
        mesh,
        body,
        spawnTime: Date.now()
    };
    projectiles.push(projectileData);
}

// --- Teleportation & State Management ---
function triggerTargetFadeOut() {
    if (targetState.fading === 'none') {
        targetState.fading = 'out';
    }
}

function executeTeleport() {
    // Position: Teleport to Z behind camera
    targetBody.position.z = 5; // Teleport even closer to the camera
    targetBody.velocity.z = 0.5; // Ensure it moves forward into the scene
    // Add some randomness to X and Y
    targetBody.position.x = (Math.random() - 0.5) * 10;
    targetBody.position.y = (Math.random() - 0.5) * 10;
    
    // Randomize X and Y within a reasonable field of view range
    // We'll project (0, 0, teleportZ) to see the range or just guess a safe one
    targetBody.position.x = (Math.random() - 0.5) * 20;
    targetBody.position.y = (Math.random() - 0.5) * 20;

    // Velocity Nudge: Head toward (0, 0, 0)
    const direction = new CANNON.Vec3();
    const center = new CANNON.Vec3(0, 0, 0);
    center.vsub(targetBody.position, direction);
    direction.normalize();
    
    const speed = CONFIG.targetInitialDrift;
    targetBody.velocity.set(
        direction.x * speed,
        direction.y * speed,
        direction.z * speed
    );

    targetState.fading = 'in';
}

function handleTargetState() {
    if (targetState.fading === 'out') {
        targetState.opacity -= CONFIG.fadeSpeed;
        if (targetState.opacity <= 0) {
            targetState.opacity = 0;

            // Add a cooldown to prevent immediate re-teleportation after spawning
            targetState.ready = false;
            setTimeout(() => { targetState.ready = true; }, 1000); // Cooldown for 1 second

            executeTeleport();
        }
        setTargetOpacity(targetState.opacity);
    } else if (targetState.fading === 'in') {
        targetState.opacity += CONFIG.fadeSpeed;
        if (targetState.opacity >= 1) {
            targetState.opacity = 1;
            targetState.fading = 'none';
        }
        setTargetOpacity(targetState.opacity);
    }
}

// --- Screen Wrapping ---
// Better Screen Wrapping using frustum-like logic
function wrapObject(body) {
    // Only wrap if not already fading
    if (targetState.fading !== 'none') return;

    const vector = new THREE.Vector3(body.position.x, body.position.y, body.position.z);
    vector.project(camera);

    const margin = 1.2; // How far off screen before wrapping
    
    // Check X and Y screen boundaries
    if (Math.abs(vector.x) > margin || Math.abs(vector.y) > margin) {
        triggerTargetFadeOut();
    }

    // Check Depth boundary
    if (body.position.z < CONFIG.depthFar) {
        triggerTargetFadeOut();
    }
}

// --- Twitch Integration ---
if (CONFIG.twitchChannel) {
    const client = new tmi.Client({
        channels: [CONFIG.twitchChannel]
    });

    client.connect();

    client.on('message', (channel, tags, message, self) => {
        if (message.toLowerCase().startsWith('!throw')) {
            throwProjectile();
        }
    });
}

// --- Input ---
window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        throwProjectile();
    }
});

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- Animation Loop ---
function animate() {
    requestAnimationFrame(animate);

    // Step physics
    world.fixedStep();

    // Sync Target
    targetMesh.position.copy(targetBody.position);
    targetMesh.quaternion.copy(targetBody.quaternion);

    // Screen wrap target
    wrapObject(targetBody);
    handleTargetState();

    // Sync & Cleanup Projectiles
    projectiles.forEach(({ body, mesh }, index) => {
        if (body.position.z < CONFIG.depthFar) {
            // Remove projectiles that go too far from the camera
            scene.remove(mesh);
            world.removeBody(body);
            projectiles.splice(index, 1);
        }
    });
    const now = Date.now();
    for (let i = projectiles.length - 1; i >= 0; i--) {
        const p = projectiles[i];
        
        // Remove old projectiles
        if (now - p.spawnTime > CONFIG.projectileLifetime) {
            scene.remove(p.mesh);
            world.removeBody(p.body);
            projectiles.splice(i, 1);
            continue;
        }

        p.mesh.position.copy(p.body.position);
        p.mesh.quaternion.copy(p.body.quaternion);
    }

    // Update target coordinates UI
    const targetCoordsText = `Target Coords: (x: ${targetBody.position.x.toFixed(2)}, y: ${targetBody.position.y.toFixed(2)}, z: ${targetBody.position.z.toFixed(2)})`;
    document.getElementById('target-coordinates').textContent = targetCoordsText;

    renderer.render(scene, camera);
}

animate();
