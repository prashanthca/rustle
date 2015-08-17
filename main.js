var app = require("app"),
BrowserWindow = require("browser-window"),
mainWindow = null,
Menu = require('menu'),
Tray = require('tray');
//app.commandLine.appendSwitch('enable-transparent-visuals');
app.on("ready", function () {
	mainWindow = new BrowserWindow({
		width: 1200,
		height: 700,
		show: false,
		frame: false,
		"min-width": 1200,
		"min-height": 700,
		icon: __dirname+'/assets/icons/rustle-128x128.png'
	});
	mainWindow.loadUrl("file://"+__dirname+"/index.html");
	mainWindow.show();
	mainWindow.on("close", function(){
		mainWindow = null;
	});
  appIcon = new Tray(__dirname+'/assets/icons/rustle-tray2.png');
  var contextMenu = Menu.buildFromTemplate([
  { 
  	label: 'Exit', 
  	type: 'normal', 
  	click: function(){
  		mainWindow.close();
  	} 
  }
  ]);
  appIcon.on('double-clicked', function(){
  	if(!mainWindow.isVisible())
  		mainWindow.show();
  });
  appIcon.setToolTip('Rustle - Music Application');
  appIcon.setContextMenu(contextMenu);
});