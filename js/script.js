window.$ = window.jQuery = require(__dirname+"/js/jquery.js");
var remote = require("remote"),
BrowserWindow = remote.require("browser-window");

$(document).ready(function(){
	BrowserWindow.getFocusedWindow().on('maximize',function(){
		$("#content,#main,#header").addClass('maximized');
	});
	BrowserWindow.getFocusedWindow().on('unmaximize',function(){
		$("#content,#main,#header").removeClass('maximized');
	});
	$("#header").dblclick(function(){
		var w = BrowserWindow.getFocusedWindow();
		if($("#content").hasClass("maximized"))
		{
			w.maximize();
		}
		else
		{
			w.unmaximize();
		}
	})
	$("#min-btn").click(function(){
		var w = BrowserWindow.getFocusedWindow();
		w.minimize();
	});
	$("#max-btn").click(function(){
		var w = BrowserWindow.getFocusedWindow();
		if(w.isMaximized())
		{
			w.unmaximize();
		}
		else
		{
			w.maximize();
		}
	});
	$("#close-btn").click(function(){
		var w = BrowserWindow.getFocusedWindow();
		w.close();
	});
	$("#traffic-lights li").each(function(){
		$(this).mouseover(function(){
			$(this).addClass("icon-after");
		}).mouseout(function(){
			$(this).removeClass("icon-after");
		});
	});
});

$(document).keydown(function(e){
	if(e.keyCode == 81 && e.ctrlKey == true) { 
		BrowserWindow.getFocusedWindow().openDevTools();
        return false;
    }
});