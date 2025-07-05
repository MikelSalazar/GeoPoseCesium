import { GeoPose } from "./GeoPose.js";
import { GeoPosition } from "./components/GeoPosition.js";
import { TemporalContext } from "./components/TemporalContext.js";
import { QuaternionRotation } from "./components/QuaternionRotation.js";
import { Uncertainty } from "./components/Uncertainty.js";
export class GeoPoseBasicQuaternion extends GeoPose {
    get location() {
        return this._components.location;
    }
    get quaternion() {
        return this._components.quaternion;
    }
    get time() {
        return this._components.time;
    }
    get uncertainty() {
        return this._components.uncertainty;
    }
    constructor(data) {
        super();
        this._components.location = new GeoPosition();
        this._components.quaternion = new QuaternionRotation();
        this._components.time = new TemporalContext();
        this._components.uncertainty = new Uncertainty();
        this._requiredComponents.push('location', 'quaternion');
        if (data)
            this.deserialize(data);
    }
}
//# sourceMappingURL=GeoPoseBasicQuaternion.js.map