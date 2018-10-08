var urlRequestGetChildCategory = "";

var movie_category_id = "14";
var music_category_id = "13";
var sport_category_id = "15";
var tv_category_id = "16";

//Bien kiem tra xem category hien tai la j, neu nhu cu thi giu nguyen, neu khac thi refresh lai list category va video
var curentCategoryType = "";

var filterParam =  "&filter=";
var pageParam =  "&page=";
var urlRequestGetListVideo = "";

var default_filter = "newest";
var default_page = "1";


//list of child categories
var lstChildCategories = new Array();
var lstVideos = new Array();
var selectedVideoName = "";
var selectedVideoDesc = "";

var selectedType = "TypeSelectChildCategory";

var isDrama = false;
var isGetListVideoFollowDrama = false;
var current_drama_id = "";

var global_current_video_id = 0;
var g_current_video_price_hd = 0;
var g_current_video_price_sdh = 0;
var g_live_channel_url = "";

var currentPage = 1;
var buttonIndex = 0;
var totalQuantity = 0;
var numberOfPages = 0;

var isCategoryFirst;

var selectedTypeBeforeReturn;

function SceneCategory(options) {
	this.options = options;
	var arrButtonFilter;
	//var buttonIndex = 0;
	
	var arrMovie;
	var movieIndex;
	
	var arrFilter;
	var arrButtonFilterTitle;
	
	var currentCategoryId;
	
	var currentVideoId;
}

SceneCategory.prototype.initialize = function () {
	logger("SceneCategory.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here 
	// scene HTML and CSS will be loaded before this function is called
	selectedTypeBeforeReturn = "";
	
	isCategoryFirst = true;
	$('#svecKeyHelp_491N').sfKeyHelp({
		'leftright':'',
		'updown':'Di chuyển',
		'enter':'Chọn',
		'return':'Quay lại'
	});
	
	$('#lblPaging').sfLabel({text:''});
	if(!isLive) {
		$('#btnNewest').sfButton({text:''});
		$('#btnMostView').sfButton({text:''});
		$('#btnFavorite').sfButton({text:''});
		$('#btnRandom').sfButton({text:''});
	}
	
	$('#img1').sfImage({
		src:''
	}).sfImage('show');
	$('#img2').sfImage({
		src:''
	}).sfImage('show');
	$('#img3').sfImage({
		src:''
	}).sfImage('show');
	$('#img4').sfImage({
		src:''
	}).sfImage('show');
	$('#img5').sfImage({
		src:''
	}).sfImage('show');
	$('#img6').sfImage({
		src:''
	}).sfImage('show');
	$('#img7').sfImage({
		src:''
	}).sfImage('show');
	$('#img8').sfImage({
		src:''
	}).sfImage('show');
	
	$('#lblFilmName1').sfLabel({text:''});
	$('#lblFilmName2').sfLabel({text:''});
	$('#lblFilmName3').sfLabel({text:''});
	$('#lblFilmName4').sfLabel({text:''});
	$('#lblFilmName5').sfLabel({text:''});
	$('#lblFilmName6').sfLabel({text:''});
	$('#lblFilmName7').sfLabel({text:''});
	$('#lblFilmName8').sfLabel({text:''});
	$('#imgDescription').sfImage({
		src:''
	}).sfImage('hide');
	
	$('#lblVideoTitle').sfLabel({text:''});
	/*
	$('#listCategory').sfList({
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
	
	
	arrButtonFilter = new Array('#btnNewest', '#btnMostView','#btnFavorite','#btnRandom'); 
	arrButtonFilterTitle = new Array('btnNewestText','btnMostViewText','btnFavoriteText','btnRandomText');
	buttonIndex = 0;
	
	//arrMovie = new Array('imgBorder1','imgBorder2','imgBorder3','imgBorder4','imgBorder5','imgBorder6','imgBorder7','imgBorder8');
	arrMovie = new Array('img1','img2','img3','img4','img5','img6','img7','img8');
	this.movieIndex = 0;

	arrFilter = new Array('newest','most_view','favorite','random');
	
	currentCategoryType = categoryType;
	var default_category = "";
	if(currentCategoryType == "Movie")
		default_category = movie_category_id;
	else if(currentCategoryType == "Music")
		default_category = music_category_id;
	else if(currentCategoryType == "Sport")
		default_category = sport_category_id;
	else if(currentCategoryType == "TV")
		default_category = tv_category_id;
	
	urlRequestGetChildCategory = urlGetChildCategory + default_category;
	//var default_category = movie_category_id;
	SceneCategory.getChildCategory();
	SceneCategory.getListVideo(default_category,default_filter,default_page);
	
}

SceneCategory.prototype.handleShow = function () {
	logger("SceneCategory.handleShow()");
	// this function will be called when the scene manager show this scene 
	//Remove all category in list
	//document.getElementById(arrMovie[this.movieIndex]).setAttribute("class", "imgFocus");
	logger("selectedType = " + selectedType);
	SceneCategory.getUserProfile();
	
	
	logger("userProfile = " + userProfile.name + " " + userProfile.balance + " " + userProfile.subcriber);
	
	//$('#listCategory').sfList('clear');
	//focus on newest button tab
	//buttonIndex = 0;
	$(arrButtonFilter[buttonIndex]).sfButton('focus');
	
	urlRequestGetChildCategory = "";
	
	if(currentCategoryType != categoryType)
	{
		logger("do something here");
		$('#listCategory').sfList({
				data:'', 
				index:'0',
		});
		
		if(categoryType == "Movie")
		{
			urlRequestGetChildCategory = urlGetChildCategory + movie_category_id;
			default_category = movie_category_id;
			
		}
		else if(categoryType == "Music")
		{
			urlRequestGetChildCategory = urlGetChildCategory + music_category_id;
			default_category = music_category_id;
		}
		else if(categoryType == "Sport")
		{
			urlRequestGetChildCategory = urlGetChildCategory + sport_category_id;
			default_category = sport_category_id;
		}
		else 
		{
			urlRequestGetChildCategory = urlGetChildCategory + tv_category_id;
			default_category = tv_category_id;
		}
		SceneCategory.getChildCategory();
		SceneCategory.getListVideo(default_category,default_filter,default_page);
		selectedTypeBeforeReturn = "";
		
		buttonIndex = 0;
		for(var i = 0;i<4;i++)
		{
			$(arrButtonFilter[i]).sfButton('blur'); 
			document.getElementById(arrButtonFilterTitle[i]).style.color = "white";
		}
				
		$(arrButtonFilter[buttonIndex]).sfButton('focus');
		//document.getElementById(arrButtonFilterTitle[buttonIndex]).style.color = "yellow";
	}
	if(selectedTypeBeforeReturn != "")
		selectedType = selectedTypeBeforeReturn;
	
	currentCategoryType = categoryType;
	/*
	if(!isLive)  {
		document.getElementById("tabVideoList").style.visibility = "visible";
		document.getElementById("tabLiveList").style.visibility = "hidden";
	} else {
		document.getElementById("tabVideoList").style.visibility = "hidden";
		document.getElementById("tabLiveList").style.visibility = "visible";
	}
    */
}

SceneCategory.prototype.handleHide = function () {
	logger("SceneCategory.handleHide()");
	// this function will be called when the scene manager hide this scene  
}

SceneCategory.prototype.handleFocus = function () {
	logger("SceneCategory.handleFocus()");
	// this function will be called when the scene manager focus this scene
}

SceneCategory.prototype.handleBlur = function () {
	logger("SceneCategory.handleBlur()");
	// this function will be called when the scene manager move focus to another scene from this scene
}

SceneCategory.prototype.handleKeyDown = function (keyCode) {
	logger("SceneCategory.handleKeyDown(" + keyCode + ")");
	// TODO : write an key event handler when this scene get focued
	switch (keyCode) {
		case sf.key.LEFT:
			SceneCategory.processKeyLeft();
			break;
		case sf.key.RIGHT:
			SceneCategory.processKeyRight();
			break;
		case sf.key.UP:
			SceneCategory.processKeyUp();
			break;
		case sf.key.DOWN:
			SceneCategory.processKeyDown();
			break;

		case sf.key.ENTER:
		
			SceneCategory.processKeyEnter();
		
			break;
		case sf.key.RETURN:
		{
			sf.key.preventDefault();
			//buttonIndex = 0;
			selectedTypeBeforeReturn = selectedType;
			
			selectedType = "TypeSelectChildCategory";
			isLive = false;
			for(var i=0;i<8;i++)
			{
				document.getElementById(arrMovie[i]).setAttribute("class", "imgBlur");
			}
			
			sf.scene.hide("Category");
			sf.scene.show("Home");
			sf.scene.focus("Home");
		}
			break;
		case sf.key.PLAY:A
		{
			sf.key.preventDefault();
			sf.scene.hide("Category");
			sf.scene.show("Player");
			sf.scene.focus("Player");
		}
		break;
	}
}
SceneCategory.processKeyLeft = function()
{
	if(selectedType == "TypeSelectChildCategory")
	{
		logger("An vua thoi");
	}
	else if(selectedType == "TypeSelectFilter")
	{
		logger("buttonIndex = " + buttonIndex);
		$(arrButtonFilter[buttonIndex]).sfButton('blur');
		document.getElementById(arrButtonFilterTitle[buttonIndex]).style.color = "white";
		if(buttonIndex == 0)
		{
			buttonIndex = 3;
		}
		else
		{
			buttonIndex --;
		}
		$(arrButtonFilter[buttonIndex]).sfButton('focus');
		document.getElementById(arrButtonFilterTitle[buttonIndex]).style.color = "yellow";
		//change movie when change button focus
		var _filter = arrFilter[buttonIndex];
		var idx = $('#listCategory').sfList('getIndex');
		var obj = lstChildCategories[idx];
		currentCategoryId = obj.category_id;
		logger("currentCategoryId = " + currentCategoryId);
		SceneCategory.getListVideo(currentCategoryId,_filter,"1");
	}
	else if(selectedType == "TypeSelectMovie")
	{
		//document.getElementById(arrMovie[this.movieIndex]).style.backgroundColor = "transparent";
		document.getElementById(arrMovie[this.movieIndex]).setAttribute("class", "imgBlur");
		if((this.movieIndex == 0) || (this.movieIndex == 4))
		{
			$('#listCategory').sfList('focus');
			selectedType = "TypeSelectChildCategory";
		}
		else
		{
			this.movieIndex --;
			//document.getElementById(arrMovie[this.movieIndex]).style.backgroundColor = "blue";
			document.getElementById(arrMovie[this.movieIndex]).setAttribute("class", "imgFocus");
			var obj = lstVideos[this.movieIndex];
			SceneCategory.displayVideoInfo(obj);
		}
	}
}

SceneCategory.processKeyRight = function()
{
	if(selectedType == "TypeSelectChildCategory")
	{
		if(lstVideos.length ==0)
		{
			logger("do nothing");
		}
		else
		{
			selectedType = "TypeSelectMovie";
			$('#listCategory').sfList('blur');
			this.movieIndex = 0;
			document.getElementById(arrMovie[this.movieIndex]).setAttribute("class", "imgFocus");
			var obj = lstVideos[this.movieIndex];
			SceneCategory.displayVideoInfo(obj);
		}	
	}
	else if(selectedType == "TypeSelectFilter")
	{
		//Khi chuyen focus tren filter thi chuyen ve page 1
		currentPage = 1;
		
		logger("buttonIndex = " + buttonIndex);
		$(arrButtonFilter[buttonIndex]).sfButton('blur'); 
		document.getElementById(arrButtonFilterTitle[buttonIndex]).style.color = "white";
				
		if(buttonIndex !=3)
			buttonIndex ++;
		else
			buttonIndex = 0;
		$(arrButtonFilter[buttonIndex]).sfButton('focus');
		document.getElementById(arrButtonFilterTitle[buttonIndex]).style.color = "yellow";
		//do something when focus
				
		var _filter = arrFilter[buttonIndex];
		var idx = $('#listCategory').sfList('getIndex');
		var obj = lstChildCategories[idx];
		currentCategoryId = obj.category_id;
				
		logger("currentCategoryId = " + currentCategoryId);
		SceneCategory.getListVideo(currentCategoryId,_filter,currentPage);
	}
	else if(selectedType == "TypeSelectMovie")
	{
		if(this.movieIndex == (lstVideos.length - 1))
		{
			logger("wtf");
		}
		else
		{
			document.getElementById(arrMovie[this.movieIndex]).setAttribute("class", "imgBlur");
			
			if(this.movieIndex !=7)
				this.movieIndex ++;
			else
				this.movieIndex = 0;
			document.getElementById(arrMovie[this.movieIndex]).setAttribute("class", "imgFocus");
			var obj = lstVideos[this.movieIndex];
			SceneCategory.displayVideoInfo(obj);
			
		}			
	}
}
SceneCategory.displayVideoInfo = function(obj)
{
	if(isDrama == false)
	{			
		$('#lblVideoTitle').sfLabel({text:obj.video_title});		
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
		var obj = lstVideos[this.movieIndex];
		logger("index = " + this.movieIndex);
		logger("name = " + obj.drama_english_title);
		$('#lblVideoTitle').sfLabel({text:obj.drama_english_title});	
		document.getElementById("description").innerHTML = obj.drama_vietnamese_title + "<br/>" + "Số tập phim : " + obj.drama_quantity;
		//document.getElementById("description_text").innerHTML = obj.drama_vietnamese_title + "<br/>" + "Số tập phim : " + obj.drama_quantity;
		var _urlImage = obj.drama_image_path;//urlImage + obj.video_picture_path;
		$('#imgDescription').sfImage({
			src:_urlImage
		}).sfImage('show');
	}
}
SceneCategory.processKeyUp = function()
{
	if(selectedType == "TypeSelectChildCategory")
	{
		$('#listCategory').sfList('prev');
		var idx = $('#listCategory').sfList('getIndex');
		logger("index = " + idx);
		var obj = lstChildCategories[idx];
		logger(obj.category_name);
		logger(obj.category_id);
		//get newest
		if(obj.category_id == "4")
		{
			logger("Phim bo");
			isDrama = true;
			SceneCategory.getListDrama(arrFilter[buttonIndex],"1");
		}
		else
		{
			isDrama = false;
			currentPage = 1;
			SceneCategory.getListVideo(obj.category_id,arrFilter[buttonIndex],"1");
		}
	}
	else if(selectedType == "TypeSelectFilter")
	{
		logger("an vua thoi");
	}
	else if(selectedType == "TypeSelectMovie")
	{
		if(currentPage == 1 && (Math.floor(this.movieIndex/4) == 0))
		{
			logger("focus button");
			document.getElementById(arrMovie[this.movieIndex]).setAttribute("class", "imgBlur");
			$(arrButtonFilter[buttonIndex]).sfButton('focus');
			//document.getElementById('btnNewestText').style.color = "yellow";
			document.getElementById(arrButtonFilterTitle[buttonIndex]).style.color = "yellow";
			selectedType = "TypeSelectFilter";
			
			//Them
			var obj = lstVideos[this.movieIndex];
			SceneCategory.displayVideoInfo(obj);
		}
		else if(currentPage == 1 && (Math.floor(this.movieIndex/4) != 0))
		{
			document.getElementById(arrMovie[this.movieIndex]).setAttribute("class", "imgBlur");
			this.movieIndex -=4;
			document.getElementById(arrMovie[this.movieIndex]).setAttribute("class", "imgFocus");
			var obj = lstVideos[this.movieIndex];
			SceneCategory.displayVideoInfo(obj);
		}
		else if(currentPage != 1 && (Math.floor(this.movieIndex/4) == 0))
		{
			//Chuyen ve trang truoc
			currentPage --;
			$('#lblPaging').sfLabel({text:currentPage + '/' + numberOfPages});
			var idx = $('#listCategory').sfList('getIndex');
			var obj = lstChildCategories[idx];
			if(isDrama == false)
			{
				if(isGetListVideoFollowDrama == true)
				{
					SceneCategory.getListVideoFollowDrama(current_drama_id,arrFilter[buttonIndex],currentPage);
				}
				else
				{
					SceneCategory.getListVideo(obj.category_id,arrFilter[buttonIndex],currentPage);
				}
			}
			else
			{
				SceneCategory.getListDrama(arrFilter[buttonIndex],currentPage);
			}
			//document.getElementById(arrMovie[this.movieIndex]).setAttribute("class", "imgFocus");
			document.getElementById(arrMovie[0]).setAttribute("class", "imgFocus");
			//Them
			var obj = lstVideos[this.movieIndex];
			SceneCategory.displayVideoInfo(obj);
		}
		else if(currentPage != 1 && (Math.floor(this.movieIndex/4) !=0))
		{
			document.getElementById(arrMovie[this.movieIndex]).setAttribute("class", "imgBlur");
			this.movieIndex -=4;
			document.getElementById(arrMovie[this.movieIndex]).setAttribute("class", "imgFocus");
			
			var obj = lstVideos[this.movieIndex];
			SceneCategory.displayVideoInfo(obj);
		}
	}
}
SceneCategory.processKeyDown = function()
{
	if(selectedType == "TypeSelectChildCategory")
	{
		$('#listCategory').sfList('next');
		var idx = $('#listCategory').sfList('getIndex');
		var obj = lstChildCategories[idx];
		if(obj.category_id == "4")
		{
			logger("Phim bo");
			isDrama = true;
			SceneCategory.getListDrama(arrFilter[buttonIndex],"1");
		}
		else
		{
			//get newest
			isDrama = false;
			currentPage = 1;
			SceneCategory.getListVideo(obj.category_id,arrFilter[buttonIndex],"1");
		}
	}
	else if(selectedType == "TypeSelectFilter")
	{
		if(lstVideos.length == 0)
		{
			logger("do nothing");
		}
		else
		{
			document.getElementById(arrButtonFilterTitle[buttonIndex]).style.color = "white";
			document.getElementById(arrMovie[this.movieIndex]).setAttribute("class", "imgFocus");
			selectedType = "TypeSelectMovie";
			
			var obj = lstVideos[this.movieIndex];
			SceneCategory.displayVideoInfo(obj);
		}
	}
	else if(selectedType == "TypeSelectMovie")
	{
		document.getElementById(arrMovie[this.movieIndex]).setAttribute("class", "imgBlur");
		if(Math.floor(this.movieIndex/4) == 0)
		{
			if(lstVideos.length <5)
			{
				logger("wtf");
				document.getElementById(arrMovie[this.movieIndex]).setAttribute("class", "imgFocus");
			}
			else
			{
				this.movieIndex += 4;
				document.getElementById(arrMovie[this.movieIndex]).setAttribute("class", "imgFocus");
			}
		}
		else //this.movieIndex/ 4 == 1
		{
			//next page
			if(currentPage == numberOfPages)
				currentPage = 1;
			else 
				currentPage ++;
			logger("currentPage = " + currentPage);
					
			$('#lblPaging').sfLabel({text:currentPage + '/' + numberOfPages});
			var idx = $('#listCategory').sfList('getIndex');
			var obj = lstChildCategories[idx];
			if(isDrama == false)
			{
				if(isGetListVideoFollowDrama == true)
				{
					
					SceneCategory.getListVideoFollowDrama(current_drama_id,arrFilter[buttonIndex],currentPage);
				}
				else
				{
					SceneCategory.getListVideo(obj.category_id,arrFilter[buttonIndex],currentPage);
				}
			}
			else
			{
				SceneCategory.getListDrama(arrFilter[buttonIndex],currentPage);
			}
			document.getElementById(arrMovie[this.movieIndex]).setAttribute("class", "imgFocus");
		}
		var obj = lstVideos[this.movieIndex];
		SceneCategory.displayVideoInfo(obj);
	}
}
SceneCategory.processKeyEnter = function()
{
	if(selectedType == "TypeSelectMovie")
	{
		if(isDrama == false)
		{
			var obj = lstVideos[this.movieIndex];
			if(isLive == true)
			{
				g_live_channel_url = obj.live_channel_url + "/" + obj.live_channel_folder + ".m3u8|COMPONENT=HLS";
				selectedVideoName = obj.live_channel_title;
				logger("selectedVideoName = " + selectedVideoName);
				selectedVideoDesc = obj.video_description;
			}
			else
			{
				selectedVideoName = obj.video_title;
				selectedVideoDesc = obj.video_description;
				global_current_video_id = obj.video_id;
				g_current_video_price_hd = obj.video_price_hd;
				g_current_video_price_shd = obj.video_price_shd;
				logger("g_current_video_price hd = " + g_current_video_price_hd);
				logger("shd = " + g_current_video_price_shd);
			}
			sf.scene.hide("Category");
			sf.scene.show("Player");
			sf.scene.focus("Player");
		}
		else
		{
			logger("drama");
			isGetListVideoFollowDrama = true;
			var obj = lstVideos[this.movieIndex];
			logger("obj.video_id = " + obj.drama_id);
			logger("obj.live_channel_url = " + obj.drama_english_title);
			logger("title = " + obj.drama_vietnamese_title);
			current_drama_id = obj.drama_id;
			currentPage = "1";
			SceneCategory.getListVideoFollowDrama(obj.drama_id,arrFilter[buttonIndex],currentPage);
		}
	}
	else if(selectedType == "TypeSelectFilter")
	{
		logger("enter filter");
	}
	else if(selectedType == "TypeSelectChildCategory")
	{
		logger("enter child category");
	}
}
SceneCategory.getChildCategory = function()
{
	logger("urlRequestGetChildCategory = " + urlRequestGetChildCategory);
	//remove all object in lstChildCategories
	lstChildCategories = lstChildCategories.slice(lstChildCategories.length,lstChildCategories.length);
	//--------------
	//urlRequestGetChildCategory = "json/getChildCategory.json";
	//-----------------
	$.getJSON(urlRequestGetChildCategory,
	function(data)
	{
		if(data.Status==1)
		{
			logger("123");
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
					childObj.category_id = movie_category_id;
					lstChildCategories[0] = childObj;
				}
				else if(categoryType == "Music")
				{
					var childObj = new Object();
					childObj.category_name = "Nhạc";
					childObj.category_id = music_category_id;
					lstChildCategories[0] = childObj;
				}
				else if(categoryType == "Sport")
				{
					var childObj = new Object();
					childObj.category_name = "Thể Thao";
					childObj.category_id = sport_category_id;
					lstChildCategories[0] = childObj;
				}
				else if(categoryType == "TV")
				{
					
					var childObj = new Object();
					childObj.category_name = "TV";
					childObj.category_id = tv_category_id;
					lstChildCategories[0] = childObj;
					
				}
				else
				{
					logger("wtf");
				}
				for(var i = 0; i< childCategory.quantity;i++)
				{
					alert
					("Name : " + data.items[i].category_name);
					var childCategoryObj = new Object();
					childCategoryObj.category_name = data.items[i].category_name;
					childCategoryObj.category_id = data.items[i].category_id;
					childCategoryObj.category_image = data.items[i].category_image;
					lstChildCategories[i+1] = childCategoryObj;
				}		
				SceneCategory.displayChildCategory();
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
SceneCategory.displayChildCategory = function()
{
	var data = new Array();

	for(var i = 0;i<lstChildCategories.length;i++)
	{
		var obj = lstChildCategories[i];
		data[i] = obj.category_name;
	}
	var item_per_page = 0;

	if(lstChildCategories.length >6)
	{
		item_per_page = 7;
		if(isCategoryFirst == true)
		{
			$('#listCategory').sfList({
				data:data, 
				index:'0',
				itemsPerPage:7
				
			});
			isCategoryFirst = false;
		}
		else
		{
			$('#listCategory').sfList({
				data:data, 
				index:'0',	
			});
		}
		$('#listCategory').sfList('focus');
	}
	else
	{
		//item_per_page = lstChildCategories.length;
		item_per_page = lstChildCategories.length - 1;
		if(isCategoryFirst == true)
		{
			$('#listCategory').sfList({
				data:data, 
				index:'0',
				itemsPerPage:7
				
			});
			isCategoryFirst = false;
		}
		else
		{
			$('#listCategory').sfList({
				data:data, 
				index:'0',
				/*itemsPerPage:item_per_page*/
				
			});
		}
		$('#listCategory').sfList('focus');
	}
}
SceneCategory.getListDrama = function(_filter,_page)
{
	logger("filter = " + _filter + "page = " + _page);
	
	
	$('#categoryLoadingImage').sfLoading('show');
	for(var i = 1;i<=8;i++)
	{
		$('#img' + i).sfImage('hide');
		document.getElementById("lblFilmName" + i).innerHTML = "";
		document.getElementById(arrMovie[i-1]).setAttribute("class", "imgBlur");
	}
	//document.getElementById(arrMovie[0]).setAttribute("class", "imgFocus");
	document.getElementById("description").innerHTML = "";
	$('#lblVideoTitle').sfLabel({text:''});
	$('#imgDescription').sfImage({
		src:''
	}).sfImage('hide');
	
	//Remove all objects of lstVideos
	lstVideos = lstVideos.slice(lstVideos.length,lstVideos.length);
	this.movieIndex = 0;
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
			
			totalQuantity = drama.total_quantity;
			numberOfPages = Math.ceil(totalQuantity/8);
			logger("numberOfPages = " + numberOfPages);
			$('#lblPaging').sfLabel({text: currentPage + '/' + numberOfPages });
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
						
					lstVideos[i] = dramaObj;
					
					document.getElementById("lblFilmName" + index).innerHTML = data.items[i].drama_english_title;
					//Display image
					var _urlImage = dramaObj.drama_image_path;//urlImage + videoObj.video_picture_path;
					$('#img' + index).sfImage({
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
				
				$('#lblPaging').sfLabel({text:'0 video'});
				for(var i = 0;i<8;i++)
				{
					var index = i+1;
					document.getElementById("lblFilmName" + index).innerHTML = "";
					$('#img' + index).sfImage('hide');	
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
SceneCategory.getListVideo = function(_category,_filter,_page)
{
	
	isDrama = false;
	isGetListVideoFollowDrama = false;
	
	$('#categoryLoadingImage').sfLoading('show');
	for(var i = 1;i<=8;i++)
	{
		$('#img' + i).sfImage('hide');
		document.getElementById("lblFilmName" + i).innerHTML = "";
		document.getElementById(arrMovie[i-1]).setAttribute("class", "imgBlur");
	}
	
	document.getElementById("description").innerHTML = "";
	$('#lblVideoTitle').sfLabel({text:''});
	$('#imgDescription').sfImage({
		src:''
	}).sfImage('hide');
	
	//Remove all objects of lstVideos
	lstVideos = lstVideos.slice(lstVideos.length,lstVideos.length);
	this.movieIndex = 0;
	//Get url
	urlRequestGetListVideo = urlGetListVideo + _category + filterParam + _filter + pageParam + _page;
	logger("urlRequestGetListVideo = " + urlRequestGetListVideo);
	//delete
	//urlRequestGetListVideo = "json/getListVideo1.json";
	//delete--
	$.getJSON(urlRequestGetListVideo,
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
			totalQuantity = video.total_quantity = data.total_quantity;
			numberOfPages = Math.ceil(totalQuantity/8);
			logger("numberOfPages = " + numberOfPages);
			$('#lblPaging').sfLabel({text: currentPage + '/' + numberOfPages });
			if(video.success)
			{
				$('#categoryLoadingImage').sfLoading('hide');
				
				if(video.type == null)
				{
					for(var i = 0; i< video.quantity;i++)
					{
						var index = i + 1;
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
							lstVideos[i] = videoObj;
						
							//Display film name
							document.getElementById("lblFilmName" + index).innerHTML = videoObj.video_title;
							//Display image
							var _urlImage = videoObj.video_picture_path;//urlImage + videoObj.video_picture_path;
							logger("_urlImage.substring = " + _urlImage.substring(_urlImage.length-3,_urlImage.length-0));
							if((_urlImage.substring(_urlImage.length-3,_urlImage.length - 0) == "png")||(_urlImage.substring(_urlImage.length-3,_urlImage.length -0) == "jpg") )
							{
								$('#img' + index).sfImage({
									src: _urlImage
								}).sfImage('show');
							}
							else
							{
								$('#img' + index).sfImage({
									src: "images/no_image.png"
								}).sfImage('show');
							}
						//}
						
					}
					if(lstVideos.length == 0)
						$('#lblPaging').sfLabel({text: "0 video" });
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
						lstVideos[i] = videoObj;
						//Display film name
						document.getElementById("lblFilmName" + index).innerHTML = videoObj.live_channel_title;
						//Display image
						var _urlImage = videoObj.video_picture_path;//urlImage + videoObj.video_picture_path;
						$('#img' + index).sfImage({
							src: _urlImage
						}).sfImage('show');
						
					}	
				}
				
				if(selectedType == "TypeSelectMovie")
				{
					var obj = lstVideos[0];
			
					$('#lblVideoTitle').sfLabel({text:obj.video_title});
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
				
				$('#lblPaging').sfLabel({text:'0 video'});
				for(var i = 0;i<8;i++)
				{
					var index = i+1;
					document.getElementById("lblFilmName" + index).innerHTML = "";
					$('#img' + index).sfImage('hide');	
				}
				
			}//end video success if else
			
			/*
			if(categoryType == "Sport")
			{
				if(lstVideos.length > 0)
				{
					numberOfPages = 1;
					$('#lblPaging').sfLabel({text: currentPage + '/' + numberOfPages });
				}
				else if(lstVideos.length == 0)
				{
					$('#lblPaging').sfLabel({text:'0 video'});
				}
			}
			*/
			
			
		}
	});	
}	

SceneCategory.displayUserProfile = function(){
	document.getElementById("category_user_name_login").innerHTML = userProfile.name;
	document.getElementById("category_user_name_money").innerHTML = userProfile.balance;
	document.getElementById("category_user_name_expire_date").innerHTML = userProfile.subcriber;
}
SceneCategory.getUserProfile = function()
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
			
					SceneCategory.displayUserProfile();
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
SceneCategory.getListVideoFollowDrama = function(_drama_id,_filter,_page)
{
	logger("get list video follow drama");
	
	
	isDrama = false;
	
	$('#categoryLoadingImage').sfLoading('show');
	for(var i = 1;i<=8;i++)
	{
		$('#img' + i).sfImage('hide');
		document.getElementById("lblFilmName" + i).innerHTML = "";
		document.getElementById(arrMovie[i-1]).setAttribute("class", "imgBlur");
	}
	document.getElementById(arrMovie[0]).setAttribute("class", "imgFocus");
	document.getElementById("description").innerHTML = "";
	$('#lblVideoTitle').sfLabel({text:''});
	$('#imgDescription').sfImage({
		src:''
	}).sfImage('hide');
	
	//Remove all objects of lstVideos
	lstVideos = lstVideos.slice(lstVideos.length,lstVideos.length);
	this.movieIndex = 0;
	//Get url
	//urlRequestGetListVideo = urlGetListVideo + _category + filterParam + _filter + pageParam + _page;
	if(_filter == "newest")
	{
		_filter = "oldest";
	}
	var urlRequestGetListVideoFollowDrama = urlGetListVideoFollowDrama + _drama_id+ filterParam + _filter + pageParam + _page;
	logger("urlRequestGetListVideoFollowDrama = " + urlRequestGetListVideoFollowDrama);
	//delete
	//urlRequestGetListVideo = "json/getListVideo1.json";
	//delete--
	$.getJSON(urlRequestGetListVideoFollowDrama,
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
			totalQuantity = video.total_quantity = data.total_quantity;
			numberOfPages = Math.ceil(totalQuantity/8);
			logger("numberOfPages = " + numberOfPages);
			$('#lblPaging').sfLabel({text: currentPage + '/' + numberOfPages });
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
						lstVideos[i] = videoObj;
						//Display film name
						document.getElementById("lblFilmName" + index).innerHTML = videoObj.video_title;
						//Display image
						var _urlImage = videoObj.video_picture_path;//urlImage + videoObj.video_picture_path;
						$('#img' + index).sfImage({
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
						lstVideos[i] = videoObj;
						//Display film name
						document.getElementById("lblFilmName" + index).innerHTML = videoObj.live_channel_title;
						//Display image
						var _urlImage = videoObj.video_picture_path;//urlImage + videoObj.video_picture_path;
						$('#img' + index).sfImage({
							src: _urlImage
						}).sfImage('show');
						
					}	
				}
				if(selectedType == "TypeSelectMovie")
				{
					var obj = lstVideos[0];
			
					$('#lblVideoTitle').sfLabel({text:obj.video_title});
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
				
				$('#lblPaging').sfLabel({text:'0 video'});
				for(var i = 0;i<8;i++)
				{
					var index = i+1;
					document.getElementById("lblFilmName" + index).innerHTML = "";
					$('#img' + index).sfImage('hide');	
				}
				
			}
		}
	});	
}