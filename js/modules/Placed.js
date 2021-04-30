
//import { Vector2 } from 'three/build/three.module';
//import { Vector2 } from 'three/build/three.module';
import * as THREE from '/node_modules/three/build/three.module.js';

let stack = []
let Cube = new THREE.Vector3()

const cube_directions = [
    new THREE.Vector3(+1,-1,0),new THREE.Vector3(+1,0,-1),new THREE.Vector3(0,+1,-1),
    new THREE.Vector3(-1,+1,0),new THREE.Vector3(-1,0,+1),new THREE.Vector3(0,-1,+1),
    

 //   Cube(+1, -1, 0), Cube(+1, 0, -1), Cube(0, +1, -1), 
 //   Cube(-1, +1, 0), Cube(-1, 0, +1), Cube(0, -1, +1), 
]

var Placed = function (){
   // var counter = 0
   // const Inerre = 0
   //this.stack = [];


}

Placed.prototype.MapVec = function (Vec3) {
    var new_cube_direction = [
        new THREE.Vector3(+1,-1,0),new THREE.Vector3(+1,0,-1),new THREE.Vector3(0,+1,-1),
    new THREE.Vector3(-1,+1,0),new THREE.Vector3(-1,0,+1),new THREE.Vector3(0,-1,+1),
    ]
    
    return new_cube_direction.map(x => x.add(Vec3))
}


Placed.prototype.getCounter = function(){
    
    return stack.length
}
Placed.prototype.addTile = function (uuid) {
    
    stack.push(uuid)

    //counter = stack.length
    //updateTile()
}
Placed.prototype.clearTile = function (uuid) {
    
    stack.splice( stack.indexOf(uuid),1)
    //counter = stack.length
    //updateTile()
}
Placed.prototype.getTiles = function (callback) {
    
    return  callback(stack)
}


export default Placed;

