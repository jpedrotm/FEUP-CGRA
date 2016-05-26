/**
 * MyCilinder
 * @constructor
 */
 function MyCylinder(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyCylinder.prototype = Object.create(CGFobject.prototype);
 MyCylinder.prototype.constructor = MyCylinder;

 MyCylinder.prototype.initBuffers = function() {
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
	var nSlices=this.slices;

	for(var j=0;j<this.stacks+1;j++){
		
		for (var i = 0; i < this.slices; i++) {
			this.vertices.push(Math.cos(ang*i), Math.sin(ang*i), 0+nStacks);
		}

		for (var i = 0; i < this.slices; i++) {
			this.normals.push(Math.cos(ang*i), Math.sin(ang*i), nStacks);
		}

		nStacks++;
	}

	for(var j=0;j<this.stacks;j++)
	{
		for(var i=0;i<this.slices-1;i++)
		{
			this.indices.push(nSlices+i+nSlices*j,0+i+nSlices*j,nSlices+1+i+nSlices*j);
			this.indices.push(1+i+nSlices*j,nSlices+1+i+nSlices*j,0+i+nSlices*j);
		}
		this.indices.push(nSlices-1+nSlices*j,0+nSlices*j,nSlices*2-1+nSlices*j);
		this.indices.push(nSlices+nSlices*j,2*nSlices-1+nSlices*j,0+nSlices*j);

	}
	
	console.log(this.vertices.length/3);

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };