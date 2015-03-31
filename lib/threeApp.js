import THREE from 'three'
import Box from './box';
import Clock from './clock';
import Events from './events';
import Mouse from './mouse';
import RayCaster from './raycaster';
import OrbitControls from '../vendor/OrbitControls';
import HexGrid from './HexGrid';
//import cubeCamera from './cubeCamera';
//import TG from '../vendor/texgen.min';
import Tool from './tool';
//import Composer from './composer';

var clearColor = 0x333333;

class	ThreeApp {
	constructor() {
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 5000 );
		this.group = new THREE.Group();
		//this.RayGroup = [];
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setClearColor( clearColor );
		document.body.appendChild( this.renderer.domElement );
		

		Tool.text("construction");
		//Tool.setCamera(this.camera);
		//Tool.setScene(this.scene);

		var light = new THREE.DirectionalLight(0xffffff);
		light.position.set(0, 1, 1).normalize();
		light.lookAt(this.scene.position);
		this.scene.add(light);

		//var lightAm = new THREE.AmbientLight( 0x333333 ); // soft white light
		//this.scene.add( lightAm );
		//this.composer = new Composer(this.renderer,this.scene,this.camera)
		//this.cube = undefined;

		this.cubes = new Array(1);

		Events.init(this.camera,this.renderer,Mouse);
	}

	load(callback) {

		Tool.text("load");


		//this.group.name = "Hello";
		//var selectColor = new THREE.Color( 0x3a9645 ); 
		var gridConfig = {
			size: 10,
			cellSize: 40,
			cellScale: 0.95,
			//selectColor: selectColor,
			//guiSelectColor: selectColor.getStyle(),
			//group: this.group
			//RayGroup: this.RayGroup
		};


		let grid = new HexGrid(gridConfig);
		this.scene.add(grid.group);
		this.group = grid.group;

		//console.log(grid)
		//let randomColor =  () => Math.floor(Math.random()*(16777215)*0.001);
		var controls = new THREE.OrbitControls( this.camera );
		controls.damping = 0.2;


		for (var i = this.cubes.length - 1; i >= 0; i--) {
			this.cubes[i] = new Box();
			this.cubes[i].init(this.cubes.length,i);
			this.scene.add(this.cubes[i]);	
		};

		RayCaster.init(grid.group.children, this.camera);
		this.camera.position.copy(new THREE.Vector3(0,500,-500));
		this.camera.lookAt(this.scene.position)
		Tool.text("Grid !") ;
		//cubeCamera.position.copy( this.group.position );
		//this.scene.add(cubeCamera);
		callback();


	}

	render() {
		if (Mouse.inBound) RayCaster.update();
		this.cubes.forEach(function(element){
			element.update();
		})
		// this.group.children.forEach(function(element){
		// 	element.update();
		// })

		//this.group.visible = false;
		//cubeCamera.updateCubeMap( this.renderer, this.scene );
		//this.group.visible = true;
		this.renderer.render( this.scene, this.camera );
		//this.composer.update()
	}
}

export default new ThreeApp()