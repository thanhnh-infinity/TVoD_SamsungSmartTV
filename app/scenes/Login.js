var test_plugin;

var urlLogin = "";
var urlLogin2 = "&password=";

var _username = "";
var _password = "";
var arrSelect = new Array('usernameText','passwordText','btnLogin');
var btnIndex = 0;

var isFromUsernameOrPassword = false;
var isRemember = false;

function SceneLogin(options) {
	this.options = options;
	

}

SceneLogin.prototype.initialize = function () {
	logger("SceneLogin.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here 
	// scene HTML and CSS will be loaded before this function is called
	
	
	
	
	/*
	//Create new file to store user info
	var fileSystemObj = new FileSystem();
			
	var bValid = fileSystemObj.isValidCommonPath(curWidget.id);
	if (bValid == 0)
	{
		logger("<-----------New Directory needs to be created----------->");
		var cResult = fileSystemObj.createCommonDir(curWidget.id);
	}
						 
	//Write data in common_myfile.txt in CommonData
						
	logger("Let's write data in CommonData using openCommonFile");
	var jsFileObj = fileSystemObj.openCommonFile(curWidget.id + "/common_setting222.xml","w");
	//var jsFileObj = fileSystemObj.openCommonFile("common_setting132.xml","w");
	jsFileObj.writeLine("");
	//jsFileObj.writeLine(password);
	//jsFileObj.writeLine(password);
	fileSystemObj.closeCommonFile(jsFileObj);
	
	//End create file
	*/
	_username = "samsungvn";
	_password = "WTfClGT00009  ";
	btnIndex = 2;
	$('#svecKeyHelp_XG7W').sfKeyHelp({
			'updown':'Di chuyển',
			'enter':'Chọn'
		});
	}




SceneLogin.prototype.handleShow = function () {
	logger("SceneLogin.handleShow()");
	// this function will be called when the scene manager show this scene 
	//for debugging
	//test_plugin = document.getElementById("plugin_Player");
	//test_plugin.SetDisplayArea(458, 58, 472, 270);
	//end for debugging
	SceneLogin.getRegisterMessage();
	
	if(isFromUsernameOrPassword == false)
	{
		
		//if(isRemember == true)
		//{
			var fileSystemObj = new FileSystem();
				
			var bValid = fileSystemObj.isValidCommonPath(curWidget.id);
			if (bValid == 0)
			{
				logger("<-----------New Directory needs to be created----------->");
				var cResult = fileSystemObj.createCommonDir(curWidget.id);
			}
			else
			{
				//Read data from common_myfile.txt from Common Data
				logger("Let's read data from Common Data using openCommonFile");
				var jsFileObj = null;
				jsFileObj = fileSystemObj.openCommonFile(curWidget.id + "/common_setting222.xml","r");        
				//var jsFileObj = fileSystemObj.openCommonFile("common_setting132.xml","r");
				if(jsFileObj != null)
				{
					var i = 0;
					var strLine = "";
					while(strLine = jsFileObj.readLine())
					{
						if(i==0)
							_username = strLine;
						else if(i==1)
							_password = strLine;
						i++;
					}
					//btnIndex = 2;
				}
				fileSystemObj.closeCommonFile(jsFileObj);
			}
		//}
	}		
	document.getElementById("lblUsername").innerHTML = _username;
	
	var hiddenPass = "";
	for(var i=0;i<_password.length;i++)
	{
		hiddenPass+="*";
	}
	document.getElementById("lblPassword").innerHTML = hiddenPass;
	
	document.getElementById(arrSelect[btnIndex]).setAttribute("class", "imageFocus");
}

SceneLogin.prototype.handleHide = function () {
	logger("SceneLogin.handleHide()");
	// this function will be called when the scene manager hide this scene  
}

SceneLogin.prototype.handleFocus = function () {
	logger("SceneLogin.handleFocus()");
	// this function will be called when the scene manager focus this scene
}

SceneLogin.prototype.handleBlur = function () {
	logger("SceneLogin.handleBlur()");
	// this function will be called when the scene manager move focus to another scene from this scene
}

SceneLogin.prototype.handleKeyDown = function (keyCode) {
	logger("SceneLogin.handleKeyDown(" + keyCode + ")");
	// TODO : write an key event handler when this scene get focued
	switch (keyCode) {
		case sf.key.LEFT:
			//for debuggin
			//test_plugin.Play("http://203.162.16.22/lives/vtchd310597.isml/vtchd310597.m3u8");
			//end for debugging
			break;
		case sf.key.RIGHT:
					//sf.scene.hide('Login');
					//sf.scene.show('Scene1');
					//sf.scene.focus('Scene1');
			break;
		case sf.key.UP:
				logger("key up");
				document.getElementById(arrSelect[btnIndex]).setAttribute("class", "imageNormal");
				if(btnIndex == 0)
					btnIndex = 2;
				else 
					btnIndex --;
				document.getElementById(arrSelect[btnIndex]).setAttribute("class", "imageFocus");
			break;
		case sf.key.DOWN:
				logger("key down");
				document.getElementById(arrSelect[btnIndex]).setAttribute("class", "imageNormal");

				if(btnIndex == 2)
					btnIndex = 0;
				else 
					btnIndex ++;

				document.getElementById(arrSelect[btnIndex]).setAttribute("class", "imageFocus");
			break;

		case sf.key.ENTER:
				if(btnIndex == 0)
				{
					logger("go to enter username");
					sf.scene.hide('Login');
					sf.scene.show('Username');
					sf.scene.focus('Username');
				}
				else if(btnIndex == 1)
				{
					logger("enter password");
					sf.scene.hide('Login');
					sf.scene.show('Password');
					sf.scene.focus('Password');
				}
				else if(btnIndex == 2)
				{
					$('#loginLoadingImage').sfLoading('show');
					SceneLogin.Login();
				}
				else
				{
					logger("wtf undefined key");
				}
			break;
	}
}
SceneLogin.Login = function()
{	
	var username = _username;
	var password = _password;
	
	logger("Username: " + username + ", Password: " + password);
	urlLogin = urlLogin1 + username + urlLogin2 + password;
	
	//username = "chinhnk";
	//password = "123456";
	
	//urlLogin = urlLogin1 + "chinhnk" + urlLogin2 + "123456";
	logger(urlLogin);
	//urlLogin = "json/login.json";
	var urlLogout = "http://tvod.vn/?q=external_device/logout";
	
	$.getJSON(urlLogout,
	function(data1)
	{
		if(data1!=null)
		{
			if(data1.Status==1)
			{
				logger("Failed to get data");
			}
			else
			{
				logger("logout successfully");	
				$.getJSON(urlLogin,
		function(data)
		{		
			logger("data");
			if (data!=null){
				if(data.Status == 0){
					logger("Network error");
				}else if(data.Status==1){
					logger("Get Josn Failed");
					//$('#loginFailPopup').sfPopup('show');
					$('#loginPopupError').sfPopup({
						text:'Đăng nhập không thành công, đăng nhập lại', 
						buttons:['OK'], 
						callback:function (rlt){
						}
					});
					$('#loginPopupError').sfPopup('show');
					
					$('#loginLoadingImage').sfLoading('hide');
				}
				else
				{
					logger("Get Json successfully");
					$('#loginLoadingImage').sfLoading('hide');
					
					loginObj = new Object();
					loginObj.success = data.success;
					loginObj.sessionID = data.sessionID;
				
					if(loginObj.success == true)
					{
						//$('#loginImageLoading').sfLoading('hide');
						logger("true");
						isRemember = true;
						sf.scene.hide("Login");
						
						sf.scene.show("Home");
						sf.scene.focus("Home");
						var fileSystemObj = new FileSystem();
			
						var bValid = fileSystemObj.isValidCommonPath(curWidget.id);
						if (bValid == 0)
						{
							logger("<-----------New Directory needs to be created----------->");
							var cResult = fileSystemObj.createCommonDir(curWidget.id);
						}
						 
						//Write data in common_myfile.txt in CommonData
						
						logger("Let's write data in CommonData using openCommonFile");
						var jsFileObj = fileSystemObj.openCommonFile(curWidget.id + "/common_setting222.xml","w");
						//var jsFileObj = fileSystemObj.openCommonFile("common_setting132.xml","w");
						jsFileObj.writeLine(username);
						jsFileObj.writeLine(password);
						//jsFileObj.writeLine(password);
						fileSystemObj.closeCommonFile(jsFileObj);
					}
					else
					{
						logger("false");
						//$('#loginImageLoading').sfLoading('hide');
						//$('#loginFailPopup').sfPopup('show');
						$('#loginPopupError').sfPopup({
							text:'Tài khoản hoặc mật khẩu không đúng', 
							buttons:['OK'], 
							callback:function (rlt){
								//sf.scene.returnFocus();
							}
							});
						$('#loginPopupError').sfPopup('show');
					}
				}//end if data.Status==0
			}else{//data = null
				alert ("cannot access");
				$('#loginLoadingImage').sfLoading('hide');
				$('#loginPopupError').sfPopup({
						text:'Lỗi kết nối', 
						buttons:['OK'], 
						callback:function (rlt){
							//sf.scene.returnFocus();
						}
					});
					$('#loginPopupError').sfPopup('show');
			}
		});
				
			}
		}
		else
		{
			logger("Loi ket noi");
		}
	});	
}
SceneLogin.getRegisterMessage = function()
{	
	$.getJSON(urlGetRegisterMessage,
		function(data)
		{		
			logger("data");
			if (data!=null){
				if(data.Status == 0){
					logger("Network error");
				}else if(data.Status==1){
					logger("Get Josn Failed");
				}
				else
				{
					logger("Get Json successfully");
					logger("data.success = " + data.success);
					logger("data.b_content = " +data.b_message);
					logger("data.contetn = " + data.content);
					logger("data.a_message = " + data.a_message);
					var str = data.b_message + data.content + data.a_message;
					document.getElementById("b_message").innerHTML = data.b_message;
					document.getElementById("content_message").innerHTML = data.content;
					document.getElementById("a_message").innerHTML = data.a_message;
					//document.getElementById("register_message").innerHTML = str;
				}//end if data.Status==0
			}else{//data = null
				alert ("cannot access");
				$('#loginPopupError').sfPopup({
						text:'Lỗi kết nối', 
						buttons:['OK'], 
						callback:function (rlt){
							//sf.scene.returnFocus();
						}
					});
					$('#loginPopupError').sfPopup('show');
			}
		});

}