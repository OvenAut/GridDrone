import * as THREE from '/node_modules/three/build/three.module.js';

    class MshStdBox extends THREE.Mesh {
        constructor(color, cell) {
            super(color);
            console.log(color)
            this.geometry = new THREE.BoxBufferGeometry( Math.PI, Math.sqrt( 2 ), Math.E );
            this.matrial =  new THREE.MeshBasicMaterial( { color: color } )
        }
        update(speed) {
            this.rotation.y += speed
        }
    }
     
export default MshStdBox ;