import THREE from 'three'
import Clock from './clock'
import TWEEN from '../vendor/tween.min'
import TG from '../vendor/texgen.min';

let randomColor =  () => Math.floor(Math.random()*16777215);
const MPi	= Math.PI/180, d = 350


			var texture = new TG.Texture( 256, 256 )
				.add( new TG.SinX().frequency( 0.004 ) )
				.mul( new TG.SinY().frequency( 0.004 ) )
				.mul( new TG.SinY().offset( 32 ).frequency( 0.02 ) )
				.div( new TG.SinX().frequency( 0.02 ) )
				.add( new TG.Noise().tint( 0.1, 0, 0 ) )
				//.add( new TG.Noise().tint( 0, 0.1, 0 ) )
				.add( new TG.Noise().tint( 1, 1, 1 ) )
				.toCanvas();

		var threeTexture = new THREE.Texture( texture )
		threeTexture.needsUpdate = true;

class Box extends THREE.Mesh {

	constructor() {

		var geometry = new THREE.BoxGeometry( 50, 50, 50 );
		var material = new THREE.MeshBasicMaterial( { color: randomColor() , map: threeTexture } );


		super(geometry,material);

		//this.geometry = new THREE.BoxGeometry( 50, 50, 50 );
		//this.material = new THREE.MeshBasicMaterial( { color: randomColor() , map: threeTexture } );
		//console.log(index);
		//this.cube = undefined;
	//var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	//var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	//this.cube = new THREE.Mesh( geometry, material );
		//this.index = index;
		//this.newColor = new THREE.Color( randomColor() );
		//this.defaultColor = this.material.color;
		//this.timer = undefined;
		this.teil = 0;
		//console.log(this.geometry);
		//var depth = this.geometry.parameters.depth;
		//var height = this.geometry.parameters.height;
		//var width = this.geometry.parameters.width;
		//this.tweenActiv = false;
		//this.tween = new TWEEN.Tween({scale: -1});
		//this.geometry.elementsNeedUpdate = true;

	}

	init(max,i) {

		//var j = i+1;
		this.teil = (360/max)*i+1;
		this.position.y = 200;
		
	}

	addNewColor(color) {
		//var colorS = new;
		console.log(color);
		//this.material.color = color ;//new THREE.Color(randomizeRGB('100, 100, 100', 50));
	}

	update() {
		//console.log(time);
		//console.log("counter" + this.boxIndex);
		//return
		//let time = Date.now() * 0.001;
		let time = Clock.getTime() * 0.001;

		this.rotation.x += Math.random() * 0.1;
		this.rotation.y += 0.1;
		this.position.z = Math.sin(MPi * this.teil+time) * d;
		this.position.x = Math.cos(MPi * this.teil+time) * d; 
	}

	rayhit() {
		//this.changeColor();
	}

	changeColor() {
		//clearTimeout(this.time);
		//console.log(this.newColor);
		//console.log(this.material.color);
		this.material.color = this.newColor;
		var cssColor = this.newColor.getHex();
		var cssColor2 = this.defaultColor.getHex()
		var that = this;
		//console.log(cssColor);
		//console.log(this.tween);
		//this.scale.x = 2.5;
		if (this.tweenActiv) return;
		//this.tween.stop();
		var tween = new TWEEN.Tween({
				scale: 0.5
			}).to( {
				scale: 1} , 1000 )
			.easing( TWEEN.Easing.Elastic.InOut )
			//.repeat( 1 )
			//.yoyo()
			.onStart(function(){
				that.tweenActiv = true;
			})
			.onUpdate( function () {
				//con
				//console.log(this)
				that.scale.x = this.scale;
				that.scale.y = this.scale;
				that.scale.z = this.scale;
				
				//console.log(cssColor);
				//this.x ;
				//this.y ;
				//output.style.webkitTransform = transform;
				//output.style.transform = transform;
				//that.material.color.setHSL(this);
			} ).onComplete(function() {
				that.setDefaultColor();
				that.tweenActiv = false;
			});
		//this.tween.delay(1000);
		tween.start();
		//this.time = setTimeout(() => this.setDefaultColor(), 1000);
	}

	setDefaultColor() {
		//console.log("na");
		this.material.color = this.defaultColor;
	}

}

export default Box;