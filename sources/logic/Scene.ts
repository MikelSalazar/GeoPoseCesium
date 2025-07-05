import { GeoPoseBasicYPR } from "../data/GeoPoseBasicYPR.js";
import { Entity } from "./Entity.js";

/** Define a scene. */
export class Scene {

	// ------------------------------------------------------- PROTECTED FIELDS

	/** The GeoPose of the camera of the Scene. */
	protected _camera: GeoPoseBasicYPR;

	/** The entities of the Scene. */
	protected _entities: Entity[];

	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The GeoPose of the camera of the Scene. */
	get camera(): GeoPoseBasicYPR { return this._camera; }


	/** The GeoPose of the camera of the Scene. */
	get entities(): Entity[] { return this._entities; }


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the Scene class.
	 * @param data The initialization data of the instance. */
	constructor(data?: any) {

		// Initialize the fields
		this._camera = new GeoPoseBasicYPR();
		this._entities = [];

		// Check if there is data to deserialize
		if (data) this.deserialize(data);
	}


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the instance from JSON data.
	 * @param data The JSON data to deserialize. */
	deserialize(data?: any) {
		if (data == undefined) throw Error('No Scene data');
		else if (typeof data == "object") {
			this._camera.deserialize(data.camera);
			for (let entityData of data.entities) 
				this._entities.push(new Entity(entityData));
		} else throw Error('Invalid Scene data: ' + JSON.stringify(data));
	}


	/** Serializes the instance into JSON data.
	 * @param optimize Indicates whether to optimize the JSON data.
	 * @returns The serialized JSON data . */
	serialize(optimize: boolean = true): any {
		return { camera: this._camera.serialize(optimize) };
	}

}