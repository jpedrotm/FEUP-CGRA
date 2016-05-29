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
		if(this.isInContact)
		this.scene.chargeappperance.apply();
    this.cube.display();
    this.scene.popMatrix();

};

MyCharge.prototype.verifyIsInContact=function(xHook,yHook,zHook){


    if(xHook<this.x+this.size && xHook>this.x-this.size)
    {
        if(yHook<this.y+this.size && yHook>this.y-this.size)
        {

            if(zHook<this.z+this.size && zHook>this.z-this.size)
            {
                this.isInContact=true;

            }
        }
    }
};

MyCharge.prototype.moveY = function(setY)
{
	this.y += setY;
		if(this.y < 0.5)
		this.y = 0.5;
		else if(this.y >= this.scene.drone.y)
		this.y -= setY;
}
MyCharge.prototype.moveX = function(setX)
{
	this.x += setX;
}
MyCharge.prototype.moveZ = function(setZ)
{

	this.z += setZ;

}
