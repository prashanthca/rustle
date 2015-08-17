window.$ = window.jQuery = require(__dirname+"/js/jquery.js");
var remote = require("remote"),
BrowserWindow = remote.require("browser-window"),
Tray = remote.require("tray"),
mplayer;

$(document).ready(function(){
	mplayer = document.getElementById("mplayer-audio");

	BrowserWindow.getFocusedWindow().on('maximize',function(){
		$("#content,#main,#header").addClass('maximized');
	});
	BrowserWindow.getFocusedWindow().on('unmaximize',function(){
		$("#content,#main,#header").removeClass('maximized');
	});
	$("#mp-playpause").click(function(){
		if($(this).attr("state")=="playing")
		{
			mplayer.pause();
			$(this).attr("state","paused");
			$(this).removeClass("pause");
		}
		else
		{
			mplayer.play();
			$(this).attr("state","playing");
			$(this).addClass("pause");
		}
	});
	$("#add-track-btn").click(function(e) {
		if($(this).attr("state")=="close") {
			$(this).attr("state","open");
			$("#add-track-options").show();
		}
		else {
			$(this).attr("state","close");
			$("#add-track-options").hide();	
		}
	});
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
		w.hide();
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
	else if(e.keyCode == 82 && e.ctrlKey == true)
	{
		e.preventDefault();
	}
});

$(document).click(function(e){
	if(e.target.id !== "add-track-btn" && $("#add-track-btn").attr("state") === "open") {
		$("#add-track-btn").trigger("click");
	}
});