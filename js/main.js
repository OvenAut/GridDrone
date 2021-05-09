import * as THREE from './vendor/three.module.js';
import Stats from './vendor/stats.module.js';
import { OrbitControls } from './vendor/OrbitControls.js';
import * as dat from './vendor/dat.gui.module.js';
import HexGrid from './modules/HexGrid.js';
import SpotLight from './modules/SpotLight.js';
import MshStdBox from './modules/mshStdBox.js';
import Placed from './modules/Placed.js';

const pointer = new THREE.Vector2();
let INTERSECTED;
const HOVERMOUSCOLOR = 0x004422 ;
const HOVERMOUSCOLORNOT = 0x442222 ;
const SELECTEDFIELDCOLOR = 0x003322 ;
const HOVERSELECTEDMOUSCOLOR = 0x112299 ;

let COLOR = 0x000000
const CELLNAME_SINGEL = 'singel';
const CELLNAME_COUPLE = 'couple';
var mylatesttap;
var doubleTaped;

var helper = {
    speed: 0.001,
    placed: 0,
    couple: 0,
    energie:0,
    seed:12345,
};
//New comment
//console.log(helper)
var placed = new Placed();

// --------------------- GUI
const gui = new dat.GUI();
const guiEnergie = gui.add(helper,'energie')
const guiSeed = gui.add(helper,"seed")
const debugFolder = gui.addFolder("Debug")
const guiSpeed = debugFolder.add(helper,'speed');
const guiPlaced = debugFolder.add(helper,'placed');
const guiCouple = debugFolder.add(helper,'couple');
debugFolder.close()




//gui.add(helper,'rotation.x');

const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

var scene = new THREE.Scene();
scene.background = new THREE.Color( 0x00131c );
scene.fog = new THREE.FogExp2( 0x00131c, 0.025 );

let raycaster = new THREE.Raycaster();
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 100 );
camera.position.set( 0, 30, 30 );

var renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
// todo - support pixelRatio in this demo
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

scene.add( new SpotLight(0xddffdd, 0.6, 100) );


var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { 
    color: 0x009900,
    polygonOffset: true,
    polygonOffsetFactor: 1, // positive value pushes polygon further away
    polygonOffsetUnits: 1
} );
var cube = new THREE.Mesh( geometry, material );

cube.castShadow = true;
cube.position.set(0,5,0);
scene.add( cube );

// wireframe
var geo = new THREE.EdgesGeometry( cube.geometry ); // or WireframeGeometry
var mat = new THREE.LineBasicMaterial( { color: 0xffffff } );
var wireframe = new THREE.LineSegments( geo, mat );
cube.add( wireframe );


function setCube(position, color){

    const geometry = new THREE.ConeGeometry( 1.8, 1, 6 );
    const object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: color } ) );
    object.position.copy(position).add(new THREE.Vector3(0,0.5,0));
    //console.log(object.position)
    object.rotateY(10)
    scene.add( object );
    return object.uuid;
    
}

var gridConfig = {
    size: 5,
    cellSize: 2,
    cellScale: 0.95,
    seed: helper.seed
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
controls.maxPolarAngle = 1.3;
//controls.mouseButtons = {
//	LEFT: THREE.MOUSE.ROTATE,
//	MIDDLE: THREE.MOUSE.DOLLY,
//	RIGHT: THREE.MOUSE.ROTATE
//}

function SetInterselectedColor(color){
    INTERSECTED.material.emissive.setHex( color );
}


var animate = function () {
    stats.begin();
    cube.rotation.x += helper.speed;
    cube.rotation.y += helper.speed;
    //cube2.update(helper.speed);

    raycaster.setFromCamera( pointer, camera );

    const intersects = raycaster.intersectObjects( grid.group.children );

    if ( intersects.length > 0){
        if ( INTERSECTED != intersects[ 0 ].object ) {

            if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

            INTERSECTED = intersects[ 0 ].object;
            
            INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
            
            COLOR = INTERSECTED.getChildUuid() === null? HOVERMOUSCOLORNOT : HOVERSELECTEDMOUSCOLOR;
            //console.log(placed.getStackLength()==0)

            if ((hasNeighbors(INTERSECTED.cell) || placed.getStackLength() == 0) && !INTERSECTED.getChildUuid()){
               // console.log("he")
                COLOR = HOVERMOUSCOLOR
            }
            //console.log(COLOR)
            SetInterselectedColor(COLOR)
            //INTERSECTED.material.emissive.setHex( color );
            //console.log(INTERSECTED.cell)
        }
    } else {
        if ( INTERSECTED)
        SetInterselectedColor( INTERSECTED.currentHex)
        //INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
        INTERSECTED = null;
    }


    renderer.render( scene, camera );
    controls.update();
//    console.log(controls.getPolarAngle())
    stats.end();
    requestAnimationFrame( animate );
};

window.addEventListener( 'resize', onWindowResize, false );
document.addEventListener( 'pointermove', onPointerMove );
document.addEventListener('pointerdown',onMouseClick)
document.addEventListener('dblclick',onMouseClick)

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function onPointerMove( event ) {

    pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

function onMouseClick(event){
    //console.log(placed.getStackLength())
    //console.log(hasNeighbors(INTERSECTED.cell))
    //console.log(INTERSECTED.getChildUuid())
    if (!INTERSECTED || (!(placed.getStackLength() == 0) && !hasNeighbors(INTERSECTED.cell) && (INTERSECTED.getChildUuid() == null))) return
    //console.log("hello")
    if ( INTERSECTED.hasOwnProperty('echo') && (event.button == 2 || event.type == "dblclick" || doupletap(event.pointerType)) ) {
        //console.log(INTERSECTED.id)   
        //INTERSECTED.echo()
        //console.log(INTERSECTED.material.color)
        var color =INTERSECTED.currentHex
        const uuid =  INTERSECTED.getChildUuid();
        if (uuid === null && (placed.getStackLength() == 0 || hasNeighbors(INTERSECTED.cell))) {
            
            
            INTERSECTED.setChildUuid(setCube(INTERSECTED.position,INTERSECTED.material.color))
            //INTERSECTED.currentHex = SELECTEDFIELDCOLOR  
            //uuid = INTERSECTED.getChildUuid()
            placed.addTile(INTERSECTED.uuid,INTERSECTED.cell,INTERSECTED.energie)
            const currentColor = hasNeighbors(INTERSECTED.cell)

            
            INTERSECTED.currentHex = currentColor ? callCOUPLECOLOR(currentColor):SELECTEDFIELDCOLOR
            color = HOVERSELECTEDMOUSCOLOR;
            
        } else 
        {
            //console.log(placed.stack.indexOf(uuid))
            
            
            DeleteObjectUUID(INTERSECTED.uuid)
            INTERSECTED.currentHex = 0x000000
            //placed.decCounter()
            color = HOVERMOUSCOLOR
            //console.log(placed.stack.indexOf(INTERSECTED.getChildUuid()))

            
        
        }
        //console.log(color)
        //ChangeTileColor(color)
        updateNeighbors()
        INTERSECTED.material.emissive.setHex( color );
        guiPlaced.setValue(placed.getCounter());


    
      //  placed.getTiles((stack)=>{
      //      console.log(stack) 
      //  })
    }
}

function doupletap(eventType){
    var doubleTap = false 
    //console.log(eventType)
    if(eventType =='touch') {
   
      var now = new Date().getTime();
      var timesince = now - mylatesttap;
     // console.log(timesince)
       if((timesince < 600) && (timesince > 0) && !doubleTaped){

    // double tap   
       doubleTap = true
       doubleTaped = true
       }

       if(timesince > 600)
       doubleTaped = false


       mylatesttap = new Date().getTime();  
    }
   return doubleTap
}

function DeleteObjectUUID (uuid){

    //console.log(scene)

    const object = GetUuIDObject(uuid)
    //console.log(object)
    //console.log(object.getChildUuid())
    const objectMesh = GetUuIDObject(object.getChildUuid())
    scene.remove( objectMesh );
    INTERSECTED.setChildUuid(null)
    placed.clearTile(uuid)
//    placed.getTiles(elements=>{
//        console.log(elements)
//    })
    
}


function hasNeighbors(cell){
    var fields = [];
    var _hasNeigbo = 0
    var cellobjects
    var countNeighbors = 0
    fields = placed.MapVec(cell)
    //console.log(fields)


    fields.forEach(vm =>{
     //   console.log(vm)
     
        cellobjects = placed.getUuid(vm)
        //console.log(cellobjects)
        if (cellobjects){
            countNeighbors++
            _hasNeigbo = countNeighbors
            //console.log("found")
            return
        }
        
    })

    
    
    //console.log(cellobjects)
    //OldFields.map(element => )
    return _hasNeigbo
}

function updateNeighbors(){
    var color 
    var couple = 0
    //const object = GetUuIDObject(uuid)
    //var GridChildrens = scene.getObjectByProperty('name','GridObject')

    //var PlacedCell = GridChildrens.children.filter(cell => cell.getChildUuid())

    var PlacedCell = placed.getStack();
    //console.log(PlacedCell)
    var totalNeigborns = 0
    var totalEnegie = 0
    PlacedCell.forEach(element => {
        var nrNeighbors = hasNeighbors(element.cell)
        if(nrNeighbors){
            totalNeigborns = totalNeigborns + nrNeighbors
            totalEnegie = totalEnegie + element.energie
    
            //            console.log(callCOUPLECOLOR(nrNeighbors))
            color = callCOUPLECOLOR(nrNeighbors)
        couple++
        
        
        //console.log(couple)
            
        } else {
            color = SELECTEDFIELDCOLOR
        }
        changeHexColor(element.uuid,color)

    })
   // console.log(totalEnegie*totalNeigborns)
    guiEnergie.setValue(totalEnegie*totalNeigborns);

    guiCouple.setValue(couple);
    
    var newSpeed = 0.001 + ( 0.0001 *(totalEnegie*totalNeigborns * 0.0002)) 
    
    guiSpeed.setValue(newSpeed)

    return

}

function callCOUPLECOLOR(nummber){
    var _nummber = Math.floor(nummber * 42.5) 
// 0xFFAA22
    if (_nummber <0) {
        _nummber = 0xFFFFFF + _nummber + 1
    }
    const hex = "0x" + ("00" + _nummber.toString(16).toUpperCase()).substr(-8) + "00";

    return hex
}


function changeHexColor(uuid,color){
    var cellCopple = scene.getObjectByProperty('uuid',uuid)
    //console.log(cellCopple)
        cellCopple.material.emissive.setHex( color );

}

function GetUuIDObject(uuid){
    return  scene.getObjectByProperty('uuid', uuid)
}


animate();