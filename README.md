# GeoPose-Cesium

🚧 Under Construction 🚧

An implementation of [OGC GeoPose standard](https://geopose.org) for the 
[Cesium JS library](https://cesium.com/platform/cesiumjs/).


## Installation

This project requires the installation of NodeJS: https://nodejs.org

Once NodeJS is installed, execute the following NPM (Node Package manager)
command in the project root folder to install the project dependencies 
(including the [Cesium JS library](https://www.npmjs.com/package/cesium) 
and the associated TypeScript declarations).

    npm install


## Building

To transpile the Typescript code, it is necessary to install the 
[TypeScript](https://www.typescriptlang.org/) compiler.

    npm install -g typescript

To initiate the building process, use the following command:

    npm run build


## Testing

While it is possible to launch the tests using a local HTML server 
(from tests/index.html), it is recommended to install 
[Electron](https://www.electronjs.org/) to have a better debugging environment.

    npm install -g electron

To launch the Electron-based test suite, use the following command:

    npm run test
