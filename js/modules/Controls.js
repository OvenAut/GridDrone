import { OrbitControls } from '/node_modules/three/examples/jsm/controls/OrbitControls.js';

import * as THREE from '/node_modules/three/build/three.module.js';

var controls = new OrbitControls( camera, renderer.domElement );
controls.minDistance = 5;
controls.maxDistance = 30;
controls.enablePan = false;
controls.enableDamping = true;
controls.dampingFactor = 0.05;

export default controls ;