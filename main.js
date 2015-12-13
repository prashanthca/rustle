var app = require("app"),
BrowserWindow = require("browser-window"),
mainWindow = null,
Menu = require('menu'),
Tray = require('tray'),
express = require('express')(),
http = require('http'),
server = http.Server(express),
io = require("socket.io")(server),
fs = require("fs"),
file = __dirname+"/assets/rustle.db",
exists = fs.existsSync(file),
sqlite3 = require("sqlite3").verbose();

express.get('/:str', function(req, res){
	var rarr = {};
	rarr.result = "success";
	rarr.message = req.params.str.split('').reverse().join('');
	res.set('Content-type','application/json');
	res.send(rarr);
});

express.get('/', function(req, res){
	res.set('Content-type','application/json');
	res.send({"result":"error","message":"Invalid input"});
});
app.on("ready", function () {
	if(!exists) {
  		console.log("Creating DB file");
		fs.openSync(file, "w");
	}
	var db = new sqlite3.Database(file);
	mainWindow = new BrowserWindow({
		width: 1200,
		height: 700,
		show: false,
		frame: false,
		"min-width": 1200,
		"min-height": 700,
		icon: __dirname+'/assets/icons/rustle-128x128.png'
	});
	mainWindow.loadURL("file://"+__dirname+"/index.html");
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
	db.serialize(function() {
		if(!exists)
		{
			db.run("CREATE TABLE tracks (id INT(11) PRIMARY KEY, name VARCHAR(30) NOT NULL, artist VARCHAR(30) NOT NULL, length VARCHAR(50), added TIMESTAMP)");
		}
	});
	db.close();
});

io.sockets.on('connection', function(socket){
	console.log("Connection established");
});

server.listen(3000, function(){
	console.log('listening on *:3000');
});