/**
 * MyPrism
 * @constructor
 */
 function MyPrism(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyPrism.prototype = Object.create(CGFobject.prototype);
 MyPrism.prototype.constructor = MyPrism;

 MyPrism.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/

 	this.vertices = new Array();
 	this.indices = new Array();
 	this.normals = new Array();

	var ang=Math.PI*2/this.slices;
	var nStacks=0;
	var nVertices=4*this.slices;

	for(var j=0;j<this.stacks;j++){



		for (var i = 0; i < this.slices; i++) {
			this.vertices.push(Math.cos(ang*i), Math.sin(ang*i), 1+nStacks);
			this.vertices.push(Math.cos(ang*i), Math.sin(ang*i), 0+nStacks);
			i++;
			this.vertices.push(Math.cos(ang*i), Math.sin(ang*i), 1+nStacks);
			this.vertices.push(Math.cos(ang*i), Math.sin(ang*i), 0+nStacks);
			i--;
		}

		for (var i=0; i < this.slices; i++) {
			this.indices.push(0+i*4+nStacks*nVertices,1+i*4+nStacks*nVertices,2+i*4+nStacks*nVertices);
			this.indices.push(3+i*4+nStacks*nVertices,2+i*4+nStacks*nVertices,1+i*4+nStacks*nVertices);
		}
	
 		for (var i = 0; i < this.slices; i++) {
			this.normals.push(Math.cos(ang*i), Math.sin(ang*i), 0);
			this.normals.push(Math.cos(ang*i), Math.sin(ang*i), 0);
			i++;
			this.normals.push(Math.cos(ang*i), Math.sin(ang*i), 0);
			this.normals.push(Math.cos(ang*i), Math.sin(ang*i), 0);
			i--;
		}

		nStacks++;
	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
