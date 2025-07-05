import { Cartesian3, CesiumWidget, createGooglePhotorealistic3DTileset, HeadingPitchRoll, Transforms } from 'cesium';
import { Scene } from './logic/Scene.js';
export class GeoPoseCesium {
    get widget() { return this._widget; }
    get description() { return this._description; }
    get scenes() { return this._scenes; }
    get currentScene() { return this._currentScene; }
    set currentScene(newScene) {
        if (newScene == this._currentScene)
            return;
        if (newScene < 0 || newScene > this.scenes.length)
            throw Error('Invalid Scene number: ' + newScene);
        this._currentScene = newScene;
        console.log('Switched to scene: ' + newScene);
        let scene = this._scenes[newScene], camera = scene.camera;
        this._widget.camera.flyTo({
            destination: Cartesian3.fromDegrees(camera.location.longitude, camera.location.latitude, camera.location.height),
            orientation: HeadingPitchRoll.fromDegrees(-camera.angles.yaw + 90, camera.angles.pitch, camera.angles.roll),
            duration: 0
        });
    }
    constructor(data, parentElement) {
        this._title = '';
        this._description = '';
        this._scenes = [];
        this._currentScene = -1;
        this._initialScene = 0;
        this._currentTime = 0;
        this._timeCounter = 0;
        this._frameCounter = 0;
        this._framesPerSecond = 0;
        this._widget = new CesiumWidget(parentElement || document.body, {
            globe: false,
        });
        this._widget.scene.skyAtmosphere.show = true;
        async function addGoogleTiles(viewer) {
            try {
                const tileset = await createGooglePhotorealistic3DTileset({
                    onlyUsingWithGoogleGeocoder: true
                });
                viewer.scene.primitives.add(tileset);
            }
            catch (error) {
                console.log(`Failed to load tileset: ${error}`);
            }
        }
        addGoogleTiles(this._widget);
        let canvas = this._widget.canvas, container = canvas.parentElement;
        canvas.style.width = canvas.style.height = '100%';
        container.style.width = container.style.height = '100%';
        if (data)
            this.deserialize(data);
        for (let scene of this._scenes) {
            for (let entity of scene.entities) {
                const position = Cartesian3.fromDegrees(entity.pose.location.longitude, entity.pose.location.latitude, entity.pose.location.height), orientation = Transforms.headingPitchRollQuaternion(position, new HeadingPitchRoll(-entity.pose.angles.yaw + 90, entity.pose.angles.pitch, entity.pose.angles.roll));
                this._widget.entities.add({ name: entity.name,
                    model: { uri: entity.model, scale: entity.scale },
                    position: position, orientation: orientation
                });
            }
        }
        this.currentScene = this._initialScene;
        this.update();
    }
    update(time = 0) {
        time = time / 1000;
        this._timeCounter += time - this._currentTime;
        this._currentTime = time;
        this._frameCounter++;
        if (this._timeCounter > 1) {
            this._framesPerSecond = this._frameCounter;
            this._frameCounter = 0;
            while (this._timeCounter > 1)
                this._timeCounter--;
            console.log('FPS: ' + this._framesPerSecond);
        }
        requestAnimationFrame(this.update.bind(this));
    }
    deserialize(data) {
        if (data == undefined)
            throw Error('No Scene data');
        else if (typeof data == "object") {
            if (data.scenes) {
                for (let sceneData of data.scenes)
                    this._scenes.push(new Scene(sceneData));
            }
            if (data.scene)
                this._initialScene = data.scene;
        }
        else
            throw Error('Invalid Scene data: ' + JSON.stringify(data));
    }
    serialize(optimize = true) {
        let scenes = [];
        for (let scene of this._scenes)
            scenes.push(scene.serialize());
        return { title: this._title, description: this._description,
            scenes: scenes };
    }
}
//# sourceMappingURL=GeoPoseCesium.js.map