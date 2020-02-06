/*
	Handles grid cell management (placement math for eg pathfinding, range-finding, etc), exposes generalized interface.
	
	http://www.redblobgames.com/grids/hexagons/
	Cube and axial coordinate systems
 */
import * as THREE from '/node_modules/three/build/three.module.js';
import Hex from './hex.js';
import Tool from './tool.js';


var cellScale,cellSize = null;

class HexGrid {
	constructor(config) {
		var x, y, z, c;
		if (!config)
			config = {};
		// number of cells (in radius)
		var size = config.size || 3;
		cellSize = config.cellSize || 50;
		cellScale = config.cellScale || 1;
		//this.type = config.type || Hex.FLAT;
		//this.rotationIncrement = Hex.POINTY;
		// holds the grid position of each cell, to which our meshes are attached to in the Board entity
		this.cells = [];
		// holds the mesh data that is displayed
		//this.meshes = null;
		// the grid holds its own Group to manipulate and make it easy to add/remove from the scene
		this.group = new THREE.Group();
		this.FLAT = 0;
		this.POINTY = 30 * 0.0174532925;
		//this.RayGroup = config.RayGroup || [];
		//this.selectColor = config.selectColor;
		// construct a hex-shaped grid
		for (x = -size; x < size + 1; x++) {
			for (y = -size; y < size + 1; y++) {
				z = -x - y;
				if (Math.abs(x) <= size && Math.abs(y) <= size && Math.abs(z) <= size) {
					c = new THREE.Vector3(x, y, z);
					//c.w = null; // for storing which hex is representing this cell
					this.cells.push(c);
				}
			}
		}
		this.buildMesh(config.color);
	}
	createVert(type, size, i) {
        var angle = ((2 * Math.PI) / 6) * i;
        angle += type; // 0 if flat-topped, or 30deg if pointy
        return new THREE.Vector3((size * Math.cos(angle)), (size * Math.sin(angle)), 0);
    };

	buildMesh(color) {
		var i, hex, cell;
		var verts = [];
		// create the skeleton of the hex
		for (i = 0; i < 6; i++) {
			verts.push(this.createVert(this.FLAT, cellSize, i));
		}
		// copy the verts into a shape for the geometry to use
		var hexShape = new THREE.Shape();
		hexShape.moveTo(verts[0].x, verts[0].y);
		for (i = 1; i < 6; i++) {
			hexShape.lineTo(verts[i].x, verts[i].y);
		}
		hexShape.lineTo(verts[0].x, verts[0].y);
		
		//this.hexGeo = new THREE.ShapeGeometry(this.hexShape);
		var hexGeo = new THREE.ExtrudeGeometry(hexShape, {
			depth: 0.1,
			bevelEnabled: true,
			bevelSegments: 1,
			steps: 2,
			bevelSize: 0.1,
			bevelThickness: 0.1
		});
		
		// create Hex instances and place them on the grid, and add them to the group for easy management
		for (i = 0; i < this.cells.length; i++) {
			hex = new Hex(	cellSize,
							cellScale,
							hexGeo,
							color || Tool.randomizeRGB('000, 100, 200', 200),
							this.cells[i]);
			//cell = this.cells[i];
			//cell.w = hex;
			//console.log(hex.mesh.uuid);
			hex.placeAt(this.cells[i]);
			
			//this.meshes.push(hex);
			//this.RayGroup.push(hex.mesh);
			this.group.add(hex.mesh);
		}
		// rotate the group depending on the shape the grid is in
		//this.group.rotation.y = this.type - (30 * 0.0174532925);
		
		//return this.meshes;
	}
}

export default HexGrid;