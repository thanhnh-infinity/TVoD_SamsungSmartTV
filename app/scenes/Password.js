
var arrPasswordSelect = new Array('password_dangnhap','password_ok');
var passwordIndex = 0;
function ScenePassword(options) {
	this.options = options;
	var ime = null;

}

ScenePassword.prototype.initialize = function () {
	logger("ScenePassword.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here 
	// scene HTML and CSS will be loaded before this function is called
	ime = new IMEShell("password_text", callback_password,"en");
	ime.setKeypadPos(500,100);
	//ime.setKeyFunc(sf.key.RETURN, onReturnKey);
	ime.setKeyFunc(sf.key.RETURN, onReturnKeyPassword);
	ime.setKeyFunc(sf.key.EXIT, onExitKeyPassword);
	$('#svecKeyHelp_QEPC').sfKeyHelp({
		'enter':'Chọn'
	});
	document.getElementById(arrPasswordSelect[passwordIndex]).setAttribute("class", "imageFocus");
}
var onExitKeyPassword = function()
{
	widgetAPI.sendExitEvent();
	return false;
	//sf.key.preventDefault();
	//sf.scene.returnFocus();
	
	//_password = document.getElementById('password_text').value;
	//logger("_password = " + _password);
	//sf.scene.hide('Password');
	//sf.scene.show('Login');
	//sf.scene.focus('Login');
}
var onReturnKeyPassword = function()
{
	sf.key.preventDefault();
	sf.scene.returnFocus();
	
	_password = document.getElementById('password_text').value;
	logger("_password = " + _password);
	sf.scene.hide('Password');
	sf.scene.show('Login');
	sf.scene.focus('Login');
}

function callback_password(cb){
	logger("call back");
	/*cb.setKeyFunc(sf.key.ENTER, function(){
			sf.scene.returnFocus();
			_password = document.getElementById('password_text').value;
			logger("_password = " + _password);
			passwordIndex = 0;
				
			sf.scene.hide('Password');
			sf.scene.show('Login');
			sf.scene.focus('Login');
	 }); */
	cb.setKeyFunc(sf.key.ENTER,function(){
		//sf.scene.preventDefault();
		sf.scene.returnFocus();
		_password = document.getElementById('password_text').value;
			logger("_password = " + _password);
			passwordIndex = 0;
				
			sf.scene.hide('Password');
			sf.scene.show('Login');
			sf.scene.focus('Login');
	});
	return false;
}


ScenePassword.prototype.handleShow = function () {
	logger("ScenePassword.handleShow()");
	// this function will be called when the scene manager show this scene 
	document.getElementById("password_text").focus();
	isFromUsernameOrPassword = true;
	document.getElementById(arrPasswordSelect[0]).setAttribute("class", "imageNormal");
	document.getElementById(arrPasswordSelect[1]).setAttribute("class", "imageFocus");
}

ScenePassword.prototype.handleHide = function () {
	logger("ScenePassword.handleHide()");
	// this function will be called when the scene manager hide this scene  
}

ScenePassword.prototype.handleFocus = function () {
	logger("ScenePassword.handleFocus()");
	// this function will be called when the scene manager focus this scene
}

ScenePassword.prototype.handleBlur = function () {
	logger("ScenePassword.handleBlur()");
	// this function will be called when the scene manager move focus to another scene from this scene
}

ScenePassword.prototype.handleKeyDown = function (keyCode) {
	logger("ScenePassword.handleKeyDown(" + keyCode + ")");
	// TODO : write an key event handler when this scene get focued
	switch (keyCode) {
		case sf.key.LEFT:
			break;
		case sf.key.RIGHT:
			break;
		case sf.key.UP:
			document.getElementById(arrPasswordSelect[passwordIndex]).setAttribute("class", "imageNormal");
			if(passwordIndex == 0)
				passwordIndex --;
			document.getElementById(arrPasswordSelect[passwordIndex]).setAttribute("class", "imageFocus");
			break;
		case sf.key.DOWN:
			document.getElementById(arrPasswordSelect[passwordIndex]).setAttribute("class", "imageNormal");
			if(passwordIndex == 0)
				passwordIndex ++;
			document.getElementById(arrPasswordSelect[passwordIndex]).setAttribute("class", "imageFocus");
			break;

		case sf.key.ENTER:
		{
			logger("passwordIndex = " + passwordIndex);
			if(passwordIndex == 1)
			{
				_password = document.getElementById('password_text').value;
				logger("_password = " + _password);
				passwordIndex = 0;
				
				sf.scene.hide('Password');
				sf.scene.show('Login');
				sf.scene.focus('Login');
			}
			else{
				logger("wtf");
			}
		}
			break;
		case sf.key.RETURN:
		{
			sf.key.preventDefault();
			_password = document.getElementById('password_text').value;
			logger("_password = " + _password);
			sf.scene.hide('Password');
			sf.scene.show('Login');
			sf.scene.focus('Login');
		}
			break;
	}
}
