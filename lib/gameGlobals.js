import THREE from 'three'
import Tool from './tool'



var randomSix = function(){
	return Math.random()*5
}

class GameGlobals {
	constructor(size){
		this.size = 0;
		this.cellSize = 0;
		this.cellScale = 0.0;

		
		//console.log(Tool.randomInt(1,6))
		// 1  x=1  y=0  z=0
		// 2  x=0  y=-1 z=0
		// 3  x=0  y=0  z=1
		// 4  x=-1 y=0  z=0
		// 5  x=0  y=1  z=0
		// 6  x=0  y=0  z=-1

		this.GridSides = [{x:1, y:0, z:-1},
						{x:1, y:-1, z:0},
						{x:0, y:-1, z:1},
						{x:-1, y:0, z:1},
						{x:-1, y:1, z:0},
						{x:0, y:1, z:-1}
						];


		//				Neighbors
		this.GridSides2Neighbors = [
						{x:0, y:-1, z:1},
						{x:-1, y:0, z:1},
						{x:-1, y:1, z:0},
						{x:0, y:1, z:-1},
						{x:1, y:0, z:-1},
						{x:1, y:-1, z:0}
						];

		this.PlayerRnd = Tool.randomInt(0,5);

		//var rndNum = Tool.randomInt(0,5)
		//this.PlayerSide = this.getPlayerSide(rndNum);

		//console.log(this.PlayerSide) 



	}

	getPlayerSide() {
		var rndNum = this.PlayerRnd;
		//console.log(rndNum)
		//console.log(this.size)
		//console.log(this.GridSides)
		var x = this.GridSides[rndNum].x * this.size;
		var y = this.GridSides[rndNum].y * this.size;
		var z = this.GridSides[rndNum].z * this.size;

		return {x,y,z}
	}

	getPlayerPosition(nr){
		var rndNum = this.PlayerRnd;
		nr++
		var x = (this.GridSides[rndNum].x * this.size + (this.GridSides2Neighbors[rndNum].x * nr))
		var y = (this.GridSides[rndNum].y * this.size + (this.GridSides2Neighbors[rndNum].y * nr))
		var z = (this.GridSides[rndNum].z * this.size + (this.GridSides2Neighbors[rndNum].z * nr))
		return {x, y, z};
	}


	getGridConfig(){
		var gridConfig = {
			size: this.size,
			cellSize: this.cellSize,
			cellScale: this.cellScale,
		};
		return gridConfig;
	}

	setGridConfig(gridConfig){
			this.size = gridConfig.size;
			this.cellSize = gridConfig.cellSize;
			this.cellScale = gridConfig.cellScale;
	}

}

var gameGlobals = new GameGlobals()

export default gameGlobals;