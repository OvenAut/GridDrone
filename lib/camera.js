import THREE from 'three'
import TWEEN from '../vendor/tween.min'
import Tool from './tool'

var d = 350;
var theta = 0.0;

class GameCamera extends THREE.PerspectiveCamera {

	constructor(fov, aspect, near, far){
		super(fov, aspect, near, far)
		this.randomStarted = false;
	}

	update(){ 
		if (!this.randomStarted) this.randomEventInit();
		theta += 0.1
		this.position.z = Math.sin(THREE.Math.degToRad(theta)) * d;
		this.position.x = Math.cos(THREE.Math.degToRad(theta)) * d;
	}

	randomEventInit(){
		var rndTime = Tool.randomInt(1000,5000);
		var rndHeight = Tool.randomInt(0,100) ;
		setTimeout(() => this.randomEvent(rndHeight), rndTime)
		this.randomStarted = true;		
	}

	randomEvent(height){
		var posY = this.position.y  - height; 
		let tween = new TWEEN.Tween(this.position)
			.to( {y:posY} , 8000 )
			.easing( TWEEN.Easing.Elastic.Out)
			.onComplete(()=> this.randomEventUp(height))
			.start();
	}

	randomEventUp(height){
		var posY = this.position.y  + height; 
		let tween = new TWEEN.Tween(this.position)
			.to( {y:posY} , 8000 )
			.easing( TWEEN.Easing.Cubic.Out )
			.onComplete(()=> this.randomStarted = false)
			.start();
	}
}

export default GameCamera;