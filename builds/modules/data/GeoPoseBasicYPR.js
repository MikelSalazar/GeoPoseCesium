import { GeoPose } from "./GeoPose.js";
import { GeoPosition } from "./components/GeoPosition.js";
import { AngularRotation } from "./components/AngularRotation.js";
import { TemporalContext } from "./components/TemporalContext.js";
import { Uncertainty } from "./components/Uncertainty.js";
export class GeoPoseBasicYPR extends GeoPose {
    get location() {
        return this._components.location;
    }
    get angles() {
        return this._components.angles;
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
        this._components.angles = new AngularRotation();
        this._components.time = new TemporalContext();
        this._components.uncertainty = new Uncertainty();
        this._requiredComponents.push('location', 'angles');
        if (data)
            this.deserialize(data);
    }
}
//# sourceMappingURL=GeoPoseBasicYPR.js.map