/** Defines a data component. */
export abstract class Component {

	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the component from JSON data.
	 * @param data The JSON data to deserialize. */
	deserialize(data?: any) {
		if (data == undefined) throw Error('No Component data');
	}


	/** Serializes the component into JSON data.
	 * @param optimize Indicates whether to optimize the JSON data.
	 * @returns The serialized JSON data . */
	serialize(optimize: boolean = true): any { return {}; }


	/** Obtains the string representation of the Component instance.
	 * @returns The string representation of the Component instance. */
	toString(): string {
		let data = this.serialize(false);
		if (data == undefined) return '(undefined)'
		return JSON.stringify( data, undefined, ' ')
			.replace(/\n/g, ' ').replace(/  /g, ' ');
	}
}