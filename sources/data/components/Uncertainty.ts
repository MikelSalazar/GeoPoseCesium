import { Component } from "../Component.js";

/** Defines a Uncertainty of a GeoPose. */
export class Uncertainty extends Component {

	// ------------------------------------------------------- PROTECTED FIELDS

	/** The horizontal uncertainty (in meters). */
	protected _horizontal: number;

	/** The vertical uncertainty (in meters). */
	protected _vertical: number;


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The horizontal uncertainty (in meters). */
	get horizontal(): number { return this._horizontal; }
	set horizontal(newValue: number) { this._horizontal = newValue; }
	
	/** The vertical uncertainty (in meters). */
	get vertical(): number { return this._vertical; }
	set vertical(newValue: number) { this._vertical = newValue; }


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the Uncertainty class.
	 * @param data The initialization data of the instance. */
	constructor(data?: any) {

		// Call the base class constructor
		super();

		// Initialize the fields
		this._horizontal = 0; this._vertical = 0;
		
		// Check if there is data to deserialize
		if (data) this.deserialize(data);
	}


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the component from JSON data.
	 * @param data The JSON data to deserialize. */
	deserialize(data?: any) {
		if (data == undefined) throw Error('No Uncertainty data');
		if (typeof data == "number") this.horizontal = this.vertical = data;
		else if (typeof data == "object") {
			if (data.h) this.horizontal = data.h;
			else if (data.horizontal) this.horizontal = data.horizontal;
			if (data.v) this.vertical = data.v;
			else if (data.vertical) this.vertical = data.altitude;
		} else throw Error('Invalid Uncertainty data: ' + data);
	}


	/** Serializes the component into JSON data.
	 * @param optimize Indicates whether to optimize the JSON data.
	 * @returns The serialized JSON data . */
	serialize(optimize: boolean = true): any {
		if (optimize) {
			if (this._horizontal == 0 && this._vertical == 0) return undefined;
			if (this._horizontal == this._vertical) return this._horizontal;
		}
		return { h: this._horizontal, v: this._vertical };
	}

}