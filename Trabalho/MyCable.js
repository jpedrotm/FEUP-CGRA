function MyCable(scene, x, y, z) {
	CGFobject.call(this,scene);
	this.scene = scene;

	this.x = x;
	this.y = y;
	this.z = z;
	this.height=0.1;
	this.transportCargo = false;
	this.picks = 0;

	this.cable = new MyCylinder(scene, 3,this.height);
	this.hook = new MyCompleteCylinder(scene,12,1);
};

MyCable.prototype = Object.create(CGFobject.prototype);
MyCable.prototype.constructor=MyCable;

MyCable.prototype.display = function() {

	this.scene.pushMatrix();
		this.scene.translate(this.x,this.y,this.z);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.scene.scale(0.1, 0.1,this.height);
		this.cable.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(this.x,this.y-10*this.height,this.z);
	this.scene.rotate(Math.PI/2,1,0,0);
	this.scene.scale(0.2,0.2,0.1);
	this.hook.display();
	this.scene.popMatrix();
};

MyCable.prototype.extendCable=function(){

	if((this.scene.drone.y - 10*this.height) > 0.2)
	{
		this.height+=0.01;
	}

	if(this.transportCargo)
	{
		this.scene.charge.moveY(-0.1);
	}

};

MyCable.prototype.decreaseCable=function(){

if(this.height > 0)
	{
		this.height-=0.01;
		if(this.transportCargo)
		{
			this.scene.charge.moveY(0.1);
		}
	}
};

MyCable.prototype.update=function(currTime){

/*
	if(this.height<0)
	this.height=0;
*/
	if(this.scene.charge.isInContact && (this.picks  == 0))
	{
		this.transportCargo = true;
		this.picks ++;
	}

};
