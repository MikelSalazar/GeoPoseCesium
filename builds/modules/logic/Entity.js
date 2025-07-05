import { GeoPoseBasicYPR } from "../data/GeoPoseBasicYPR.js";
export class Entity {
    get name() { return this._name; }
    get pose() { return this._pose; }
    get scale() { return this._scale; }
    get model() { return this._model; }
    constructor(data) {
        this._name = 'Entity';
        this._pose = new GeoPoseBasicYPR();
        this._scale = 1;
        this._model = '';
        if (data)
            this.deserialize(data);
    }
    deserialize(data) {
        if (data == undefined)
            throw Error('No Scene data');
        else if (typeof data == "object") {
            if (data.name != undefined)
                this._name = data.name;
            this._pose.deserialize(data.pose);
            if (data.scale != undefined)
                this._scale = data.scale;
            if (data.model != undefined)
                this._model = data.model;
        }
        else
            throw Error('Invalid Scene data: ' + JSON.stringify(data));
    }
    serialize(optimize = true) {
        let data = { name: this.name,
            pose: this._pose.serialize(optimize) };
        if (this._scale != 1)
            data.scale = this._scale;
        if (this._model != undefined)
            data.model = this._model;
        return data;
    }
}
//# sourceMappingURL=Entity.js.map