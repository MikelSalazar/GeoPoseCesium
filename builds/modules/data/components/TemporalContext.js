import { Component } from "../Component.js";
export class TemporalContext extends Component {
    get timestamp() { return this._timestamp; }
    set timestamp(newValue) { this._timestamp = newValue; }
    get duration() { return this._duration; }
    set duration(newValue) { this._duration = newValue; }
    constructor(data) {
        super();
        this.timestamp = 0;
        this._duration = 0;
        if (data)
            this.deserialize(data);
    }
    deserialize(data) {
        if (data == undefined)
            throw Error('No Time data');
        if (typeof data == "number") {
            this.timestamp = data;
            this.duration = 0;
        }
        else if (typeof data == "object") {
            if (data.timestamp)
                this.timestamp = data.timestamp;
            if (data.duration)
                this.duration = data.duration;
        }
        else
            throw Error('Invalid Time data: ' + data);
    }
    serialize(optimize = true) {
        if (optimize) {
            if (this._timestamp == 0 && this._duration == 0)
                return undefined;
            if (this._duration == 0)
                return this._timestamp;
        }
        return { timestamp: this._timestamp, duration: this._duration };
    }
}
//# sourceMappingURL=TemporalContext.js.map