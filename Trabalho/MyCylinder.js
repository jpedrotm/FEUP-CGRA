/**
 * MyCilinder
 * @constructor
 */
 function MyCylinder(scene, slices, stacks) {
 	CGFobject.call(this,scene);

	this.slices = slices;
	this.stacks = stacks;

	this.Tinc = 1/stacks;
	this.Sinc = 1/slices;

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
  this.texCoords = [];



  	var angle = 2 * Math.PI / (this.slices);




  for (var i = 0; i < this.stacks + 1; i++)
	{
    	this.Sinc = 0;
		for (var j = 0; j < this.slices; j++)
		{
		this.vertices.push(Math.cos(j * angle), Math.sin(j * angle), i);
		this.normals.push(Math.cos(j * angle), Math.sin(j * angle),0);
		this.texCoords.push(this.Sinc, this.Tinc);

			this.Sinc+=1/this.slices;
		}

		this.Tinc+= 1/this.stacks;
	}

	for (var i = 0; i < this.stacks; i++)
	{
		for (var j = 0; j < this.slices; j++)
		{
			if (j == this.slices - 1)
			{
				this.indices.push((i * this.slices + j),  (i * this.slices + j) + 1 - this.slices, (((i + 1) * this.slices + j) + 1) - this.slices);
				this.indices.push((i * this.slices + j), (((i + 1) * this.slices + j) + 1) - this.slices, ((i + 1) * this.slices + j));
			}
			else
			{
				this.indices.push((i * this.slices + j), (i * this.slices + j) + 1, ((i + 1) * this.slices + j) + 1);
				this.indices.push((i * this.slices + j), ((i + 1) * this.slices + j) + 1, ((i + 1) * this.slices + j));
			}
		}
	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };