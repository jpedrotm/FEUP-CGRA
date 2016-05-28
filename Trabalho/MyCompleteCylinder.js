/**
 * MyCircle
 * @constructor
 */
 function MyCompleteCylinder(scene, slices, stacks) {
 	CGFobject.call(this,scene);

 	this.slices=slices;
 	this.stacks=stacks;

 	this.cylinder=new MyCylinder(scene,slices,stacks);
 	this.top=new MyCircle(scene,slices,stacks);
 };

 MyCompleteCylinder.prototype = Object.create(CGFobject.prototype);
 MyCompleteCylinder.prototype.constructor = MyCompleteCylinder;

MyCompleteCylinder.prototype.display=function(){

    this.scene.pushMatrix();
    this.cylinder.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0,0,1);
    this.top.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(Math.PI,1,0,0);
    this.top.display();
    this.scene.popMatrix();
};