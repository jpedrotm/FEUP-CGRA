/**
 * MyCircle
 * @constructor
 */
 function MyTarget(scene, slices, stacks,x,y,z) {
 	CGFobject.call(this,scene);

 	this.slices=slices;
 	this.stacks=stacks;
	this.x = x;
	this.y = y;
	this.z = z;


 this.quad = new MyQuad(this.scene,0,1,0,1);
 this.initBuffers();
 	};

 MyTarget.prototype = Object.create(CGFobject.prototype);
 MyTarget.prototype.constructor = MyTarget;

 MyTarget.prototype.display=function(){

    this.scene.pushMatrix();
    this.scene.translate(this.x,this.y,this.z);
		this.scene.scale(3,0,10);
		this.scene.slidesAppearance.apply();
	  this.quad.display();
    this.scene.popMatrix();
};
