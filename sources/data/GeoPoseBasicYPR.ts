import { GeoPose } from "./GeoPose.js";
import { GeoPosition } from "./components/GeoPosition.js";
import { AngularRotation } from "./components/AngularRotation.js";
import { TemporalContext } from "./components/TemporalContext.js";
import { Uncertainty } from "./components/Uncertainty.js";


/** Creates a basic GeoPose with an angular rotation. */
export class GeoPoseBasicYPR extends GeoPose {

	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The location component of the GeoPose. */
	get location(): GeoPosition {
		return this._components.location as GeoPosition; 
	}

	/** The angles component of the GeoPose. */
	get angles(): AngularRotation {
		return this._components.angles as AngularRotation; 
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

	/** Initializes a new instance of the GeoPoseBasicYPR class.
	 * @param data The data of the instance. */
	constructor(data?: any) {

		// Call the base class constructor
		super();

		// Create the components of the GeoPose
		this._components.location = new GeoPosition();
		this._components.angles = new AngularRotation();
		this._components.time = new TemporalContext();
		this._components.uncertainty = new Uncertainty();

		// Indicate the required components
		this._requiredComponents.push('location', 'angles');

		// Deserialize the initialization data
		if (data) this.deserialize(data);
	}
}