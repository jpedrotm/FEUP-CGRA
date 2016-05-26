/**
 * MyQuad
 * @constructor
 */
 function MyClockHand(scene,size,angle ) {
 	CGFobject.call(this,scene);
  this.size = size;
  this.angle = angle;
 	this.initBuffers();
 };

 MyClockHand.prototype = Object.create(CGFobject.prototype);
 MyClockHand.prototype.constructor = MyQuad;

 MyClockHand.prototype.initBuffers = function() {
 	this.vertices = [
 		-0.005, 0, 0,
 	0.005, 0, 0,
 	-0.005, this.size, 0,
 	0.005, this.size, 0
 	];

 	this.indices = [
 	0, 1, 2, 
 	3, 2, 1
 	];

 	this.normals=[
 	0,0,0,
 	0,0,0,
 	0,0,0,
 	0,0,0,

 	];
    


 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };


MyClockHand.prototype.setAngle = function setAngle(angle)
{
 
  this.angle = angle;
 
};