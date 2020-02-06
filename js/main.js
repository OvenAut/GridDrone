import * as THREE from '../node_modules/three/build/three.module.js';
import Stats from '../node_modules/three/examples/jsm/libs/stats.module.js';
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';
import MshStdBox from './modules/mshStdBox.js';
import * as dat from '../node_modules/three/examples/jsm/libs/dat.gui.module.js';
import HexGrid from './modules/HexGrid.js';


var helper = {
    speed: 0.01,
    rotation: new THREE.Vector3(),
};

console.log(helper);
console.log(helper.rotation.x);

const gui = new dat.GUI();

gui.add(helper,'speed');
//gui.add(helper,'rotation.x');
//console.log(Stats);
const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);


var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.set( 0, 20, 35 );


var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


var ambient = new THREE.AmbientLight( 0xffffff, 0.5 );
scene.add( ambient );


var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
cube.castShadow = true;
cube.position.set(0,5,0);
scene.add( cube );



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
controls.target.copy( grid.group.position );
controls.update();


var animate = function () {
    
    stats.begin();
    cube.rotation.x += helper.speed;
    cube.rotation.y += helper.speed;
 //   mshStdBox.update();
    renderer.render( scene, camera );
    stats.end();
    requestAnimationFrame( animate );
};

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

animate();