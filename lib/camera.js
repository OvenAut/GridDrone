import THREE from 'three'
import Clock from './clock'
import TWEEN from '../vendor/tween.min'
import Tool from './tool'

const MPi	= Math.PI/180, d = 350

// function round(int){
// 	return Math.round(int);
// }

class GameCamera extends THREE.PerspectiveCamera {

	constructor(fov, aspect, near, far){
		super(fov, aspect, near, far)
		this.randomStarted = false;
	}

	update(){

		if (!this.randomStarted) this.randomEventInit();

		let time = Clock.getTime() * 0.001;

		//this.rotation.x += Math.random() * 0.1;
		//this.rotation.y += 0.1;
		this.position.z = Math.sin(MPi * time) * d;
		this.position.x = Math.cos(MPi * time) * d;
	}

	randomEventInit(){
		var rndTime = Tool.randomInt(1000,5000);
		var rndHeight = Tool.randomInt(0,100) ;
		//console.log(rndTime);
		setTimeout(() => this.randomEvent(rndHeight), rndTime)
		this.randomStarted = true;		
	}
	randomEvent(height){
		var posY = this.position.y  - height; 
		//console.log(posY)
		let tween = new TWEEN.Tween(this.position)
			.to( {y:posY} , 8000 )

			.easing( TWEEN.Easing.Elastic.Out)
			.onComplete(()=> this.randomEventUp(height))
			.start();

		//console.log(this.position.y)
	}
	randomEventUp(height){
		var posY = this.position.y  + height; 
		let tween = new TWEEN.Tween(this.position)
			.to( {y:posY} , 8000 )

			.easing( TWEEN.Easing.Cubic.Out )
			.onComplete(()=> this.randomStarted = false)
			.start();

		//console.log(this.position.y)
	}



}

export default GameCamera;