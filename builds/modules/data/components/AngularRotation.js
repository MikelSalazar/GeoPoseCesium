import { Component } from "../Component.js";
export class AngularRotation extends Component {
    get yaw() { return this._yaw; }
    set yaw(newValue) { this._yaw = newValue; }
    get pitch() { return this._pitch; }
    set pitch(newValue) { this._pitch = newValue; }
    get roll() { return this._roll; }
    set roll(newValue) { this._roll = newValue; }
    constructor(data) {
        super();
        this._yaw = 0;
        this._pitch = 0;
        this._roll = 0;
        if (data)
            this.deserialize(data);
    }
    deserialize(data) {
        if (data == undefined)
            throw Error('No Angular Rotation data');
        else if (typeof data == "object") {
            if (data.yaw)
                this.yaw = data.yaw;
            else if (data.y)
                this.yaw = data.y;
            if (data.pitch)
                this.pitch = data.pitch;
            else if (data.p)
                this.pitch = data.p;
            if (data.roll)
                this.roll = data.roll;
            else if (data.r)
                this.roll = data.r;
        }
        else
            throw Error('Invalid Angular Rotation data: ' + data);
    }
    serialize(optimize = true) {
        if (optimize && this._yaw == 0 && this._pitch == 0 && this._roll == 0)
            return undefined;
        return { yaw: this.yaw, pitch: this._pitch, roll: this._roll };
    }
}
//# sourceMappingURL=AngularRotation.js.map