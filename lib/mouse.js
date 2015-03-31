import THREE from 'three'

class Mouse extends THREE.Vector2 {

	constructor(x,y) {
		super(x,y)
		this.x = x || 0;
		this.y = y || 0;
		this.inBound = false;
		this.RightButton = false;
		this.LeftButton = false;
		
	}
	getInBound() {
		return this.inBound;
	}
	setInBound() {
		this.inBound = true;
		//this.inBound != this.inBound;
	}
}


var mouse = new Mouse(0,0);

export default mouse