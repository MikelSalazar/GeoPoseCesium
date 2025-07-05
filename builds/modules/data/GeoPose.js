export class GeoPose {
    constructor(data) {
        this._components = {};
        this._requiredComponents = [];
        if (data)
            this.deserialize(data);
    }
    deserialize(data) {
        if (data == undefined)
            throw Error('No GeoPose data');
        else if (typeof data == "object") {
            for (let name of this._requiredComponents) {
                if (data[name] == undefined)
                    throw Error('Required component not found: "' + name + '"');
            }
            for (let name in data) {
                if (this._components[name])
                    this._components[name].deserialize(data[name]);
                else
                    throw Error('There is no component named: "' + name + '"');
            }
        }
        else
            throw Error('Invalid GeoPose data: ' + JSON.stringify(data));
    }
    serialize(optimize = true) {
        let data = {};
        for (let componentName in this._components) {
            let value = this._components[componentName].serialize(optimize &&
                !this._requiredComponents.includes(componentName));
            if (value != undefined)
                data[componentName] = value;
        }
        return data;
    }
    toString(optimize = true) {
        return JSON.stringify(this.serialize(optimize), undefined, '\t')
            .replace(/\n\t(\t)/g, ' ').replace(/\n\t}/g, ' }');
    }
}
//# sourceMappingURL=GeoPose.js.map