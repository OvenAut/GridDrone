import * as THREE from '/node_modules/three/build/three.module.js';

//    var matStdObjects = new THREE.MeshStandardMaterial( { color: 0xA00000, roughness: 0, metalness: 0 } );
//    var geoBox = new THREE.BoxBufferGeometry( Math.PI, Math.sqrt( 2 ), Math.E );
 //   var MshStdBox = new THREE.Mesh( geoBox, matStdObjects );

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
    
    //MshStdBox.position.set( 0, 5, 0 );
    //MshStdBox.rotation.set( 0, Math.PI / 2.0, 0 );
    //MshStdBox.castShadow = true;
    //MshStdBox.receiveShadow = true;

 
export default MshStdBox ;