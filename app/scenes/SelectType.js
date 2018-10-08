var arrSelectMovieType = new Array('#btnHD','#btnSuperHD','#btnCancel');
var selectMovieTypeIndex = 0;
function SceneSelectType(options) {
	this.options = options;
}

SceneSelectType.prototype.initialize = function () {
	logger("SceneSelectType.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here 
	// scene HTML and CSS will be loaded before this function is called
	
	$('#btnHD').sfButton({text:'Phim HD'});
	$('#btnSuperHD').sfButton({text:'Phim Super HD'});
	$('#btnCancel').sfButton({text:'Bo qua'});
}




SceneSelectType.prototype.handleShow = function () {
	logger("SceneSelectType.handleShow()");
	// this function will be called when the scene manager show this scene 
	isFromSelect = true;
	$(arrSelectMovieType[selectMovieTypeIndex]).sfButton('focus');
}

SceneSelectType.prototype.handleHide = function () {
	logger("SceneSelectType.handleHide()");
	// this function will be called when the scene manager hide this scene  
}

SceneSelectType.prototype.handleFocus = function () {
	logger("SceneSelectType.handleFocus()");
	// this function will be called when the scene manager focus this scene
}

SceneSelectType.prototype.handleBlur = function () {
	logger("SceneSelectType.handleBlur()");
	// this function will be called when the scene manager move focus to another scene from this scene
}

SceneSelectType.prototype.handleKeyDown = function (keyCode) {
	logger("SceneSelectType.handleKeyDown(" + keyCode + ")");
	// TODO : write an key event handler when this scene get focued
	switch (keyCode) {
		case sf.key.LEFT:
			break;
		case sf.key.RIGHT:
			break;
		case sf.key.UP:
			$(arrSelectMovieType[selectMovieTypeIndex]).sfButton('blur');
			if(selectMovieTypeIndex == 0)
				selectMovieTypeIndex = 2;
			else
			 selectMovieTypeIndex --;
			$(arrSelectMovieType[selectMovieTypeIndex]).sfButton('focus');
			break;
		case sf.key.DOWN:
			$(arrSelectMovieType[selectMovieTypeIndex]).sfButton('blur');
			if(selectMovieTypeIndex == 2)
				selectMovieTypeIndex = 0;
			else
				selectMovieTypeIndex ++;
			$(arrSelectMovieType[selectMovieTypeIndex]).sfButton('focus');	
			break;

		case sf.key.ENTER:
			switch(selectMovieTypeIndex)
			{
				case 0:
					logger("selectMovieTypeIndex = " + selectMovieTypeIndex);
					//select type = hd = 2
					selectedMovieType = 2;
					sf.scene.hide('SelectType');
					sf.scene.show('Player');
					sf.scene.focus('Player');
					break;
				case 1:
					logger("selectMovieTypeIndex = " + selectMovieTypeIndex);
					//select type = super hd = 5
					selectedMovieType = 5;
					sf.scene.hide('SelectType');
					sf.scene.show('Player');
					sf.scene.focus('Player');
					break;
				case 2:
					//cancel
					logger("selectMovieTypeIndex = " + selectMovieTypeIndex);
					selectedMovieType = 0;
					isFirstPress = true;
					sf.scene.hide('SelectType');
					sf.scene.show('Player');
					sf.scene.focus('Player');
					break;
			}
			break;
		case sf.key.RETURN:
		{
			sf.key.preventDefault();
			sf.scene.hide('SelectType');
			sf.scene.show('Player');
			sf.scene.focus('Player');
		}
			break;
	}
}
