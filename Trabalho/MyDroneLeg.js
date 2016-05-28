
 function MyDroneLeg(scene, slices, stacks) {
 	CGFobject.call(this,scene);

	this.slices = slices;
	this.stacks = stacks;

  this.Tinc = 1/stacks;
  this.Sinc = 1/slices;


 	this.initBuffers();
 };

 MyDroneLeg.prototype = Object.create(CGFobject.prototype);
 MyDroneLeg.prototype.constructor = MyDroneLeg;

 MyDroneLeg.prototype.initBuffers = function() {


	this.vertices = [];
	this.normals = [];
	this.indices = [];
	this.texCoords = [];

 	var hor = Math.PI/ (2*this.slices);
	var ver = Math.PI /(2* this.stacks);
	var recto = Math.PI / 2;

	var count = 0;



	for (i = 0; i < 2; i++) {

		for(k =0; k < this.stacks ; k++)
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
	this.normals.push(1,0,0);


	var start = 0;
	for(i = 0 ; i+1 < this.stacks; i++)
	{
		 this.indices.push(start+1,start+this.stacks+1,start);
		 this.indices.push(start+this.stacks+1,start+this.stacks,start);
		start++;


	}




	for (i = 0; i < 2; i++) {

		for(k =0; k < this.stacks ; k++)
		{

			var x = 1.1*Math.sin(recto - k * ver)*Math.cos(i*hor);
			var y = 1.1*Math.sin(recto - k * ver)*Math.sin(i*hor);
			var z = 1.1*Math.cos( recto - k * ver );
			this.vertices.push(x,y,z);
			this.normals.push(x,y,z);
			count ++;
		}


	}


	//TOP
	var top2 = count;
	this.vertices.push(0,0,1.5);
	this.normals.push(1,0,0);


	var start = top +1;
	for(i = 0 ; i+1 < this.stacks; i++)
	{
		 this.indices.push(start,start+this.stacks+1,start+1);
		 this.indices.push(start,start+this.stacks,start+this.stacks+1);
		start++;


	}



	///LEG SIDES

	var offset = 0;
	var d = 0;
	var f = top +1;
	var d2 = this.stacks ;
	var f2 = this.stacks +f  ;
	for(i = 1 ; i < this.stacks; i++)
	{
		this.indices.push(d+1+offset,d+offset,f+offset );
		this.indices.push(d+1+offset,f+offset,f+1+offset);

		this.indices.push(f2+1+offset,d2+offset,d2+1+offset);
		this.indices.push(f2+1+offset,f2+offset,d2+offset);
		offset ++;
	}

	//BASE
	this.indices.push(d,d2,f);
	this.indices.push(f2,f,d2);

  var s=0;
  var t=1;


  for (var i = 0; i <= this.stacks; i++) {
  for (var m = 0; m < this.slices; m++) {
    this.texCoords.push(s,t);
    s +=this.Sinc;
    }
    s=0;
    t -=this.Tinc;
  }



 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();


 };
