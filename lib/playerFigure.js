import THREE from 'three'
import Clock from './clock'
import TWEEN from '../vendor/tween.min'
import TG from '../vendor/texgen.min';
import GameGlobals from './gameGlobals';

let randomColor =  () => Math.floor(Math.random()*16777215);
const MPi	= Math.PI/180, d = 350


			var texture = new TG.Texture( 256, 256 )
				.add( new TG.SinX().frequency( 0.01 ) )
				.mul( new TG.SinY().frequency( 0.004 ) )
				.mul( new TG.SinY().offset( 32 ).frequency( 0.02 ) )
				.div( new TG.SinX().frequency( 0.02 ) )
				.add( new TG.Noise().tint( 0.1, 0, 0.5 ) )
				//.add( new TG.Noise().tint( 0, 0.1, 0 ) )
				.add( new TG.Noise().tint( 1, 1, 1 ) )
				.toCanvas();

		var threeTexture = new THREE.Texture( texture )
		threeTexture.needsUpdate = true;

class PlayerFigure extends THREE.Mesh {
		constructor() {

			var geometry = new THREE.BoxGeometry( 50, 50, 50 );
			var material = new THREE.MeshBasicMaterial( { color: randomColor() , map: threeTexture } );


			super(geometry,material);


			this.width = GameGlobals.cellSize * 2;// * 0.95;
			this.height = Math.sqrt(3)/2 * this.width;
			this.cube = undefined;

		}

		hexToPixel(hex){
			//var x = 
		}

		init(){

		}

		placeAt(nr){
			//console.log("this.width = "+ this.width)
			//console.log("this.height = "+ this.height)
			
			this.cube = GameGlobals.getPlayerPosition(nr);
			this.position.x = this.cube.x * this.width * 0.75;
			this.position.z = (this.cube.z - this.cube.y) * this.height * 0.5;
			this.position.y = 25+15;
			//console.log(this.position,this.cube,this.width)

		}

		update(){

		}

}

export default PlayerFigure;
