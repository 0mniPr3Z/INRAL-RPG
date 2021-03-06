//var SimCraftDebugger = true;
var _alias = {};
//* DATA MANAGER

//* SCENE MANAGER
SceneManager._screenWidth  = 1280;
SceneManager._screenHeight = 720;
SceneManager._boxWidth     = 1280;
SceneManager._boxHeight    = 720;
_alias._SC_SceneManager_run = SceneManager.run;
SceneManager.run = function(sceneClass) {
    _alias._SC_SceneManager_run.call(this, sceneClass);
    if (Utils.isMobileDevice()) return;
    if (Utils.isMobileSafari()) return;
    if (Utils.isAndroidChrome()) return;
    var resizeWidth = Graphics.boxWidth - window.innerWidth;
    var resizeHeight = Graphics.boxHeight - window.innerHeight;
	window.moveBy(-1 * resizeWidth / 2, -1 * resizeHeight / 2);
	window.resizeBy(resizeWidth, resizeHeight);
};

//* GAME SYSTEM
_alias._SC_GameSystem_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	_alias._SC_GameSystem_initialize.call(this);
	this._ahud_position = [0,0];
	this._ahud_visible = false;
	this._ahud_smartFade = true;
	this._ahud_autoFade = true;
	this._ahud_opacity = 0;
};
Game_System.prototype.setup_SimCraftEngine		= function(){
	$gameTime = new Time_System();
	this.initialize_sc_actors();
};
Game_System.prototype.sc_varIds					= function(){
	return {
		sec:					1,
		min:					2,
		hour:					3,
		day:					4,
		month:					5,
		year:					6,
		dayDecade:				7,
		season:				8,
		timeScroll:			9,
		formReq:				21,
		talentReq:				22,
		talentReqId:			23,
		talentIco:				24,
		playerTalNiv: 		31,
		playerIco:				32,
		partySize:				33,
		playerForm:			34,
		itemGather:			35,
		escortIco:				[51, 52, 53, 54, 55, ,56, 57],
		escortTalentVal:		[41, 42, 43, 44, 45, ,46, 47],
		partySizeMax:			36
		
	};
}
Game_System.prototype.sc_switchIds					= function(){
	return {
		dayPhases:		[1,2,3,4,5,6,7],
		months:		[8,9,10,11,12,13,14,15,16,17,18,19],
		seasons:		[20,21,22,23],
		daysDecade:	[24,25,26,27,29,30,31,32,33,34],
		timeHud:		35,
		baseActors:	101//jusquau nombre max d'acteur prevoir + 200
	};
};
Game_System.prototype.sc_mapIds					=function(){
	return {
		mapDeath:		2,
		mapTest:		1
	}
};
Game_System.prototype.initialize_sc_actors = function(){
	this.sc_actors = [];
	this.initActor_visual_parts();
	this.initActor_talents();
};
Game_System.prototype.initActor_visual_parts = function(){
	for(i=1; i<=29;i++){
		$gameCharacterCreations.addInfos(i,{
			"Corps":{"path":"img/SumRndmDde/character-creator-ex/Corps/walk/","file":i,"color":[0]},
			"Face":{"path":"img/SumRndmDde/character-creator-ex/Face/walk/","file":i,"color":[0]}},{
			"Corps":{"path":"img/SumRndmDde/character-creator-ex/Corps/dead/","file":1,"color":[0]},
			"Face":{"path":"img/SumRndmDde/character-creator-ex/Face/dead/","file":1,"color":[0]}},{
			"Corps":{"path":"img/SumRndmDde/character-creator-ex/Corps/sv/","file":i,"color":[0]},
			"Face":{"path":"img/SumRndmDde/character-creator-ex/Face/sv/","file":i,"color":[0]}},{
			"Corps":{"path":"img/SumRndmDde/character-creator-ex/Corps/face/","file":i,"color":[0]},
			"Face":{"path":"img/SumRndmDde/character-creator-ex/Face/face/","file":i,"color":[0]}}
		);
	}
};
Game_System.prototype.initActor_talents = function(){
	var _good = [
		null,
		true,//maelo 1
		true,//kandi 2
		false,//esto 3 
		true,//gunlyr 4
		true,//sheera 5
		true,//amyna 6
		true,//vellia 7 
		true,//babol 8
		false,//bulga 
		true,//naylein 9
		false,//yeti
		true,//arniell 10
		false,//scorrss
		true,//pantin 11
		false,//synn
		true,//mintai 12
		false,//skull
		false,//ruth
		true,//stella 13
		false,//baal
		true,//tello 14
		false,//azrak
		false,//karam
		true,//ish 15
		false,//Mirsho
		false,//akito 16
		true,//poum 17
		false,//suri 1
		false,//wildo
		true,//piou 18
		false,//larkeesh
		false,//aasgar
		false,//burk
		true,//rufryr
		true,//froggy		
	];
	for(i=1; i<=12;i++){
		
		this.sc_actors[i] = {};
		this.sc_actors[i].good = _good[i];
		this.sc_actors[i]._available = true;
		this.sc_actors[i].talents = [	null,
			{id:1,		iconId:1,	name:"cuisinier",		niv:0,	exp:0 },
			{id:2,		iconid:1,	name:"bucheron",		niv:0,	exp:0 },
			{id:3,		iconid:1,	name:"ebeniste",		niv:0,	exp:0 },
			{id:4,		iconid:1,	name:"charpentier",	niv:0,	exp:0 },
			{id:5,		iconid:1,	name:"brigand",		niv:0,	exp:0 },
			{id:6,		iconid:1,	name:"tisserand",		niv:0,	exp:0 },
			{id:7,		iconid:1,	name:"agriculteur",	niv:1,	exp:0 },
			{id:8,		iconid:1,	name:"forestier",		niv:0,	exp:0 },
			{id:9,		iconid:1,	name:"forgeron",		niv:0,	exp:0 },
			{id:10,	iconid:1,	name:"verrier",		niv:0,	exp:0 },
			{id:11,	iconid:1,	name:"potier",			niv:0,	exp:0 },
			{id:12,	iconid:1,	name:"combattant",		niv:0,	exp:0 },
			{id:13,	iconid:1,	name:"chasseur",		niv:0,	exp:0 },
			{id:14,	iconid:1,	name:"mineur",			niv:0,	exp:0 },
			{id:15,	iconid:1,	name:"scribe",			niv:0,	exp:0 },
			{id:16,	iconid:1,	name:"artiste",		niv:0,	exp:0 },
			{id:17,	iconid:1,	name:"musicien",		niv:0,	exp:0 },
			{id:18,	iconid:1,	name:"religieux",		niv:0,	exp:0 },
			{id:19,	iconid:1,	name:"tanneur",		niv:0,	exp:0 },
			{id:20,	iconid:1,	name:"eleveur",		niv:0,	exp:0 },
			{id:21,	iconid:1,	name:"orfevre",		niv:0,	exp:0 },
			{id:22,	iconid:1,	name:"sculteur",		niv:0,	exp:0 },
			{id:23,	iconid:1,	name:"marin",			niv:0,	exp:0 },
			{id:24,	iconid:1,	name:"pecheur",		niv:0,	exp:0 },
			{id:25,	iconid:1,	name:"orateur",		niv:0,	exp:0 },
			{id:26,	iconid:1,	name:"dresseur",		niv:0,	exp:0 }
		];
	}
}
//* GAME INTERPRETER
_alias._SC_GameInterpreter_command223 = Game_Interpreter.prototype.command223;
Game_Interpreter.prototype.command223				= function(){
	if ($gameMap._timesys_tintscreen) {return true};
    _alias._SC_GameInterpreter_command223.call(this);
	return true;
};//==============================

//* GAME SWITCHES
_alias._SC_GameSwitches_onChange = Game_Switches.prototype.onChange
Game_Switches.prototype.onChange					= function(){
    _alias._SC_GameSwitches_onChange.call(this);
	if ($gameSystem._time_data) {$gameSystem.set_base_time_phase();};
};
//* GAME BATTLER BASE
_alias._SC_GameBattler_initMembers = Game_BattlerBase.prototype.initMembers
Game_BattlerBase.prototype.initMembers = function() {
	_alias._SC_GameBattler_initMembers.call(this);
	this._ahud_face_data = [0,0,0,0];
};
//* CHARACTER BASE
_alias._SC_GameCharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function() {
	_alias._SC_GameCharacterBase_initMembers.call(this);
	this.resetAnchors();
};
Game_CharacterBase.prototype.resetAnchors = function(){
	this._anchorX = 0.5;
	this._anchorY = 1;
};
Game_CharacterBase.prototype.setAnchorX = function(anchorX) {
	this._anchorX = anchorX;
};
Game_CharacterBase.prototype.setAnchorY = function(anchorY) {
	this._anchorY = anchorY;
};
Game_CharacterBase.prototype.anchorX = function() {
	return this._anchorX;
};
Game_CharacterBase.prototype.anchorY = function() {
	return this._anchorY;
};
Game_CharacterBase.prototype.screen_realX = function() {
    return this.scrolledX() * $gameMap.tileWidth();
};
Game_CharacterBase.prototype.screen_realY = function() {
    return this.scrolledY() * $gameMap.tileHeight();
};
Game_CharacterBase.prototype.need_upper_anchor = function(){
	var _result = false;
	for(i = 1; i < 5; i++){
		if(this.actor()){
			if(this.actor().armors().contains($dataArmors[1])) _result = true;
		};
	}
	return _result;
};
//GAME PLAYER
Game_Player.prototype.resetAnchors = function(){
	this._anchorX = 0.5;
	this._anchorY = 0.735;
};
//GAME FOLLOWER
Game_Follower.prototype.resetAnchors = function(){
	this._anchorX = 0.5;
	this._anchorY = 0.735;
};

//* GAME ACTOR
Game_Actor.prototype.current_exp_r = function() {
    return this.nextLevelExp()
	- this.nextRequiredExp()
	- this.expForLevel(this._level);
};
Game_Actor.prototype.nextLevelExp_r = function() {
    return this.expForLevel(this._level + 1)
	- this.expForLevel(this._level);
};
//* GAME VARIABLES
/*var _alias._SC_GameVariables_setValue = Game_Variables.prototype.setValue
Game_Variables.prototype.setValue					= function(varId, val){
    if ($gameTime){
		if(!this.is_time_variable(varId)){
			_alias._SC_GameVariables_setValue.call(this,varId, val);
		}
	}else{
		_alias._SC_GameVariables_setValue.call(this,varId, val);
	}
};
Game_Variables.prototype.is_time_variable			= function(varId){
	if (	$gameSystem.sc_varIds().sec				=== varId
			||	$gameSystem.sc_varIds().min			=== varId
			||	$gameSystem.sc_varIds().hour			=== varId
			||	$gameSystem.sc_varIds().day			=== varId
			||	$gameSystem.sc_varIds().month		=== varId
			||	$gameSystem.sc_varIds().year			=== varId
			||	$gameSystem.sc_varIds().dayDecade	=== varId
			||	$gameSystem.sc_varIds().season 		=== varId ){
		return true;
	}
	return false;
};*/
Game_Variables.prototype.setDingo = function(){
	var tres= 0;
	return tres;
};
//* SCENE BASE
Scene_Base.prototype.createHudField = function() {
	this._hudField = new Sprite();
	this._hudField.z = 10;
	this.addChild(this._hudField);
};
Scene_Base.prototype.sortMz = function() {
   this._hudField.children.sort(function(a, b){return a.mz-b.mz});
};
//* SCENE MAP
//** create
_alias._SC_SceneMap_createSpriteset = Scene_Map.prototype.createSpriteset;
Scene_Map.prototype.createSpriteset = function() {
	_alias._SC_SceneMap_createSpriteset.call(this);
	if (!this._hudField) {this.createHudField()};
	this.createTimeSystemHud();
	this.createActorHud();
	this.sortMz();
};
Scene_Map.prototype.createTimeSystemHud = function() {
    this._timeHud = new Sprite_TimeClock(1121,15);
	this._timeHud.mz = 120;
	this._hudField.addChild(this._timeHud);	
};
Scene_Map.prototype.createActorHud = function() {
	this._actorHud = new Sprite_ActorHud(1,15,15);
	this._actorHud.mz = 101;
	this._hudField.addChild(this._actorHud);	
};
_alias._SC_SceneMap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update							= function(){
	$gameTime.update();
	this.refresh_death_character();
	if(this._timeHud)this._timeHud.update();
	_alias._SC_SceneMap_update.call(this);		
};
_alias._SC_SceneMap_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate						= function(){
	_alias._SC_SceneMap_terminate.call(this);
	if ($gameTime._timesys_tintscreen){
		$gameTime.tints.actual = $gameScreen._tone;
	}
};
Scene_Map.prototype.refresh_death_character = function (){
	var _battler = $gameParty.battleMembers()[0];
	var _eventIndex = 0;
	var _id = 0;
	var _x = 0;
	var _y = 0;
	
	if($gameParty.battleMembers()[0].isDead()){
		
	}
	
	for(i = 0; i < $gameParty.battleMembers().length - 1; i++){
	
		_battler = $gameParty.battleMembers()[i];
		
		if(_battler.isDead()){
			_id = _battler.actorId();
			_x = $gamePlayer._followers[i]._x;
			_y = $gamePlayer._followers[i]._y;
			$gameMessage.add("test");
			$gameMap.add_event(2,1,20,10/* $gameSystem.sc_mapIds().mapDeath, _id ,_x , _y */);
			$gameParty.removeActor(_id);
		}
	}
	$gamePlayer.refresh();
	$gameMap.requestRefresh();
};
//* SCENE MENU
_alias._SC_SceneMenu_create = Scene_Menu.prototype.create
Scene_Menu.prototype.create = function() {
	_alias._SC_SceneMenu_create.call(this);
	/*if (!this._hudField) this.createHudField();
	this.createTimeSystemHud();
	this.sortMz();*/
};
Scene_Menu.prototype.createTimeStatus = function() {
	this._timeHud = new Sprite_TimeClock(1121,15);
	this._timeHud.mz = 120;
	this._hudField.addChild(this._timeHud);	
};
//SPRITE CHARACTER
_alias._SC_SpriteCharacter_updatePosition = Sprite_Character.prototype.updatePosition;
Sprite_Character.prototype.updatePosition = function() {
	_alias._SC_SpriteCharacter_updatePosition.call(this);
	this.updateAnchors();
};
Sprite_Character.prototype.updateAnchors = function(){
	this.anchor.x = this._character.anchorX();
	this.anchor.y = this._character.anchorY();
}

