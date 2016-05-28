/**
 * DroneMotor
 * @constructor
 */
 function DroneMotor(scene) {
 	CGFobject.call(this,scene);
	this.center = new MyLamp(this.scene,7,7);
	this.heli   = new MyCylinder(this.scene,4,2);
	this.ang = 1;
	this.speed = 0.1;
 	this.initBuffers();
 };

 DroneMotor.prototype = Object.create(CGFobject.prototype);
 DroneMotor.prototype.constructor = DroneMotor;

 DroneMotor.prototype.display = function() {
 	this.scene.pushMatrix();


 	this.center.display();


	this.scene.rotate(this.ang,0,0,1);
 	this.scene.rotate(Math.PI/2,0,1,0);
 	this.scene.scale(0.2,0.6,10);
 	this.scene.translate(-1,0,-0.5);
 	this.heli.display();


 	this.scene.popMatrix();
 }

DroneMotor.prototype.update = function() {

 this.ang += this.speed;
}

DroneMotor.prototype.setSpeed = function(speed)
{
	this.speed = speed;
}
