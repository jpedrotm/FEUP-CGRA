var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 100;
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.initCameras();

	this.initLights();

	this.enableTextures(true);

	this.light1=true;
	this.light2=true;
	this.light3=true;
	this.light4=true;
	this.iClock=true;
	this.speed=1;


	//4.4 Texturas---------------------
	this.droneAppearances = new Array();
	this.droneAppearancesList=new Array();
	this.currDroneAppearance=0;

	this.droneAppearancesList["Cubes"]=0;

	//---------------------------------
	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	// Scene elements----------------------------------------------------------------------------------
	this.table = new MyTable(this);
	this.wall = new MyQuad(this,-0.5, 1.5, -0.5, 1.5);
	this.floor = new MyQuad(this,0,10,0,12);
	this.collum1 = new MyCylinder(this,10,8);
	this.collum2= new MyCylinder(this,10,8);
	this.boardA = new Plane(this, BOARD_A_DIVISIONS,0,0,1,1);
	this.boardB = new Plane(this, BOARD_B_DIVISIONS,-0.5,0,1.5,1);
	this.clock=new MyClock(this,12,1);
	this.lamp1=new MyLamp(this,12,8);
	this.drone=new MyDrone(this,6,4,6);

	this.charge=new MyCharge(this,4,0.5,3,1);
	this.target = new MyTarget(this,10,10,10,0,4);
	// Materials----------------------------------------------------------------------------------------
	this.materialDefault = new CGFappearance(this);

	this.materialA = new CGFappearance(this);
	this.materialA.setAmbient(0.3,0.3,0.3,1);
	this.materialA.setDiffuse(0.6,0.6,0.6,1);
	this.materialA.setSpecular(0,0.2,0.8,1);
	this.materialA.setShininess(120);

	this.materialB = new CGFappearance(this);
	this.materialB.setAmbient(0.3,0.3,0.3,1);
	this.materialB.setDiffuse(0.75,0.75,0.75,1);
	this.materialB.setSpecular(0.75,0.75,0.75,1);
	this.materialB.setShininess(100);

	//Material chao e paredes--------------------------------------------------------------------
	this.materialE = new CGFappearance(this);
	this.materialE.setAmbient(0.3,0.3,0.3,1);
	this.materialE.setDiffuse(0.6,0.6,0.6,1);
	this.materialE.setSpecular(0.8,0.8,0.8,1);
	this.materialE.setShininess(120);

	//Chao com textura---------------------------------------------------------------------------
	this.apperancefloor = new CGFappearance(this);
	this.apperancefloor.setAmbient(0.3,0.3,0.3,1);
	this.apperancefloor.setDiffuse(0.6,0.6,0.6,1);
	this.apperancefloor.setSpecular(0.8,0.8,0.8,1);
	this.apperancefloor.setShininess(120);
	this.apperancefloor.loadTexture("resources/images/floor.png")


	this.apperancewindow = new CGFappearance(this);
	this.apperancewindow .setAmbient(0.3,0.3,0.3,1);
	this.apperancewindow .setDiffuse(0.6,0.6,0.6,1);
	this.apperancewindow .setSpecular(0.8,0.8,0.8,1);
	this.apperancewindow .setShininess(120);
	this.apperancewindow .loadTexture("resources/images/window.png");


	this.apperanceboard = new CGFappearance(this);
	this.apperanceboard .setAmbient(0.3,0.3,0.3,1);
	this.apperanceboard .setDiffuse(0.3, 0.3, 0.3, 1);
	this.apperanceboard .setSpecular(0.65, 0.65, 0.65, 1);
	this.apperanceboard .setShininess(200);
	this.apperanceboard .loadTexture("resources/images/board.png");
	//this.apperanceboard .setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');


	this.slidesAppearance = new CGFappearance(this);
	this.slidesAppearance.loadTexture("resources/images/slides.png");
	this.slidesAppearance.setSpecular(0.2, 0.2, 0.2, 1);
	this.slidesAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
	this.slidesAppearance.setShininess(27);
	this.slidesAppearance.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');


	this.clockapperance = new CGFappearance(this);
	this.clockapperance .setAmbient(0.3,0.3,0.3,1);
	this.clockapperance .setDiffuse(0.3, 0.3, 0.3, 1);
	this.clockapperance .setSpecular(0.65, 0.65, 0.65, 1);
	this.clockapperance .setShininess(200);
	this.clockapperance .loadTexture("resources/images/clock.png");

	this.droneText=new droneText();

	this.setUpdatePeriod(33);
};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initClock =function() {
	if(this.iClock){
		this.setUpdatePeriod(0);
		this.iClock=false;
	}
	else{
		this.setUpdatePeriod(100);
		this.iClock=true;
	}
};

LightingScene.prototype.initLights = function() {
	//this.setGlobalAmbientLight(0.5,0.5,0.5, 1.0);

	// Positions for four lights
	this.lights[0].setPosition(4, 6, 1, 1);
	this.lights[0].setVisible(true); // show marker on light position (different from enabled)

	this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
	this.lights[1].setVisible(true); // show marker on light position (different from enabled)

	this.lights[2].setPosition(8.0, 8.0, 8.0, 1.0);
	this.lights[2].setVisible(true); // show marker on light position (different from enabled)

	this.lights[3].setPosition(0,3, 6, 1);
	this.lights[3].setVisible(true); // show marker on light position (different from enabled)

	//this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
	//this.lights[1].setVisible(true); // show marker on light position (different from enabled)
	//this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
	//this.lights[1].setVisible(true); // show marker on light position (different from enabled)

	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1.0,1.0,0,1.0);
	this.lights[0].enable();


	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].setSpecular(1.0,1.0,0,1.0);
	this.lights[1].enable();

	this.lights[2].setAmbient(0, 0, 0, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1.0,1.0,1.0,1.0);
	this.lights[2].setConstantAttenuation(0); //Kc
	this.lights[2].setLinearAttenuation(1);//Kl
	this.lights[2].setQuadraticAttenuation(0);//Kq
	this.lights[2].enable();

	this.lights[3].setAmbient(0, 0, 0, 1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setSpecular(1.0,1.0,0,1.0);
	this.lights[3].setConstantAttenuation(0); //Kc
	this.lights[3].setLinearAttenuation(0.1);//Kl
	this.lights[3].setQuadraticAttenuation(0);//Kq
	this.lights[3].enable();



};

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();

		if(this.light1)
		this.lights[0].enable();
		else
		this.lights[0].disable();

		if(this.light2)
		this.lights[1].enable();
		else
		this.lights[1].disable();

		if(this.light3)
		this.lights[2].enable();
		else
		this.lights[2].disable();

		if(this.light4)
		this.lights[3].enable();
		else
		this.lights[3].disable();
}


LightingScene.prototype.display = function() {
	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();

	this.materialDefault.apply();

	// ---- END Background, camera athis.nrDivs/2nd axis setup


	// ---- BEGIN Geometric transformation section

	// ---- END Geometric transformation section


	// ---- BEGIN Primitive drawing section

	// Floor
	this.pushMatrix();
		this.translate(7.5, 0, 7.5);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(15, 15, 0.2);
		this.apperancefloor.apply();
		this.floor.display();
		this.materialDefault.apply();
	this.popMatrix();

	// Left Wall
	this.pushMatrix();
		this.translate(0, 4, 7.5);
		this.rotate(90 * degToRad, 0, 1, 0);
		this.scale(15, 8, 0.2);

		this.apperancewindow.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');
		this.apperancewindow.apply();
		this.wall.display();
		this.materialDefault.apply();
	this.popMatrix();

	// Plane Wall
	this.pushMatrix();
		this.translate(7.5, 4, 0);
		this.scale(15, 8, 0.2);

		this.wall.display();
	this.popMatrix();

	// First Table
	this.pushMatrix();
		this.translate(5, 0, 8);
		this.table.display();
	this.popMatrix();

	// Second Table
	this.pushMatrix();
		this.translate(12, 0, 8);
		this.table.display();
	this.popMatrix();

	// Board A
	this.pushMatrix();
		this.translate(4, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);

		this.apperanceboard.apply();
		this.boardA.display();
	this.popMatrix();

	// Board B
	this.pushMatrix();
		this.translate(10.5, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);

		this.slidesAppearance.apply();
		this.boardB.display();
	this.popMatrix();

	//Collumn1
		this.pushMatrix();
		this.translate(1,0,14);
		this.rotate(-Math.PI/2,1,0,0);
		this.collum1.display();
		this.popMatrix();

	//Collum2
	this.pushMatrix();
	this.translate(14,0,1);
	this.rotate(-Math.PI/2,1,0,0);
	this.collum2.display();
	this.popMatrix();

	//Clock

	this.pushMatrix();
	this.translate(7,7,0.3);

	this.clockapperance.apply();
	this.clock.display();
	this.popMatrix();

	//Lamp1
	this.pushMatrix();
	this.translate(8,8,8);
	this.rotate(-Math.PI/2,1,0,0);
	this.lamp1.display();
	this.popMatrix();


	//Drone
	this.pushMatrix();


	this.drone.display();
	this.popMatrix();

	this.materialDefault.apply();
	this.pushMatrix();
	this.charge.display();
	this.popMatrix();

	this.pushMatrix();
	this.target.display();
	this.popMatrix();

	// ---- END Primitive drawing section
};



LightingScene.prototype.update = function update(currTime) {

	this.clock.update(currTime);
	this.drone.setSpeed(this.speed);
	this.drone.update(currTime);
	if(this.drone.cable.picks == 0)
	{
	this.charge.verifyIsInContact(this.drone.x,this.drone.y-this.drone.cable.height*10,this.drone.z);

	}
	console.log(this.drone.cable.picks);
	if(this.drone.cable.transportCargo)
		this.target.delivery(this.charge.x,this.charge.y,this.charge.z);
};

var droneText=function(){
	this.texture = "Cubes";
	this.speed = 1;

};
