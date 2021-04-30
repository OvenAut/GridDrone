import * as THREE from '/node_modules/three/build/three.module.js';
import HexMesh from  './hexMesh.js';

/*
	Grid cell that constructs its geometry for rendering and holds gameplay properties.
 */

class Hex { constructor (size, scale, geometry, color , cell) {
	this.type = Hex.FLAT;
	this.color = color || 0xFF0000;
	this.defaultColor = color;
    this.size = size;
    this.FLAT = 0;
    this.POINTY = 30 * 0.0174532925;
	//this.childUuid = null;
	
	if (this.type === Hex.FLAT) {
		this.width = this.size * 2;// * 0.95;
		this.height = Math.sqrt(3)/2 * this.width;
	}
	else {
		this.height = this.size * 2;
		this.width = Math.sqrt(3)/2 * this.height;
	}
	
	//this.cell = null;
	
	this.mat = new THREE.MeshLambertMaterial({
		color: this.color,
		side: THREE.FrontSide,
	});
	
	this.mesh = new HexMesh(geometry, this.mat , color, cell);
	//this.position = this.mesh.position;
	//this.rotation = this.mesh.rotation;
	//console.log(this.mesh)
	this.mesh.name = 'singel'
	this.mesh.rotation.set(90 * (Math.PI/180),0,0); // = ;
	this.mesh.scale.set(scale, scale, scale);
	this.mesh.receiveShadow = true;
	this.mesh.echo = function(){
		
		console.log(this.cell);
	}
	this.mesh.setChildUuid = function(uuid){
		this.childUuid = uuid
		
	}
	this.mesh.getChildUuid = function(){
		return this.childUuid
	}
	this.mesh.childUuid = null;
	//console.log(this.mesh)
	this.mesh.setName = function(name) {
		var _name = name === null ? '' : name
		
		this.mesh.name = _name
	}
	this.mesh.getCellVector = function() {
		return this.cell
	}
	this.mesh.matchCellVec= function(Vec2){
		//console.log(this.cell)
		//console.log(Vec2)
		//console.log(this.uuid)
		return this.cell.equals(Vec2)  ? this.uuid: null
	}
	//updateNeighbors = function() {
	//	coneole.log(this.mesh.cell)
	//}

}


   placeAt(cube) {
		if (this.type === Hex.FLAT) {
			this.mesh.position.set(cube.x * this.width * 0.75,0,(cube.z - cube.y) * this.height * 0.5)
			//this.mesh.position.x = cube.x * this.width * 0.75;
			//this.mesh.position.z = (cube.z - cube.y) * this.height * 0.5;
		}
		else {
			this.mesh.position.set(cube.x * this.width * 0.5,0,(cube.z - cube.y) * this.height * 0.75)
			//this.mesh.position.x = cube.x * this.width * 0.5;
			//this.mesh.position.z = (cube.z - cube.y) * this.height * 0.75;
		}
		//this.cell = cube;
	}
	
};


export default Hex;