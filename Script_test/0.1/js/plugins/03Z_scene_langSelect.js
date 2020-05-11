/*
_alias._sceneBoot_start = Scene_Boot.prototype.start
Scene_Boot.prototype.start = function() {
	if(!$debug)
		Graphics._requestFullScreen();
	if (!DataManager.isBattleTest() && !DataManager.isEventTest()) {
	   SceneManager.goto(Scene_LangSelect);
	   return;
    };
	_alias._sceneBoot_start.call(this);
};*/

ImageManager.load_langSelect = function(filename) {
    return this.loadBitmap('img/titles1/langSelect/', filename, 0, true);
};
//======================================================
function Window_LangSelect() {
    this.initialize.apply(this, arguments);
}

Window_LangSelect.prototype = Object.create(Window_Command.prototype);
Window_LangSelect.prototype.constructor = Window_LangSelect;

Window_LangSelect.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 0, 0);
    this.updatePlacement();
    this.openness = 0;
    this.open();
};
Window_Base.prototype.updateTone = function() {
    var tone = $dataSystem.windowTone;
    this.setTone(tone[0], tone[1], tone[2]);
};
Window_Base.prototype.standardFontFace = function() {
    
        return 'GameFont';
};
Window_LangSelect.prototype.windowWidth = function() {
    return 240;
};

Window_LangSelect.prototype.updatePlacement = function() {
    this.x = (Graphics.boxWidth - this.width) / 2;
    this.y = (Graphics.boxHeight - this.height) / 2;
};

Window_LangSelect.prototype.makeCommandList = function() {
    this.addCommand("French", 'fr');
    this.addCommand("English",  'en');
	this.addCommand("Japonese",  'jp');
};

//======================================================

function Scene_LangSelect() {
    this.initialize.apply(this, arguments);
}

Scene_LangSelect.prototype = Object.create(Scene_MenuBase.prototype);
Scene_LangSelect.prototype.constructor = Scene_LangSelect;
// INITIALIZE
Scene_LangSelect.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};
// CREATE
Scene_LangSelect.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
	this.createBackground();
	this.createCountryFlags();
	this.createCommandWindow();
};
Scene_LangSelect.prototype.createBackground = function() {
    this._bg = new Sprite();
    this._bg.bitmap = ImageManager.load_langSelect('bg');
	this._bg.x = 0;
	this._bg.y = 0;
    this.addChild(this._bg);
};
Scene_LangSelect.prototype.createCountryFlags = function(){
	this._countryFlags = [];
	
	var _baseX = 206;
	var _y = 232;
	var _blank =306;
	
	for(i = 0; i < 3; i++){
		this._countryFlags[i] = new Sprite();
		this._countryFlags[i].bitmap = ImageManager.load_langSelect(i);
		this._countryFlags[i].x = _baseX + (_blank * i);
		this._countryFlags[i].y = _y;
		this._countryFlags[i].opacity = 0;
		this.addChild(this._countryFlags[i]);
	} 
};
Scene_LangSelect.prototype.createCommandWindow = function() {
    this._commandWindow = new Window_LangSelect();
    this._commandWindow.setHandler('fr',  this.commandSelectFr.bind(this));
    this._commandWindow.setHandler('en',  this.commandSelectEn.bind(this));
	this._commandWindow.setHandler('jp',  this.commandSelectJp.bind(this));
    this.addWindow(this._commandWindow);
};
// COMMAND
Scene_LangSelect.prototype.commandSelectFr = function() {
	$gameSystem.Language = 0;
	this.endLangSelect();
};
Scene_LangSelect.prototype.commandSelectEn = function() {
	$gameSystem.Language = 1;
	this.endLangSelect();
};
Scene_LangSelect.prototype.commandSelectJp = function() {
	$gameSystem.Language = 2;
	this.endLangSelect();
};
// UPDATE
Scene_LangSelect.prototype.update = function() {
	Scene_MenuBase.prototype.update.call(this);
	this.updateCountryFlags();
};
Scene_LangSelect.prototype.updateCountryFlags = function(){
	for(i = 0; i < 3; i++){
		if(i = this._commandWindow._index && this._countryFlags[i].opacity < 180 ){
			this._countryFlags[i].opacity += 20;
		}else if (this._countryFlags[i].opacity > 0){
			this._countryFlags[i].opacity -= 20;
		}
	}
};
Scene_LangSelect.prototype.updateActor = function(){

}
// END
Scene_LangSelect.prototype.endLangSelect = function() {
    this.fadeOutAll();
    SceneManager.goto(Scene_Title);
};
Scene_LangSelect.prototype.stop = function() {
    Scene_MenuBase.prototype.stop.call(this);
    this.fadeOutAll();
};
