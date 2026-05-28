import { CONFIG } from './config.js';
import './scene.js';
import './physics.js';
import { Target } from './target.js';
import { ProjectileManager } from './projectile.js';
import { ChatReader } from './chat.js';
import { scene, camera, renderer } from './scene.js';
import { world } from './physics.js';

const target = new Target();
const projectileManager = new ProjectileManager(target);

if (CONFIG.twitchChannel) {
    new ChatReader(CONFIG.twitchChannel, () => projectileManager.throw());
}

window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') projectileManager.throw();
});

function animate() {
    requestAnimationFrame(animate);
    world.fixedStep();
    target.update();
    projectileManager.update();

    const pos = target.body.position;
    document.getElementById('target-coordinates').textContent =
        `Target Coords: (x: ${pos.x.toFixed(2)}, y: ${pos.y.toFixed(2)}, z: ${pos.z.toFixed(2)})`;

    renderer.render(scene, camera);
}

animate();
