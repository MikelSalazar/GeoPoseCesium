import { Component } from "../Component.js";

/** Defines a Rotation (based on yaw-pitch-roll angles) of a GeoPose. */
export class AngularRotation extends Component {

	// ------------------------------------------------------- PROTECTED FIELDS

	/** The rotation (in degrees) around the vertical axis. */
	protected _yaw: number;

	/** The rotation (in degrees) around the lateral axis. */
	protected _pitch: number;

	/** The rotation (in degrees) around the transversal axis. */
	protected _roll: number;


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The rotation (in degrees) around the vertical axis. */
	get yaw(): number { return this._yaw; }
	set yaw(newValue: number) { this._yaw = newValue; }

	/** The rotation (in degrees) around the lateral axis. */
	get pitch(): number { return this._pitch; }
	set pitch(newValue: number) { this._pitch = newValue; }

	/** The rotation (in degrees) around the transversal axis. */
	get roll(): number { return this._roll; }
	set roll(newValue: number) { this._roll = newValue; }


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the AngularRotation class.
	 * @param data The initialization data of the instance. */
	constructor(data?: any) {

		// Call the base class constructor
		super();

		// Initialize the fields
		this._yaw = 0; this._pitch = 0; this._roll = 0;
		
		// Check if there is data to deserialize
		if (data) this.deserialize(data);
	}


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the component from JSON data.
	 * @param data The JSON data to deserialize. */
	deserialize(data?: any) {
		if (data == undefined) throw Error('No Angular Rotation data');
		else if (typeof data == "object") {
			if (data.yaw) this.yaw = data.yaw;
			else if (data.y) this.yaw = data.y;
			if (data.pitch) this.pitch = data.pitch;
			else if (data.p) this.pitch = data.p;
			if (data.roll) this.roll = data.roll;
			else if (data.r) this.roll = data.r;
		} else throw Error('Invalid Angular Rotation data: ' + data);
	}


	/** Serializes the component into JSON data.
	 * @param optimize Indicates whether to optimize the JSON data.
	 * @returns The serialized JSON data . */
	serialize(optimize: boolean = true): any {
		if (optimize && this._yaw == 0 && this._pitch == 0 && this._roll == 0) 
			return undefined;
		return { yaw: this.yaw, pitch: this._pitch, roll: this._roll };
	}

}