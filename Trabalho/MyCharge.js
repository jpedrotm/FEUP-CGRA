function MyCharge(scene, x, y, z,size) {
	CGFobject.call(this,scene);
	this.scene = scene;

	this.x = x;
	this.y = y;
	this.z = z;

	this.size=size;
	this.cube=new MyUnitCubeQuad(scene);
	this.isInContact=false;
};

MyCharge.prototype = Object.create(CGFobject.prototype);
MyCharge.prototype.constructor=MyCharge;

MyCharge.prototype.display = function() {

    this.scene.pushMatrix();
    this.scene.translate(this.x,this.y,this.z);
    this.scene.scale(this.size,this.size,this.size);
    this.cube.display();
    this.scene.popMatrix();

};

MyCharge.prototype.verifyIsInContact=function(xDrone,yDrone,zDrone){

    if(xDrone<this.x+this.size && xDrone>this.x-this.size)
    {
        if(yDrone<this.y+this.size && yDrone>this.y+this.size)
        {
            if(zDrone<this.z+this.size && zDrone>this.z+this.size)
            {
                this.isInContact=true;
            }
        }
    }
};