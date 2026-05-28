import * as CANNON from 'cannon-es';

export const world = new CANNON.World();
world.gravity.set(0, 0, 0);
world.angularDamping = 0.9;
