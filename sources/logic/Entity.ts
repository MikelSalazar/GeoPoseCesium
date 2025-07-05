import { GeoPoseBasicYPR } from "../data/GeoPoseBasicYPR.js";

/** Define an entity. */
export class Entity {

	// ------------------------------------------------------- PROTECTED FIELDS

	/** The name of the Entity. */
	protected _name: string;

	/** The GeoPose that sets the position and orientation of the Entity. */
	protected _pose: GeoPoseBasicYPR;

	/** The scale of the entity of the Entity. */
	protected _scale: number;

	/** The path of the 3D model of the Entity. */
	protected _model: string;


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The name of the Entity. */
	get name(): string { return this._name; }

	/** The GeoPose that sets the position and orientation of the entity. */
	get pose(): GeoPoseBasicYPR { return this._pose; }

	/** The scale of the entity of the Entity. */
	get scale(): number { return this._scale; }

	/** The path of the 3D model of the Entity. */
	get model(): string { return this._model; }


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the Entity class.
	 * @param data The initialization data of the instance. */
	constructor(data?: any) {

		// Initialize the fields
		this._name = 'Entity';
		this._pose = new GeoPoseBasicYPR();
		this._scale = 1;
		this._model = '';

		// Check if there is data to deserialize
		if (data) this.deserialize(data);
	}


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the instance from JSON data.
	 * @param data The JSON data to deserialize. */
	deserialize(data?: any) {
		if (data == undefined) throw Error('No Scene data');
		else if (typeof data == "object") {
			if (data.name != undefined) this._name = data.name;
			this._pose.deserialize(data.pose);
			if (data.scale != undefined) this._scale = data.scale;
			if (data.model != undefined) this._model = data.model;
		} else throw Error('Invalid Scene data: ' + JSON.stringify(data));
	}


	/** Serializes the instance into JSON data.
	 * @param optimize Indicates whether to optimize the JSON data.
	 * @returns The serialized JSON data . */
	serialize(optimize: boolean = true): any {
		let data: any = { name: this.name,
			pose: this._pose.serialize(optimize) };
		if (this._scale != 1) data.scale = this._scale;
		if (this._model != undefined) data.model = this._model;
		return data;
	}

}