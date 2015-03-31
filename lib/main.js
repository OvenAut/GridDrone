import ThreeApp from './threeApp';
import StatsApp from './statsApp';
import TWEEN from '../vendor/tween.min';
import Detector from '../vendor/Detector';
import Tool from './tool';


if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

Tool.text("Init");

var render = function (time) {
	requestAnimationFrame( render )
	//console.log(time);
	ThreeApp.render();
	StatsApp.update();
	TWEEN.update( time );
};


ThreeApp.load(() => {
	render();

});
StatsApp.load();

//render();
