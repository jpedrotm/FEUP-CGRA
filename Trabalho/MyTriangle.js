/**
 * MyQuad
 * @constructor
 */
 function MyTriangle(scene ) {
 	CGFobject.call(this,scene);
 
 	this.initBuffers();
 };

 MyTriangle.prototype = Object.create(CGFobject.prototype);
 MyTriangle.prototype.constructor = MyTriangle;

 MyTriangle.prototype.initBuffers = function() {
 	this.vertices = [
 	0.5,0.3,0,
 	-0.5,0.3,0,
 	0,0.3,2,
 	];

 	this.indices = [
 	0, 1, 2, 
    2,1,0,
 	];

 	this.normals=[
 1,1,1,
 1,1,1,
  1,1,1,

 	];
    
 



 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
