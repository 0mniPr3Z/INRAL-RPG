$gameLocation = null;

function Scene_WorldMap() {
    this.initialize.apply(this, arguments);
};
Scene_WorldMap.prototype = Object.create(Scene_Base.prototype);
Scene_WorldMap.prototype.constructor = Scene_WorldMap;

// * Initialize
Scene_WorldMap.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
	this._Dataindex = 0;
	this._DataindexOld = -1;
	this._WidowindexOld = 0;
	this._np = [-1,-1];
	this._name = "";
	this._mapPos = [];
	this._needCenter = true;
	this._mapMoving = false;
	this._currentData = null;
	this._fadeTime =  30;	
	this._zoomFade = true;
	this._rotationFade = false;
	$gameSystem._fastTravelData = null;
	$gameSystem._fastTravelSelected = false;
	this._phase = 0;
	this._mapPos[0] = (Graphics.boxWidth / 2);
	this._mapPos[1] = (Graphics.boxHeight / 2);
	this._DataLocations = this.makeData(0);
	this.playBgm();
};
Scene_WorldMap.prototype.initData = function(index) {
	
	var dataMap = [];
	var data = {};
	if($gameLocations == null)
		DataManager.init_InralLoc_Data();
	
	for (i = 1; i < $gameLocations.length + 1; i++) {
		if($gameLocations[i] && $data_worldMap.activeLoc[i])
			dataMap.push(data);
	}
	return dataMap;
};
Scene_WorldMap.prototype.playBgm = function() {
		BattleManager.saveBgmAndBgs();
	    var bgm = {
			name:"03Z_inralTheme1",
			pitch:100,
			volume = 100
		};
		AudioManager.playBgm(bgm,0);
};

// * Create
Scene_WorldMap.prototype.create = function() {
	
	this._field = new Sprite();
	this.addChild(this._field);
    this.createParallax();
	
	this._Mapfield = new Sprite();
	this._field.addChild(this._Mapfield);	
	this._field.opacity = 0;
	
	this.createMap();
	this.createStage();
	this.createPoints();
	this.createCursorNext();
	this.createLayout();	
	this.createListLayout();
	this.createListName();
	this.createCursor();
	this.createWindowList(); 
	this.createCompleted();
	
	this.checkLastPosition();
};
Scene_WorldMap.prototype.createMap = function() {
    this._map = new Sprite(ImageManager.load_world_map("map"));
    this._Mapfield.addChild(this._map);
};

//==============================
// * check Last Selection
//==============================
Scene_WorldMap.prototype.checkLastSelection = function() {
    if ($gameSystem._fastTravelSelection[0] === 0) {
	    var dataInfo = this._DataTown;
	} else if($gameSystem._fastTravelSelection[0] === 1) {
		var dataInfo = this._DataDungeon;
	} else {
		var dataInfo = this._DataOther;
	};
	var index = -1;
	for (var i = 0; i < dataInfo.length; i++) {
		var data = dataInfo[i][1];
	    if (data.name === $gameSystem._fastTravelSelection[1].name) {index = i};
	};	
	if (index >= 0) {
		this._Dataindex = $gameSystem._fastTravelSelection[0];
		this._windowList.setID(this._Dataindex)
		if (index >= this._windowList.maxItems()) {index = 0};
		this._windowList.select(index);
        this.refreshPointData();		
	};
};

//==============================
// * update Fade In 
//==============================
Scene_WorldMap.prototype.updateFadeIn = function() {
	this._fadeTime--;
	if (this._sprite_mcursor) {this._sprite_mcursor.visible = false};
	if ($gameSystem._fastTravelSelected) {
	if (this._zoomFade && !this._snapShot) {this.createSnapShot()};
	    if (this._fadeTime <= 0) {this._field.opacity -= 4};
		if (this._snapShot) {
			this._snapShot.scale.x += 0.005;
			this._snapShot.scale.y = this._snapShot.scale.x;
			if (this._rotationFade) {this._snapShot.rotation += 0.01};
			this._snapShot.opacity = this._field.opacity;
		};
	    if (this._field.opacity <= 0) {
			$gameSystem._fastTravelSelected = false;
		    this.selectMap();				
		};
	} else {
		this._field.opacity -= 8; 
	    if (this._field.opacity <= 0) {
		    SceneManager.pop();		
		};		
	};
	this._parallax.opacity = this._field.opacity ;
};

//==============================
// * Create Snap Shot
//==============================
Scene_WorldMap.prototype.createSnapShot = function() {
	 this._stageprev.visible = false;
	 this._windowList.deactivate();
	 this._windowList.visible = false;	 
	 this._windowList.update();
     this._snapShot = new Sprite();
	 this._snapShot.bitmap = SceneManager.snap();
	 this._snapShot.anchor.x = 0.5;
	 this._snapShot.anchor.y = 0.5;
	 this._snapShot.x = this._snapShot.bitmap.width / 2;
	 this._snapShot.y = this._snapShot.bitmap.height / 2;
	 this.addChild(this._snapShot);
	 this._field.visible = false;
};


//==============================
// * update Fade Out
//==============================
Scene_WorldMap.prototype.updateFadeOut = function() {
	 this._field.opacity += 8;
     if (this._field.opacity >= 255) {
		 this._phase = 1; 
		 this._windowList.activate();
	 }
	 this._parallax.opacity = this._field.opacity ;
};

//==============================
// * set Center Start
//==============================
Scene_WorldMap.prototype.setCenterStart = function() {
	this._needCenter = false;
    this._Mapfield.x = -this._mapPos[0];
	this._Mapfield.y = -this._mapPos[1];
	if (!this._currentData) {
        this._np = [this._map.bitmap.width / 2,this._map.bitmap.height / 2];
	} else {
		this._Mapfield.x =  -this._np[0] + this._mapPos[0];
		this._Mapfield.y =  -this._np[1] + this._mapPos[1];
	};
};

//==============================
// * Make Data
//==============================
Scene_WorldMap.prototype.makeData = function(index) {
	var dataMap = [];
	if (index === 0) {
		var dataInfo = $gameSystem._fastTravelTowns;
	} else if (index === 1) {
		var dataInfo = $gameSystem._fastTravelDungeons;
	} else {
		var dataInfo = $gameSystem._fastTravelOther;
	};	
	for (var i = 0; i < dataInfo.length; i++) {
		var data = dataInfo[i + 1];
	    if (this.dataIsAvailable(data)) {dataMap.push(data)};
	};
	return dataMap;
};

//==============================
// * data Is Avaliable
//==============================
Scene_WorldMap.prototype.dataIsAvailable = function(data) {
	if (!data) {return false};
	if (!data[0]) {return false};
	if (!data[1]) {return false};
	return true;
};

//==============================
// * Create Parallax
//==============================
Scene_WorldMap.prototype.createParallax = function() {
    this._parallax =  new TilingSprite(ImageManager.load_world_map("Parallax"));
    this._parallax.move(0, 0, Graphics.boxWidth, Graphics.boxHeight);
	this._field.addChild(this._parallax);
};

//==============================
// * Create Map
//==============================
Scene_WorldMap.prototype.createMap = function() {
    this._map = new Sprite(ImageManager.load_world_map("Map"));
    this._Mapfield.addChild(this._map);
};

//==============================
// * Create Layout
//==============================
Scene_WorldMap.prototype.createLayout = function() {
    this._layout = new Sprite(ImageManager.load_world_map("Layout"));
	this._field.addChild(this._layout);	
};

//==============================
// * Create Stage
//==============================
Scene_WorldMap.prototype.createStage = function() {
	 this._stageprev = new Sprite();
	 this._stageprev.bitmap = new Bitmap(32,32);
	 this._stageprev.x = Moghunter.fastTravel_Prev_X;
	 this._stageprev.y = Moghunter.fastTravel_Prev_Y;
	 this._stageprev.opacity = 255;
	 this._stageprev.anchor.x = 0.5;
	 this._stageprev.anchor.y = 0.5;	 
	 this._field.addChild(this._stageprev);	
};
	
//==============================
// * refresh Stage
//==============================
Scene_WorldMap.prototype.refreshStage = function() {
     var name = String(this._currentData.name);
	 this._stageprev.bitmap = ImageManager.load_world_map_location(name);
	 if (String(Moghunter.fastTravel_prevSlide) === "true") {
	     this._stageprev.x = Moghunter.fastTravel_Prev_X - 100;
         this._stageprev.opacity = 0;
	 };
};

//==============================
// * update Stage
//==============================
Scene_WorldMap.prototype.updateStage = function() {
	 if (this._mapMoving) {return};
     if (this._stageprev.x < Moghunter.fastTravel_Prev_X) {
		 this._stageprev.x += 5;
		 this._stageprev.opacity += 15;
		 if (this._stageprev.x >= Moghunter.fastTravel_Prev_X) {
			 this._stageprev.x = Moghunter.fastTravel_Prev_X;
			 this._stageprev.opacity = 255;
		 };
	 };
	 this._stageprev.visible = !this._currentData ? false : true;
};

//==============================
// * Create Completed
//==============================
Scene_WorldMap.prototype.createCompleted = function() {
	 this._comp = new Sprite(new Bitmap(200,32));
     this._comp.x = Moghunter.fastTravel_Comp_X
	 this._comp.y = Moghunter.fastTravel_Comp_Y
	 this._comp.bitmap.fontSize = Moghunter.fastTravel_Comp_FontSize;
	 var ct = 	this._DataTown.length + this._DataDungeon.length + this._DataOther.length;
	 var perc = Math.floor(ct / $gameSystem._fastTravelComp * 100)
	 var total = ct + " / " + $gameSystem._fastTravelComp
     this._comp.bitmap.drawText(total + " (" + perc + "%"  + ")",0,0,200,32, "center");
	 this._field.addChild(this._comp);	
	 this._comp.visible = String(Moghunter.fastTravel_Comp_Show) === "true" ? true : false;
};

//==============================
// * Create List Name
//==============================
Scene_WorldMap.prototype.createListName = function() {
    this._listName = [];
	this._listName[0] = new Sprite(ImageManager.load_world_map("ListName_A"))
	this._listName[0].x = Moghunter.fastTravel_ComA_X;
	this._listName[0].y = Moghunter.fastTravel_ComA_Y;
	this._field.addChild(this._listName[0]);
	this._listName[1] = new Sprite(ImageManager.load_world_map("ListName_B"))
	this._listName[1].x = Moghunter.fastTravel_ComB_X;
	this._listName[1].y = Moghunter.fastTravel_ComB_Y;	
	this._field.addChild(this._listName[1]);	
	this._listName[2] = new Sprite(ImageManager.load_world_map("ListName_C"))
	this._listName[2].x = Moghunter.fastTravel_ComC_X;
	this._listName[2].y = Moghunter.fastTravel_ComC_Y;	
	this._field.addChild(this._listName[2]);	
};

//==============================
// * update List Name
//==============================
Scene_WorldMap.prototype.updateListName = function() {
    this.slideDown(this._listName[0],0,Moghunter.fastTravel_ComA_Y);
	this.slideDown(this._listName[1],1,Moghunter.fastTravel_ComB_Y);
	this.slideDown(this._listName[2],2,Moghunter.fastTravel_ComC_Y);
};

//==============================
// * update List Name
//==============================
Scene_WorldMap.prototype.slideDown = function(sprite,index,y) {
	if (this._Dataindex === index) {
		if (sprite.y < y + 20) {
			sprite.y += 4;
			if (sprite.y > y + 20) {sprite.y = y + 20};
		};
	} else {
	    if (sprite.y > y) {
		    sprite.y -= 4;
			if (sprite.y < y ) {sprite.y = y}; 
		};
	};
};

//==============================
// * Create Cursor
//==============================
Scene_WorldMap.prototype.createCursor = function() {
    this._cursor = new Sprite(ImageManager.load_world_map("Cursor_A"));
	this._cursor.anchor.x = 0.5;
	this._cursorAni = [0,0,0];
	this._cursorFloat = String(Moghunter.fastTravel_CursorFloat) === "true" ? true : false;
	this._field.addChild(this._cursor);	
};

//==============================
// * Update Cursor
//==============================
Scene_WorldMap.prototype.updateCursor = function() {
	 if (this._cursorFloat) {this.updateCursorFloat()};
	 if (this._Dataindex === 0) {
         this._cursor.x = this._listName[0].x + (this._listName[0].bitmap.width / 2) + Moghunter.fastTravel_CursorX;
	     this._cursor.y = this._listName[0].y + this._listName[0].bitmap.height + this._cursorAni[1] + Moghunter.fastTravel_CursorY;
	 } else if (this._Dataindex === 1) {
         this._cursor.x = this._listName[1].x + (this._listName[1].bitmap.width / 2) + Moghunter.fastTravel_CursorX;
	     this._cursor.y = this._listName[1].y + this._listName[1].bitmap.height + this._cursorAni[1] + Moghunter.fastTravel_CursorY;		 
	 } else {
         this._cursor.x = this._listName[2].x + (this._listName[2].bitmap.width / 2) + Moghunter.fastTravel_CursorX;
	     this._cursor.y = this._listName[2].y + this._listName[2].bitmap.height + this._cursorAni[1] + Moghunter.fastTravel_CursorY;				 
	 };
};

//==============================
// * Update Cursor Float
//==============================
Scene_WorldMap.prototype.updateCursorFloat = function() {
	 this._cursorAni[3] ++;
	 if (this._cursorAni[3] < 3) {return};
	 this._cursorAni[3] = 0; 
     this._cursorAni[0] ++
	 if (this._cursorAni[0] < 10) {
		 this._cursorAni[1] --;
	 } else if (this._cursorAni[0] < 20) {
		 this._cursorAni[1] ++;
	 } else {
		 this._cursorAni[0] = 0;
		 this._cursorAni[1] = 0;
	 };
};

//==============================
// * Create Cursor Next
//==============================
Scene_WorldMap.prototype.createCursorNext = function() {
    this._cursorB = new Sprite(ImageManager.load_world_map("Cursor_B"));
	this._cursorB.anchor.x = 0.5;
	this._cursorB.anchor.y = 1.0;
	this._cursorBAni = [0,0,0];
	this._cursorBFloat = String(Moghunter.fastTravel_CursorBFloat) === "true" ? true : false;
	this._Mapfield.addChild(this._cursorB);	
};

//==============================
// * Update CursorB
//==============================
Scene_WorldMap.prototype.updateCursorB = function() {
	 if (this._cursorBFloat) {this.updateCursorBFloat()};
     this._cursorB.x = this._np[0] + Moghunter.fastTravel_CursorBX;
     this._cursorB.y = this._np[1] + this._cursorBAni[1] + Moghunter.fastTravel_CursorBY - 10;
	 this._cursorB.visible = !this._currentData ? false : true;
};

//==============================
// * Update Cursor B Float
//==============================
Scene_WorldMap.prototype.updateCursorBFloat = function() {
	 this._cursorBAni[3] ++;
	 if (this._cursorBAni[3] < 3) {return};
	 this._cursorBAni[3] = 0; 
     this._cursorBAni[0] ++
	 if (this._cursorBAni[0] < 10) {
		 this._cursorBAni[1] ++;
	 } else if (this._cursorBAni[0] < 20) {
		 this._cursorBAni[1] --;
	 } else {
		 this._cursorBAni[0] = 0;
		 this._cursorBAni[1] = 0;
	 };
};

//==============================
// * Create Points
//==============================
Scene_WorldMap.prototype.createPoints = function() {
    this._pointTown = [];
	this._pointDungeon = [];
	this._pointOther = [];
	this._pointImg = ImageManager.load_world_map("Points");
	this._pointNeedRefresh = true;
	for (var i = 0; i < this._DataTown.length; i++) {
		 this._pointTown[i] = new Sprite(this._pointImg);
		 this._pointTown[i].x = this._DataTown[i][1].x;
		 this._pointTown[i].y = this._DataTown[i][1].y;
		 this._pointTown[i].anchor.x = 0.5;
		 this._pointTown[i].anchor.y = 0.5;
		 this._Mapfield.addChild(this._pointTown[i]);
	};
	for (var i = 0; i < this._DataDungeon.length; i++) {
		 this._pointDungeon[i] = new Sprite(this._pointImg);
		 this._pointDungeon[i].x = this._DataDungeon[i][1].x;
		 this._pointDungeon[i].y = this._DataDungeon[i][1].y;	
		 this._pointDungeon[i].anchor.x = 0.5;
		 this._pointDungeon[i].anchor.y = 0.5;
		 this._Mapfield.addChild(this._pointDungeon[i]);
	};
	for (var i = 0; i < this._DataOther.length; i++) {
		 this._pointOther[i] = new Sprite(this._pointImg);
		 this._pointOther[i].x = this._DataOther[i][1].x;
		 this._pointOther[i].y = this._DataOther[i][1].y;
		 this._pointOther[i].anchor.x = 0.5;
		 this._pointOther[i].anchor.y = 0.5;
		 this._Mapfield.addChild(this._pointOther[i]);
	};		
};

//==============================
// * refresh Points
//==============================
Scene_WorldMap.prototype.refreshPoint = function() {
	this._pointNeedRefresh = false;
    this.setFramePoint(this._pointTown,0);
	this.setFramePoint(this._pointDungeon,1);
	this.setFramePoint(this._pointOther,2);
};

//==============================
// * set Frame Point
//==============================
Scene_WorldMap.prototype.setFramePoint = function(sprites,index) {
	var cw = this._pointImg.width / 3;
	var ch = this._pointImg.height;
	var rg = cw * index;
	for (var i = 0; i < sprites.length; i++) {
		 sprites[i].setFrame(rg,0,cw,ch);
	};
	
};

//==============================
// * update Points
//==============================
Scene_WorldMap.prototype.updatePoints = function() {
	if (this._pointNeedRefresh &&this._pointImg.isReady()) {this.refreshPoint()};
};

//==============================
// * Create  List Layout
//==============================
Scene_WorldMap.prototype.createListLayout = function() {
	 this._listLayout = new Sprite(ImageManager.load_world_map("ListLayout"));
	 this._field.addChild(this._listLayout); 
};

//==============================
// * update  List Layout
//==============================
Scene_WorldMap.prototype.updateListLayout = function() {
	 this._listLayout.x = this._windowList.x + Moghunter.fastTravel_ListLayoutX;
	 this._listLayout.y = this._windowList.y + Moghunter.fastTravel_ListLayoutY;
	 this._listLayout.opacity = this._windowList.contentsOpacity;
	 this._listLayout.visible = this._windowList.visible;
};

//==============================
// * Create Window List
//==============================
Scene_WorldMap.prototype.createWindowList = function() {
	var w = Moghunter.fastTravel_ListWidth;
	var h = Moghunter.fastTravel_ListHeight;
	var x = Moghunter.fastTravel_ListX;
	var y = Moghunter.fastTravel_ListY;	
    this._windowList = new Window_TravelList(x,y,w,h);
	this._windowList.deactivate();
	if (String(Moghunter.fastTravel_ListSlide) === "true") {
	    this._windowList.x = Moghunter.fastTravel_ListX + 100;
		this._windowList.contentsOpacity = 0;
	};	
	this._field.addChild(this._windowList);
	this.updateListLayout();
};

//==============================
// * update Window List
//==============================
Scene_WorldMap.prototype.updateWindowList = function() {
	if (this._windowList.x > Moghunter.fastTravel_ListX) {
	    this._windowList.x -= 5;
		this._windowList.contentsOpacity += 15;
		if (this._windowList.x <= Moghunter.fastTravel_ListX) {
		    this._windowList.x = Moghunter.fastTravel_ListX;
			this._windowList.contentsOpacity = 255;
		};
	};
};

//==============================
// * Need Refresh Point DAta
//==============================
Scene_WorldMap.prototype.needRefreshPointData = function() {
    if (this._DataindexOld != this._Dataindex) {return true};
	if (this._WidowindexOld != this._windowList._index) {return true};
	return false;
};

//==============================
// * refresh Point Data
//==============================
Scene_WorldMap.prototype.refreshPointData = function() {
	this._currentData = null;
	$gameSystem._fastTravelData = null;
    this._DataindexOld = this._Dataindex;
	this._WidowindexOld = this._windowList._index;
	if (this._Dataindex === 0) {
		var data = this._DataTown;
	} else if (this._Dataindex === 1) {
	    var data = this._DataDungeon;
	} else {
		var data = this._DataOther;
	};	
	if (!data || (data && data.length === 0) || !data[this._WidowindexOld]) {
    	return
	};
	this._name = data[this._WidowindexOld][1].name;
	this._currentData = data[this._WidowindexOld][1]; 
	$gameSystem._fastTravelData = data[this._WidowindexOld][1]; 
    this._np = [data[this._WidowindexOld][1].x,data[this._WidowindexOld][1].y];
	this.refreshStage();
};

//==============================
// * update Command
//==============================
Scene_WorldMap.prototype.updateCommand = function() {
     if (Input.isRepeated('left') || Input.isRepeated('pagedown')) {
		 this.nextData(-1);
	 } else if (Input.isRepeated('right') || Input.isRepeated('pageup')) { 
	     this.nextData(1);
	 } else if (Input.isTriggered('ok')) { 
		 if (this._currentData) {
			 this._windowList.visible = false;
			 this._windowList.deactivate();
			 $gameSystem._fastTravelSelection = [this._Dataindex,this._currentData];
		 } else {
		     SoundManager.playBuzzer();
		 };
	 } else if (Input.isTriggered('cancel') || TouchInput.isCancelled()) { 
		 this.executeCancel();
	 } else if (TouchInput.isTriggered()) {
		 this.checkTouchOnListCom()
	 };
};
	
//==============================
// * check Touch On List Com
//==============================
Scene_WorldMap.prototype.checkTouchOnListCom = function() {
     if (this.isOnSprite(this._listName[0])) {
		 this._Dataindex = 0;
		 this.nextData(0);
	 } else if (this.isOnSprite(this._listName[1])) {
		 this._Dataindex = 1;
		 this.nextData(0);
	 } else if (this.isOnSprite(this._listName[2])) {	 
		 this._Dataindex = 2;
		 this.nextData(0);		 
	 };
};	

//==============================
// * is On Sprite
//==============================
Scene_WorldMap.prototype.isOnSprite = function(sprite) {
	 var cw = sprite.bitmap.width;
	 var ch = sprite.bitmap.height;
	 if (TouchInput.x < sprite.x) { return false};
	 if (TouchInput.x > sprite.x + cw) { return false};
	 if (TouchInput.y < sprite.y) { return false};
	 if (TouchInput.y > sprite.y + ch) { return false};
	 return true;	 
};	

//==============================
// * Select Stage
//==============================
Scene_WorldMap.prototype.executeCancel = function() {
	 SoundManager.playCancel();
	 if (String(Moghunter.fastTravel_playBgm) === "true") {
	     AudioManager.stopBgm();
	     BattleManager.replayBgmAndBgs();	 
	 };
	 this._phase = 2; 
	 this._windowList.deactivate();
	 if (String(Moghunter.fastTravel_directionCancel) === "true") { this.setPlayerDirectionforCancel()};
};

//==============================
// * Set Player Direction for 
//==============================
Scene_WorldMap.prototype.setPlayerDirectionforCancel = function() {
	if ($gamePlayer._direction === 2) {
	    $gamePlayer.setDirection(8)
	} else if($gamePlayer._direction === 4) {
		$gamePlayer.setDirection(6)
	} else if($gamePlayer._direction === 6) {	
		$gamePlayer.setDirection(4)
	} else {
        $gamePlayer.setDirection(2)
	};
};

//==============================
// * Select Map
//==============================
Scene_WorldMap.prototype.selectMap = function() {
	if (this._currentData) {
        $gameSystem._fastTravelSelection = [this._Dataindex,this._currentData];
	};	
	 $gameSystem._fastTravelSelected = false;
	 var dir = this.setDirection(this._currentData.direction);
     $gamePlayer.reserveTransfer(this._currentData.mapID, this._currentData.mapX, this._currentData.mapY, dir, false);
	 SceneManager.goto(Scene_Map);
};

//==============================
// * set Direction
//==============================
Scene_WorldMap.prototype.setDirection = function(dir) {
	if (dir === 4 || dir === 6 || dir === 8) {return dir};
	return 2;
};

//==============================
// * next Data
//==============================
Scene_WorldMap.prototype.nextData = function(value) {
    this._Dataindex += value;
	if (this._Dataindex > 2) {this._Dataindex = 0};
	if (this._Dataindex < 0) {this._Dataindex = 2};
	SoundManager.playCursor();
	this._windowList.setID(this._Dataindex);
	if (String(Moghunter.fastTravel_ListSlide) === "true") {
	    this._windowList.x = Moghunter.fastTravel_ListX + 100;
		this._windowList.contentsOpacity = 0;
	};
}; 

//==============================
// * Update Parallax
//==============================
Scene_WorldMap.prototype.updateParallax = function() {
    this._parallax.origin.x += 1;
	this._parallax.origin.y += 1;
}; 

//==============================
// * Update Parallax
//==============================
Scene_WorldMap.prototype.updateMapPosition = function() {
     if (this.needRefreshPointData()) {this.refreshPointData()};
	 this._Mapfield.x = this.mapMoveTo(this._Mapfield.x,-this._np[0] + this._mapPos[0]);
	 this._Mapfield.y = this.mapMoveTo(this._Mapfield.y,-this._np[1] + this._mapPos[1]);
	 if (this._Mapfield.x === (-this._np[0] + this._mapPos[0]) && this._Mapfield.y === (-this._np[1] + this._mapPos[1])) {
		 this._mapMoving = false; 
	 } else {
		 this._mapMoving = true; 
	 };
}; 

//==============================
// * Map Move To
//==============================
Scene_WorldMap.prototype.mapMoveTo = function(value,real_value) {
	if (value == real_value) {return value};
	var dnspeed = 3 + (Math.abs(value - real_value) / Moghunter.fastTravel_MapMoveSpeed);
	if (value > real_value) {value -= dnspeed;
	    if (value < real_value) {value = real_value};}
    else if (value < real_value) {value  += dnspeed;
    	if (value  > real_value) {value  = real_value};		
    };
	return Math.floor(value);
};

//==============================
// * Update
//==============================
Scene_WorldMap.prototype.update = function() {
    Scene_Base.prototype.update.call(this);
	if (this._needCenter) {
		if (this._map.bitmap.isReady()) {this.setCenterStart()};
		return;
	};	
    if (this._phase === 1 && !$gameSystem._fastTravelSelected) {this.updateCommand()};
	if (this._phase > 0) {
		this.updateMapPosition();
		this.updateWindowList();
		this.updateListLayout();
	};
	this.updateParallax();
	this.updatePoints();
	this.updateCursor();
	this.updateCursorB();
	this.updateStage();
	this.updateListName();
	if (this._phase === 0) {this.updateFadeOut()
	} else if ((!this._mapMoving && $gameSystem._fastTravelSelected) || this._phase === 2) {this.updateFadeIn()};
};
