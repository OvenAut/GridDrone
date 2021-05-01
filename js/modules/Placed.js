
//import { Vector2 } from 'three/build/three.module';
//import { Vector2 } from 'three/build/three.module';
import * as THREE from '/node_modules/three/build/three.module.js';

let stack = []
let stckObject = {
    uuid:"",
    cell: new THREE.Vector3()
}
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
Placed.prototype.addTile = function (uuid,cell,energie) {
    stckObject = {
        uuid:uuid,
        cell:cell,
        energie:energie,    
    }
    
    stack.push(stckObject)

    //counter = stack    //updateTile()
}
Placed.prototype.clearTile = function (uuid) {
    
    for (var i=0; i < stack.length; i++){
        //console.log(stack[i])
        //console.log(uuid)
        if (stack[i].uuid == uuid) {
            //console.log(stack[i])
            stack.splice(i,1)
            break
        }

    }

    //stack.splice( stack.indexOf(uuid),1)
    //counter = stack.length
    //updateTile()
}
Placed.prototype.getStack = function () {
    
    return  stack
}

Placed.prototype.getTiles = function (callback) {
    
    return  callback(stack)
}

Placed.prototype.getUuid = function(cell){
   // console.log(GetUuidFromCell(cell))
   const stack = GetStackFromCell(cell)
//   console.log(stack) 
   return  stack.uuid
}

Placed.prototype.getEnergie = function(cell){
    // console.log(GetUuidFromCell(cell))
    const stack = GetStackFromCell(cell) 
    return  stack.energie
 }


Placed.prototype.getCell = function(uuid){
    return  GetCellFromUuid(uuid)
 }


export default Placed;

function GetStackFromCell(cell){

    var _uuid = []
    for (var i=0; i < stack.length; i++){
      // console.log(stack[i])
       // console.log(cell)
        if (stack[i].cell.equals(cell)) {
        //    console.log(stack[i])
            _uuid = stack[i]
            break
        }
        

    }
    return _uuid
}

function GetEnergieFromCell(cell){

    var _uuid = []
    for (var i=0; i < stack.length; i++){
       // console.log(stack[i].cell)
       // console.log(cell)
        if (stack[i].cell.equals(cell)) {
        //    console.log(stack[i].uuid)
            _uuid = stack[i].energie
            break
        }
        

    }
    return _uuid
}

function GetCellFromUuid(uuid){
    var _cell 
    for (var i=0; i < stack.length; i++){
        //console.log(stack[i])
        //console.log(uuid)
        if (stack[i].uuid == uuid) {
            //console.log(stack[i])
            _uuid = stack[i].cell
            break
        }
    


    }
    return _cell
}
