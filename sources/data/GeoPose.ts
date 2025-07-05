import { Component } from "./Component.js";

/** Defines an abstract OGC GeoPose */
export abstract class GeoPose {

	// ------------------------------------------------------- PROTECTED FIELDS

	/** The components of the GeoPose. */
	protected _components: Record<string, Component>;

	/** The names of the required components of the GeoPose. */
	protected _requiredComponents: string[];


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the GeoPose class.
	 * @param data The initialization data of the instance. */
	constructor(data?: any) {

		// Initialize the fields
		this._components = {}; this._requiredComponents = [];
		
		// Check if there is data to deserialize
		if (data) this.deserialize(data);
	}


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the component from JSON data.
	 * @param data The JSON data to deserialize. */
	deserialize(data?: any) {
		if (data == undefined) throw Error('No GeoPose data');
		else if (typeof data == "object") {
			for (let name of this._requiredComponents) {
				if (data[name] == undefined)
					throw Error('Required component not found: "' + name + '"');
			}
			for (let name in data) {
				if (this._components[name])
					this._components[name].deserialize(data[name]);
				else throw Error('There is no component named: "' + name + '"');
			}
		} else throw Error('Invalid GeoPose data: ' + JSON.stringify(data));
	}


	/** Serializes the component into JSON data.
	 * @param optimize Indicates whether to optimize the JSON data.
	 * @returns The serialized JSON data . */
	serialize(optimize: boolean = true): any {
		let data: any = {};
		for (let componentName in this._components) {
			let value = this._components[componentName].serialize(optimize && 
				!this._requiredComponents.includes(componentName));
			if (value != undefined) data[componentName] = value;
		}
		return data;
	}


	/** Obtains the string representation of the Component instance.
	 * @param optimize Indicates whether to optimize the JSON data.
	 * @returns The string representation of the Component instance. */
	toString(optimize: boolean = true): string {
		return JSON.stringify(this.serialize(optimize), undefined, '\t')
		.replace(/\n\t(\t)/g, ' ').replace(/\n\t}/g, ' }');
	}
}


