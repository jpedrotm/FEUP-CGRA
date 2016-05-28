/**
 * MyCircle
 * @constructor
 */
 function MyCircle(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyCircle.prototype = Object.create(CGFobject.prototype);
 MyCircle.prototype.constructor = MyCircle;

 MyCircle.prototype.initBuffers = function() {
 
 	this.vertices = new Array();
 	this.indices = new Array();
 	this.normals = new Array();
 	this.texCoords = new Array();

 	var ang=Math.PI*2/this.slices;
	var nStacks=0;
	var nSlices=this.slices;
		
	
	var count = 0;
		
	for (var i = 0; i < this.slices; i++) {
		this.vertices.push(Math.cos(ang*i), Math.sin(ang*i), 0+nStacks);
		this.texCoords.push(0.5-0.5*Math.sin(ang*i),0.5-0.5*Math.cos(ang*i));
		count++;
	}

	for (var i = 0; i < this.slices; i++) {
		this.normals.push(0, 0, 1);
	}

		this.vertices.push(0,0,0);
	
	var i = 1;
	for (; i < this.slices -1; i++) {
		this.indices.push(count -1 ,i -1,i);
		
	}


	this.indices.push( 0,i - 1,count -1);


 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };


