/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */
class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        // Initialize properties
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        // If there's a parent, add this node as a child to the parent
        if (parent) {
            this.parent.__addChild(this);
        }
    }

    // Internal method to add a child node to the current node
    __addChild(node) {
        this.children.push(node);
    }

    // Draw method to render the node and its children
    draw(mvp, modelView, normalMatrix, parentModelMatrix) {
        // Apply the transformations from the TRS object
        var modelMatrix = this.trs.getTransformationMatrix();
    
        // If there is a parent model matrix, apply it as well
        if (parentModelMatrix) {
            modelMatrix = MatrixMult(parentModelMatrix, modelMatrix);
        }
    
        // Update the modelView matrix
        var updatedModelView = MatrixMult(modelView, modelMatrix);
    
        // Update the normal matrix
        var updatedNormalMatrix = getNormalMatrix(updatedModelView);
    
        // Update the MVP matrix
        var updatedMvp = MatrixMult(mvp, updatedModelView);
    
        // Draw the MeshDrawer
        if (this.meshDrawer) {
            this.meshDrawer.draw(updatedMvp, updatedModelView, updatedNormalMatrix, modelMatrix);
        }
    
        // Recursively draw the children nodes
        for (const child of this.children) {
            child.draw(updatedMvp, updatedModelView, updatedNormalMatrix, modelMatrix);
        }
    }
}
