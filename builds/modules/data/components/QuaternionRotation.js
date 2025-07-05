import { Component } from "../Component.js";
export class QuaternionRotation extends Component {
    get x() { return this._x; }
    set x(newValue) { this._x = newValue; }
    get y() { return this._y; }
    set y(newValue) { this._y = newValue; }
    get z() { return this._z; }
    set z(newValue) { this._z = newValue; }
    get w() { return this._w; }
    set w(newValue) { this._w = newValue; }
    get isUnit() {
        let v = (this._x * this._x) + (this._y * this._y) +
            (this._z * this._z) + (this._w * this._w);
        return v > 1 - QuaternionRotation._epsilon &&
            v < 1 + QuaternionRotation._epsilon;
    }
    constructor(data) {
        super();
        this._x = 0;
        this._y = 0;
        this._z = 0;
        this._w = 1;
        if (data)
            this.deserialize(data);
    }
    deserialize(data) {
        if (data == undefined)
            throw Error('No Quaternion Rotation data');
        else if (typeof data == "object") {
            if (data.x)
                this.x = data.x;
            if (data.y)
                this.y = data.y;
            if (data.z)
                this.z = data.z;
            if (data.w)
                this.w = data.w;
            if (!this.isUnit)
                throw Error('Quaternion is not unitary');
        }
        else
            throw Error('Invalid Quaternion Rotation data: ' + data);
    }
    serialize(optimize = true) {
        if (optimize && this._x == 0 && this._y == 0 && this._z == 0 &&
            this._w == 1)
            return undefined;
        return { x: this._x, y: this._y, z: this._z, w: this._w };
    }
}
QuaternionRotation._epsilon = 0.0001;
//# sourceMappingURL=QuaternionRotation.js.map