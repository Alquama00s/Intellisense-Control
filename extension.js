// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

async function set(switchOn) {
	//get the required settings
	//var req_settings_add = switchOn ? "./on_settings.json" : "./off_settings.json";
	var req_settings =switchOn ?{

		"editor.quickSuggestions": true,
	
		"editor.parameterHints": true,
	
		"editor.suggestOnTriggerCharacters": true,
	
		"editor.acceptSuggestionOnEnter": "on"
	}: {

		"editor.quickSuggestions": false,
	
		"editor.parameterHints": false,
	
		"editor.suggestOnTriggerCharacters": false,
	
		"editor.acceptSuggestionOnEnter": "off"
	};
	//console.log("r-sett");
	//console.log(req_settings)
	//get the settings
	var settings_add = process.env.HOME + "/.config/Code/User/settings.json";
	var set_data = await getObject(settings_add);
	//console.log("or-sett");
	//console.log(set_data)
	//modify the settings
	for (var s in req_settings) {
		set_data[s] = req_settings[s];
	}
	//console.log("orm-sett");
	//console.log(set_data);
	//set back the settings
	var new_sett = JSON.stringify(set_data);
	
	fs.writeFile(settings_add, new_sett, (err) => {
		if (err) {
			throw err;
		}
		//console.log("JSON data is saved.");
	});
}


async function getObject(add) {
	return new Promise(resolve =>
		fs.readFile(add, 'utf8', (err, jsonString) => {
			if (err) {
				//console.log("Error reading file from disk:", err);
				return;
			}
			try {
				resolve(JSON.parse(jsonString));
			} catch (err) {
				//console.log('Error parsing JSON string:', err);
			}
		}));
}
/**
 * @param {vscode.ExtensionContext} context
 */

function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	//console.log('Congratulations, your extension "intell-control" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let activate = vscode.commands.registerCommand('intell-control.activate', function () {
		// The code you place here will be executed every time your command is executed
		set(true);
		// Display a message box to the user
		vscode.window.showInformationMessage('intellisense activated');

	});

	let deactivate = vscode.commands.registerCommand('intell-control.deactivate', function () {
		// The code you place here will be executed every time your command is executed
		set(false);
		// Display a message box to the user
		vscode.window.showInformationMessage('intellisense deactivated');

	});

	context.subscriptions.push(activate);
	context.subscriptions.push(deactivate);
}

// this method is called when your extension is deactivated
function deactivate() {
	//console.log("deactivated");
 }

module.exports = {
	activate,
	deactivate
}
