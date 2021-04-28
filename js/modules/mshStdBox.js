import * as THREE from '/node_modules/three/build/three.module.js';

    class MshStdBox extends THREE.Mesh {
        constructor(color, cell) {
            super(color);
            this.geometry = new THREE.BoxBufferGeometry( Math.PI, Math.sqrt( 2 ), Math.E );
            this.matrial =  new THREE.MeshStandardMaterial( { color: 0xA00000, roughness: 0, metalness: 0 } )
        }
        update() {
            this.rotation.y += 0.01
        }
    }
     
export default MshStdBox ;