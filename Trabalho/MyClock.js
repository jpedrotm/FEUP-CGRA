/**
 * MyCilinder
 * @constructor
 */
 function MyClock(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;
	this.cilinder = new MyCylinder(this.scene,this.slices,this.stacks);
	this.circle = new MyCircle(this.scene,this.slices,this.stacks);
	this.hour = new MyClockHand(this.scene,0.5,-Math.PI/2);
	this.min = new MyClockHand(this.scene,0.7,-Math.PI);
	this.sec = new MyClockHand(this.scene,0.9,-Math.PI*80/60);


	


	
	this.circle.initBuffers();
	this.cilinder.initBuffers();
	this.hour.initBuffers();
	this.sec.initBuffers();
	this.min.initBuffers();
 	this.initBuffers();
 	
 };

 MyClock.prototype = Object.create(CGFobject.prototype);
 MyClock.prototype.constructor = MyClock;



 MyClock.prototype.display = function() {

	this.scene.pushMatrix();
	this.scene.scale(1,1,0.3);
 	this.cilinder.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 	this.scene.translate(0,0,0.3);
 	this.scene.rotate(Math.PI/2,0,0,1);
 	this.circle.display();
 	this.scene.popMatrix();
	
	this.scene.materialDefault.apply();
	
 	this.scene.pushMatrix();
 	this.scene.translate(0,0,0.33);
 	this.scene.rotate(-this.hour.angle,0,0,1);
 	this.hour.display();
 	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0,0,0.33);
	this.scene.rotate(-this.min.angle,0,0,1);
	this.min.display();
 	this.scene.popMatrix();
		
	this.scene.pushMatrix();
	this.scene.translate(0,0,0.33);
	this.scene.rotate(-this.sec.angle,0,0,1);
	this.sec.display();
 	this.scene.popMatrix();
 }



 MyClock.prototype.setAngleHour = function setAngleHour(angle)
{
  this.hour.setAngle(angle);
};


 MyClock.prototype.setAngleMin = function setAngleMin(angle)
{
  this.min.setAngle(angle);
};


 MyClock.prototype.setAngleSec = function setAngleSec(angle)
{
  this.sec.setAngle(angle);
};


 MyClock.prototype.update = function(currTime) {

 	var seconds = (currTime/1000 )% 60;
 	var min = (currTime/(1000*60) )% 60;
 	var hour = (currTime/(1000*60*60) )% 60;
 	
	this.sec.setAngle((2*Math.PI/60) * (seconds));
	this.min.setAngle((Math.PI*2/60) * (min));
	this.hour.setAngle((2*Math.PI/12) * (hour));
 }

