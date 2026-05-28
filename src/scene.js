import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { CONFIG } from './config.js';

export const scene = new THREE.Scene();

export const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 15;

export const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();
textureLoader.load(CONFIG.backgroundTexturePath, (texture) => {
    scene.background = texture;
});

const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
scene.add(ambientLight);

(async function addTextEntity() {
    const fontLoader = new FontLoader();
    const font = await new Promise((resolve, reject) => {
        fontLoader.load(
            `${import.meta.env.BASE_URL}/fonts/helvetiker_regular.typeface.json`,
            resolve,
            undefined,
            reject
        );
    });
    const textGeometry = new TextGeometry('BRB', {
        font: font,
        size: 22,
        height: 1,
        curveSegments: 12,
        bevelEnabled: false,
        bevelOffset: 0,
        bevelThickness: 0.1,
        bevelSize: 0.1,
        bevelSegments: 5
    });
    textGeometry.computeBoundingBox();
    const textMaterial = [
        new THREE.MeshPhongMaterial({ color: 0xfafafa }),
        new THREE.MeshPhongMaterial({ color: 0xf2f2f2 })
    ];
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.scale.set(1, 1, 0.2);
    textGeometry.computeVertexNormals();
    textGeometry.boundingBox.getCenter(textMesh.position).multiplyScalar(-1);
    textMesh.position.z = -140;
    textMesh.position.y = 0;
    scene.add(textMesh);
})();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
