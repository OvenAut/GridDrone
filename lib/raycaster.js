import THREE from 'three';
import Mouse from './mouse';


class RayCaster {
	constructor() {
		this.camera = undefined;
		this.rayCaster = new THREE.Raycaster();
		this.intersects = [];
		this.objects = [];
		this.near = 0.1;
		this.far = 1000;
		this.lastUuid = "";
	}

	init(objects,camera) {
		this.objects = objects;
		this.camera = camera;
	}

	alertIntersected(){
		//console.log(this.intersects[0].object.uuid,this.lastUuid);
		//if (this.lastUuid == this.intersects[0].object.uuid) return
		//this.lastUuid = this.intersects[0].object.uuid
		this.intersects[0].object.rayhit();		
		// for (var i = this.intersects.length - 1; i >= 0; i--) {
		// 	//console.log(this.intersects[i].object);

		// 	this.intersects[i].object.rayhit();
		// };
	}

	update(objects) {

		this.rayCaster.setFromCamera(Mouse, this.camera, this.near, this.far);
		this.intersects = this.rayCaster.intersectObjects(objects);
		if (this.intersects.length > 0)
			//console.log(Mouse.x,Mouse.y)
			this.alertIntersected()
	}
}

var raycaster = new RayCaster();

export default raycaster;