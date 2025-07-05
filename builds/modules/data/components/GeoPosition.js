import { Component } from "../Component.js";
export class GeoPosition extends Component {
    get latitude() { return this._latitude; }
    set latitude(newValue) {
        if (this._latitude == newValue)
            return;
        if (this._latitude < -90 || this._latitude > 90)
            console.warn('Latitude values should be in the [-90, 90] range');
        this._latitude = newValue;
    }
    get longitude() { return this._longitude; }
    set longitude(newValue) {
        if (this._longitude == newValue)
            return;
        if (this._longitude < -180 || this._longitude > 180)
            console.warn('Longitude values should be in the [-180, 180] range');
        this._longitude = newValue;
    }
    get height() { return this._height; }
    set height(newValue) { this._height = newValue; }
    constructor(data) {
        super();
        this._latitude = 0;
        this._longitude = 0;
        this._height = 0;
        if (data)
            this.deserialize(data);
    }
    deserialize(data) {
        if (data == undefined)
            throw Error('No GeoPosition data');
        else if (typeof data == "object") {
            if (data.lat)
                this.latitude = data.lat;
            else if (data.latitude)
                this.latitude = data.lat;
            if (data.lon)
                this.longitude = data.lon;
            else if (data.longitude)
                this.longitude = data.longitude;
            if (data.h)
                this.height = data.h;
            else if (data.height)
                this.height = data.height;
        }
        else
            throw Error('Invalid GeoPosition data: ' + data);
    }
    serialize(optimize = true) {
        if (optimize && this._latitude == 0 && this._longitude == 0 &&
            this._height == 0)
            return undefined;
        return { lat: this._latitude, lon: this._longitude, h: this._height };
    }
}
//# sourceMappingURL=GeoPosition.js.map