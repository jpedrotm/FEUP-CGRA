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


 this.quad = new MyUnitCubeQuad(scene);

 this.initBuffers();
 	};

 MyTarget.prototype = Object.create(CGFobject.prototype);
 MyTarget.prototype.constructor = MyTarget;

 MyTarget.prototype.display=function(){

    this.scene.pushMatrix();
    
   this.scene.translate(this.x,this.y,this.z);
   this.scene.scale(2,1,2);
   this.scene.slidesAppearance.apply();  
   this.quad.display();
    this.scene.popMatrix();
};


MyTarget.prototype.delivery = function(x,y,z){
	var deltaX = this.x - x ;
	var deltaY = this.y - y ;
	var deltaZ = this.z - z ;
	console.log(this.scene.drone.cable.transportCargo);
	var dis = Math.sqrt(deltaX*deltaX+deltaY*deltaY+deltaZ*deltaZ);
	console.log(dis);
	if (dis <= 1)
	{
		this.scene.drone.cable.transportCargo = false;
	}
}