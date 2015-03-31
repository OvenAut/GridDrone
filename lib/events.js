



class Events {
	constructor() {
		this.camera = undefined;
		this.renderer = undefined;
		this.mouse = undefined;
		window.addEventListener('resize', this.onWindowResize.bind(this), false);
		document.addEventListener('mousemove', this.onDocumentMouseMove.bind(this), false);
		document.addEventListener('mousedown', this.onDocumentMouseDown.bind(this),false);
		document.addEventListener('mouseup', this.onDocumentMouseUp.bind(this),false);


	}
	init(camera,renderer,mouse){
		//console.log(camera);
		this.mouse = mouse;
		this.camera = camera;
		this.renderer = renderer;
		this.onWindowResize();
		
	}
	onWindowResize(event){
		//console.log(event);
		//console.log(this.camera);
		//var windowHalfX = window.innerWidth / 2;
        //var windowHalfY = window.innerHeight / 2;
		this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize( window.innerWidth, window.innerHeight );


	}
	onDocumentMouseMove(event){
		//console.log(event);
		this.mouse.setInBound();
		this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

	}
	onDocumentMouseDown(event){
		//console.log(event.button)
		if(event.button == 2) {
			this.mouse.RightButton = true;
		} 
		if(event.button == 0) {
			this.mouse.LeftButton = true;
		} 

	}
	onDocumentMouseUp(event){
		if(event.button == 2) {
			this.mouse.RightButton = false;
		}
		if(event.button == 0) {
			this.mouse.LeftButton = false;
		} 

	}
}


var events =  new Events()

export default events