import { Cartesian3, CesiumWidget, createGooglePhotorealistic3DTileset, HeadingPitchRoll, Transforms} from 'cesium'
import { Scene } from './logic/Scene.js';

/** Creates the main class of the Cesium implementation of OGC GeoPose. */
export class GeoPoseCesium {

	// ------------------------------------------------------- PROTECTED FIELDS

	/** The Cesium widget. */
	protected _widget: CesiumWidget;

	/** The title of the presentation. */
	protected _title: string;

	/** The description of the presentation. */
	protected _description: string;

	/** The scenes of the presentation. */
	protected _scenes: Scene[];

	/** The initial scene number. */
	protected _initialScene: number;

	/** The current scene number. */
	protected _currentScene: number;

	/** The current execution time. */
	protected _currentTime: number;

	/** The current Frames-Per-Second value. */
	protected _framesPerSecond: number;

	/** The time counter. */
	protected _timeCounter: number;

	/** The frame counter. */
	protected _frameCounter: number;


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The Cesium widget. */
	get widget(): CesiumWidget { return this._widget; }

	/** The title of the presentation. */
	get description(): string { return this._description; }

	/** The scenes of the presentation. */
	get scenes(): Scene[] { return this._scenes; }

	/** The current scene number. */
	get currentScene(): number { return this._currentScene; }
	set currentScene(newScene: number) {
		if (newScene == this._currentScene) return;
		if (newScene < 0 || newScene > this.scenes.length)
			throw Error('Invalid Scene number: ' + newScene);
		this._currentScene = newScene;
		console.log('Switched to scene: ' + newScene);
		let scene = this._scenes[newScene], camera = scene.camera;
		this._widget.camera.flyTo({ 
			destination: Cartesian3.fromDegrees(camera.location.longitude,
				camera.location.latitude, camera.location.height),
				orientation: HeadingPitchRoll.fromDegrees(
					-camera.angles.yaw + 90, // Convert Yaw (East) to heading.
					camera.angles.pitch, camera.angles.roll
				)
		});
	}


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the GeoPoseCesium class.
	 * @param data The initialization data of the instance. 
	 * @param parentElement The parent element. */
	constructor (data?: any, parentElement?: Element) { 

		// Initialize the fields
		this._title = ''; this._description = '';
		this._scenes = []; this._currentScene = -1; this._initialScene = 0;
		this._currentTime = 0; this._timeCounter = 0; 
		this._frameCounter = 0; this._framesPerSecond = 0;

		// Create the Cesium widget
		this._widget = new CesiumWidget(parentElement || document.body, {
			globe: false,
			// geocode: 
			// shadows: true,
			shouldAnimate: true,
		});

		// Show the sky
		this._widget.scene.skyAtmosphere.show = true;

		// Load the Google Maps 3D Tiles
		async function addGoogleTiles(viewer: CesiumWidget) {
			try {
				const tileset = await createGooglePhotorealistic3DTileset();
				viewer.scene.primitives.add(tileset);
			} catch (error) {
				console.log(`Failed to load tileset: ${error}`);
			}
		}
		addGoogleTiles(this._widget);


		// Make the canvas and the container occupy the entire space
		let canvas = this._widget.canvas, container = canvas.parentElement;
		canvas.style.width = canvas.style.height = '100%';
		container.style.width = container.style.height = '100%';

		// Check if there is data to deserialize
		if (data) this.deserialize(data);

		// If there is no scene, create a basic one
		// if (this.scenes.length == 0) {
		// 	this._scenes.push(new Scene({camera: {
		// 		location: {lat: 39.956, lon: -75.154, h: 100 },
		// 		angles: {yaw: 205, pitch: 0}
		// 	}}));
		// }

		// Load the entities of the different scenes
		for (let scene of this._scenes) {
			for (let entity of scene.entities) {
				const position = Cartesian3.fromDegrees(
					entity.pose.location.longitude,
					entity.pose.location.latitude,
					entity.pose.location.height),
					orientation = Transforms.headingPitchRollQuaternion(
  						position, new HeadingPitchRoll(
							-entity.pose.angles.yaw + 90,
							entity.pose.angles.pitch, 
							entity.pose.angles.roll
						));
				this._widget.entities.add({ name: entity.name,
					model: { uri : entity.model, scale: entity.scale },
					position: position, orientation: orientation
				});
			}
		}

		// Switch to the initial scene
		this.currentScene = this._initialScene;

		// Start updating the presentation
		this.update();
	}


	// --------------------------------------------------------- PUBLIC METHODS

	/** Updates the presentation. 
	 * @param time The time of the update (in milliseconds). */
 	update(time = 0) {

		// Handle the time calculations
		time = time/1000; this._timeCounter += time - this._currentTime; 
		this._currentTime = time; this._frameCounter++;
		if (this._timeCounter > 1) {
			this._framesPerSecond = this._frameCounter; this._frameCounter = 0;
			while (this._timeCounter > 1) this._timeCounter--;
			console.log('FPS: ' + this._framesPerSecond);
		}

		// Request a new update as soon as possible
		requestAnimationFrame(this.update.bind(this));
	}


	/** Deserializes the instance from JSON data.
	 * @param data The JSON data to deserialize. */
	deserialize(data?: any) {
		if (data == undefined) throw Error('No Scene data');
		else if (typeof data == "object") {
			if (data.scenes) {
				for (let sceneData of data.scenes)
					this._scenes.push(new Scene(sceneData));
			}
			if (data.scene) this._initialScene = data.scene;
		} else throw Error('Invalid Scene data: ' + JSON.stringify(data));
	}


	/** Serializes the instance into JSON data.
	 * @param optimize Indicates whether to optimize the JSON data.
	 * @returns The serialized JSON data . */
	serialize(optimize: boolean = true): any {
		
		// Serialize the scene data
		let scenes: any = [];
		for (let scene of this._scenes) scenes.push(scene.serialize());

		// Return the JSON data
		return {title: this._title, description: this._description, 
			scenes: scenes};
	}

}

