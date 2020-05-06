/*:
 * @help
 * ■ How to use       ╒══════════════════════════╛
 * 1) Saving map events to memory
 * Plugin Command: 
 *  save_cur_map
 * or
 * Script Call:
 *   $gameMap.save_cur_map()
 *(also in case you want to use this from other plugin)
 *
 * IF you have event which change it's graphic (example Door)
 * and you need to revert the changes back when doing transfer...
 * add this COMMENT in the door event page
 *
 * <reinit_event>
 *
 * warning it won't reinit self switch!!!. this just change the page to state prior
 * activating the page...
 *
 * if you use AUTO DOOR (in editor > right click > quick event creation > Door)
 * i include some automatic detection. and you don't have to add any comment tags.
 * the detection work like this:
 *
 * if there's Event Command > Move Route > This Event > Through ON
 * AND
 * if there's NO Event Command > Move Route > This Event > Through OFF
 * i assume it's auto door event...
 *                    
 * although it's "RARE"... is there a scenario that event like above is NOT an autodoor event?
 * if yes... don't worry... you could add comment at the "RARE EVENT" page:
 *
 * <not_auto_door>
 *
 * and it won't reset the page. 
 *
 * 2) Deleting map events from memory (it will reload map event from editor next time reenter map)
 * self switch is left as it is though... so if any changes on self switch will be remain there.
 * if you don't want this behavior use number 3) method below
 *
 * Plugin Command: 
 *    delete_cur_map
 *   or
 * Script Call:
 *    $gameMap.delete_cur_map()
 *
 * 3) RESETING map events to editor (all self switch also will be set to false)  
 * Plugin Command: 
 *    reset_cur_map
 *   or
 * Script Call:
 *   $gameMap.reset_cur_map()
 *
 * 4) AUTO SAVING map event... WARNING... don't save too many map with many events if you make
 * browser game. since there's 5mb size limitation (around 5000 event).
 * so if you want to autosave in a certain map. add this in map note
 *
 * <auto_save_event>
 *
 * this note will also automatically save map events when there's a change using 
 * EST Clone Transform Delete Event.
 *  
 * 5) to make event temporary. (will be deleted at entering the map. useful for spawned event you
 * want to not stay the next time you reenter the map). add this in either event note or event page comment
 *
 * <temporary_event>
 *
  ■ How to use       ╒══════════════════════════╛
 1) Add New Event
 Plugin Command: 
  add_event source_map_id source_event_id x y
    example:
    add_event 8 2 3 7
    will add new event cloned from Map 8 EventId 2
    and will be placed in x = 3 and y = 7.

 Script Call:
  $gameMap.add_event(source_map_id, source_event_id ,x , y);
    example:
    $gameMap.add_event(8,2,3,7);
    will add new event cloned from Map 8 EventId 2
    and will be placed in x = 3 and y = 7.

 2) Transform Existing Event
 Plugin Command: 
  transform_event target_event_id source_map_id source_event_id
    example:
    transform_event 24 8 1
    will transform event 24 in current map with event
    cloned from Map 8 EventId 1
    x and y will still use old event value.

  transform_this_event source_map_id source_event_id
    example:
    transform_this_event 8 1
    will transform event that called it with event
    cloned from Map 8 EventId 1
    x and y will still use old event value.

 Script Call:
  $gameMap.transform_event(target_event_id, source_map_id, source_event_id);
    example:
    $gameMap.transform_event(24,8,1);
    will transform event 24 in current map with event
    cloned from Map 8 EventId 1
    x and y will still use old event value.

    some tips... if called from script call event command...
    $gameMap.transform_event(this._eventId,8,1);
    will transform event that calling it to event
    cloned from Map 8 EventId 1
    x and y will still use old event value.

 3) Delete Existing Event
 Plugin Command: 
  delete_event target_event_id
    example:
    delete_event 24
    will delete event 24 in current map

  delete_this_event
    will delete event that called it


 Script Call:
  $gameMap.delete_event(target_event_id);
    example:
    $gameMap.delete_event(24);
    will delete event 24 in current map

    some tips... if called from script call event command...
    $gameMap.delete_event(this._eventId);
    will delete event that CALLED it.

 4) if you want to delete all clone based on sourcemapid and source event id
 ACROSS ALL SAVED MAP...
 plugin command:
 DELETE_ALL_EVENT_BY_SOURCE srcMapId srcEventId
    example:
    DELETE_ALL_EVENT_BY_SOURCE 8 14
    will delete event that cloned from map 8 id 14 across ALL SAVED map.

 script call:
 $gameMap.delete_all_event_bysource(srcMapId,srcEventId);
    example:
    $gameMap.delete_all_event_bysource(8,14);
    will delete event that cloned from map 8 id 14 across ALL SAVED map.

 5) if you want to delete event based on xy location across ANY SAVED map
  plugin command:
  DELETE_EVENT_BY_XY mapId x y
    example:
    DELETE_EVENT_BY_XY 6 7 8
    will delete event in map 6, is coordinate x = 7, coordinate y = 8
    MAP 6 MUST BE ALREADY SAVED before you call this. or it will do nothing.

  script call:
  $gameMap.delete_event_byxy(mapId, ev_x, ev_y);
    example:
    $gameMap.delete_event_byxy(6, 7, 8);
    will delete event in map 6, is coordinate x = 7, coordinate y = 8
    MAP 6 MUST BE ALREADY SAVED before you call this. or it will do nothing.
  
 x) FOR OTHER SCRIPTER that want to make compatibility patch for this plugin.
 check EST.Clone_Transform_Delete_Event exist or not.
 ex: 

 if(typeof EST !== 'undefined' && EST.Clone_Transform_Delete_Event) {
  place your code here.
 }
  
*/ 
var _alias = {};
//var SimCraftDebugger = true;
//* DATA MANAGER
DataManager.sc_databaseFiles = function(){
	return [
		{name: '$dataEventsList',		src: 'Data_TimeEvents.json'}
	];
};
DataManager.load_sc_database = function() {
    for (var i = 0; i < this.sc_databaseFiles().length; i++) {
        var name = this.sc_databaseFiles()[i].name;
        var src = this.sc_databaseFiles()[i].src;
        this.load_sc_dataFile(name, src);
    }
};
DataManager.load_sc_dataFile = function(name, src) {
    var xhr = new XMLHttpRequest();
    var url = 'data/simcraft/' + src;
    xhr.open('GET', url);
    xhr.overrideMimeType('application/json');
	
    xhr.onload = function() {
        if (xhr.status < 400) {
           window[name] = JSON.parse(xhr.responseText);
		   DataManager.onLoad(window[name]);
        }
    };
    xhr.onerror = this._mapLoader || function() {
        DataManager._errorUrl = DataManager._errorUrl || url;
    };
    xhr.send();
};
_alias._SC_DataManager_loadDatabase = DataManager.loadDatabase;
DataManager.loadDatabase = function(){
	_alias._SC_DataManager_loadDatabase.call(this);
	this.load_sc_database();
};	 
_alias._SC_DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!_alias._SC_DataManager_isDatabaseLoaded.call(this)) {
		return false;
	}else{
		return this.is_sc_database_loaded();
	}
};
DataManager.is_sc_database_loaded = function() {
    this.checkError();
    for (var i = 0; i < this.sc_databaseFiles().length; i++) {
        if (!window[this.sc_databaseFiles()[i].name]) {
            return false;
        }
    }
    return true;
};
_alias._SC_DataManager_setupNewGame = DataManager.setupNewGame;
DataManager.setupNewGame							= function(){
	_alias._SC_DataManager_setupNewGame.call(this);
	$gameSystem.setup_SimCraftEngine();
};
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
//* IMAGE MANAGER
ImageManager.load_time_hud = function(filename) {
    return this.loadBitmap('img/gui/time/', filename, 0, true);
};
ImageManager.load_actor_hud = function(filename) {
    return this.loadBitmap('img/gui/actorhud/', filename, 0, true);
};
ImageManager.load_single_face = function(filename){
	return this.loadBitmap('img/SumRndmDde/character-creator-ex/Face/face/', filename, 0, true);
}
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
		escortTalentVal:		[41, 42, 43, 44, 45, ,46, 47]
		
	};
}
Game_System.prototype.sc_switchIds					= function(){
	return {
		dayPhases:		[1,2,3,4,5,6,7],
		months:		[8,9,10,11,12,13,14,15,16,17,18,19],
		seasons:		[20,21,22,23],
		daysDecade:	[24,25,26,27,29,30,31,32,33,34],
		timeHud:		35
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
	for(i=1; i<=12;i++){
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
	};
}
Game_System.prototype.initActor_talents = function(){
	for(i=1; i<=12;i++){
		this.sc_actors[i] = {};
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
_alias._SC_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_alias._SC_pluginCommand.call(this,command, args);
	switch(command.toLowerCase()) {
		case "hide_choice":
			var choiceNum = Math.floor(args[0] - 1);
			$gameMessage.hideChoice(choiceNum, true);
			break;
		case 'add_event':
			var alert_msg = "wrong plugin command\ncorrect format> add_event source_map_id source_event_id x y"
			if (args.length != 4) return window.alert(alert_msg);
			var source_map_id = Number(args[0]);
			var source_event_id = Number(args[1]);
			var ev_x = Number(args[2]);
			var ev_y = Number(args[3]);
			$gameMap.add_event(source_map_id,source_event_id,ev_x,ev_y);
			break;
		case 'transform_event':
			var alert_msg = "wrong plugin command\ncorrect format> transform_event target_event_id source_map_id source_event_id"
			if (args.length != 3) return window.alert(alert_msg);
			var target_event_id = Number(args[0]);
			var source_map_id = Number(args[1]);
			var source_event_id = Number(args[2]);
			$gameMap.transform_event(target_event_id, source_map_id, source_event_id);
			break;
		case 'transform_this_event':
			var alert_msg = "wrong plugin command\ncorrect format> transform_this_event source_map_id source_event_id"
			if (args.length != 2) return window.alert(alert_msg);
			var target_event_id = this._eventId;
			var source_map_id = Number(args[0]);
			var source_event_id = Number(args[1]);
			$gameMap.transform_event(target_event_id, source_map_id, source_event_id);
			break;
		case 'delete_event':
			var alert_msg = "wrong plugin command\ncorrect format> delete_event target_event_id"
			if (args.length != 1) return window.alert(alert_msg);
			var target_event_id = Number(args[0]);
			$gameMap.delete_event(target_event_id);
			break;
		case 'delete_this_event':
			var target_event_id = this._eventId;
			$gameMap.delete_event(target_event_id);
			break;
		case 'delete_all_event_by_source':
			var alert_msg = "wrong plugin command\ncorrect format> DELETE_ALL_EVENT_BY_SOURCE srcMapId srcEventId"
			if (args.length != 2) return window.alert(alert_msg);        
			var srcMapId = Number(args[0]);
			var srcEventId = Number(args[1]);
			$gameMap.delete_all_event_bysource(srcMapId,srcEventId);
			break;
		case 'delete_event_by_xy':
			var alert_msg = "wrong plugin command\ncorrect format> DELETE_EVENT_BY_XY mapId x y"
			if (args.length != 3) return window.alert(alert_msg);        
			var mapId = Number(args[0]);
			var ev_x = Number(args[1]);
			var ev_y = Number(args[2]);
			$gameMap.delete_event_byxy(mapId, ev_x, ev_y);
			break;
		case 'save_map_event':
			$gameMap.save_cur_map();
			break;
		case 'forget_map_event':
			$gameMap.delete_cur_map();
			break;
		case 'reset_map_event':
			$gameMap.reset_cur_map();
			break;
		case 'hud_all_on':
			$gameSwitches.setValue($gameSystem.sc_switchIds().timeHud,true);
			$gameSystem._ahud_visible = true;
			break;
		case "hud_all_off":
			$gameSwitches.setValue($gameSystem.sc_switchIds().timeHud,false);
			$gameSystem._ahud_visible = false;
			break;
		case 'hud_actor_on':
			$gameSystem._ahud_visible = true;
		case 'hud_actor_off':
			$gameSystem._ahud_visible = false;
		case'hud_actor_switch':
			$gameSystem._ahud_visible = !$gameSystem._ahud_visible;
			break;
		case 'hud_time_on':
			$gameSwitches.setValue($gameSystem.sc_switchIds().timeHud,true);
			break;
		$gameSwitches.setValue($gameSystem.sc_switchIds().timeHud,true);
		case 'hud_time_off':
			$gameSwitches.setValue($gameSystem.sc_switchIds().timeHud,false);
			break;
		default:
			_Game_Interpreter_pluginCommand.call(this, command, args);
			break;
    }
	return true;
};
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

