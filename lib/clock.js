import THREE from 'three'



class Clock {
	constructor() {
		this.id=0;
		this.clock = new THREE.Clock();
		this.clock.start();
		this.id += 1; 
		//console.log("constructor")
	}
	logDelta(){
		console.log(this.clock.getDelta());		
	}
	getDelta(){
		return this.clock.getDelta();		
	}

	getId(){
		return this.id;
	}
	getTime(){
		return  Date.now();
	}

}

var clock = new Clock();

export default clock;