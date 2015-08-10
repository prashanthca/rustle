var app = require("app"),
BrowserWindow = require("browser-window"),
mainWindow = null;
//app.commandLine.appendSwitch('enable-transparent-visuals');
app.on("ready", function () {
	mainWindow = new BrowserWindow({
		width: 1200,
		height: 700,
		show: false,
		frame: false,
		icon: __dirname+'/assets/icons/rustle.png'
	});
	mainWindow.loadUrl("file://"+__dirname+"/index.html");
	mainWindow.show();
	mainWindow.on("close", function(){
		mainWindow = null;
	});
});