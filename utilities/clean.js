/******************************************************************************
 * GeoPose-Cesium  clean utility
 * A NodeJS script to properly clean the build files.
******************************************************************************/

// ------------------------------------------------------------- GLOBAL IMPORTS

import * as fs from 'fs';		// File System management
import * as path from 'path';	// File Path handling
import * as url from 'url';		// Universal Resource Locator handling


// ----------------------------------------------------------- GLOBAL CONSTANTS

/* The folder path. */
const currentFolderPath = url.fileURLToPath(new URL('.', import.meta.url));


// ---------------------------------------------------------- UTILITY FUNCTIONS

/** Recursively deletes the contents of a folder.
* @param folderPath The path of the folder to clean. 
* @param removeFolder Whether to remove the folder afterwards or not. */
function cleanFolder(folderPath, removeFolder = false) {
	let filePaths = fs.readdirSync(folderPath);
	filePaths.forEach(filePath => {
		filePath = path.join(folderPath, filePath);
		if (fs.lstatSync(filePath).isFile()) fs.unlinkSync(filePath);
		else cleanFolder(filePath, true);
	});
	if(removeFolder) fs.rmdirSync(folderPath);
}


// ---------------------------------------------------------------- ENTRY POINT

// Show an initial message
console.log('Cleaning Builds Folder...');
let absoluteFolderPath = cleanFolder(path.join(currentFolderPath, '../builds'));

// Show a message to indicate everything went well
console.log('ALL DONE');