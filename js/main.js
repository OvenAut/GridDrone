import * as THREE from '../node_modules/three/build/three.module.js';
import Stats from '../node_modules/three/examples/jsm/libs/stats.module.js';
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';
//import MshStdBox from './modules/mshStdBox.js';
import * as dat from '../node_modules/three/examples/jsm/libs/dat.gui.module.js';
import HexGrid from './modules/HexGrid.js';
//import { FXAAShader } from '../node_modules/three/examples/jsm/shaders/FXAAShader.js';
//import { EffectComposer } from '../node_modules/three/examples/jsm/postprocessing/EffectComposer.js';
//import { ShaderPass } from '../node_modules/three/examples/jsm/postprocessing/ShaderPass.js';




var helper = {
    speed: 0.01,
    rotation: new THREE.Vector3(),
};


const gui = new dat.GUI();

gui.add(helper,'speed');
const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);


var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 100 );
camera.position.set( 0, 30, 30 );


var renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
// todo - support pixelRatio in this demo
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//composer = new EffectComposer( renderer );


var light = new THREE.DirectionalLight( 0xddffdd, 0.6 );
light.position.set( 1, 1, 1 );

light.castShadow = true;

light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;

var d = 10;

light.shadow.camera.left = - d;
light.shadow.camera.right = d;
light.shadow.camera.top = d;
light.shadow.camera.bottom = - d;

light.shadow.camera.far = 1000;

scene.add( light );




//var ambient = new THREE.AmbientLight( 0xffffff, 0.5 );
//scene.add( ambient );


var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
cube.castShadow = true;
cube.position.set(0,5,0);
scene.add( cube );



//77haha

//var matStdObjects = new THREE.MeshStandardMaterial( { color: 0xA00000, roughness: 0, metalness: 0 } );
//var geoBox = new THREE.BoxBufferGeometry( Math.PI, Math.sqrt( 2 ), Math.E );
//var mshStdBox = new MshStdBox();
//mshStdBox.position.set( 0, 5, 0 );
//mshStdBox.rotation.set( 0, Math.PI / 2.0, 0 );
//mshStdBox.castShadow = true;
//mshStdBox.receiveShadow = true;


//scene.add( mshStdBox );

//mshStdBox.update = function(){
    //console.log(this);
//    this.rotation.y += 0.01;
//}


var gridConfig = {
    size: 5,
    cellSize: 2,
    cellScale: 0.95,
    //selectColor: selectColor,
    //guiSelectColor: selectColor.getStyle(),
    //group: this.group
    //RayGroup: this.RayGroup
};



let grid = new HexGrid(gridConfig);
scene.add(grid.group);


var controls = new OrbitControls( camera, renderer.domElement );
controls.minDistance = 5;
controls.maxDistance = 30;
controls.enablePan = false;
controls.enableDamping = true;
controls.dampingFactor = 0.05;

controls.target.copy( grid.group.position );


//effectFXAA = new ShaderPass( FXAAShader );
//effectFXAA.uniforms[ 'resolution' ].value.set( 1 / window.innerWidth, 1 / window.innerHeight );
//composer.addPass( effectFXAA );


var animate = function () {
    
    stats.begin();
    cube.rotation.x += helper.speed;
    cube.rotation.y += helper.speed;
 //   mshStdBox.update();
    renderer.render( scene, camera );
    controls.update();

 //   composer.render();
    stats.end();
    requestAnimationFrame( animate );
};

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
//    effectFXAA.uniforms[ 'resolution' ].value.set( 1 / window.innerWidth, 1 / window.innerHeight );

}

animate();