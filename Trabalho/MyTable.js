/**
 * MyTable
 * @constructor
 */
 function MyTable(scene) {
 	CGFobject.call(this, scene);

 	this.myUnitCubeQuad = new MyUnitCubeQuad(this.scene);
 	this.myUnitCubeQuad.initBuffers();

 	this.materialC = new CGFappearance(this.scene);
	this.materialC.setAmbient(0.2,0.2,0.2,1);
	this.materialC.setDiffuse(0.59,0.29,0.0,1);
	this.materialC.setSpecular(0.58,0.29,0.0,1);	
	this.materialC.setShininess(10);
	this.materialC.loadTexture("resources/images/table.png");

	this.materialD = new CGFappearance(this.scene);
	this.materialD.setAmbient(0.2,0.2,0.2,1);
	this.materialD.setDiffuse(0.75,0.75,0.75,1);
	this.materialD.setSpecular(0.75,0.75,0.75,1);	
	this.materialD.setShininess(10);

 };

 MyTable.prototype = Object.create(CGFobject.prototype);
 MyTable.prototype.constructor = MyTable;

 MyTable.prototype.display = function() {


 	// legs
 	this.scene.pushMatrix();
 	this.scene.translate(2, 3.5 / 2, 1);
 	this.scene.scale(0.3, 3.5, 0.3);
 	this.materialD.apply();
 	this.myUnitCubeQuad.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 	this.scene.translate(2, 3.5 / 2, -1);
 	this.scene.scale(0.3, 3.5, 0.3);
 	this.materialD.apply();
 	this.myUnitCubeQuad.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 	this.scene.translate(-2, 3.5 / 2, 1);
 	this.scene.scale(0.3, 3.5, 0.3);
 	this.materialD.apply();
 	this.myUnitCubeQuad.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 	this.scene.translate(-2, 3.5 / 2, -1);
 	this.scene.scale(0.3, 3.5, 0.3);
 	this.materialD.apply();
 	this.myUnitCubeQuad.display();
 	this.scene.popMatrix();

 	// table top
 	this.scene.pushMatrix();
 	this.scene.translate(0, 3.5, 0);
 	this.scene.scale(5, 0.3, 3);
 	this.materialC.apply();
 	this.myUnitCubeQuad.display();
 	this.scene.popMatrix();
 }
