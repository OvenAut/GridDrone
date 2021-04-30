import * as THREE from '../node_modules/three/build/three.module.js';
import Stats from '../node_modules/three/examples/jsm/libs/stats.module.js';
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';
import * as dat from '../node_modules/three/examples/jsm/libs/dat.gui.module.js';
import HexGrid from './modules/HexGrid.js';
import SpotLight from './modules/SpotLight.js';
import MshStdBox from './modules/mshStdBox.js';
import Placed from './modules/Placed.js';

const pointer = new THREE.Vector2();
let INTERSECTED;
const HOVERMOUSCOLOR = 0x0000aa ;
const SELECTEDFIELDCOLOR = 0x00ff00 ;
const HOVERSELECTEDMOUSCOLOR = 0xaa2222 ;
const COUPLECOLOR = 0xFFAA22 ;

let COLOR = 0x000000
const CELLNAME_SINGEL = 'singel';
const CELLNAME_COUPLE = 'couple';
var OldFields=[]

var helper = {
    speed: 0.01,
    placed: 0,
    couple: 0
};
//New comment
//console.log(helper)
const gui = new dat.GUI();

var placed = new Placed();

gui.add(helper,'speed');
var guiPlaced = gui.add(helper,'placed');
var guiCouple = gui.add(helper,'couple');


//gui.add(helper,'rotation.x');

const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

var scene = new THREE.Scene();
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
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
cube.castShadow = true;
cube.position.set(0,5,0);
scene.add( cube );


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
    cellScale: 0.95
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
            
            COLOR = INTERSECTED.getChildUuid() === null? HOVERMOUSCOLOR : HOVERSELECTEDMOUSCOLOR;
            SetInterselectedColor(COLOR)
            //INTERSECTED.material.emissive.setHex( color );

        }
    } else {
        if ( INTERSECTED)
        SetInterselectedColor( INTERSECTED.currentHex)
        //INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
        INTERSECTED = null;
    }


    renderer.render( scene, camera );
    controls.update();
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
    
    if (!INTERSECTED) return
    if ( INTERSECTED.hasOwnProperty('echo') && (event.button == 2 || event.type == "dblclick")) {
        //console.log(INTERSECTED.id)   
        //INTERSECTED.echo()
        //console.log(INTERSECTED.material.color)
        var color
        const uuid =  INTERSECTED.getChildUuid();
        if (uuid === null) {
            INTERSECTED.setChildUuid(setCube(INTERSECTED.position,INTERSECTED.material.color))
            //INTERSECTED.currentHex = SELECTEDFIELDCOLOR  
            color = HOVERSELECTEDMOUSCOLOR;
            console.log(hasNeighbors(INTERSECTED.cell))
            INTERSECTED.currentHex = hasNeighbors(INTERSECTED.cell) ? COUPLECOLOR:SELECTEDFIELDCOLOR
            //console.log(guiPlaced.getValue())
            //guiPlaced.setValue()
            //console.log(INTERSECTED.)
            placed.addTile(INTERSECTED.uuid)
            //placed.addCounter()
            //placed.stack.push(INTERSECTED.getChildUuid())
            //console.log(placed.stack.indexOf(uuid))
            
           // console.log(placed.stack)   
        } else {
            //console.log(placed.stack.indexOf(uuid))
            
            
            DeleteObjectUUID(INTERSECTED.getChildUuid())
            INTERSECTED.currentHex = 0x000000
            //placed.decCounter()
            color = HOVERMOUSCOLOR
            //console.log(placed.stack.indexOf(INTERSECTED.getChildUuid()))

            
            //console.log(placed)
        }
        //ChangeTileColor(color)
        updateNeighbors()
        INTERSECTED.material.emissive.setHex( color );
        guiPlaced.setValue(placed.getCounter());


    
      //  placed.getTiles((stack)=>{
      //      console.log(stack) 
      //  })
    }
}


function DeleteObjectUUID (uuid){
    const object = GetUuIDObject(uuid)
    scene.remove( object );
    INTERSECTED.setChildUuid(null)
    placed.clearTile(uuid)
    
}


function hasNeighbors(cell){
    var fields = [];
    var _hasNeigbo = false
    var cellobjects
    fields = placed.MapVec(cell)
    //console.log(fields)


    fields.forEach(vm =>{
     //   console.log(vm)
        cellobjects = GetObjectByCell(vm)
        console.log(cellobjects.length)
        if (!cellobjects.length == 0)
        _hasNeigbo = true
        
    })
    //console.log(cellobjects)
    //OldFields.map(element => )
    return _hasNeigbo
}

function updateNeighbors(){
    //const object = GetUuIDObject(uuid)
    var GridChildrens = scene.getObjectByProperty('name','GridObject')

    var PlacedCell = GridChildrens.children.filter(cell => cell.getChildUuid())
    //console.log(PlacedCell)
    var fields = [];

    //Plazierte Felder Speichern
    PlacedCell.forEach(element => {
        
        
        
        fields = fields.concat(placed.MapVec(element.cell)) 
        
    });

    //console.log(PlacedCell)
   
    var MapUUI = []
    PlacedCell.forEach(element => {
        
        fields.forEach(vm => {
            //console.log(element.cell)
            //console.log(vm)
            var cell = element.matchCellVec(vm)
            if (cell) {
            if(!MapUUI.includes(cell))
                MapUUI.push(cell)
            
            }
        })
            //console.log(element.length)
        
    });
    
    guiCouple.setValue(MapUUI.length);

    // SUCHEN Nach alten Feldern
    //console.log(OldFields)
    //console.log(MapUUI)

    let difference = OldFields.filter(x => !MapUUI.includes(x));
    //console.log(difference)
    difference.forEach(element=>{
        changeHexColor(element,SELECTEDFIELDCOLOR)
    })
    
    
    //OldFields.forEach(element =>{
    //    console.log(element)
        

    //    if (MapUUI.includes(element)){
    //        console.log(OldFields.indexOf(element))
    //        OldFields.splice(OldFields.indexOf(element),1)
    //    }
            
    //})
    //console.log(OldFields.length + ' Len')

 //   console.log(MapUUI)
    


    MapUUI.forEach(element =>{
       // var cellCopple = scene.getObjectByProperty('uuid',element)
        //console.log(cellCopple)
       //     cellCopple.material.emissive.setHex( COUPLECOLOR );
            changeHexColor(element,COUPLECOLOR)
    })
    //console.log(MapUUI)




    //  .material.emissive.setHex( color );


   // placed.getTiles((stack)=>{
   //     console.log(stack) 
   // })
    //GridChildrens.children.forEach(gridObject => {
//    var temp = gridObject.getIdFromVec()
//    console.log(temp)
//});
OldFields = MapUUI;
}


function changeHexColor(uuid,color){
    var cellCopple = scene.getObjectByProperty('uuid',uuid)
    //console.log(cellCopple)
        cellCopple.material.emissive.setHex( color );

}

function GetUuIDObject(uuid){
    return  scene.getObjectByProperty('uuid', uuid)
}

function GetObjectByCell(cell){
    var fieldList = []
    //console.log(OldFields.length)
    placed.getTiles(elements =>{
        if (!elements.length == 0) {
            //console.log(elements)
            elements.forEach(element => {
        
            let  fieldObject = scene.getObjectByProperty('uuid', element)

                if (fieldObject.cell.equals(cell))
                fieldList = fieldList.concat(fieldObject)
            });
        
            //console.log(fieldList)
        }
       
    } )

   // OldFields.forEach(element=>{
   //     console.log(element)
   //console.log(fieldList)
   // })
   if (fieldList.length == 0)
   return false
   else
   return fieldList
}
//var GridChildrens = scene.getObjectByProperty('name','GridObject')
//console.log(scene)
//console.log(GridChildrens.children)

//GridChildrens.children.forEach(gridObject => {
//    var temp = gridObject.getIdFromVec()
//    console.log(temp)
//});
animate();