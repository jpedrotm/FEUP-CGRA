/**
MyDrone.js
@constructor
*/

function MyDrone(scene,x,y,z) {
 	CGFobject.call(this,scene);

	this.chassi1 = new MyCylinder(this.scene,20,10);

	this.body1 = new  MyLamp(this.scene, 30, 20);
	this.body2 = new  MyLamp(this.scene, 20, 20);

	this.motorBase = new MyCylinder(this.scene,12,2);
	this.leg= new MyDroneLeg(this.scene,10,10);
	this.base = new MyCylinder(this.scene,12,2);

	this.motor1 = new DroneMotor(this.scene);
  this.motor2 = new DroneMotor(this.scene);
	this.motor3 = new DroneMotor(this.scene);
	this.motor4 = new DroneMotor(this.scene);
	this.cable = new MyCable(this.scene,0,0,0);


	this.ang=0;
	this.x =  x;
	this.y = y;
	this.z = z;
    this.FanSpeed(0.1,0.1,-0.1,-0.1);
    this.movAng = 0;
    this.speed = 1;
     this.animationTimer = 0;
     this.maxINC = 0.4;


     this.currentStatus = "WAIT";
 	this.minINC = -0.4;


    this.loadTextures();
 };

 MyDrone.prototype = Object.create(CGFobject.prototype);
 MyDrone.prototype.constructor = MyDrone;



 MyDrone.prototype.display = function() {

 	this.scene.translate(this.x,this.y,this.z);
 	this.scene.rotate(this.ang,0,1,0);

 	this.scene.pushMatrix();
 	this.scene.rotate(this.movAng,1,0,0);


//CHASSIS
	this.scene.pushMatrix();
	this.scene.droneAppearances[this.scene.currDroneAppearance].apply();
	this.scene.translate(0,0,-1);
	this.scene.scale(0.05,0.05,2);
	this.chassi1.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 	this.scene.droneAppearances[this.scene.currDroneAppearance].apply();
	this.scene.rotate(Math.PI/2,0,1,0);
	this.scene.translate(0,0,-1);
	this.scene.scale(0.05,0.05,2);
	this.chassi1.display();
 	this.scene.popMatrix();

//BODY
	this.scene.pushMatrix();
  this.scene.apperanceboard.apply();
	this.scene.droneAppearances[this.scene.currDroneAppearance].apply();
	this.scene.rotate(Math.PI/2,-1,0,0);
	this.scene.scale(0.5,0.5,0.35);

	this.body1.display();
//  this.scene.materialDefault.apply();
 	this.scene.popMatrix();


 	this.scene.pushMatrix();
 	this.scene.droneAppearances[this.scene.currDroneAppearance].apply();
	this.scene.rotate(Math.PI/2,1,0,0);
	this.scene.scale(0.5,0.5,0.2);
	this.body1.display();
 	this.scene.popMatrix();

//MOTOR BASE

	this.scene.pushMatrix();
	this.scene.droneAppearances[this.scene.currDroneAppearance].apply();
	this.scene.rotate(Math.PI/2,-1,0,0);
	this.scene.translate(1,0,-0.05);
	this.scene.scale(0.05,0.05,0.2);
	this.motorBase.display();
	this.scene.translate(-40,0,0);
	this.motorBase.display();
	this.scene.translate(20,20,0);
	this.motorBase.display();
	this.scene.translate(0,-40,0);
	this.motorBase.display();
 	this.scene.popMatrix();

//LEGS
	this.scene.pushMatrix();
	this.scene.droneAppearances[this.scene.currDroneAppearance].apply();
	this.scene.rotate(Math.PI/2,0,0,1);
	this.scene.scale(0.7,0.3,0.6);
	this.scene.translate(-1,-0.4,0);
	this.leg.display();
	this.scene.translate(0,0.8,0);
	this.leg.display();
	this.scene.popMatrix();


	this.scene.pushMatrix();
	this.scene.droneAppearances[this.scene.currDroneAppearance].apply();
	this.scene.rotate(Math.PI/2,0,0,1);
	this.scene.rotate(Math.PI,1,0,0);
	this.scene.scale(0.7,0.3,0.6);
	this.scene.translate(-1,-0.4,0);
	this.leg.display();
	this.scene.translate(0,0.8,0);
	this.leg.display();
	this.scene.popMatrix();

//LEGS BASE

	this.scene.pushMatrix();
	this.scene.droneAppearances[this.scene.currDroneAppearance].apply();
	this.scene.rotate(Math.PI/2,0,1,0);
	this.scene.translate(-0.62,-0.6,-0.4);
	this.scene.scale(0.04,0.04,0.8);
	this.base.display();
	this.scene.translate(31,0,0);
	this.base.display();
	this.scene.popMatrix();


	this.scene.pushMatrix();
	this.scene.droneAppearances[this.scene.currDroneAppearance].apply();
	this.scene.rotate(-Math.PI/2,1,0,0);
	this.scene.translate(1,0,0.1);
	this.scene.scale(0.08,0.08,0.08);
	this.motor1.display();
	this.scene.translate(-12.4,12.4,0);
	this.motor2.display();
	this.scene.translate(0,-24.8,0);
	this.motor3.display();
	this.scene.translate(-12.4,12.5,0);
	this.motor4.display();
 	this.scene.popMatrix();

 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 	this.cable.display();
 	this.scene.popMatrix();


 };

 MyDrone.prototype.moveLeft =function moveLeft(){
 	this.currentStatus = 'LEFT';
 }

 MyDrone.prototype.moveRight =function moveRight(){
 	this.currentStatus = "RIGHT";
 }

 MyDrone.prototype.moveFront=function moveFront(s){
 	this.currentStatus = "FRONT";
 }

 MyDrone.prototype.moveBack=function moveBack(s){
 	this.currentStatus = "BACK";
 }

 MyDrone.prototype.moveUp=function moveUp(s){
 	this.currentStatus = "UP";
 }

  MyDrone.prototype.moveDown=function moveDown(s){

 	this.currentStatus = "DOWN";
 }

 MyDrone.prototype.dontMove = function dontMove(){
 	this.currentStatus = "WAIT";
 }


 MyDrone.prototype.update = function (currTime) {


   ;

  if(this.currentStatus != "WAIT")
  {
    var time = currTime - this.animationTimer;
    var mov = time % 1000;
    var a = mov * 0.003;
    console.log(a);
  }
  this.animationTimer = currTime;
	switch(this.currentStatus)
	{
		case ("WAIT"):
		this.FanSpeed(0.1*this.speed,0.1*this.speed,-0.1*this.speed,-0.1*this.speed);

		break;

		case ("BACK"):
		 this.x-=Math.sin(this.ang)*a;
 	     this.z-=Math.cos(this.ang)*a;
		 this.FanSpeed(0.5*this.speed,0.1*this.speed,-0.1*this.speed,-0.1*this.speed);

		break;

		case ("FRONT"):
		this.x+=Math.sin(this.ang)*a;
 	    this.z+=Math.cos(this.ang)*a;
		this.FanSpeed(0.1*this.speed,0.5*this.speed,-0.1*this.speed,-0.1*this.speed);

		break;

		case ("LEFT"):
		this.FanSpeed(0.1*this.speed,0.1*this.speed,-0.5*this.speed,-0.5*this.speed);
		this.ang+=a;
		break;

	 	case ("RIGHT"):
	 	this.FanSpeed(0.5*this.speed,0.5*this.speed,-0.1*this.speed,-0.1*this.speed);
	 	this.ang-=a;
		break;

		case ("DOWN"):
		this.y-=a;
		break;

		case ("UP"):
		this.y += a;
		break;

	}
	  this.updateMovAng();
  	this.motor1.update();
  	this.motor2.update();
  	this.motor3.update();
  	this.motor4.update();




  }


  MyDrone.prototype.FanSpeed = function(up,down,left,right)
 {
 	this.motor2.setSpeed(up);
	this.motor3.setSpeed(down);
	this.motor1.setSpeed(left);
	this.motor4.setSpeed(right);
 }

 MyDrone.prototype.loadTextures = function(){

 	this.firstTexture = new CGFappearance(this.scene);
	this.firstTexture .loadTexture("resources/images/cubes.png");

	this.scene.droneAppearances.push(this.firstTexture);
	this.scene.droneAppearancesList["Cubes"]=0;

	this.secondTexture = new CGFappearance(this.scene);
	this.secondTexture .loadTexture("resources/images/billgates.png");

	this.scene.droneAppearances.push(this.secondTexture);
	this.scene.droneAppearancesList["Bill Gates"]=1;
 };

 MyDrone.prototype.extendsCable=function(){
 	this.cable.extendCable();
 };

 MyDrone.prototype.decreaseCable=function(){
 	this.cable.decreaseCable();
 };

 MyDrone.prototype.setSpeed = function (speed)
  {
  	this.speed = speed;
  }
  MyDrone.prototype.updateMovAng = function()
  {
  	if(this.currentStatus == "WAIT" || this. currentStatus == "LEFT"
  	  ||this.currentStatus == "RIGHT"){
  		if(this.movAng > 0.05 )
 			this.movAng -= 0.02;
 		else if( this.movAng < -0.05)
 			this.movAng += 0.02;
 			else if (-0.05 <= this.movAng <= 0.05 )
 			this.movAng = 0;
  	  }
  	else if(this.currentStatus == "FRONT") {
  		if(this.movAng < this.maxINC)
 			this.movAng += 0.02;
  	}
 	else if(this.currentStatus == "BACK") {
 		if(this.movAng > this.minINC)
 			this.movAng -= 0.02;
 	}

  }
