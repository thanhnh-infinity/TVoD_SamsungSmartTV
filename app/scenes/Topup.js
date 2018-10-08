function SceneTopup(options) {
	this.options = options;
	

}

SceneTopup.prototype.initialize = function () {
	logger("SceneTopup.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here 
	// scene HTML and CSS will be loaded before this function is called
	
	$('#svecKeyHelp_Q4O0').sfKeyHelp({
		'return':'Return'
	});
}


SceneTopup.getTopupMessage = function()
{
	logger("topup=========================================");
	logger(urlGetTopupMessage);
	
	$.getJSON(urlGetTopupMessage,
	function(data)
	{
		if(data!=null)
		{
			if(data.Status==1)
			{
				logger("Failed to get data");
			}
			else
			{
				logger("Get topup message successfully");	
				//var userProfile = new Object();
				var topupMessageObj = new Object();
				topupMessageObj.success = data.success;
				topupMessageObj.b_topup_message = data.b_topup_message;
				topupMessageObj.sms_topup_content = data.sms_topup_content;
				topupMessageObj.sub_topup_content = data.sub_topup_content;
				topupMessageObj.a_topup_message = data.a_topup_message;
				
				document.getElementById('b_topup_message').innerHTML = data.b_topup_message;
				document.getElementById('sms_topup_content').innerHTML = data.sms_topup_content;
				document.getElementById('sub_topup_content').innerHTML = data.sub_topup_content;
				document.getElementById('a_topup_message').innerHTML = data.a_topup_message;
				
			}
		}
		else
		{
			logger("Loi ket noi");
		}
	});	
}

SceneTopup.prototype.handleShow = function () {
	logger("SceneTopup.handleShow()");
	// this function will be called when the scene manager show this scene 
	SceneTopup.getTopupMessage();
}

SceneTopup.prototype.handleHide = function () {
	logger("SceneTopup.handleHide()");
	// this function will be called when the scene manager hide this scene  
}

SceneTopup.prototype.handleFocus = function () {
	logger("SceneTopup.handleFocus()");
	// this function will be called when the scene manager focus this scene
}

SceneTopup.prototype.handleBlur = function () {
	logger("SceneTopup.handleBlur()");
	// this function will be called when the scene manager move focus to another scene from this scene
}

SceneTopup.prototype.handleKeyDown = function (keyCode) {
	logger("SceneTopup.handleKeyDown(" + keyCode + ")");
	// TODO : write an key event handler when this scene get focued
	switch (keyCode) {
		case sf.key.LEFT:
			break;
		case sf.key.RIGHT:
			break;
		case sf.key.UP:
			break;
		case sf.key.DOWN:
			break;

		case sf.key.ENTER:
			break;
		case sf.key.RETURN:
				sf.key.preventDefault();
				sf.scene.hide('Topup');
				sf.scene.show('Home');
				sf.scene.focus('Home');
			break;
	}
}
