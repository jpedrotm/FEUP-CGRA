/**
 * MyInterface
 * @constructor
 */


function MyInterface() {
	//call CGFinterface constructor
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);

	// init GUI. For more information on the methods, check:
	//  http://workshop.chromeexperiments.com/examples/gui

	this.gui = new dat.GUI();

	/*lightsGroup.add(this.scene,'light1');
	lightsGroup.add(this.scene,'light2');
	lightsGroup.add(this.scene,'light3');*/

	// add a group of controls (and open/expand by defult)

	var lightsGroup=this.gui.addFolder("Lights");
	lightsGroup.open();

	// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
	// e.g. this.option1=true; this.option2=false;

	lightsGroup.add(this.scene, 'light1');
	lightsGroup.add(this.scene, 'light2');
	lightsGroup.add(this.scene, 'light3');
	lightsGroup.add(this.scene,'light4');

	this.gui.add(this.scene,'initClock');


	// add a slider
	// must be a numeric variable of the scene, initialized in scene.init e.g.
	// this.speed=3;
	// min and max values can be specified as parameters

	this.gui.add(this.scene, 'speed', 0.1, 2);

	//Opção de texturas----------------------------------------
	//var text= new droneTexture();
		/*var texturesGroup = this.gui.addFolder("Textures");
		texturesGroup.open();*/
		this.gui.add(this.scene.droneText,'texture',Object.keys(this.scene.droneAppearancesList));

	return true;
};

/**
 * @param event {Event}
 */

 MyInterface.prototype.processKeyUp = function(event) {
 	this.scene.drone.dontMove();
 }
MyInterface.prototype.processKeyDown = function(event) {
	// call CGFinterface default code (omit if you want to override)
	//CGFinterface.prototype.processKeyboardDown.call(this,event);

	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars

	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
	switch (event.keyCode)
	{
    case (65):	// A
  		this.scene.drone.moveLeft();
  		break;
  		case(68): // D
  		this.scene.drone.moveRight();
  		break;
  		case(87): // W
  		this.scene.drone.moveFront();
  		break;
  		case(83):// S
  		this.scene.drone.moveBack();
  		break;
  		case(73): //I
  		this.scene.drone.moveUp();
  		break;
  		case(74): //J
  		this.scene.drone.moveDown();
  		break;
		case(76):
		this.scene.drone.extendsCable();
		break;
		case(80):
		this.scene.drone.decreaseCable();
		break;

	};

};


//MyInterface.prototype.processKeyUP
