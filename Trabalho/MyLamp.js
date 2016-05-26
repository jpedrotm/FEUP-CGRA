/**
 * MyPrism
 * @constructor
 */
 function MyLamp(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyLamp.prototype = Object.create(CGFobject.prototype);
 MyLamp.prototype.constructor = MyLamp;

 MyLamp.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/
	this.vertices = [];
	this.normals = [];
	this.indices = [];

 	var hor = (2*Math.PI) / this.slices;
	var ver = Math.PI /(2* this.stacks);
	var recto = Math.PI / 2;

	var count = 0;
	
	

	for (i = 0; i < this.slices; i++) {

		for(k =0; k < this.stacks  ; k++)
		{
		
			var x = Math.sin(recto - k * ver)*Math.cos(i*hor);
			var y = Math.sin(recto - k * ver)*Math.sin(i*hor);
			var z = Math.cos( recto - k * ver );
			this.vertices.push(x,y,z);
			this.normals.push(x,y,z);
			count ++;
		}
		
		
	}

	
	//TOP
	var top = count;
	this.vertices.push(0,0,1);
	this.normals.push(0,0,1);
	
	
	for(k=1; k < this.slices; k++)
		{
			this.indices.push(count,this.stacks*k-1 ,this.stacks*(k+1)-1);
		}
		this.indices.push(count,this.stacks*(this.slices)-1,this.stacks-1);
		
	
	var start = 0;	
	for(i = 0 ; i < this.stacks; i++)
	{
		var point = start;
		for(k=0; k+1 < this.slices; k++)
		{
			this.indices.push(start+1,start,start+this.stacks);
		    this.indices.push(start+1,start+this.stacks,start+this.stacks+1);
			start++;
		}

		this.indices.push(i,i+1,this.stacks*(this.slices-1)+i);
		this.indices.push(this.stacks*(this.slices-1)+i+1,this.stacks*(this.slices-1)+i,i+1);

	}

	
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };

