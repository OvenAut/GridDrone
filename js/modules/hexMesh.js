import * as THREE from '/node_modules/three/build/three.module.js';

class HexMesh extends THREE.Mesh {
	constructor(geometry, material, color, cell) {
		super(geometry,material,color);

	//this.startup();

	this.rayHit = false;
	
	this.touchOnec = false;
	this.hexBlocked = false;
	this.hexAnimation = false;

	this.rightSelectShot = false;
	this.leftSelectShot = false;

	this.inTransition = false;

	this.timeOut = undefined;

	this.cell = cell;
	//this.timer2 = undefined;
	
	this.defaultColor = new THREE.Color(color);
	this.selectColor = new THREE.Color(0xFF0000);
	this.touchColor = new THREE.Color(0xDD00FF);
	
	}

	



	setDefaultColor() {	
		this.material.color.set(this.defaultColor);
	}

	update(){
		return;

	}
}

export default HexMesh;