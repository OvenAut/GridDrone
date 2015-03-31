import Stats from '../vendor/stats.min'

class StatsApp {
	constructor() {
		this.stats = new Stats();
		//let blub = "blas";
	}
	load() {
	
		this.stats.setMode(0); // 0: fps, 1: ms

// align top-left
this.stats.domElement.style.position = 'absolute';
this.stats.domElement.style.left = '0px';
this.stats.domElement.style.top = '0px';
this.stats.domElement.style.zIndex = '1000';
document.body.appendChild( this.stats.domElement );

	//console.log(blub);

	}
	update() {
		this.stats.update();
	}
}

export default new StatsApp
