/**
 * MyHook
 * @constructor
 */
 function MyHook(scene) {
 	CGFobject.call(this, scene);


    this.cylinder = new MyCylinder(scene, 3, 5);
    this.cylinder_top = new MyClockTop(scene, 3, 5);

 	this.hook_part1 = new MyUnitCubeQuad(scene);
 	this.hook_part2 = new MyUnitCubeQuad(scene);
 };

 MyHook.prototype = Object.create(CGFobject.prototype);
 MyHook.prototype.constructor = MyHook;

 MyHook.prototype.display = function() {
    

   this.scene.pushMatrix();
    this.scene.scale(1, 1, 0.08);
    this.cylinder.display();
    this.cylinder_top.display();
   this.scene.popMatrix();

   this.scene.pushMatrix();
    this.scene.translate(0, 0, 0.5);
    this.scene.scale(0.1, 0.1, 1);
    this.hook_part1.display();
   this.scene.popMatrix();

   this.scene.pushMatrix();
    this.scene.translate(0.25 - 0.05, 0, 1);
    this.scene.rotate(Math.PI/2, 0, 1, 0);
    this.scene.scale(0.1, 0.1, 0.5);
    this.hook_part2.display();
   this.scene.popMatrix();
 }
