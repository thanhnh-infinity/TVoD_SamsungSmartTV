var urlRequestGetChildCategory1 = "";

var movie_category_id1 = "14";
var music_category_id1 = "13";
var sport_category_id1 = "15";
var tv_category_id1 = "16";

//Bien kiem tra xem category hien tai la j, neu nhu cu thi giu nguyen, neu khac thi refresh lai list category va video
var curentCategoryType1 = "";

var filterParam1 =  "&filter=";
var pageParam1 =  "&page=";
var urlRequestGetListVideo1 = "";

var default_filter1 = "newest";
var default_page1 = "1";


//list of child categories
var lstChildCategories1 = new Array();
var lstVideos1 = new Array();
var selectedVideoName1 = "";
var selectedVideoDesc1 = "";

var selectedType1 = "TypeSelectChildCategory";

var isDrama1 = false;
var isGetListVideoFollowDrama1 = false;
var current_drama_id1 = "";

var global_current_video_id1 = 0;
var g_current_video_price_hd1 = 0;
var g_current_video_price_sdh1 = 0;
var g_live_channel_url1 = "";

var currentPage1 = 1;
var buttonIndex1 = 0;
var totalQuantity1 = 0;
var numberOfPages1 = 0;

var isCategoryFirst1;

var selectedType1BeforeReturn1;

function SceneLiveCategory(options) {
	this.options = options;
	//var arrButtonFilter;
	//var buttonIndex1 = 0;
	
	var arrMovie1;
	var movieIndex1;
	var lblFilmName;
	
	var arrFilter1;
	//var arrButtonFilterTitle;
	
	var currentCategoryId1;
	
	var currentVideoId1;
}

SceneLiveCategory.prototype.initialize = function () {
	logger("SceneLiveCategory.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here 
	// scene HTML and CSS will be loaded before this function is called
	selectedType1BeforeReturn1 = "";
	
	isCategoryFirst1 = true;
	$('#svecKeyHelp_492N').sfKeyHelp({
		'leftright':'',
		'updown':'Di chuyển',
		'enter':'Chọn',
		'return':'Quay lại'
	});
	
	$('#lblLivePaging').sfLabel({text:''});
	//arrMovie1 = new Array('imgBorder1','imgBorder2','imgBorder3','imgBorder4','imgBorder5','imgBorder6','imgBorder7','imgBorder8');
	arrMovie1 = new Array('imgLive1','imgLive2','imgLive3','imgLive4','imgLive5','imgLive6','imgLive7','imgLive8');
    lblFilmName = new Array('lblFilmNameLive1','lblFilmNameLive2','lblFilmNameLive3','lblFilmNameLive4','lblFilmNameLive5','lblFilmNameLive6','lblFilmNameLive7','lblFilmNameLive8');
	for(var i=0; i<8; i++)
	{
		$('#'+arrMovie1[i]).sfImage({
        		    src:''
        	    }).sfImage('show');
	    $('#'+lblFilmName[i]).sfLabel({text:''});
	}
	
	$('#imgDescription').sfImage({
		src:''
	}).sfImage('hide');
	
	$('#lblLiveVideoTitle').sfLabel({text:''});
	/*
	$('#listLiveCategory').sfList({
		data:'', 
		index: '0',
		itemsPerPage:'7'
	});
	$('#imgUp').sfImage({
		src:'images/up.png'
	}).sfImage('show');
	$('#imgDown').sfImage({
		src:'images/down.png'
	}).sfImage('show');
	*/
	
	
	//arrButtonFilter = new Array('#btnNewest', '#btnMostView','#btnFavorite','#btnRandom'); 
	//arrButtonFilterTitle = new Array('btnNewestText','btnMostViewText','btnFavoriteText','btnRandomText');
	buttonIndex1 = 0;
	
	this.movieIndex1 = 0;

	arrFilter1 = new Array('newest','most_view','favorite','random');
	
	currentCategoryType = categoryType;
	var default_category = "";
	/*if(currentCategoryType == "Movie")
		default_category = movie_category_id1;
	else if(currentCategoryType == "Music")
		default_category = music_category_id1;
	else if(currentCategoryType == "Sport")
		default_category = sport_category_id1;
	else if(currentCategoryType == "TV")*/
		default_category = tv_category_id1;
	
	urlRequestGetChildCategory1 = urlGetChildCategory + default_category;
	//var default_category = movie_category_id1;
	SceneLiveCategory.getChildCategory();
	SceneLiveCategory.getListVideo(default_category,default_filter1,default_page1);
	
}

SceneLiveCategory.prototype.handleShow = function () {
	logger("SceneLiveCategory.handleShow()");
	// this function will be called when the scene manager show this scene 
	//Remove all category in list
	//document.getElementById(arrMovie1[this.movieIndex1]).setAttribute("class", "imgFocus");
	logger("selectedType1 = " + selectedType1);
	SceneLiveCategory.getUserProfile();
	
	
	logger("userProfile = " + userProfile.name + " " + userProfile.balance + " " + userProfile.subcriber);
	
	//$('#listLiveCategory').sfList('clear');
	//focus on newest button tab
	//buttonIndex1 = 0;
	//$(arrButtonFilter[buttonIndex1]).sfButton('focus');
	
	urlRequestGetChildCategory1 = "";
	
	//if(currentCategoryType != categoryType)
	//{
		logger("do something here");
		$('#listLiveCategory').sfList({
				data:'', 
				index:'0',
		});
		/*
		if(categoryType == "Movie")
		{
			urlRequestGetChildCategory1 = urlGetChildCategory + movie_category_id1;
			default_category = movie_category_id1;
			
		}
		else if(categoryType == "Music")
		{
			urlRequestGetChildCategory1 = urlGetChildCategory + music_category_id1;
			default_category = music_category_id1;
		}
		else if(categoryType == "Sport")
		{
			urlRequestGetChildCategory1 = urlGetChildCategory + sport_category_id1;
			default_category = sport_category_id1;
		}
		else 
		{*/
			urlRequestGetChildCategory1 = urlGetChildCategory + tv_category_id1;
			default_category = tv_category_id1;
		//}
        
		SceneLiveCategory.getChildCategory();
		SceneLiveCategory.getListVideo(default_category,default_filter1,default_page1);
		selectedType1BeforeReturn1 = "";
		
		buttonIndex1 = 0;
		//for(var i = 0;i<4;i++)
		//{
		//	$(arrButtonFilter[i]).sfButton('blur'); 
		//	document.getElementById(arrButtonFilterTitle[i]).style.color = "white";
		//}
				
		//$(arrButtonFilter[buttonIndex1]).sfButton('focus');
		//document.getElementById(arrButtonFilterTitle[buttonIndex1]).style.color = "yellow";
	//}
	if(selectedType1BeforeReturn1 != "")
		selectedType1 = selectedType1BeforeReturn1;
	
	currentCategoryType = categoryType;
}

SceneLiveCategory.prototype.handleHide = function () {
	logger("SceneLiveCategory.handleHide()");
	// this function will be called when the scene manager hide this scene  
}

SceneLiveCategory.prototype.handleFocus = function () {
	logger("SceneLiveCategory.handleFocus()");
	// this function will be called when the scene manager focus this scene
}

SceneLiveCategory.prototype.handleBlur = function () {
	logger("SceneLiveCategory.handleBlur()");
	// this function will be called when the scene manager move focus to another scene from this scene
}

SceneLiveCategory.prototype.handleKeyDown = function (keyCode) {
	logger("SceneLiveCategory.handleKeyDown(" + keyCode + ")");
	// TODO : write an key event handler when this scene get focued
	switch (keyCode) {
		case sf.key.LEFT:
			SceneLiveCategory.processKeyLeft();
			break;
		case sf.key.RIGHT:
			SceneLiveCategory.processKeyRight();
			break;
		case sf.key.UP:
			SceneLiveCategory.processKeyUp();
			break;
		case sf.key.DOWN:
			SceneLiveCategory.processKeyDown();
			break;

		case sf.key.ENTER:
		
			SceneLiveCategory.processKeyEnter();
		
			break;
		case sf.key.RETURN:
		{
			sf.key.preventDefault();
			//buttonIndex1 = 0;
			selectedType1BeforeReturn1 = selectedType1;
			
			selectedType1 = "TypeSelectChildCategory";
			isLive = false;
			for(var i=0;i<8;i++)
			{
				document.getElementById(arrMovie1[i]).setAttribute("class", "imgBlur");
			}
			
			sf.scene.hide("LiveCategory");
			sf.scene.show("Home");
			sf.scene.focus("Home");
		}
			break;
		case sf.key.PLAY:A
		{
			sf.key.preventDefault();
			sf.scene.hide("LiveCategory");
			sf.scene.show("Player");
			sf.scene.focus("Player");
		}
		break;
	}
}
SceneLiveCategory.processKeyLeft = function()
{
	if(selectedType1 == "TypeSelectChildCategory")
	{
		logger("An vua thoi");
	}
	else if(selectedType1 == "TypeSelectFilter")
	{
        /*
		logger("buttonIndex1 = " + buttonIndex1);
		$(arrButtonFilter[buttonIndex1]).sfButton('blur');
		document.getElementById(arrButtonFilterTitle[buttonIndex1]).style.color = "white";
		if(buttonIndex1 == 0)
		{
			buttonIndex1 = 3;
		}
		else
		{
			buttonIndex1 --;
		}
		$(arrButtonFilter[buttonIndex1]).sfButton('focus');
		document.getElementById(arrButtonFilterTitle[buttonIndex1]).style.color = "yellow";
		//change movie when change button focus
		var _filter = arrFilter1[buttonIndex1];
		var idx = $('#listLiveCategory').sfList('getIndex');
		var obj = lstChildCategories1[idx];
		currentCategoryId1 = obj.category_id;
		logger("currentCategoryId1 = " + currentCategoryId1);
		SceneLiveCategory.getListVideo(currentCategoryId1,_filter,"1");
        */
	}
	else if(selectedType1 == "TypeSelectMovie")
	{
		//document.getElementById(arrMovie1[this.movieIndex1]).style.backgroundColor = "transparent";
		document.getElementById(arrMovie1[this.movieIndex1]).setAttribute("class", "imgBlur");
		if((this.movieIndex1 == 0) || (this.movieIndex1 == 4))
		{
			$('#listLiveCategory').sfList('focus');
			selectedType1 = "TypeSelectChildCategory";
		}
		else
		{
			this.movieIndex1 --;
			//document.getElementById(arrMovie1[this.movieIndex1]).style.backgroundColor = "blue";
			document.getElementById(arrMovie1[this.movieIndex1]).setAttribute("class", "imgFocus");
			var obj = lstVideos1[this.movieIndex1];
			SceneLiveCategory.displayVideoInfo(obj);
		}
	}
}

SceneLiveCategory.processKeyRight = function()
{
	if(selectedType1 == "TypeSelectChildCategory")
	{
		if(lstVideos1.length ==0)
		{
			logger("do nothing");
		}
		else
		{
			selectedType1 = "TypeSelectMovie";
			$('#listLiveCategory').sfList('blur');
			this.movieIndex1 = 0;
			document.getElementById(arrMovie1[this.movieIndex1]).setAttribute("class", "imgFocus");
			var obj = lstVideos1[this.movieIndex1];
			SceneLiveCategory.displayVideoInfo(obj);
		}	
	}
	else if(selectedType1 == "TypeSelectFilter")
	{
        /*
		//Khi chuyen focus tren filter thi chuyen ve page 1
		currentPage1 = 1;
		
		logger("buttonIndex1 = " + buttonIndex1);
		$(arrButtonFilter[buttonIndex1]).sfButton('blur'); 
		document.getElementById(arrButtonFilterTitle[buttonIndex1]).style.color = "white";
				
		if(buttonIndex1 !=3)
			buttonIndex1 ++;
		else
			buttonIndex1 = 0;
		$(arrButtonFilter[buttonIndex1]).sfButton('focus');
		document.getElementById(arrButtonFilterTitle[buttonIndex1]).style.color = "yellow";
		//do something when focus
				
		var _filter = arrFilter1[buttonIndex1];
		var idx = $('#listLiveCategory').sfList('getIndex');
		var obj = lstChildCategories1[idx];
		currentCategoryId1 = obj.category_id;
				
		logger("currentCategoryId1 = " + currentCategoryId1);
		SceneLiveCategory.getListVideo(currentCategoryId1,_filter,currentPage1);
        */
	}
	else if(selectedType1 == "TypeSelectMovie")
	{
		if(this.movieIndex1 == (lstVideos1.length - 1))
		{
			logger("wtf");
		}
		else
		{
			document.getElementById(arrMovie1[this.movieIndex1]).setAttribute("class", "imgBlur");
			
			if(this.movieIndex1 !=7)
				this.movieIndex1 ++;
			else
				this.movieIndex1 = 0;
			document.getElementById(arrMovie1[this.movieIndex1]).setAttribute("class", "imgFocus");
			var obj = lstVideos1[this.movieIndex1];
			SceneLiveCategory.displayVideoInfo(obj);
			
		}			
	}
}
SceneLiveCategory.displayVideoInfo = function(obj)
{
	if(isDrama1 == false)
	{			
		$('#lblLiveVideoTitle').sfLabel({text:obj.video_title});		
		logger("des = " + obj.video_description);
		document.getElementById("description").innerHTML = obj.video_description;
		//document.getElementById("description_text").innerHTML = obj.video_description;
		var _urlImage = obj.video_picture_path;//urlImage + obj.video_picture_path;
		$('#imgDescription').sfImage({
			src:_urlImage
		}).sfImage('show');
	}
	else
	{
		var obj = lstVideos1[this.movieIndex1];
		logger("index = " + this.movieIndex1);
		logger("name = " + obj.drama_english_title);
		$('#lblLiveVideoTitle').sfLabel({text:obj.drama_english_title});	
		document.getElementById("description").innerHTML = obj.drama_vietnamese_title + "<br/>" + "Số tập phim : " + obj.drama_quantity;
		//document.getElementById("description_text").innerHTML = obj.drama_vietnamese_title + "<br/>" + "Số tập phim : " + obj.drama_quantity;
		var _urlImage = obj.drama_image_path;//urlImage + obj.video_picture_path;
		$('#imgDescription').sfImage({
			src:_urlImage
		}).sfImage('show');
	}
}
SceneLiveCategory.processKeyUp = function()
{
	if(selectedType1 == "TypeSelectChildCategory")
	{
		$('#listLiveCategory').sfList('prev');
		var idx = $('#listLiveCategory').sfList('getIndex');
		logger("index = " + idx);
		var obj = lstChildCategories1[idx];
		logger(obj.category_name);
		logger(obj.category_id);
		//get newest
		if(obj.category_id == "4")
		{
			logger("Phim bo");
			isDrama1 = true;
			SceneLiveCategory.getListDrama(arrFilter1[buttonIndex1],"1");
		}
		else
		{
			isDrama1 = false;
			currentPage1 = 1;
			SceneLiveCategory.getListVideo(obj.category_id,arrFilter1[buttonIndex1],"1");
		}
	}
	else if(selectedType1 == "TypeSelectFilter")
	{
		logger("an vua thoi");
	}
	else if(selectedType1 == "TypeSelectMovie")
	{
		if(currentPage1 == 1 && (Math.floor(this.movieIndex1/4) == 0))
		{
			/*
			logger("focus button");
			document.getElementById(arrMovie1[this.movieIndex1]).setAttribute("class", "imgBlur");
			$(arrButtonFilter[buttonIndex1]).sfButton('focus');
			//document.getElementById('btnNewestText').style.color = "yellow";
			document.getElementById(arrButtonFilterTitle[buttonIndex1]).style.color = "yellow";
			selectedType1 = "TypeSelectFilter";
			*/
			//Them
			//var obj = lstVideos1[this.movieIndex1];
			//SceneLiveCategory.displayVideoInfo(obj);
		}
		else if(currentPage1 == 1 && (Math.floor(this.movieIndex1/4) != 0))
		{
			document.getElementById(arrMovie1[this.movieIndex1]).setAttribute("class", "imgBlur");
			this.movieIndex1 -=4;
			document.getElementById(arrMovie1[this.movieIndex1]).setAttribute("class", "imgFocus");
			var obj = lstVideos1[this.movieIndex1];
			SceneLiveCategory.displayVideoInfo(obj);
		}
		else if(currentPage1 != 1 && (Math.floor(this.movieIndex1/4) == 0))
		{
			//Chuyen ve trang truoc
			currentPage1 --;
			$('#lblLivePaging').sfLabel({text:currentPage1 + '/' + numberOfPages1});
			var idx = $('#listLiveCategory').sfList('getIndex');
			var obj = lstChildCategories1[idx];
			if(isDrama1 == false)
			{
				if(isGetListVideoFollowDrama1 == true)
				{
					SceneLiveCategory.getListVideoFollowDrama(current_drama_id1,arrFilter1[buttonIndex1],currentPage1);
				}
				else
				{
					SceneLiveCategory.getListVideo(obj.category_id,arrFilter1[buttonIndex1],currentPage1);
				}
			}
			else
			{
				SceneLiveCategory.getListDrama(arrFilter1[buttonIndex1],currentPage1);
			}
			//document.getElementById(arrMovie1[this.movieIndex1]).setAttribute("class", "imgFocus");
			document.getElementById(arrMovie1[0]).setAttribute("class", "imgFocus");
			//Them
			var obj = lstVideos1[this.movieIndex1];
			SceneLiveCategory.displayVideoInfo(obj);
		}
		else if(currentPage1 != 1 && (Math.floor(this.movieIndex1/4) !=0))
		{
			document.getElementById(arrMovie1[this.movieIndex1]).setAttribute("class", "imgBlur");
			this.movieIndex1 -=4;
			document.getElementById(arrMovie1[this.movieIndex1]).setAttribute("class", "imgFocus");
			
			var obj = lstVideos1[this.movieIndex1];
			SceneLiveCategory.displayVideoInfo(obj);
		}
	}
}
SceneLiveCategory.processKeyDown = function()
{
	if(selectedType1 == "TypeSelectChildCategory")
	{
		$('#listLiveCategory').sfList('next');
		var idx = $('#listLiveCategory').sfList('getIndex');
		var obj = lstChildCategories1[idx];
		if(obj.category_id == "4")
		{
			logger("Phim bo");
			isDrama1 = true;
			SceneLiveCategory.getListDrama(arrFilter1[buttonIndex1],"1");
		}
		else
		{
			//get newest
			isDrama1 = false;
			currentPage1 = 1;
			SceneLiveCategory.getListVideo(obj.category_id,arrFilter1[buttonIndex1],"1");
		}
	}
	else if(selectedType1 == "TypeSelectFilter")
	{
        /*
		if(lstVideos1.length == 0)
		{
			logger("do nothing");
		}
		else
		{
			document.getElementById(arrButtonFilterTitle[buttonIndex1]).style.color = "white";
			document.getElementById(arrMovie1[this.movieIndex1]).setAttribute("class", "imgFocus");
			selectedType1 = "TypeSelectMovie";
			
			var obj = lstVideos1[this.movieIndex1];
			SceneLiveCategory.displayVideoInfo(obj);
		}
        */
	}
	else if(selectedType1 == "TypeSelectMovie")
	{
		document.getElementById(arrMovie1[this.movieIndex1]).setAttribute("class", "imgBlur");
		if(Math.floor(this.movieIndex1/4) == 0)
		{
			if(lstVideos1.length <5)
			{
				logger("wtf");
				document.getElementById(arrMovie1[this.movieIndex1]).setAttribute("class", "imgFocus");
			}
			else
			{
				this.movieIndex1 += 4;
				document.getElementById(arrMovie1[this.movieIndex1]).setAttribute("class", "imgFocus");
			}
		}
		else //this.movieIndex1/ 4 == 1
		{
			//next page
			if(currentPage1 == numberOfPages1)
				currentPage1 = 1;
			else 
				currentPage1 ++;
			logger("currentPage1 = " + currentPage1);
					
			$('#lblLivePaging').sfLabel({text:currentPage1 + '/' + numberOfPages1});
			var idx = $('#listLiveCategory').sfList('getIndex');
			var obj = lstChildCategories1[idx];
			if(isDrama1 == false)
			{
				if(isGetListVideoFollowDrama1 == true)
				{
					
					SceneLiveCategory.getListVideoFollowDrama(current_drama_id1,arrFilter1[buttonIndex1],currentPage1);
				}
				else
				{
					SceneLiveCategory.getListVideo(obj.category_id,arrFilter1[buttonIndex1],currentPage1);
				}
			}
			else
			{
				SceneLiveCategory.getListDrama(arrFilter1[buttonIndex1],currentPage1);
			}
			document.getElementById(arrMovie1[this.movieIndex1]).setAttribute("class", "imgFocus");
		}
		var obj = lstVideos1[this.movieIndex1];
		SceneLiveCategory.displayVideoInfo(obj);
	}
}
SceneLiveCategory.processKeyEnter = function()
{
	if(selectedType1 == "TypeSelectMovie")
	{
		if(isDrama1 == false)
		{
			var obj = lstVideos1[this.movieIndex1];
			if(isLive == true)
			{
				g_live_channel_url1 = obj.live_channel_url + "/" + obj.live_channel_folder + ".m3u8|COMPONENT=HLS";
				selectedVideoName1 = obj.live_channel_title;
				logger("selectedVideoName1 = " + selectedVideoName1);
				selectedVideoDesc1 = obj.video_description;
			}
			else
			{
				selectedVideoName1 = obj.video_title;
				selectedVideoDesc1 = obj.video_description;
				global_current_video_id1 = obj.video_id;
				g_current_video_price_hd1 = obj.video_price_hd;
				g_current_video_price_shd = obj.video_price_shd;
				logger("g_current_video_price hd = " + g_current_video_price_hd1);
				logger("shd = " + g_current_video_price_shd);
			}
			sf.scene.hide("LiveCategory");
			sf.scene.show("Player");
			sf.scene.focus("Player");
		}
		else
		{
			logger("drama");
			isGetListVideoFollowDrama1 = true;
			var obj = lstVideos1[this.movieIndex1];
			logger("obj.video_id = " + obj.drama_id);
			logger("obj.live_channel_url = " + obj.drama_english_title);
			logger("title = " + obj.drama_vietnamese_title);
			current_drama_id1 = obj.drama_id;
			currentPage1 = "1";
			SceneLiveCategory.getListVideoFollowDrama(obj.drama_id,arrFilter1[buttonIndex1],currentPage1);
		}
	}
	else if(selectedType1 == "TypeSelectFilter")
	{
		logger("enter filter");
	}
	else if(selectedType1 == "TypeSelectChildCategory")
	{
		logger("enter child category");
	}
}
SceneLiveCategory.getChildCategory = function()
{
	alert("urlRequestGetChildCategory1 = " + urlRequestGetChildCategory1);
	//remove all object in lstChildCategories1
	lstChildCategories1 = lstChildCategories1.slice(lstChildCategories1.length,lstChildCategories1.length);
	//--------------
	//urlRequestGetChildCategory1 = "json/getChildCategory.json";
	//-----------------
	$.getJSON(urlRequestGetChildCategory1,
	function(data)
	{
		if(data.Status==1)
		{
			logger("--------data.Status==1");
		}
		else
		{
			logger("Get child Category successfully");	
			var childCategory = new Object();
			
			childCategory.success = data.success;
			//isSuccess = data.success;
			childCategory.quantity = data.quantity;
			if(childCategory.success)
			{ 
				if(categoryType == "Movie")
				{
					var childObj = new Object();
					childObj.category_name = "Phim";
					childObj.category_id = movie_category_id1;
					lstChildCategories1[0] = childObj;
				}
				else if(categoryType == "Music")
				{
					var childObj = new Object();
					childObj.category_name = "Nhạc";
					childObj.category_id = music_category_id1;
					lstChildCategories1[0] = childObj;
				}
				else if(categoryType == "Sport")
				{
					var childObj = new Object();
					childObj.category_name = "Thể Thao";
					childObj.category_id = sport_category_id1;
					lstChildCategories1[0] = childObj;
				}
				else if(categoryType == "TV")
				{
					
					var childObj = new Object();
					childObj.category_name = "TV";
					childObj.category_id = tv_category_id1;
					lstChildCategories1[0] = childObj;
					
				}
				else
				{
					logger("wtf");
				}
				for(var i = 0; i< childCategory.quantity;i++)
				{
					logger("Name : " + data.items[i].category_name);
					var childCategoryObj = new Object();
					childCategoryObj.category_name = data.items[i].category_name;
					childCategoryObj.category_id = data.items[i].category_id;
					childCategoryObj.category_image = data.items[i].category_image;
					lstChildCategories1[i+1] = childCategoryObj;
				}		
				SceneLiveCategory.displayChildCategory();
			}
			else
			{
				var errorObj = new Object();
				errorObj.success = data.success;
				errorObj.reason = data.reason;
				errorObj.type = data.type;
				logger("succes = failed " + errorObj.success + " " + errorObj.reason + " " + errorObj.type);	
			}
		}
	});		
}
SceneLiveCategory.displayChildCategory = function()
{
	var data = new Array();

	for(var i = 0;i<lstChildCategories1.length;i++)
	{
		var obj = lstChildCategories1[i];
		data[i] = obj.category_name;
	}
	var item_per_page = 0;

	if(lstChildCategories1.length >6)
	{
		item_per_page = 7;
		if(isCategoryFirst1 == true)
		{
			$('#listLiveCategory').sfList({
				data:data, 
				index:'0',
				itemsPerPage:7
				
			});
			isCategoryFirst1 = false;
		}
		else
		{
			$('#listLiveCategory').sfList({
				data:data, 
				index:'0',	
			});
		}
		$('#listLiveCategory').sfList('focus');
	}
	else
	{
		//item_per_page = lstChildCategories1.length;
		item_per_page = lstChildCategories1.length - 1;
		if(isCategoryFirst1 == true)
		{
			$('#listLiveCategory').sfList({
				data:data, 
				index:'0',
				itemsPerPage:7
				
			});
			isCategoryFirst1 = false;
		}
		else
		{
			$('#listLiveCategory').sfList({
				data:data, 
				index:'0',
				/*itemsPerPage:item_per_page*/
				
			});
		}
		$('#listLiveCategory').sfList('focus');
	}
}
SceneLiveCategory.getListDrama = function(_filter,_page)
{
	logger("filter = " + _filter + "page = " + _page);
	
	
	$('#categoryLoadingImage').sfLoading('show');
	for(var i = 1;i<=8;i++)
	{
		$('#'+arrMovie1[i]).sfImage('hide');
		document.getElementById(lblFilmName[i]).innerHTML = "";
		document.getElementById(arrMovie1[i-1]).setAttribute("class", "imgBlur");
	}
	//document.getElementById(arrMovie1[0]).setAttribute("class", "imgFocus");
	document.getElementById("description").innerHTML = "";
	$('#lblLiveVideoTitle').sfLabel({text:''});
	$('#imgDescription').sfImage({
		src:''
	}).sfImage('hide');
	
	//Remove all objects of lstVideos1
	lstVideos1 = lstVideos1.slice(lstVideos1.length,lstVideos1.length);
	this.movieIndex1 = 0;
	//Get url
	urlRequestGetListDrama = urlGetListDrama + "filter=" + _filter + "&page=" + _page;
	logger("urlRequestGetListDrama = " + urlRequestGetListDrama);
	
	$.getJSON(urlRequestGetListDrama,
	function(data)
	{
		
		if(data.Status==1)
		{
			logger("Failed to get list drama");
			$('#categoryLoadingImage').sfLoading('hide');
		}
		else
		{
			logger("Get Drama successfully");	
			var drama = new Object();
			drama.success = data.success;
			drama.quantity = data.quantity;
			drama.total_quantity = data.total_quantity;
			
			totalQuantity1 = drama.total_quantity;
			numberOfPages1 = Math.ceil(totalQuantity1/8);
			logger("numberOfPages1 = " + numberOfPages1);
			$('#lblLivePaging').sfLabel({text: currentPage1 + '/' + numberOfPages1 });
			if(drama.success)
			{
				$('#categoryLoadingImage').sfLoading('hide');
				
				for(var i = 0; i< drama.quantity;i++)
				{
					var index = i + 1;
					logger("Name : " + data.items[i].video_title);
					var dramaObj = new Object();
					dramaObj.drama_english_title = data.items[i].drama_english_title;
					dramaObj.drama_vietnamese_title = data.items[i].drama_vietnamese_title;
					dramaObj.drama_quantity = data.items[i].drama_quantity;
					dramaObj.drama_id = data.items[i].drama_id;
					dramaObj.drama_image_path = data.items[i].drama_image_path;
						
					lstVideos1[i] = dramaObj;
					
					document.getElementById(lblFilmName[index]).innerHTML = data.items[i].drama_english_title;
					//Display image
					var _urlImage = dramaObj.drama_image_path;//urlImage + videoObj.video_picture_path;
					$('#'+arrMovie1[index]).sfImage({
						src: _urlImage
					}).sfImage('show');
				}		
			}
			else //drama.sucess = false
			{
				$('#categoryLoadingImage').sfLoading('hide');
				var errorObj = new Object();
				errorObj.success = data.success;
				errorObj.reason = data.reason;
				errorObj.type = data.type;
				logger("succes = failed " + errorObj.success + " " + errorObj.reason + " " + errorObj.type);	
				
				$('#lblLivePaging').sfLabel({text:'0 video'});
				for(var i = 0;i<8;i++)
				{
					var index = i+1;
					document.getElementById(lblFilmName[index]).innerHTML = "";
					$('#'+arrMovie1[index]).sfImage('hide');	
				}
				
			}
		}
	});	
}
function strip(s) {
	//logger("s = " + s);
	if((s != "undefined") && (s != null))
		return s.replace(/^\s+|\s+$/g,"");
	else
		return s;
}
SceneLiveCategory.getListVideo = function(_category,_filter,_page)
{
	isDrama1 = false;
	isGetListVideoFollowDrama1 = false;
	
	$('#categoryLoadingImage').sfLoading('show');
	for(var i = 0;i<8;i++)
	{
		$('#'+arrMovie1[i]).sfImage('hide');
		document.getElementById(lblFilmName[i]).innerHTML = "";
		document.getElementById(arrMovie1[i]).setAttribute("class", "imgBlur");
	}
	
	document.getElementById("description").innerHTML = "";
	$('#lblLiveVideoTitle').sfLabel({text:''});
	$('#imgDescription').sfImage({
		src:''
	}).sfImage('hide');
	
	//Remove all objects of lstVideos1
	lstVideos1 = lstVideos1.slice(lstVideos1.length,lstVideos1.length);
	this.movieIndex1 = 0;
	//Get url
	urlRequestGetListVideo1 = urlGetListVideo + _category + filterParam1 + _filter + pageParam1 + _page;
	alert("urlRequestGetListVideo1 = " + urlRequestGetListVideo1);
	//delete
	//urlRequestGetListVideo1 = "json/getListVideo1.json";
	//delete--
	$.getJSON(urlRequestGetListVideo1,
	function(data)
	{
		
		if(data.Status==1)
		{
			$('#categoryLoadingImage').sfLoading('hide');
		}
		else
		{
			//logger("Get Video successfully");	
			var video = new Object();
			//video.quantity = 0;
			video.success = data.success;
			video.quantity = data.quantity;
			video.type = data.type;
			totalQuantity1 = video.total_quantity = data.total_quantity;
			numberOfPages1 = Math.ceil(totalQuantity1/8);
			logger("numberOfPages1 = " + numberOfPages1);
			$('#lblLivePaging').sfLabel({text: currentPage1 + '/' + numberOfPages1 });
			if(video.success)
			{
				$('#categoryLoadingImage').sfLoading('hide');
				
				if(video.type == null)
				{
					for(var i = 0; i< video.quantity;i++)
					{
						//logger("Name : " + data.items[i].video_title);
						var videoObj = new Object();
						videoObj.video_title = data.items[i].video_title;
						videoObj.video_id = data.items[i].video_id;
						//logger("id = " + videoObj.video_id);
						videoObj.video_picture_path = data.items[i].video_picture_path;
						
						if(videoObj.video_id == "3224")
						{
							videoObj.video_description = "Đạo diễn: Will Meugniot, Dick Sebast	Diễn vi&ecirc;n: Justin Gross, Grey DeLisle, Michael Massee	Nh&agrave; sản xuất: MLG Productions 2 Quốc gia: Mỹ Thời lượng: 88 ph&uacute;t	Thể loại: Hoạt h&igrave;nh Năm sản xu&acirc;́t: 2006 Nội dung: In 1945, Captain America, U.S. soldier crea...";
						}
						else
						{
							videoObj.video_description = data.items[i].video_description;
						}
						videoObj.video_description = strip(videoObj.video_description);
						videoObj.video_description = videoObj.video_description.replace(/\r\n/gi, ""); 
						videoObj.video_description = videoObj.video_description.replace(/\t/gi, " ");
						// Đạo diễn: Will Meugniot, Dick Sebast	Diễn vi&ecirc;n: Justin Gross, Grey DeLisle, Michael Massee	Nh&agrave; sản xuất: MLG Productions 2	Quốc gia: Mỹ	Thời lượng: 88 ph&uacute;t	Thể loại: Hoạt h&igrave;nh	Năm sản xu&acirc;́t: 2006		Nội dung: In 1945, Captain America, U.S. soldier crea...
						videoObj.video_price_hd = data.items[i].video_price_hd;
						videoObj.video_price_shd = data.items[i].video_price_shd;
						
						//logger("description = " + videoObj.video_description);
						//logger("hd = " + videoObj.video_price_hd);
						//logger("sdh = " + videoObj.video_price_shd);
						//add video object to array
						
						//if((videoObj.video_price_hd != "") || (videoObj.video_price_shd != ""))
						//{
							lstVideos1[i] = videoObj;
						
							//Display film name
							document.getElementById(lblFilmName[i]).innerHTML = videoObj.video_title;
							//Display image
							var _urlImage = videoObj.video_picture_path;//urlImage + videoObj.video_picture_path;
							logger("_urlImage.substring = " + _urlImage.substring(_urlImage.length-3,_urlImage.length-0));
							if((_urlImage.substring(_urlImage.length-3,_urlImage.length - 0) == "png")||(_urlImage.substring(_urlImage.length-3,_urlImage.length -0) == "jpg") )
							{
								$('#'+arrMovie1[i]).sfImage({
									src: _urlImage
								}).sfImage('show');
							}
							else
							{
								$('#'+arrMovie1[i]).sfImage({
									src: "images/no_image.png"
								}).sfImage('show');
							}
						//}
						
					}
					if(lstVideos1.length == 0)
						$('#lblLivePaging').sfLabel({text: "0 video" });
				}
				else //live streaming
				{
					isLive = true;
					for(var i = 0; i< video.quantity;i++)
					{
						logger("Name : " + data.items[i].live_channel_title);
						var videoObj = new Object();
						videoObj.live_channel_title = data.items[i].live_channel_title;
						videoObj.live_channel_id = data.items[i].live_channel_id;
						videoObj.video_picture_path = data.items[i].video_picture_path;
						videoObj.video_description = "";
						videoObj.live_channel_url = data.items[i].live_channel_url;
						videoObj.live_channel_folder = data.items[i].live_channel_folder;
						//add video object to array
						lstVideos1[i] = videoObj;
						//Display film name
						document.getElementById(lblFilmName[i]).innerHTML = videoObj.live_channel_title;
						//Display image
						var _urlImage = videoObj.video_picture_path;//urlImage + videoObj.video_picture_path;
						$('#'+arrMovie1[i]).sfImage({
							src: _urlImage
						}).sfImage('show');
						
					}	
				}
				
				if(selectedType1 == "TypeSelectMovie")
				{
					var obj = lstVideos1[0];
			
					$('#lblLiveVideoTitle').sfLabel({text:obj.video_title});
					document.getElementById("description").innerHTML = obj.video_description;
					var _urlImage = obj.video_picture_path;//urlImage + obj.video_picture_path;
					$('#imgDescription').sfImage({
						src:_urlImage
					}).sfImage('show');
				}
			}
			else //video.sucess = false
			{
				$('#categoryLoadingImage').sfLoading('hide');
				var errorObj = new Object();
				errorObj.success = data.success;
				errorObj.reason = data.reason;
				errorObj.type = data.type;
				logger("succes = failed " + errorObj.success + " " + errorObj.reason + " " + errorObj.type);	
				
				$('#lblLivePaging').sfLabel({text:'0 video'});
				for(var i = 0;i<8;i++)
				{
					document.getElementById(lblFilmName[i]).innerHTML = "";
					$('#'+arrMovie1[i]).sfImage('hide');	
				}
				
			}//end video success if else
			
			/*
			if(categoryType == "Sport")
			{
				if(lstVideos1.length > 0)
				{
					numberOfPages1 = 1;
					$('#lblLivePaging').sfLabel({text: currentPage1 + '/' + numberOfPages1 });
				}
				else if(lstVideos1.length == 0)
				{
					$('#lblLivePaging').sfLabel({text:'0 video'});
				}
			}
			*/
			
			
		}
	});	
}	

SceneLiveCategory.displayUserProfile = function(){
	document.getElementById("category_user_name_login").innerHTML = userProfile.name;
	document.getElementById("category_user_name_money").innerHTML = userProfile.balance;
	document.getElementById("category_user_name_expire_date").innerHTML = userProfile.subcriber;
}
SceneLiveCategory.getUserProfile = function()
{
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
			
					SceneLiveCategory.displayUserProfile();
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
SceneLiveCategory.getListVideoFollowDrama = function(_drama_id,_filter,_page)
{
	logger("get list video follow drama");
	
	
	isDrama1 = false;
	
	$('#categoryLoadingImage').sfLoading('show');
	for(var i = 1;i<=8;i++)
	{
		$('#'+arrMovie1[i]).sfImage('hide');
		document.getElementById(lblFilmName[i]).innerHTML = "";
		document.getElementById(arrMovie1[i-1]).setAttribute("class", "imgBlur");
	}
	document.getElementById(arrMovie1[0]).setAttribute("class", "imgFocus");
	document.getElementById("description").innerHTML = "";
	$('#lblLiveVideoTitle').sfLabel({text:''});
	$('#imgDescription').sfImage({
		src:''
	}).sfImage('hide');
	
	//Remove all objects of lstVideos1
	lstVideos1 = lstVideos1.slice(lstVideos1.length,lstVideos1.length);
	this.movieIndex1 = 0;
	//Get url
	//urlRequestGetListVideo1 = urlGetListVideo + _category + filterParam1 + _filter + pageParam1 + _page;
	if(_filter == "newest")
	{
		_filter = "oldest";
	}
	var urlRequestGetListVideo1FollowDrama = urlGetListVideoFollowDrama + _drama_id+ filterParam1 + _filter + pageParam1 + _page;
	logger("urlRequestGetListVideo1FollowDrama = " + urlRequestGetListVideo1FollowDrama);
	//delete
	//urlRequestGetListVideo1 = "json/getListVideo1.json";
	//delete--
	$.getJSON(urlRequestGetListVideo1FollowDrama,
	function(data)
	{
		
		if(data.Status==1)
		{
			logger("Failed to get list video data");
			$('#categoryLoadingImage').sfLoading('hide');
		}
		else
		{
			logger("Get Video successfully");	
			var video = new Object();
			//video.quantity = 0;
			video.success = data.success;
			video.quantity = data.quantity;
			video.type = data.type;
			totalQuantity1 = video.total_quantity = data.total_quantity;
			numberOfPages1 = Math.ceil(totalQuantity1/8);
			logger("numberOfPages1 = " + numberOfPages1);
			$('#lblLivePaging').sfLabel({text: currentPage1 + '/' + numberOfPages1 });
			if(video.success)
			{
				$('#categoryLoadingImage').sfLoading('hide');
				
				if(video.type == null)
				{
					for(var i = 0; i< video.quantity;i++)
					{
						var index = i + 1;
						logger("Name : " + data.items[i].video_title);
						var videoObj = new Object();
						videoObj.video_title = data.items[i].video_title;
						videoObj.video_id = data.items[i].video_id;
						videoObj.video_picture_path = data.items[i].video_picture_path;
						videoObj.video_description = data.items[i].video_description;
						videoObj.video_price_hd = data.items[i].video_price_hd;
						videoObj.video_price_shd = data.items[i].video_price_shd;
						
						//add video object to array
						lstVideos1[i] = videoObj;
						//Display film name
						document.getElementById(lblFilmName[index]).innerHTML = videoObj.video_title;
						//Display image
						var _urlImage = videoObj.video_picture_path;//urlImage + videoObj.video_picture_path;
						$('#'+arrMovie1[index]).sfImage({
							src: _urlImage
						}).sfImage('show');
						
					}		
				}
				else //live streaming
				{
					isLive = true;
					for(var i = 0; i< video.quantity;i++)
					{
						var index = i + 1;
						logger("Name : " + data.items[i].live_channel_title);
						var videoObj = new Object();
						videoObj.live_channel_title = data.items[i].live_channel_title;
						videoObj.live_channel_id = data.items[i].live_channel_id;
						videoObj.video_picture_path = data.items[i].video_picture_path;
						videoObj.video_description = "";
						videoObj.live_channel_url = data.items[i].live_channel_url;
						videoObj.live_channel_folder = data.items[i].live_channel_folder;
						//add video object to array
						lstVideos1[i] = videoObj;
						//Display film name
						document.getElementById(lblFilmName[index]).innerHTML = videoObj.live_channel_title;
						//Display image
						var _urlImage = videoObj.video_picture_path;//urlImage + videoObj.video_picture_path;
						$('#'+arrMovie1[index]).sfImage({
							src: _urlImage
						}).sfImage('show');
						
					}	
				}
				if(selectedType1 == "TypeSelectMovie")
				{
					var obj = lstVideos1[0];
			
					$('#lblLiveVideoTitle').sfLabel({text:obj.video_title});
					document.getElementById("description").innerHTML = obj.video_description;
					var _urlImage = obj.video_picture_path;//urlImage + obj.video_picture_path;
					$('#imgDescription').sfImage({
						src:_urlImage
					}).sfImage('show');
				}
			}
			else //video.sucess = false
			{
				$('#categoryLoadingImage').sfLoading('hide');
				var errorObj = new Object();
				errorObj.success = data.success;
				errorObj.reason = data.reason;
				errorObj.type = data.type;
				logger("succes = failed " + errorObj.success + " " + errorObj.reason + " " + errorObj.type);	
				
				$('#lblLivePaging').sfLabel({text:'0 video'});
				for(var i = 0;i<8;i++)
				{
					var index = i+1;
					document.getElementById(lblFilmName[index]).innerHTML = "";
					$('#'+arrMovie1[index]).sfImage('hide');	
				}
				
			}
		}
	});	
}