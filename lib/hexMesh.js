import THREE from 'three';
import TWEEN from '../vendor/tween.min'
import Mouse from './mouse'
import cubeCamera from './cubeCamera';
//import TG from '../vendor/texgen.min';
import hsm from './hexState';
import StateMachine from '../vendor/state-machine.min';

//console.log(hsm.current);

const bounceValue = 5;




		// 		var texture = new TG.Texture( 256, 256 )
		// 		.add( new TG.SinX().frequency( 0.004 ) )
		// 		.mul( new TG.SinY().frequency( 0.004 ) )
		// 		.mul( new TG.SinY().offset( 32 ).frequency( 0.02 ) )
		// 		.div( new TG.SinX().frequency( 0.02 ) )
		// 		.add( new TG.Noise().tint( 0.1, 0, 0 ) )
		// 		//.add( new TG.Noise().tint( 0, 0.1, 0 ) )
		// 		.add( new TG.Noise().tint( 1, 1, 1 ) )
		// 		.toCanvas();

		// var threeTexture = new THREE.Texture( texture )
		// threeTexture.needsUpdate = true;

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

	rayhit() {
		this.rayHit = true;
		//console.log("hit!");
		//return;
		//clearTimeout(this.time);
		clearTimeout(this.timeOut);

		if (!this.hexBlocked)
			this.timeOut = setTimeout(() => this.setDefaultScale(), 1000);


		if (this.hexAnimation) return;
		//console.log("hit !!!" + this);
		//console.log(Mouse.x,Mouse.y)
		

		// Manage Right Click
		if (Mouse.RightButton && !this.rightSelectShot && !this.hexAnimation) {
			
				this.rightSelectShot = true;
				
				//console.log("hello");
				if (!this.hexBlocked) {
					this.touchOnec = false;
					//
					this.setHexBlocked();
					return
				} else{
					//this.setDefaultScale(); 
					this.hexBlocked = false;
					this.setDefaultColor();
					return
				}
			
		} else if (!Mouse.RightButton && this.rightSelectShot && !this.hexAnimation) {
			//var time = undefined;
			//clearTimeout(time);
			//time = setTimeout(()=>{this.rightSelectShot=false}, 500)
			this.rightSelectShot = false;
			//console.log("free");
		}
		

		// Manag Left Click
		if (Mouse.LeftButton && !this.leftSelectShot) {
			this.leftSelectShot = true;
			console.log(this.cell)
			console.log(this.position)
			console.log("LeftButton");

		} else if (!Mouse.LeftButton && this.leftSelectShot) {
			this.leftSelectShot = false;
		}

		if (!this.hexBlocked && !this.touchOnec && !this.hexAnimation)
			this.hexHover()	

		//if (!this.hexBlocked)
		//	this.time = setTimeout(() => this.unTouch(), 1000);



	}

	setDefaultColor() {	
		this.material.color.set(this.defaultColor);
	}

	unTouch() {
		this.touchOnec = false;
		//this.hexBlocked = false;
		this.hexAnimation = false;
		this.setDefaultColor();
	}

	setDefaultScale() {
		if (this.hexAnimation) return;
		//if (this.blockedAnima) return;
		//this.hexAnimation = true;
		let tween = new TWEEN.Tween(this.position)
			.to( {y: 0} , 500 )
			.easing( TWEEN.Easing.Bounce.Out )
			.onComplete(() => this.unTouch())
			.start();
	}

	setHexBlocked() {
		//if (this.blockedAnima) return; 
		this.hexBlocked = true;
		this.hexAnimation = true;
		this.setDefaultColor();
		this.material.color.lerp(this.selectColor , 0.7);
		let tween = new TWEEN.Tween(this.position)
			.to( {y:10} , 500 )
			.easing( TWEEN.Easing.Elastic.Out )
			.onComplete(()=> this.hexAnimation = false)
			.start();
	}

	hexHover() {
		if(this.touchOnec || this.hexAnimation || this.hexBlocked) return		
		this.touchOnec = true;	
		this.hexAnimation = true;
		if (true) {
			this.setDefaultColor();
			this.material.color.lerp(this.touchColor ,0.2);
		}

		var tween = new TWEEN.Tween(this.position)
			.to( {y: -bounceValue} , 500 )
			.easing( TWEEN.Easing.Exponential.Out)
			.onComplete(()=>this.hexAnimation = false)
			.start();
	}

	restHexAnimation(){
		this.hexAnimation = false
	}

	onstartup() {
		//TODO
		//console.log("state-Start")
	}

	update(){
		return;
		//console.log("update");
		if (this.rayHit) {
			//this.hexHover();
			//console.log(this)
			//clearTimeout(this.timeOut);
		} else if (!this.hexAnimation){
			//this.setDefaultScale()
			//this.timeOut = setTimeout(() => this.setDefaultScale(), 500);
		}
		this.rayHit = false
	}
}

export default HexMesh;



// StateMachine.create({
//   target: HexMesh.prototype,
//   events: [
//     { name: 'startup', from: 'none',   to: 'green'  },
//     { name: 'warn',    from: 'green',  to: 'yellow' },
//     { name: 'panic',   from: 'yellow', to: 'red'    },
//     { name: 'calm',    from: 'red',    to: 'yellow' },
//     { name: 'clear',   from: 'yellow', to: 'green'  }
//   ]});