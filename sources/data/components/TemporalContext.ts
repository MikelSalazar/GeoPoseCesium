import { Component } from "../Component.js";

/** Defines a (valid) TemporalContext component of a GeoPose. */
export class TemporalContext extends Component {

	// ------------------------------------------------------- PROTECTED FIELDS

	/** The initial timestamp of the temporal context. */
	protected _timestamp: number;

	/** The duration of the temporal context. */
	protected _duration: number;


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The initial timestamp of the temporal context. */
	get timestamp(): number { return this._timestamp; }
	set timestamp(newValue: number) { this._timestamp = newValue; }
	
	/** The duration of the temporal context. */
	get duration(): number { return this._duration; }
	set duration(newValue: number) { this._duration = newValue; }


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the TemporalContext class.
	 * @param data The initialization data of the instance. */
	constructor(data?: any) {

		// Call the base class constructor
		super();

		// Initialize the fields
		this.timestamp = 0; this._duration = 0;
		
		// Check if there is data to deserialize
		if (data) this.deserialize(data);
	}


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the component from JSON data.
	 * @param data The JSON data to deserialize. */
	deserialize(data?: any) {
		if (data == undefined) throw Error('No Time data');
		if (typeof data == "number") { 
			this.timestamp = data; this.duration = 0 
		} else if (typeof data == "object") {
			if (data.timestamp) this.timestamp = data.timestamp;
			if (data.duration) this.duration = data.duration;
		} else throw Error('Invalid Time data: ' + data);
	}


	/** Serializes the component into JSON data.
	 * @param optimize Indicates whether to optimize the JSON data.
	 * @returns The serialized JSON data . */
	serialize(optimize: boolean = true): any {
		if (optimize) {
			if (this._timestamp == 0 && this._duration == 0) return undefined;
			if (this._duration == 0) return this._timestamp;
		}
		return { timestamp: this._timestamp, duration: this._duration };
	}

}