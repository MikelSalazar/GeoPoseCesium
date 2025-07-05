import { Component } from "../Component.js";


/** Defines a Geographic Position of a GeoPose. */
export class GeoPosition extends Component {

	// ------------------------------------------------------- PROTECTED FIELDS

	/** The angular distance (in degrees) from the Equator. */
	protected _latitude: number;

	/** The angular distance (in degrees) from the Greenwich meridian. */
	protected _longitude: number;

	/** The vertical distance (in meters) in meters over the WGS84 ellipsoid. */
	protected _height: number;


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The angular distance (in degrees) from the Equator. */
	get latitude(): number { return this._latitude; }
	set latitude(newValue: number) {
		if (this._latitude == newValue) return;
		if (this._latitude < -90 || this._latitude > 90)
			console.warn('Latitude values should be in the [-90, 90] range');
		this._latitude = newValue;
	}


	/** The angular distance (in degrees) from the Greenwich meridian. */
	get longitude(): number { return this._longitude; }
	set longitude(newValue: number) {
		if (this._longitude == newValue) return;
		if (this._longitude < -180 || this._longitude > 180)
			console.warn('Longitude values should be in the [-180, 180] range');
		this._longitude = newValue;
	}


	/** The vertical distance (in meters) in meters over the WGS84 ellipsoid. */
	get height(): number { return this._height; }
	set height(newValue: number) { this._height = newValue; }


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the GeoPosition class.
	 * @param data The initialization data of the instance. */
	constructor(data?: any) {

		// Call the base class constructor
		super();

		// Initialize the fields
		this._latitude = 0; this._longitude = 0; this._height = 0;
		
		// Check if there is data to deserialize
		if (data) this.deserialize(data);
	}


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the component from JSON data.
	 * @param data The JSON data to deserialize. */
	deserialize(data?: any) {
		if (data == undefined) throw Error('No GeoPosition data');
		else if (typeof data == "object") {
			if (data.lat) this.latitude = data.lat;
			else if (data.latitude) this.latitude = data.lat;
			if (data.lon) this.longitude = data.lon;
			else if (data.longitude) this.longitude = data.longitude;
			if (data.h) this.height = data.h;
			else if (data.height) this.height = data.height;
		} else throw Error('Invalid GeoPosition data: ' + data);
	}


	/** Serializes the component into JSON data.
	 * @param optimize Indicates whether to optimize the JSON data.
	 * @returns The serialized JSON data . */
	serialize(optimize: boolean = true): any {
		if (optimize && this._latitude == 0 && this._longitude == 0 && 
			this._height == 0) return undefined;
		return { lat: this._latitude, lon: this._longitude, h: this._height };
	}

}