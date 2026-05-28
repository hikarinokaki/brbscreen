import bomb from '/models/cc0_-_bomb.glb';
import doge from '/models/doggy_meme_dog_ps1.glb';
import maxwell from '/models/maxwell_the_cat_dingus.glb';
import monsterMango from '/models/monster_energy_drink_mango.glb';
import monsterWhite from '/models/monster_zero_ultra.glb';
import popcorn from '/models/popcorn.glb';
import nokia from '/models/psx_nokia.glb';
import bananaCat from '/models/puss_in_banana_suit_3d_model.glb';
import shrek from '/models/shrek.glb';
import thinking from '/models/thinking_emoji.glb';
import tractor from '/models/tractor.glb';
import acan from '/models/acan.glb';
import bgTexture from '/textures/Large 1024x1024/Green Nebula/Green Nebula 8 - 1024x1024.png';

export const CONFIG = {
    targetInitialDrift: 0.5,
    projectileSpeed: 15,
    projectileLifetime: 30000,
    twitchChannel: 'acanthus_dawn',
    wrapMargin: 1.2,
    modelPath: acan,
    depthFar: -25,
    teleportZ: 20,
    fadeSpeed: 0.05,
    backgroundTexturePath: bgTexture,
    projectiles: [
        { path: bomb, scale: 3.0 },
        { path: doge, scale: 1.0 },
        { path: maxwell, scale: 0.03 },
        { path: monsterMango, scale: 1.0 },
        { path: monsterWhite, scale: 0.5 },
        { path: popcorn, scale: 0.2 },
        { path: nokia, scale: 3.5 },
        { path: bananaCat, scale: 1.0 },
        { path: shrek, scale: 1.0 },
        { path: thinking, scale: 1.0 },
        { path: tractor, scale: 0.001 },
    ],
    defaultProjectileScale: 0.03,
};
