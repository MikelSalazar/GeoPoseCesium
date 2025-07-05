/******************************************************************************
 GeoPose-Cesium test utility
 Am electron script to launch the web-based test environment.
******************************************************************************/

// ------------------------------------------------------------- GLOBAL IMPORTS

import { app, BrowserWindow } from 'electron';


// ---------------------------------------------------------- UTILITY FUNCTIONS

/** Creates the Electron window. */
function createWindow () {

	// Define the window properties
	const window = new BrowserWindow({ width: 800, height: 600,
		show: false,			// Start hidden
		fullScreen: true,		// Remove the menu
		darkTheme: true,		// Dark mode
		autoHideMenuBar: true,	// Hide the menu
	});

	// Open the right HTML file
	window.loadFile('../tests/index.html');
	
	// Activate the development tools
	window.webContents.openDevTools();
	
	// Show the window when possible
	window.once('ready-to-show', () => { window.maximize(); window.show(); });
}


// ---------------------------------------------------------------- ENTRY POINT

// Disable the security warnings
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

// Create the window as soon as possible
app.whenReady().then(createWindow);

// Stop the process when the window is closed
app.on('window-all-closed', () => { app.quit() });
