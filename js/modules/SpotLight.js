//import { Light } from 'three/build/three.module';
import * as THREE from '/node_modules/three/build/three.module.js';

class SpotLight extends THREE.DirectionalLight {
    constructor(color,intenity,d){
        super(color,intenity)
        this.position.set( 0, 1, 2 );

this.castShadow = true;

this.shadow.mapSize.width = 1024;
this.shadow.mapSize.height = 1024;

//var d = 100;

this.shadow.camera.left = - d;
this.shadow.camera.right = d;
this.shadow.camera.top = d;
this.shadow.camera.bottom = - d;

this.shadow.camera.far = 1000;

    
    };

    

};

export default SpotLight;