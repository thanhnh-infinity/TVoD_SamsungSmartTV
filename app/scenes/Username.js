
//document.write("<script type='text/javascript' language='javascript' src='$MANAGER_WIDGET/Common/IME/ime2.js'></script>");
var arrUsernameSelect = new Array('username_dangnhap','username_ok');
var usernameIndex = 0;
var widgetAPI;

function SceneUsername(options) {
	this.options = options;
	var ime = null;

}

SceneUsername.prototype.initialize = function () {
	logger("===============================================");
	logger("SceneUsername.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here 
	// scene HTML and CSS will be loaded before this function is called
	logger("usernameIndex = " + usernameIndex);
	widgetAPI = new Common.API.Widget();
	
	ime = new IMEShell("user_name_text", callback_username,"en");
	ime.setKeypadPos(500,100);
	//ime.setEnterFunc(onEnter);
	ime.setKeyFunc(sf.key.RETURN, onReturnKeyUserName);
	ime.setKeyFunc(sf.key.EXIT, onExitKeyUserName);
	
	//ime.setKeySetFunc('qwerty');
	$('#svecKeyHelp_7BAA').sfKeyHelp({
		'enter':'Chọn'
	});
	
	//document.getElementById(arrUsernameSelect[usernameIndex]).setAttribute("class", "imageFocus");
}
var onEnter = function()
{
	logger("on enter");
	
}

var onExitKeyUserName = function()
{
	//sf.key.preventDefault();
	logger("=============================================");
	logger("on exit");
	widgetAPI.sendExitEvent();
	return false;
	
	//sf.scene.returnFocus();
	//_username = document.getElementById('user_name_text').value;
	//logger(_username);
	//sf.scene.hide('Username');
	//sf.scene.show('Login');
	//sf.scene.focus('Login');
}

var onReturnKeyUserName = function()
{
	logger("=============================================");
	logger("on return");
	sf.key.preventDefault();
	sf.scene.returnFocus();
	_username = document.getElementById('user_name_text').value;
	logger(_username);
	sf.scene.hide('Username');
	sf.scene.show('Login');
	sf.scene.focus('Login');
}
function callback_username(cb){
	logger("=================================================");
	logger("callback");
	
	cb.setKeyFunc(sf.key.ENTER, function(){
		//ime.unregisterKey();
		
		logger("=================================================");
		logger("ime enter call back");
		sf.scene.returnFocus();
		_username = document.getElementById('user_name_text').value;

		usernameIndex = 0;
		logger(_username);
		sf.scene.hide('Username');
		sf.scene.show('Login');
		sf.scene.focus('Login');
		
	});   
	return false;
}


SceneUsername.prototype.handleShow = function () {
	logger("=================================================");
	logger("SceneUsername.handleShow()");
	// this function will be called when the scene manager show this scene 
	document.getElementById("user_name_text").focus();
	isFromUsernameOrPassword = true;
	document.getElementById(arrUsernameSelect[0]).setAttribute("class", "imageFocus");
	document.getElementById(arrUsernameSelect[1]).setAttribute("class", "imageNormal");
	
	usernameIndex =0;
}

SceneUsername.prototype.handleHide = function () {
	logger("SceneUsername.handleHide()");
	// this function will be called when the scene manager hide this scene  
}

SceneUsername.prototype.handleFocus = function () {
	logger("SceneUsername.handleFocus()");
	// this function will be called when the scene manager focus this scene
}

SceneUsername.prototype.handleBlur = function () {
	logger("SceneUsername.handleBlur()");
	// this function will be called when the scene manager move focus to another scene from this scene
}

SceneUsername.prototype.handleKeyDown = function (keyCode) {
	logger("SceneUsername.handleKeyDown(" + keyCode + ")");
	// TODO : write an key event handler when this scene get focued
	switch (keyCode) {
		case sf.key.EXIT:
			//sf.key.preventDefault();
			//sf.key.block();
			logger("key exit");
			break;
			logger("key exit press===========================");
			break;
		case sf.key.LEFT:
				logger("key left");
			break;
		case sf.key.RIGHT:
				logger("key right");
			break;
		case sf.key.UP:
			logger("key up");
			logger("index = " + usernameIndex);
			document.getElementById(arrUsernameSelect[usernameIndex]).setAttribute("class", "imageNormal");
			if(usernameIndex == 1)
			{
				usernameIndex--;
				document.getElementById("user_name_text").focus();
			}
			else
			{
				usernameIndex = 1;
			}
			document.getElementById(arrUsernameSelect[usernameIndex]).setAttribute("class", "imageFocus");
			break;
		case sf.key.DOWN:
			logger("key down");
			logger("usernameINdex = " + usernameIndex);
			document.getElementById(arrUsernameSelect[usernameIndex]).setAttribute("class", "imageNormal");
			if(usernameIndex == 0)
			{
				usernameIndex++;
			}
			else
			{
				usernameIndex = 0;
				document.getElementById("user_name_text").focus();
			}	
			document.getElementById(arrUsernameSelect[usernameIndex]).setAttribute("class", "imageFocus");
			logger("usernameINdex = " + usernameIndex);
			break;

		case sf.key.ENTER:
		{
			logger("key enter");
			logger("usernameIndex = " + usernameIndex);
			if(usernameIndex == 1)
			{
				_username = document.getElementById('user_name_text').value;
				usernameIndex = 0;
				logger(_username);
				sf.scene.hide('Username');
				sf.scene.show('Login');
				sf.scene.focus('Login');
			}
			else if(usernameIndex == 0)
			{
				//open ban phim
				
			}
			else
			{
				logger("wtf");
			}
		}
			break;
		case sf.key.RETURN:
		{
			logger("key return");
			sf.key.preventDefault();
			//sf.scene.returnFocus();
			logger("abc ====");
			_username = document.getElementById('user_name_text').value;
			logger(_username);
			sf.scene.hide('Username');
			sf.scene.show('Login');
			sf.scene.focus('Login');
		}
			break;
	}
}
