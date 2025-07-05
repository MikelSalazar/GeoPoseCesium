import { Component } from "../Component.js";
export class Uncertainty extends Component {
    get horizontal() { return this._horizontal; }
    set horizontal(newValue) { this._horizontal = newValue; }
    get vertical() { return this._vertical; }
    set vertical(newValue) { this._vertical = newValue; }
    constructor(data) {
        super();
        this._horizontal = 0;
        this._vertical = 0;
        if (data)
            this.deserialize(data);
    }
    deserialize(data) {
        if (data == undefined)
            throw Error('No Uncertainty data');
        if (typeof data == "number")
            this.horizontal = this.vertical = data;
        else if (typeof data == "object") {
            if (data.h)
                this.horizontal = data.h;
            else if (data.horizontal)
                this.horizontal = data.horizontal;
            if (data.v)
                this.vertical = data.v;
            else if (data.vertical)
                this.vertical = data.altitude;
        }
        else
            throw Error('Invalid Uncertainty data: ' + data);
    }
    serialize(optimize = true) {
        if (optimize) {
            if (this._horizontal == 0 && this._vertical == 0)
                return undefined;
            if (this._horizontal == this._vertical)
                return this._horizontal;
        }
        return { h: this._horizontal, v: this._vertical };
    }
}
//# sourceMappingURL=Uncertainty.js.map