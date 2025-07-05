import { TestConsole } from './TestConsole.js'

// ----------------------------------------------------- TEST ENVIRONMENT CLASS

/** Creates a test environment. */
export class TestEnvironment {

	/** Initializes a new instance of the TestEnvironment class. 
	 * @param params the initialization parameters.
	 * @param params.title The title of the test.
	 * @param params.visible The visibility of the panel.
	 * @param params.size The size of the panel.
	 * @param params.toggleKey The key to toggle the visibility of the panel. */
	constructor(params = {}) {
		// Make this a singleton instance
		if (TestEnvironment.instance) throw Error('Repeated TestEnvironment');
		TestEnvironment.instance = this;

		// Create a list of test groups
		this.tests = []; this.testGroups = []; 
	
		// Initialize the variables
		this.stopOnInvalidTest = false; 
		this.runningTests = false;
		this.validTests = 0; this.invalidTests = 0;
		this.delay = params.delay || 10;
	}


	/** Shows a message on the console. 
	 * @param message The message to display.
	 * @param {*} tabs The tabulation level of the log message.
	 * @param {*} color The color of the log message.
	 * @param {*} maxTabs The maximum tabulation level of the log message.
	 * @param {*} callback The callback of the log message.
	 * @param {*} stack The stack of the log message. */
	log(message = '', tabs = 0, color = null, maxTabs = 0, callback, stack) { 
		if (!TestConsole) console.log(message);
		else TestConsole.instance.log(message, tabs, color, maxTabs, 
				callback, stack)
	}


	/** Inspects an serializable object on console.
	 * @param label The label to show.
	 * @param serializable The serializable object to show. 
	 * @param {*} tabs The tabulation level of the log message. */
	inspect(label, serializable, tabs = 4) {
		let data = serializable; while (data.serialize) data = data.serialize();
		let text = JSON.stringify(data, null, ' ');
		if ((label.length + 2 + text.length) > 80) {
			this.log(label + ': ', tabs);
			if (text.length > 80) text = JSON.stringify(data, null, ' ');
			this.log(text, tabs);
		} else this.log(label + ': ' +  text, tabs);
	}


	/** Runs the tests. */
	start() {
		// Reinitialize the variables
		this.runningTests = true;
		this.currentTest = 0; this.currentGroup = null;
		this.validTests = 0; this.invalidTests = 0;

		// Show a text on console
		console.log('TESTS STARTED');
		
		// Create the test runner
		this.testRunner = setInterval(() => {
			if (!this.runningTests) {
				console.log('TESTS MANUALLY STOPPED' + ' (OKs: ' + 
					this.validTests + ', Errors: ' + this.invalidTests + ')'); 
				clearInterval(this.testRunner);
				return;
			}
			if (this.currentTest >= this.tests.length) {
				console.log(''); console.log('TESTS COMPLETED ' + ' (OKs: ' + 
					this.validTests + ', Errors: ' + this.invalidTests + ')'); 
				clearInterval(this.testRunner); this.runningTests = false;
				return;
			}		

			// Get the test
			let test = this.tests[this.currentTest], valid; 

			// Check the current test group
			if (this.currentGroup != test.group) {
				this.currentGroup = test.group;
				console.log(); console.log(test.group.name.toUpperCase() + 
					(!test.group.enabled? ' (DISABLED)' : ''));
			}

			// Check the current test group
			if (test.group.enabled) {;
				try { valid = test.run(); }
				catch (e) {
					clearInterval(this.testRunner); this.runningTests = false;
					console.error('Error in test "' + test.name + '":' + e.message);
					throw e;
					return;
				}

				if (valid) this.validTests++; else this.invalidTests++;
				if (!valid && this.stopOnInvalidTest) {
						console.log('TESTS STOPPED ON INVALID TEST' + ' (OKs: ' + 
						this.validTests + ', Errors: ' + this.invalidTests + ')'); 
					clearInterval(this.testRunner); this.runningTests = false;
					return;
				}
			}


			// Check the current test
			this.currentTest++;
			if (this.currentTest >= this.tests.length) {
				console.log(''); console.log('TESTS COMPLETED ' + ' (OKs: ' + 
					this.validTests + ', Errors: ' + this.invalidTests + ')'); 
				clearInterval(this.testRunner); this.runningTests = false;
				return;
			}
		}, this.delay)
	}
}

// ----------------------------------------------------------- TEST GROUP CLASS

/** Defines a group of unit tests. */
export class TestGroup {

	/** Initializes a new TestGroup instance.
	 * @param {string} name The name of the test group.
	 * @param {TestEnvironment} environment The test environment. 
	 * @param {boolean} enabled Whether the test group is enabled or not. */
	constructor(name, environment, enabled = true) {
		if (!name) throw Error('Invalid name for test "' + name + '"');
		this.name = name; 
		if (!environment)throw Error('No test environment provided for' + name);
		this.environment = environment; this.environment.testGroups.push(this); 
		this.enabled = enabled; this.tests = [];
	}

	/** Runs the test group. */
	add(test) { this.tests.push(test); this.environment.tests.push(test); }
}


// ----------------------------------------------------------------- TEST CLASS

/** Defines a unit test. */
export class Test {

	/** Initializes a new Test instance.
	 * @param {string} name The name of the test.
	 * @param {TestGroup} group The test group.
	 * @param {*} code The code (function callback) to validate.
	 * @param {*} expectedResult The expected result. */
	constructor(name, group, code, expectedResult) {
		if (!name) throw Error('Invalid name for test "' + name + '"');
		this.name = name;  this.code = code; 
		this.expectedResult = expectedResult;
		this.group = group; if (group) group.add(this);
	}


	/** Runs the test. 
	 * @returns A boolean value with the validity of the test. */
	run() {

		// Write the name of the test
		TestEnvironment.instance.log(this.name + ':', 2);

		// Execute the given code
		let result = '', stack = '', valid = false, 
		expected = this.expectedResult;

		try { 
			result = this.code();
			if (result && result.toString) result = result.toString();
		} catch (e) { 
			result = 'ERROR: ' + e.message; 
			if (!result.startsWith(expected)) {
				TestEnvironment.instance.log(stack = e.stack);
			}
		}

		if (expected != undefined) {
			if (result == undefined) result = 'Undefined Result';
			else if (typeof expected == 'string') 
				valid = result.toString().startsWith(expected);  
			else if (typeof expected == 'object') {
				for (let key in expected) {
					valid == (expected[key] == result[key]);
					if (valid == false) break;
				}
			}
			else if (isNaN(expected)) valid = isNaN(result);
			else valid = result === expected;
		} else if (!result) valid = true;
		else valid = !result.toString().toLowerCase().startsWith('error');

		// Convert the expected and result values into human readable text
		if (typeof expected != 'string') expected = JSON.stringify(expected);
		else expected = '"' + expected + '"'
		if (typeof result == "undefined") result = "OK (undefined)"
		else if (typeof result == 'object') 
			try {
				result = JSON.stringify(result, null, ' ');
				if (result.length < 80) result = result.replaceAll('\n', ' ');
			} catch(e) { result = e.message; valid = false; }
		else if (typeof result != 'string') {
			if (isNaN(result)) result = 'NaN';
			else result = JSON.stringify(result);
		} 
		else if (result && result[0] == '"') {
			result = result.replaceAll("\\", 'a');
		}
		// else if (result && result[0] != '{' && result[0] != '['  &&	
		// 	!result.startsWith('ERROR'))
		// 	result = '"' + result + '"';


		if (valid) TestEnvironment.instance.log(result, 1, 'green');
		else TestEnvironment.instance.log('ERROR: ' + (expected? 'Expected: ' + 
			expected + '': '') + (result? ' Result: ' + result : ''), 1, 'red');

		return valid;
	}
}
