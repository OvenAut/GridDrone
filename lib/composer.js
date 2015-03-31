import THREE from 'three'
import Tool from './tool';

//System.import('../js/postprocessing/ShaderPass')
//System.import('../js/postprocessing/EffectComposer')

import ShaderPass from '../js/postprocessing/ShaderPass';
import ShaderPass2 from '../js/postprocessing/EffectComposer';
import tmp3 from '../js/postprocessing/RenderPass';
import tmp from '../js/shaders/HorizontalBlurShader';
import tmp2 from '../js/shaders/VerticalBlurShader';
import tmp4 from '../js/shaders/VignetteShader';
//console.log(THREE.ShaderPass)

class Composer{

	constructor(renderer,scene,camera){
	//console.log(THREE)
		this.renderer = renderer;
		this.scene = scene;
		this.camera = camera;

	this.composer = new THREE.EffectComposer( this.renderer );
	this.composer.addPass( new THREE.RenderPass( this.scene, this.camera ) );

	var hblur = new THREE.ShaderPass( THREE.HorizontalBlurShader );
	//this.composer.addPass( hblur );
				
	var vblur = new THREE.ShaderPass( THREE.VerticalBlurShader );
	//vblur.renderToScreen = true;

	var vign = new THREE.ShaderPass( THREE.VignetteShader );
	vign.renderToScreen = true;


	this.composer.addPass( vign );


	}

	update(){
		return
		this.composer.render()
	}
}


export default Composer;
