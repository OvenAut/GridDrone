		//var lastTime = new Date().getTime();
		//var innerHTML = document.querySelector("#info > h1");

		import RNG from './RNG.js';

		let _seed = 1234567;
		

class Tool {
	constructor() {
		this.scene = undefined;
		this.camera = undefined;
		this.lastTime = new Date().getTime();
		this.documentInfo = document.querySelector("#info > h1");
	}
	randomizeRGB(base, range,randomInt) {
		var rgb = base.split(',');
		let color = 'rgb(';
		var i, c;
		
		//var _range = seed
		for (i = 0; i < 3; i++ ) {
			c = parseInt(rgb[i]) + randomInt;
			if (c < 0) c = 0;
			else if (c > 255) c = 255;
			color += c + ',';
		};
		color = color.substring(0, color.length-1);
		color += ')';
		const energie = Math.floor((((range*0.5)-randomInt)/range)*100)
		return {color:color,energie:energie}
	}
	
	randomInt(min) {
			return (Math.random() * min) - (min * 0.5) | 0;
	}

	text(text) {
		this.documentInfo.innerHTML = text;
		//console.log("last time " + lastTime)
		var time = new Date().getTime();
		var newTime =  time - this.lastTime;
		this.lastTime = time;
		console.info(`${text}  time: ${newTime}`);
		//console.log(newTime + " " + lastTime)
	}
	DegToRad(deg){
		return deg * (Math.PI/180)
	}
	RadToDeg(rad){
		return rad * (180/Math.PI)
	}
	setCamera(camera){
		this.camera = camera;
	}
	setScene(scene){
		this.scene = scene;
	}
}

//var tool = new Tool();


var tool = new Tool();

export default tool;