//var urlGetVideoStream = "http://10.3.2.168/tvod0315/?q=external_device/getURL&video_id="
var _videoType = "&video_type=";

var _plugin = null;
var url = "";
var urlSubtitle = "";
var isFullScreen = false;
var isFirstPress = true;

var selectedMovieType = "0";

var currentStatus = "stop";


//For subtitle
var subtitles = {};
var currentTime;
var srtdata;
var currentSubtitle = -1;
//end variable for subtitle

var isFromSelect = false;

var totalTime = 0;

var w, h, ratio,x,y;
var pluginAPI;

var myTimeout;

var isReady = false;
var isStretch = false;

var DURATION_BAR = 730;

function ScenePlayer(options) {
	this.options = options;
}

ScenePlayer.prototype.initialize = function () {
	logger("ScenePlayer.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here 
	// scene HTML and CSS will be loaded before this function is called
	
	//Audio.plugin.SetSystemMute(false);
	if (isLive) {
		$('#svecKeyHelp_XX0C').sfKeyHelp({
			'blue':'Stretch <=> Origin',
			'enter':'Full Screen',
			'stop':'',
			'pause':'',
			'play': 'Điều khiển Video',
			'return':'Quay lại'
		});
	} else {
		$('#svecKeyHelp_XX0C').sfKeyHelp({
		'blue':'Stretch <=> Origin',
		'enter':'Full Screen',
		'rew':'',
		'ff':'Tua',
		'stop':'',
		'pause':'',
		'play': 'Điều khiển Video',
		'return':'Quay lại'
		});
	}
	Audio.init();
}
ScenePlayer.prototype.handleKeyDown = function (keyCode) {
	logger("ScenePlayer.handleKeyDown(" + keyCode + ")");
	// TODO : write an key event handler when this scene get focued
	switch (keyCode) {
		case sf.key.BLUE:
		{
			if(isStretch == false)
			{
				document.getElementById("playerLoadingImage").style.top = "250";
				document.getElementById("playerLoadingImage").style.left = "460px"; 
					
				var wrapper = document.getElementById("wrapper_player");
				wrapper.style.width = "0px";
				wrapper.style.height = "0px";
				
				document.getElementById("desc_id").style.display = "none";
				document.getElementById("desc_text").style.display = "none";
				document.getElementById("top_account").style.display = "none";
				
				document.getElementById("logoId").style.visibility = "hidden";
				document.getElementById("bg_media").style.visibility = "hidden";
				document.getElementById("play").style.visibility = "hidden";
				document.getElementById("stop").style.visibility = "hidden";
				
				document.getElementById("buffer").style.display = "none";
				document.getElementById("time").style.display = "none";
				
				$('#svecKeyHelp_XX0C').sfKeyHelp('hide');
				_plugin.SetDisplayArea(0,0,960,540);
				isStretch = true;
			}
			else //stretch = true
			{
				if(isFullScreen == false)
				{
					document.getElementById("playerLoadingImage").style.top = "220px";
					document.getElementById("playerLoadingImage").style.left = "300px"; 	
			
					document.getElementById("wrapper_player").style.display = "block";
					
					var wrapper = document.getElementById("wrapper_player");
						wrapper.style.width = "960px";
						wrapper.style.height = "540px";
						document.getElementById("substr").innerHTML = "";
						document.getElementById("desc_id").style.display = "block";
						document.getElementById("desc_text").style.display = "block";
						document.getElementById("top_account").style.display = "block";
						
						document.getElementById("logoId").style.visibility = "visible";
						document.getElementById("bg_media").style.visibility = "visible";
						document.getElementById("play").style.visibility = "visible";
						document.getElementById("stop").style.visibility = "visible";
						
						document.getElementById("buffer").style.display = "block";
						document.getElementById("time").style.display = "block";
						
						$('#svecKeyHelp_XX0C').sfKeyHelp('show');
						_plugin.SetDisplayArea(50, 98, 538, 338);
				}
				else
				{
					document.getElementById("playerLoadingImage").style.top = "250px";
					document.getElementById("playerLoadingImage").style.left = "460px"; 
					
					//change status to play when enter fullscreen
					//currentStatus = "play";
					//$('#play').attr('src','images/media/pause.png');
						
					var wrapper = document.getElementById("wrapper_player");
					wrapper.style.width = "0px";
					wrapper.style.height = "0px";
					
					document.getElementById("desc_id").style.display = "none";
					document.getElementById("desc_text").style.display = "none";
					document.getElementById("top_account").style.display = "none";
					
					document.getElementById("logoId").style.visibility = "hidden";
					document.getElementById("bg_media").style.visibility = "hidden";
					document.getElementById("play").style.visibility = "hidden";
					document.getElementById("stop").style.visibility = "hidden";
					
					document.getElementById("buffer").style.display = "none";
					document.getElementById("time").style.display = "none";
					
					$('#svecKeyHelp_XX0C').sfKeyHelp('hide');
					logger(" x = " + x);
					logger(" y = " + y);
					logger(" z = " + w);
					logger(" h = " + h);
					
					_plugin.SetDisplayArea(x, y, w, h);	
				}
				isStretch = false;
			}
		}
		break;
		case sf.key.MUTE:
			//logger("sf.key.Mute");
			document.getElementById('lblVol').innerHTML = "";
			if(Audio.getMute() == 0)
			{
				$('#imgMute').sfImage({
					src:'images/mute.png'
				}).sfImage('show');
			}
			else
			{
				$('#imgMute').sfImage({
					src:'images/mute.png'
				}).sfImage('hide');
			}
			//setTimeout(function(){hideMute()},4000);
			
			Audio.setMute();
			break;
		case sf.key.REW:
			logger("rw");
			if(isLive == false)
			{
				if(isFullScreen == true)
				{
					displayTimeBar();
					myTimeout = setTimeout(function(){hideTimeBar()},5000);
				}
				
				var _totalTime = _plugin.GetDuration()/1000;
				//logger("currentTIme = " + currentTime);
				//logger("total time = " + _totalTime);
				var pixelDisplay;
				if((currentTime - 120) < 0)
					pixelDisplay = 0;
				else
					pixelDisplay = ((currentTime - 120)/_totalTime) * DURATION_BAR; 
				//logger("pixelDispay = " + pixelDisplay);
				document.getElementById('durationBar').style.width= pixelDisplay + "px";
				
				//document.getElementById('durationBar').style.width= "380px";
				//document.getElementById("durationBar").style.display = "block";
				//document.getElementById("durationBackground").style.display = "block";
				
				_plugin.JumpBackward(120);
			}
			break;
		case sf.key.FF:
			if(isLive == false)
			{
				if(isFullScreen == true)
				{
					displayTimeBar();
					myTimeout = setTimeout(function(){hideTimeBar()},5000);
				}
			
				var _totalTime = _plugin.GetDuration()/1000;
				//logger("currentTIme = " + currentTime);
				logger("total time = " + _totalTime);
				var pixelDisplay;
				if((currentTime + 120) > _totalTime)  {
					pixelDisplay = DURATION_BAR;
					currentTime = Math.floor(_totalTime-currentTime-1);
					_plugin.JumpForward(currentTime);
				} else {
					pixelDisplay = ((currentTime + 120)/_totalTime) * DURATION_BAR;
					_plugin.JumpForward(120);
				}
				
				//logger("pixelDispay = " + pixelDisplay);
				document.getElementById('durationBar').style.width= pixelDisplay + "px";
			}
			break;
			
		case sf.key.LEFT:
			//for debugging
			//_plugin.Play("http://203.162.16.22/lives/vtchd310597.isml/vtchd310597.m3u8|COMPONENT=HLS");
			//this.EnterFullScreen();
			//_plugin.Play("http://pseudo01.hddn.com/vod/demo.flowplayervod/bbb-1600.mp4");
			
			break;
		case sf.key.RIGHT:
			//for debugging
			//this.ExitFullScreen();
			break;
		case sf.key.UP:
			break;
		case sf.key.DOWN:
			break;
		case sf.key.VOL_DOWN:
				clearTimeout(myTimeout);
				$('#imgMute').sfImage({
					src:'images/un_mute.png'
				}).sfImage('show');
				document.getElementById('lblVol').innerHTML = Audio.getVolume();
				Audio.setRelativeVolume(1);
				document.getElementById('lblVol').innerHTML = Audio.getVolume();
				myTimeout = setTimeout(function(){hideMute()},4000);
			break;
		case sf.key.VOL_UP:
				clearTimeout(myTimeout);
				$('#imgMute').sfImage({
					src:'images/un_mute.png'
				}).sfImage('show');
				document.getElementById('lblVol').innerHTML = Audio.getVolume();
				Audio.setRelativeVolume(0);
				document.getElementById('lblVol').innerHTML = Audio.getVolume();
				myTimeout = setTimeout(function(){hideMute()},4000);
			break;
		case sf.key.ENTER:
		{
			sf.key.preventDefault();
			
			
			
			var _totalTime = _plugin.GetDuration()/1000;
			//logger("currentTIme = " + currentTime);
			//logger("total time = " + _totalTime);
			var pixelDisplay = ((currentTime)/_totalTime) * DURATION_BAR; 
			//logger("pixelDispay = " + pixelDisplay);
			if(isLive == false){
				document.getElementById('durationBar').style.width= pixelDisplay + "px";
			}
			
			if(isFullScreen == false)
			{
				if(currentStatus == "stop")
				{
					logger("current status = stop");
				} else {
					if(isLive == false)
					{
						displayTimeBar();
						myTimeout = setTimeout(function(){hideTimeBar()},4000);
					}
					
					logger("current status = not stop");
					this.EnterFullScreen();
					isFullScreen = true;
				}
			}
			else
			{
				this.ExitFullScreen();
				isFullScreen = false;
				hideTimeBar();
			}
			
		}	
			break;
		case sf.key.RETURN:
		{
			sf.key.preventDefault();
			//isFirstPress = true;
			if(isFullScreen == true)
			{
				hideTimeBar();
				logger("is Full screen = true");
				this.ExitFullScreen();
				isFullScreen = false;
			}
			else
			{
				$('#playerLoadingImage').sfLoading('hide');
				isReady = false;
				//isLive = false;
				isFirstPress = true;
				document.getElementById('time').innerHTML = "0:00:00" +"/" + "0:00:00";
				_plugin.Stop();
				
				if(isFullScreen == true)
				{
					//_plugin.SetDisplayArea(50, 98, 538, 338);
					this.ExitFullScreen();
				}
				currentStatus = "stop";
				$('#play').attr('src','images/media/play.png');
				
				
				sf.scene.hide("Player");
				sf.scene.show("Category");
				sf.scene.focus("Category");
			}
			if(isLive == true)
			{
				document.getElementById('time').innerHTML = "";
			}
			else
			{
				document.getElementById('time').innerHTML = "0:00:00" +"/" + "0:00:00";
			}
		}
		break;
		case sf.key.STOP:
		{
			if(isReady == true)
			{				
				//ScenePlayer.displayPlayback();
				isReady = false;
				if(isFullScreen == true)
				{
					hideTimeBar();
				}
				isFirstPress = true;
				
				
				//isLive = false;
				if((currentStatus == "play") || (currentStatus == "pause"))
				{
					_plugin.Stop();
					pluginAPI.setOnScreenSaver();
					logger("stop and set time = 0 ");
					document.getElementById('time').innerHTML = "0:00:00" +"/" + "0:00:00";
					logger("sao deo vao cai tren nhi");
					//isFirstPress = true;
					
					this.ExitFullScreen();
					isFullScreen = false;
					
					currentStatus = "stop";
					$('#play').attr('src','images/media/play.png');
					ScenePlayer.getUserProfile();
				}
				else
				{
					logger("wtf");
				}
				$('#playerLoadingImage').sfLoading('hide');
				if(isLive == true)
				{
					document.getElementById('time').innerHTML = "";
				}
				else
				{
					document.getElementById('time').innerHTML = "0:00:00" +"/" + "0:00:00";
				}
			}
		}
		break;
		case sf.key.PLAY:
		{
			if(isFullScreen == true)
			{
				displayTimeBar();
				myTimeout = setTimeout(function(){hideTimeBar()},5000);
			}
			
			if(isFirstPress == true)
			{
				if(isLive == true)
				{
					logger("g_live_channel_url = " + g_live_channel_url);
					//isLive = false;
					if(isFullScreen == true)
					{
						document.getElementById("playerLoadingImage").style.top = "250";
						document.getElementById("playerLoadingImage").style.left = "460px";
					}
					else
					{
						document.getElementById("playerLoadingImage").style.top = "220px";
						document.getElementById("playerLoadingImage").style.left = "300px";
					}
					$('#playerLoadingImage').sfLoading('show');
					_plugin.Play(g_live_channel_url);
					pluginAPI.setOffScreenSaver();
					currentStatus = "play";
					isFirstPress = false;
				}
				else
				{
					isFirstPress = false;
					ScenePlayer.displayPopup();	
				}
			}
			else
			{
				
				if(currentStatus == "stop")
				{
				    if(isLive == true)
					{
						ScenePlayer.displayPopup();
					}
					else
					{
						logger("resume");
						//_plugin.Resume();
						//pluginAPI.setOffScreenSaver();
						//currentStatus = "play";
						//$('#play').attr('src','images/media/pause.png');
					}
					/*
					isFirstPress = true;
					_plugin.Play(url);
					
					currentStatus = "play";
					$('#play').attr('src','images/media/pause.png');
					*/
				}
				else if(currentStatus == "pause")
				{
					_plugin.Resume();
					pluginAPI.setOffScreenSaver();
					currentStatus = "play";
					$('#play').attr('src','images/media/pause.png');
					$('#full_mode_play').attr('src','images/media/pause.png');
				}
				else
				{
					logger("wtf");
				}
			}
		}
		break;
		case sf.key.PAUSE:
		{
			if(isReady == true)
			{
				if(isFullScreen == true)
				{
					displayTimeBar();
					//myTimeout = setTimeout(function(){hideTimeBar()},5000);
				}
				
				if(currentStatus == "play")
				{
					pluginAPI.setOnScreenSaver();
					_plugin.Pause();
					currentStatus = "pause";
					$('#play').attr('src','images/media/play.png');
					$('#full_mode_play').attr('src','images/media/play.png');
				}
			}
		}
		break;
		
	}
}

ScenePlayer.prototype.EnterFullScreen = function() {
		logger("enter full screen");
		isStretch = false;
		//move loading indicator to midle
	
		document.getElementById("playerLoadingImage").style.top = "250";
		document.getElementById("playerLoadingImage").style.left = "460px"; 
		
		//change status to play when enter fullscreen
		currentStatus = "play";
		$('#play').attr('src','images/media/pause.png');
		$('#full_mode_play').attr('src','images/media/pause.png');
			
		var wrapper = document.getElementById("wrapper_player");
		wrapper.style.width = "0px";
		wrapper.style.height = "0px";
		
		document.getElementById("normal_mode_substr").innerHTML = "";
		
		document.getElementById("desc_id").style.display = "none";
		document.getElementById("desc_text").style.display = "none";
		document.getElementById("top_account").style.display = "none";
		
		document.getElementById("logoId").style.visibility = "hidden";
		document.getElementById("bg_media").style.visibility = "hidden";
		document.getElementById("play").style.visibility = "hidden";
		document.getElementById("stop").style.visibility = "hidden";
		
		document.getElementById("buffer").style.display = "none";
		document.getElementById("time").style.display = "none";
		
		$('#svecKeyHelp_XX0C').sfKeyHelp('hide');
		logger(" x = " + x);
		logger(" y = " + y);
		logger(" z = " + w);
		logger(" h = " + h);
		
		_plugin.SetDisplayArea(x, y, w, h);
	}

ScenePlayer.prototype.ExitFullScreen = function() {
	hideTimeBar();
	//change status to play when exit full screen
	logger("exit full screen");
	//move loading indicator position
	isStretch = false;
	document.getElementById("playerLoadingImage").style.top = "220px";
	document.getElementById("playerLoadingImage").style.left = "300px"; 	
	
	currentStatus = "play";
	$('#play').attr('src','images/media/pause.png');
			
	document.getElementById("wrapper_player").style.display = "block";
	
	var wrapper = document.getElementById("wrapper_player");
		wrapper.style.width = "960px";
		wrapper.style.height = "540px";
		document.getElementById("substr").innerHTML = "";
		document.getElementById("desc_id").style.display = "block";
		document.getElementById("desc_text").style.display = "block";
		document.getElementById("top_account").style.display = "block";
		
		document.getElementById("logoId").style.visibility = "visible";
		document.getElementById("bg_media").style.visibility = "visible";
		document.getElementById("play").style.visibility = "visible";
		document.getElementById("stop").style.visibility = "visible";
		
		document.getElementById("buffer").style.display = "block";
		document.getElementById("time").style.display = "block";
		
		$('#svecKeyHelp_XX0C').sfKeyHelp('show');
	_plugin.SetDisplayArea(50, 98, 538, 338);
}
ScenePlayer.displayProfile = function()
{
	logger("Player userProfile = " + userProfile.name + " " + userProfile.balance + " " + userProfile.subcriber);
	document.getElementById("player_user_name_login").innerHTML = userProfile.name;
	document.getElementById("player_user_name_money").innerHTML = userProfile.balance;
	document.getElementById("player_user_name_expire_date").innerHTML = userProfile.subcriber;
}
ScenePlayer.prototype.handleShow = function () {
	logger("ScenePlayer.handleShow()");
	// this function will be called when the scene manager show this scene 
	pluginAPI = new Common.API.Plugin();
	
	
	if(Audio.getMute() == 1)
	{
		$('#imgMute').sfImage({
			src:'images/mute.png'
		}).sfImage('show');
	}
	else
	{
		$('#imgMute').sfImage({
			src:'images/mute.png'
		}).sfImage('hide');
	}
	
	ScenePlayer.displayProfile();
	if(isLive == true)
	{
		document.getElementById('time').innerHTML = "";
	}
	else
	{
		document.getElementById('time').innerHTML = "0:00:00" +"/" + "0:00:00";
	}
	if(selectedVideoName.length > 41)
	{
		selectedVideoName = selectedVideoName.substring(0,40) + "...";
	}
	document.getElementById("player_film_name").innerHTML = selectedVideoName;
	
	var str = "Technical notes contains valuable information for developing Samsung Smart TV app There is solutions and tips when developer are facing with any trouble.The information is not mentioned on SDK Developer Documentation. Also, it provides frequently asked questions and difference for each platform.Technical notes contains valuable information for developing Samsung Smart TV app There is solutions and tips when developer are facing with any trouble.The information is not mentioned on SDK Developer Documentation. Also, it provides frequently asked questions and difference for each platform.Technical notes contains valuable information for developing Samsung Smart TV app There is solutions and tips when developer are facing with any trouble.The information is not mentioned on SDK Developer Documentation. Also, it provides frequently asked questions and difference for each platform.Technical notes contains valuable information for developing Samsung Smart TV app There is solutions and tips when developer are facing with any trouble.The information is not mentioned on SDK Developer Documentation. Also, it provides frequently asked questions and difference for each platform.";
	str = str.substring(0,600);
	str += "...";
	/*document.getElementById("desc_id").innerHTML = selectedVideoDesc;*/
	document.getElementById("desc_text").innerHTML = selectedVideoDesc;
	
	_plugin = document.getElementById("pluginPlayer");
	_plugin.SetDisplayArea(50, 98, 538, 338);

	_plugin.OnCurrentPlayTime = 'ScenePlayer.onCurrentPlaybackTime';
    _plugin.OnBufferingStart = 'ScenePlayer.onBufferingStart';
    _plugin.OnBufferingProgress = 'ScenePlayer.onBufferingProgress';
    _plugin.OnBufferingComplete = 'ScenePlayer.onBufferingComplete'; 
	_plugin.OnStreamInfoReady = 'ScenePlayer.onStreamInfoReady';
	_plugin.OnSubtitle = 'ScenePlayer.onSubtitle';
	_plugin.OnConnectionFailed = 'ScenePlayer.onConnectionFailed';
	_plugin.OnStreamNotFound = 'ScenePlayer.onStreamNotFound';
	_plugin.OnNetworkDisconnected = 'ScenePlayer.networdkDisconnect';
	_plugin.OnRenderingComplete  = 'ScenePlayer.onRenderingComplete';
	isFullScreen = false;
	
	
	document.getElementById("durationBar").style.display = "none";
	document.getElementById("durationBackground").style.display = "none";
	if(!isLive){
		document.getElementById('time').innerHTML = "0:00:00" +"/" + "0:00:00";
		$('#svecKeyHelp_XX0C').sfKeyHelp({
			'blue':'Stretch <=> Origin',
			'enter':'Full Screen',
			'rew':'',
			'ff':'Tua',
			'stop':'',
			'pause':'',
			'play': 'Điều khiển Video',
			'return':'Quay lại'
			});
	} else {
		$('#svecKeyHelp_XX0C').sfKeyHelp({
			'blue':'Stretch <=> Origin',
			'enter':'Full Screen',
			'stop':'',
			'pause':'',
			'play': 'Điều khiển Video',
			'return':'Quay lại'
			});
	}
	if(isFromSelect == true)
	{
		if(selectedMovieType != 0)
		{
			//get url
			//$('#svecLoadingImage_96LK').sfLoading('show');
			ScenePlayer.getVideoStream(global_current_video_id,selectedMovieType);
		}
	}
}
ScenePlayer.onRenderingComplete = function()
{
	logger("finish play video");
	_plugin.Stop();
	hideTimeBar();
	
	pluginAPI.setOnScreenSaver();
	logger("stop and set time = 0 ");
	document.getElementById('time').innerHTML = "0:00:00" +"/" + "0:00:00";
	document.getElementById('durationBar').style.width= "0px";
				
	if(isFullScreen == true)
	{
		logger("exit full screen");
		currentStatus = "play";
		$('#play').attr('src','images/media/pause.png');
			
		document.getElementById("wrapper_player").style.display = "block";
	
		var wrapper = document.getElementById("wrapper_player");
		wrapper.style.width = "960px";
		wrapper.style.height = "540px";
		document.getElementById("substr").innerHTML = "";
		document.getElementById("desc_id").style.display = "block";
		document.getElementById("desc_text").style.display = "block";
		document.getElementById("top_account").style.display = "block";
		
		document.getElementById("logoId").style.visibility = "visible";
		document.getElementById("bg_media").style.visibility = "visible";
		document.getElementById("play").style.visibility = "visible";
		document.getElementById("stop").style.visibility = "visible";
		
		document.getElementById("buffer").style.display = "block";
		//document.getElementById("time").style.display = "block";
		
		$('#svecKeyHelp_XX0C').sfKeyHelp('show');
		_plugin.SetDisplayArea(50, 98, 538, 338);
		isFullScreen = false;
	}			
	currentStatus = "stop";
	isFirstPress = true;
	
	$('#play').attr('src','images/media/play.png');
	
}
ScenePlayer.networdkDisconnect = function()
{
	logger("network disconnected");
	currentStatus = "stop";
	_plugin.Stop();
	isFirstPress = true;
	
	document.getElementById('time').innerHTML = "0:00:00" +"/" + "0:00:00";
				
	if(isFullScreen == true)
	{
		logger("exit full screen");
		currentStatus = "play";
		$('#play').attr('src','images/media/pause.png');
			
		document.getElementById("wrapper_player").style.display = "block";
	
		var wrapper = document.getElementById("wrapper_player");
		wrapper.style.width = "960px";
		wrapper.style.height = "540px";
		document.getElementById("substr").innerHTML = "";
		document.getElementById("desc_id").style.display = "block";
		document.getElementById("desc_text").style.display = "block";
		document.getElementById("top_account").style.display = "block";
		
		document.getElementById("logoId").style.visibility = "visible";
		document.getElementById("bg_media").style.visibility = "visible";
		document.getElementById("play").style.visibility = "visible";
		document.getElementById("stop").style.visibility = "visible";
		
		document.getElementById("buffer").style.display = "block";
		document.getElementById("time").style.display = "block";
		
		$('#svecKeyHelp_XX0C').sfKeyHelp('show');
		_plugin.SetDisplayArea(50, 98, 538, 338);
		isFullScreen = false;
	}			
	isFirstPress = true;
	
	$('#play').attr('src','images/media/play.png');
	
	$('#playerFailPopup').sfPopup({
		text:'Bị ngắt kết nối mạng, vui lòng kiểm tra lại mạng', 
		buttons:['Đóng'], 
		callback:function (rlt){
		}
	});
	$('#playerFailPopup').sfPopup('show');
}
ScenePlayer.onCurrentPlaybackTime = function(param1)
{
	//logger("on current playback time");
	if(currentStatus == "pause")
	{
		$('#play').attr('src','images/media/play.png');
		_plugin.Pause();
	}
	//logger("param1 = " + param1);
	currentTime=param1/1000;
	//logger("ciurrentTIme = " + currentTime);
	var subtitle = -1;
	for(s in subtitles) {
		//logger("s = " + s);
		if(s > currentTime)
			break
		subtitle = s;
		//logger("subtitle = " + subtitle);
	}
	
	//chon vi tri hien thi subtile che do full hoac normal
	if(isFullScreen)
	{
		subtitle_position =  "substr";
	} else {
		subtitle_position = "normal_mode_substr"
	}
	
	//hien thi subtitle
	if(isLive == true)
	{
		logger("live");
	}
	else
	{
		if(subtitle > 0) 
		{
			if(subtitle != currentSubtitle) {
				document.getElementById(subtitle_position).innerHTML = subtitles[subtitle].t;
				currentSubtitle=subtitle;
			} 
			else if(subtitles[subtitle].o < currentTime) {
				document.getElementById(subtitle_position).innerHTML = "";
			}
		}
	}
	
	//display current time
	var timeHour = 0; var timeMinute = 0; var timeSecond = 0;
	timeHour = Math.floor(param1/3600000);        
    timeMinute = Math.floor((param1%3600000)/60000);
    timeSecond = Math.floor((param1%60000)/1000);
	
	if(isLive == true)
	{
		document.getElementById("time").style.display = "none";
	}
	else
	{
		document.getElementById('time').innerHTML = timeHour + ":" + timeMinute+":" + timeSecond +"/" + totalTime;
		document.getElementById('full_mode_time').innerHTML = timeHour + ":" + timeMinute+":" + timeSecond +"/" + totalTime;
	}
	
	if(currentStatus == "stop")
	{
		document.getElementById('time').innerHTML = "0:00:00" +"/" + "0:00:00";
	}
}

ScenePlayer.onConnectionFailed = function()
{
	//_plugin.Stop();
	logger("on connection failed");
	currentStatus = "stop";
	isFirstPress = true;
	$('#play').attr('src','images/media/play.png');
				
	$('#playerLoadingImage').sfLoading('hide');
	$('#playerFailPopup').sfPopup({
		text:'Kết nối không thành công', 
		buttons:['Đóng'], 
		callback:function (rlt){
		}
	});
	$('#playerFailPopup').sfPopup('show');
}
ScenePlayer.onStreamNotFound = function()
{
	logger("on stream not found");
	currentStatus = "stop";
	isFirstPress = true;
	$('#playerFailPopup').sfPopup({
		text:'Stream not found', 
		buttons:['Đóng'], 
		callback:function (rlt){
		}
	});
	$('#playerFailPopup').sfPopup('show');

}
ScenePlayer.onSubtitle = function(subtitle)
{
	logger("subtitle = " + subtitle);
}
ScenePlayer.onBufferingStart = function()
{
	logger("On buffering start");
}
ScenePlayer.onBufferingProgress = function(percent)
{
	logger("Buffering " + percent + "%");
	$('#playerLoadingImage').sfLoading('show');
}
ScenePlayer.onBufferingComplete = function()
{
	logger("On complete");
	$('#playerLoadingImage').sfLoading('hide');
}
ScenePlayer.onStreamInfoReady = function()
{
	logger("on stream infor ready");
	if(currentStatus == "pause")
	{
		$('#play').attr('src','images/media/play.png');
	}
	else if(currentStatus == "play")
	{
		$('#play').attr('src','images/media/pause.png');
	}
	isReady = true;
	currentStatus = "play";
	$('#play').attr('src','images/media/pause.png');
	pluginAPI.setOffScreenSaver();
	//$('#playerLoadingImage').sfLoading('hide');
	//get size of video
	w = _plugin.GetVideoWidth();
	h = _plugin.GetVideoHeight();
	ratio = w*1.0/h;
	if( ratio > 960*1./540) {
		// fix width
		h = h * 960.0/w;
		w = 960;
		x = 0;
		y = (540 - h)/2.0;
	}
	else {
		// fix height
		w = 540.0*w/h;
		h = 540;
		x = (960-w)/2.0;
		y = 0;
	}
	
	totalTime = _plugin.GetDuration();
	var totalTimeHour = 0; var totalTimeMinute = 0; var totalTimesecond = 0;
	totalTimeHour = Math.floor(totalTime/3600000);
	totalTimeMinute = Math.floor((totalTime%3600000)/60000);
	totalTimeSecond = Math.floor((totalTime%60000)/1000);
	totalTime = totalTimeHour + ":" + totalTimeMinute + ":"+ totalTimeSecond;
	
}

ScenePlayer.prototype.handleHide = function () {
	logger("ScenePlayer.handleHide()");
	// this function will be called when the scene manager hide this scene 
	document.getElementById("normal_mode_substr").innerHTML = "";
}

ScenePlayer.prototype.handleFocus = function () {
	logger("ScenePlayer.handleFocus()");
	// this function will be called when the scene manager focus this scene
}

ScenePlayer.prototype.handleBlur = function () {
	logger("ScenePlayer.handleBlur()");
	// this function will be called when the scene manager move focus to another scene from this scene
}
function hideMute()
{
	clearTimeout(myTimeout);
	$('#imgMute').sfImage({
		src:'images/mute.png'
	}).sfImage('hide');
	document.getElementById('lblVol').innerHTML = "";
}
ScenePlayer.displayPlayback = function()
{
	clearTimeout(myTimeout);
	document.getElementById("play").style.visibility = "visible";
	document.getElementById("stop").style.visibility = "visible";
}
function hidePlayback()
{
	clearTimeout(myTimeout);
	if(isFullScreen == true)
	{
		document.getElementById("play").style.visibility = "hidden";
		document.getElementById("stop").style.visibility = "hidden";
	}
}
function displayTimeBar()
{
	clearTimeout(myTimeout);
	document.getElementById("durationBar").style.visibility = "visible";
	document.getElementById("durationBackground").style.visibility = "visible";
	document.getElementById("durationBar").style.display = "block";
	document.getElementById("durationBackground").style.display = "block";
	
	document.getElementById("full_mode_play").style.visibility = "visible";
	document.getElementById("full_mode_stop").style.visibility = "visible";
	document.getElementById("full_mode_time").style.visibility = "visible";
	document.getElementById("bf_btn").style.visibility = "visible";
	document.getElementById("ff_btn").style.visibility = "visible";
}
function hideTimeBar()
{
	clearTimeout(myTimeout);
	if(isFullScreen == true)
	{
		document.getElementById("durationBar").style.visibility = "hidden";
		document.getElementById("durationBackground").style.visibility = "hidden";
		
		document.getElementById("full_mode_play").style.visibility = "hidden";
		document.getElementById("full_mode_stop").style.visibility = "hidden";
		document.getElementById("full_mode_time").style.visibility = "hidden";
	document.getElementById("bf_btn").style.visibility = "hidden";
	document.getElementById("ff_btn").style.visibility = "hidden";
	}
}
ScenePlayer.displayPopup = function()
{
	logger('display popup');
	var txt = 'Bản HD : ' + g_current_video_price_hd + 'xu, Bản HD Plus : ' + g_current_video_price_shd + ' xu'; 
	
	$('#playerSelectTypePopup').sfPopup({
			text:txt, 
			buttons:['HD','HD Plus','Bỏ qua'], 
			callback:function (rlt){
				switch(rlt)
				{
					case 0:
						//hd
						selectedMovieType = 2;
						if(isFullScreen == true)
						{
							document.getElementById("playerLoadingImage").style.top = "250";
							document.getElementById("playerLoadingImage").style.left = "460px";
						}
						else
						{
							document.getElementById("playerLoadingImage").style.top = "220px";
							document.getElementById("playerLoadingImage").style.left = "300px";
						}
						$('#playerLoadingImage').sfLoading('show');
						
						ScenePlayer.getVideoStream(global_current_video_id,selectedMovieType);
					break;
					case 1:
						//super hd
						selectedMovieType = 5;
						if(isFullScreen == true)
						{
							document.getElementById("playerLoadingImage").style.top = "250";
							document.getElementById("playerLoadingImage").style.left = "460px";
						}
						else
						{
							document.getElementById("playerLoadingImage").style.top = "220px";
							document.getElementById("playerLoadingImage").style.left = "300px";
						}
						
						$('#playerLoadingImage').sfLoading('show');
						ScenePlayer.getVideoStream(global_current_video_id,selectedMovieType);
					break;
					case 2:
						//bo qua
						logger("cancel");
						isFirstPress = true;
						break;
					default:
						logger("default");
						isFirstPress = true;
						break;
				}
			}
		});
		$('#playerSelectTypePopup').sfPopup('show');
}
ScenePlayer.getVideoStream = function(video_id,video_type)
{
	subtitles = {};
	var urlRequest = urlGetVideoStream + video_id + _videoType + video_type;
	
	logger("video id : " + video_id);
	logger("video type : " + video_type);
	logger(urlRequest);
	
	$.getJSON(urlRequest,
		function(data)
		{
			//$('#svecLoadingImage_96LK').sfLoading('hide');
			logger("Status : " + data.Status);
			if(data != null)
			{
				if(data.Status == 0)
				{
					logger("Network error");
				}
				else if(data.Status==1)
				{
					logger("Get Josn Failed");
				}else
				{
					logger("Get Json successfully");
					var videoObj = new Object();
					videoObj.success = data.success;
					videoObj.url = data.url;
					videoObj.sessionID = data.sessionID;
					videoObj.subtitle = data.subtitle;
					if(videoObj.success)
					{
						url = videoObj.url;
						urlSubtitle = videoObj.subtitle;
						logger("videoObj.url = " + videoObj.url);
						logger("this.url = " + url);
						logger("subtitle = " + urlSubtitle);
						
						//load subtitle
						if((urlSubtitle == "")||(urlSubtitle==null) || (urlSubtitle == "http://tvod.vn/sites/default/files/subtitle/"))
						{
							logger("ko load subtitle");
						}
						else
						{
							logger("load subtitle");
							loadsubfile();
						}
						//$('#play').attr('src','images/media/pause.png');
						
						_plugin.Play(url);
						pluginAPI.setOffScreenSaver();
						//currentStatus = "play";
						
					}
					else{
						logger("error");
						$('#playerLoadingImage').sfLoading('hide');
						isFirstPress = true;
						var objErr = new Object();
						objErr.reason = data.reason;
						objErr.type = data.type;
						var msgErr = "Loi : " + objErr.reason + " " + "type = " + objErr.type;
						$('#player_popup_error').sfPopup({
							text:msgErr, 
							buttons:['OK'], 
							callback:function (rlt){
								sf.scene.returnFocus();
							}
						});
						$('#player_popup_error').sfPopup('show');
					}
				}
			}
			else //data == null
			{
				logger("Ko ket noi toi server");
				$('#playerLoadingImage').sfLoading('hide');
				$('#player_popup_error').sfPopup({
					text:"Khong ket noi duoc toi server", 
					buttons:['OK'], 
					callback:function (rlt){
						sf.scene.returnFocus();
					}
				});
				$('#player_popup_error').sfPopup('show');
			}
		});
}
//Get user profile
ScenePlayer.getUserProfile = function()
{
	logger("profile=========================================");
	logger(urlGetUserProfile);
	//urlGetUserProfile = "json/userprofile.json";
	//urlGetUserProfile = "http://10.3.2.115/tvod0315/?q=external_device/get_user_detail";
	$.getJSON(urlGetUserProfile,
	function(data)
	{
		if(data!=null)
		{
			if(data.Status==1)
			{
				logger("Failed to get data");
				$('#loadingImage').sfLoading('hide');
			}
			else
			{
				logger("Get profile successfully");	
				//var userProfile = new Object();
				userProfile.success = data.success;
				userProfile.name = data.name;
				userProfile.balance = data.balance;
				userProfile.subcriber = data.subcriber;
				if(userProfile.success)
				{
					document.getElementById("player_user_name_login").innerHTML = userProfile.name;
					document.getElementById("player_user_name_money").innerHTML = userProfile.balance;
					document.getElementById("player_user_name_expire_date").innerHTML = userProfile.subcriber;
				}
				else
				{
					logger("failed");
				}
			}
		}
		else
		{
			logger("Loi ket noi");
		}
	});	
}

//subtitle
function toSeconds(t) {
    var s = 0.0
    if(t) {
      var p = t.split(':');
      for(i=0;i<p.length;i++)
        s = s * 60 + parseFloat(p[i].replace(',', '.'))
    }
    return s;
}
function strip(s) {
	//logger("s = " + s);
	if((s != "undefined") && (s != null))
		return s.replace(/^\s+|\s+$/g,"");
	else
		return s;
}
  
function loadsubfile(){
var data;
//logger("urlSutitle loadfile = " + urlSubtitle);
//logger("data = " + data);
strdata = null;
$.ajax({
	url: urlSubtitle,
		dataType: 'text',
		async: false, 
		cache: false,
		success: function(data){
			srtdata = data;
		}
	});
	  
	      
    var srt;
    //logger("strdata = " + srtdata);
    srt = srtdata.replace(/\r\n|\r|\n/g,'\n')
   //logger("srt = " + srt);
    
    srt = strip(srt);
    var srt_ = srt.split('\n\n');
    for(s in srt_) {
        st = srt_[s].split('\n');
        if(st.length >=2) {
          n = st[0];
          i = strip(st[1].split(' --> ')[0]);
          o = strip(st[1].split(' --> ')[1]);
          t = st[2];
          if(st.length > 2) {
            for(j=3; j<st.length;j++)
              t += '\n'+st[j];
          }
          is = toSeconds(i);
          os = toSeconds(o);
		 // logger("i = " + i + ", is = " + is);
		 // logger("o = " + o + ", os = " + os);
		  //logger("t = " + t + ", t  = " + t);
		  
          subtitles[is] = {i:is, o: os, t: t};
		 // logger("subtitle[is] = " + subtitles[is]);
		  //logger("subtitles[" + is + "] = " + subtitles[is]);
        }
    }
	
	logger('finish parsing subs');

	  
}