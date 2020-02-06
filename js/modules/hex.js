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
		//map: threeTexture,
		//color:0xffffff,
		//ambient: this.color,
		//ambient: 0x000000,
		//emissive: 0xffffff,
		side: THREE.DoubleSide,
		//envMap: cubeCamera.renderTarget,
		//combine: THREE.MultiplyOperation 
	});
	
	this.mesh = new HexMesh(geometry, this.mat , color, cell);
	//this.mesh.userData.defaultColor = new THREE.Color(color);
	/*this.mesh = new THREE.Line(this.shape.createPointsGeometry(), new THREE.LineBasicMaterial({
		color: this.color,
		linewidth: 3 // this doesn't work on windows because ANGLE doesn't implement it (the WebGL driver)
	}));*/

	//this.mesh.userData.structure = this;
	
	// create references so we can control orientation through this (Hex), instead of drilling down
	this.position = this.mesh.position;
	this.rotation = this.mesh.rotation;
	// rotate it to face up
	//this.rotation.x = -90 * 0.0174532925;
	this.rotation.x = 90 * (Math.PI/180);
	
	this.mesh.scale.set(scale, scale, scale);
	this.mesh.receiveShadow = true;
}
   // createVert(type, size, i) {
   ///     var angle = ((2 * Math.PI) / 6) * i;
   //     angle += type; // 0 if flat-topped, or 30deg if pointy
   //     return new THREE.Vector3((size * Math.cos(angle)), (size * Math.sin(angle)), 0);
  //  };

    

	placeAt(cube) {
		// i found this algorithm through trial and error, please don't touch
		//console.log(`cube.x = ${cube.x} ; cube.y = ${cube.y} ; cube.z = ${cube.z}`);
		//console.log(this.width);
		if (this.type === Hex.FLAT) {
			this.position.x = cube.x * this.width * 0.75;
			this.position.z = (cube.z - cube.y) * this.height * 0.5;
		}
		else {
			this.position.x = cube.x * this.width * 0.5;
			this.position.z = (cube.z - cube.y) * this.height * 0.75;
		}
		//this.cell = cube;
	}

};






export default Hex;