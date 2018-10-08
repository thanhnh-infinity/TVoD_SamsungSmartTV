//var urlGetUserProfile = "http://tvod.vn/?q=external_device/get_user_detail";

var categoryType = "";

var arrButton = new Array('imgMovie','imgMusic','imgSport','imgTV');

var currentActive = new Array('active_movie','active_music','active_sport','active_tv');

var currentIndex = 0;

var userProfile = new Object();

var isLive = false;

function SceneHome(options) {
	this.options = options;
}

SceneHome.prototype.initialize = function () {
	logger("SceneHome.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here 
	// scene HTML and CSS will be loaded before this function is called
	
	$('#svecKeyHelp_CRBB').sfKeyHelp({
		'blue':'Nạp tiền',
		'leftright':'Di chuyển',
		'enter' : 'Chọn',
		'return': 'Quay lại'
		
	});
	
	$('#homeNetworkFailPopup').sfPopup({
		text:'Lỗi kết nối', 
		buttons:['Đóng'], 
		callback:function (rlt){
		}
	});
	
	$('#svecLabel_4SZ6').sfLabel({text:''});
	$('#lblUserName').sfLabel({text:''});
	$('#svecLabel_9IWE').sfLabel({text:''});
	$('#lblBalance').sfLabel({text:''});
	$('#svecLabel_9RSB').sfLabel({text:''});
	$('#lblExpireDate').sfLabel({text:''});
	

	currentIndex = 0;
	document.getElementById(arrButton[currentIndex]).setAttribute("class", "imgFocus");
	
	//$('#loadingImage').sfLoading('show');
	
}




SceneHome.prototype.handleShow = function () {
	logger("SceneHome.handleShow()");
	// this function will be called when the scene manager show this scene 
	SceneHome.getUserProfile();
}

SceneHome.prototype.handleHide = function () {
	logger("SceneHome.handleHide()");
	// this function will be called when the scene manager hide this scene  
}

SceneHome.prototype.handleFocus = function () {
	logger("SceneHome.handleFocus()");
	// this function will be called when the scene manager focus this scene
}

SceneHome.prototype.handleBlur = function () {
	logger("SceneHome.handleBlur()");
	// this function will be called when the scene manager move focus to another scene from this scene
}

SceneHome.prototype.handleKeyDown = function (keyCode) {
	logger("SceneHome.handleKeyDown(" + keyCode + ")");
	// TODO : write an key event handler when this scene get focued
	switch (keyCode) {
		case sf.key.LEFT:
			document.getElementById(arrButton[currentIndex]).setAttribute("class", "imgBlur");
			if(currentIndex == 0)
				currentIndex = 3;
			else 
				currentIndex --;
			document.getElementById(arrButton[currentIndex]).setAttribute("class", "imgFocus");
			//document.getElementById(arrButton[currentIndex]).appendChild(active);
			
			break;
		case sf.key.RIGHT:
			document.getElementById(arrButton[currentIndex]).setAttribute("class", "imgBlur");
			if(currentIndex == 3)
				currentIndex = 0;
			else 
				currentIndex ++;
			document.getElementById(arrButton[currentIndex]).setAttribute("class", "imgFocus");
			break;
		case sf.key.UP:
			break;
		case sf.key.DOWN:
			break;
		case sf.key.ENTER:
		{
			logger("enter");
			isLive = false;
			if(currentIndex == 0)
			{
                 logger("Movie");
				 categoryType = "Movie";
            }
			else if(currentIndex == 1)
            {
				logger("Music");
				categoryType = "Music";
            }
			else if(currentIndex == 2)     
            {
				logger("Sport");
				categoryType = "Sport";
            }
			else if(currentIndex == 3)
            {
				isLive = true;
				logger("TV");
				categoryType = "TV";
			}
			
			if (isLive) {
				sf.scene.hide("Home");
				sf.scene.show("LiveCategory");
				sf.scene.focus("LiveCategory");
			} else {
				sf.scene.hide("Home");
				sf.scene.show("Category");
				sf.scene.focus("Category");
			}
		}
			break;
		case sf.key.RETURN:
		{
			sf.key.preventDefault();
			sf.scene.hide("Home");
			sf.scene.show("Login");
			sf.scene.focus("Login");
		}
			break;
		case sf.key.RED:
		{
			logger("Dang xuat");
			var arr = document.cookie.split(";");
			for(var i = 0;i<arr.length;i++)
			{
				logger(arr[i]);
			}
			logger("cookie = " + document.cookie);
		}
		break;
		case sf.key.BLUE:
		{
			sf.scene.hide('Home');
			sf.scene.show('Topup');
			sf.scene.focus('Topup');
		}
		break;
	}
	
	document.getElementById("focus").setAttribute("class",currentActive[currentIndex]);
}
SceneHome.getUserProfile = function()
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
					logger("success");
					logger("success = " + userProfile.success);
					logger("name = " + userProfile.name);
					logger("balance = " + userProfile.balance);
					logger("subscriber = " + userProfile.subcriber);
					
					//document.getElementById("lblUserName").innerHTML = userProfile.name;
					//document.getElementById("lblBalance").innerHTML = userProfile.balance;
					//document.getElementById("lblExpireDate").innerHTML = userProfile.subcriber;
					document.getElementById("home_user_name_login").innerHTML = userProfile.name;
					document.getElementById("home_user_name_money").innerHTML = userProfile.balance;
					document.getElementById("home_user_name_expire_date").innerHTML = userProfile.subcriber;
					$('#loadingImage').sfLoading('hide');
				}
				else
				{
					logger("failed");
					$('#loadingImage').sfLoading('hide');
				}
			}
		}
		else
		{
			logger("Loi ket noi");
			$('#loadingImage').sfLoading('hide');
			$('#homeNetworkFailPopup').sfPopup('show');
		}
	});	
}

