import { Component } from "../Component.js";

/** Defines a Rotation (based on a quaternion) of a GeoPose. */
export class QuaternionRotation extends Component {

	// ------------------------------------------------------- PROTECTED FIELDS

	/** The X element of the quaternion. */
	protected _x: number;

	/** The Y element of the quaternion. */
	protected _y: number;

	/** The Z element of the quaternion. */
	protected _z: number;

	/** The W (scalar) element of the quaternion. */
	protected _w: number;

	/** The epsilon value for validation. */
	protected static _epsilon: number = 0.0001;


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The X element of the quaternion. */
	get x(): number { return this._x; }
	set x(newValue: number) { this._x = newValue; }

	/** The Y element of the quaternion. */
	get y(): number { return this._y; }
	set y(newValue: number) { this._y = newValue; }

	/** The Z element of the quaternion. */
	get z(): number { return this._z; }
	set z(newValue: number) { this._z = newValue; }

	/** The W (scalar) element of the quaternion. */
	get w(): number { return this._w; }
	set w(newValue: number) { this._w = newValue; }

	/** Checks if the unit quaternion is valid */
	get isUnit(): boolean {
		let v = (this._x * this._x) + (this._y * this._y) + 
			(this._z * this._z) + (this._w * this._w);
		return v > 1 - QuaternionRotation._epsilon &&
				v < 1 + QuaternionRotation._epsilon;
	}


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the QuaternionRotation class.
	 * @param data The initialization data of the instance. */
	constructor(data?: any) {

		// Call the base class constructor
		super();

		// Initialize the fields
		this._x = 0; this._y = 0; this._z = 0; this._w = 1;
		
		// Check if there is data to deserialize
		if (data) this.deserialize(data);
	}


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the component from JSON data.
	 * @param data The JSON data to deserialize. */
	deserialize(data?: any) {
		if (data == undefined) throw Error('No Quaternion Rotation data');
		else if (typeof data == "object") {
			if (data.x) this.x = data.x;
			if (data.y) this.y = data.y;
			if (data.z) this.z = data.z;
			if (data.w) this.w = data.w;
			if (!this.isUnit) throw Error('Quaternion is not unitary');
		} else throw Error('Invalid Quaternion Rotation data: ' + data);
	}


	/** Serializes the component into JSON data.
	 * @param optimize Indicates whether to optimize the JSON data.
	 * @returns The serialized JSON data . */
	serialize(optimize: boolean = true): any {
		if (optimize && this._x == 0 && this._y == 0 && this._z == 0 && 
			this._w == 1 ) return undefined;
		return { x: this._x, y: this._y, z: this._z, w: this._w };
	}

	
}