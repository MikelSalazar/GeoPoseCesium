import { GeoPoseBasicYPR } from "../data/GeoPoseBasicYPR.js";
import { Entity } from "./Entity.js";
export class Scene {
    get camera() { return this._camera; }
    get entities() { return this._entities; }
    constructor(data) {
        this._camera = new GeoPoseBasicYPR();
        this._entities = [];
        if (data)
            this.deserialize(data);
    }
    deserialize(data) {
        if (data == undefined)
            throw Error('No Scene data');
        else if (typeof data == "object") {
            this._camera.deserialize(data.camera);
            for (let entityData of data.entities)
                this._entities.push(new Entity(entityData));
        }
        else
            throw Error('Invalid Scene data: ' + JSON.stringify(data));
    }
    serialize(optimize = true) {
        return { camera: this._camera.serialize(optimize) };
    }
}
//# sourceMappingURL=Scene.js.map