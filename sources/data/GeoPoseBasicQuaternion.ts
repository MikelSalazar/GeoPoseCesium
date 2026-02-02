import { GeoPose } from "./GeoPose.js";
import { GeoPosition } from "./components/GeoPosition.js";
import { TemporalContext } from "./components/TemporalContext.js";
import { QuaternionRotation } from "./components/QuaternionRotation.js";
import { Uncertainty } from "./components/Uncertainty.js";


/** Creates a basic GeoPose with a quaternion rotation. */
export class GeoPoseBasicQuaternion extends GeoPose {

	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The location component of the GeoPose. */
	get location(): GeoPosition {
		return this._components.location as GeoPosition; 
	}

	/** The quaternion component of the GeoPose. */
	get quaternion(): QuaternionRotation {
		return this._components.quaternion as QuaternionRotation; 
	}

	/** The time component of the GeoPose. */
	get time(): TemporalContext {
		return this._components.time as TemporalContext; 
	}

	/** The uncertainty component of the GeoPose. */
	get uncertainty(): Uncertainty {
		return this._components.uncertainty as Uncertainty; 
	}

	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the GeoPoseBasicQuaternion class.
	 * @param data The initialization data of the instance. */
	constructor(data?: any) {

		// Call the base class constructor
		super();

		// Create the components of the GeoPose
		this._components.location = new GeoPosition();
		this._components.quaternion = new QuaternionRotation();
		this._components.time = new TemporalContext();
		this._components.uncertainty = new Uncertainty();

		// Indicate the required components
		this._requiredComponents.push('location', 'quaternion');

		// Deserialize the initialization data
		if (data) this.deserialize(data);
	}
}