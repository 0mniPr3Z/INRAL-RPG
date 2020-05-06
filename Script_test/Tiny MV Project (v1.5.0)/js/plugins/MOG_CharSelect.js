
var Moghunter = Moghunter || {};
Moghunter.skipActorIDs = 0;

Moghunter.charSel_FaceX = 30;
Moghunter.charSel_FaceY = 0;

Moghunter.charSel_Face2X = 980;
Moghunter.charSel_Face2Y = 15;
Moghunter.charSel_Face2S = 150;

Moghunter.charSel_PictureX = 690;
Moghunter.charSel_PictureY = -200;

Moghunter.charSel_CursorX = 0;
Moghunter.charSel_CursorY = 0;
Moghunter.charSel_CursorR = 0.02;

Moghunter.charSel_NameX = 20;
Moghunter.charSel_NameY = 525;

Moghunter.charSel_parX = 270;
Moghunter.charSel_parY = 200;
Moghunter.charSel_parFontSize = 22;

Moghunter.charSel_initPartySize = 8;
Moghunter.charSel_rolRange = 300;

function Scene_CharacterSelect() {
	this.initialize.apply(this, arguments);
};
Scene_CharacterSelect.prototype = Object.create(Scene_MenuBase.prototype);
Scene_CharacterSelect.prototype.constructor = Scene_CharacterSelect;
Scene_CharacterSelect.prototype.initialize					= function(){
	Scene_Base.prototype.initialize.call(this);
	this._index = 0;
	this._ActorIndex = 0;
	this._party = [];
	this._partyIndex = 0;
	this._partySel = [];
	this._actors = [];
	this._pi = 2.0 * Math.PI;
	this._np = [0,0];
	this._rol_range = this.circle_size();
	this._phase = [0,0];
	this.loadFiles();
	this.createSprites();
};
Scene_CharacterSelect.prototype.circle_size 				= function(){
	return 290;
};
Game_System.prototype.actorSelect_enableAllActors 	= function(){
	var _swId = 0;
	for(i=0; i < 46; i++){
		_swId = this.sc_switchIds().baseActors + i;
		$gameSwitches.setValue(_swId, true);
	}
};
Game_System.prototype.actorSelect_disableAllActors 	= function(){
	var _swId = 0;
	for(i=0; i < 46; i++){
		_swId = this.sc_switchIds().baseActors + i;
		$gameSwitches.setValue(_swId, false);
	}
};
Game_System.prototype.actorSelect_enableGoodActors 	= function(){
	this.actorSelect_disableAllActors();
	var _swId = 0;
	for(i=0; i < 46; i++){
		if(this.sc_actors[i + 1].good){
			_swId = this.sc_switchIds().baseActors + i;
			$gameSwitches.setValue(_swId, true);
		}
	}
}
Game_System.prototype.actorSelect_enableBadActors 	= function(){
	this.actorSelect_disableAllActors();
	var _swId = 0;
	for(i=0; i < 46; i++){
		if(!this.sc_actors[i + 1].good){
			_swId = this.sc_switchIds().baseActors + i;
			$gameSwitches.setValue(_swId, true);
		}
	}
}
Scene_CharacterSelect.prototype.loadFiles					= function(){
	this._faceBitmaps = [];
	this._faceBitmaps_S = [];
	this._pictureBitmaps = [];
	this._skipID = [];
	$gameParty._actors = [];
	for (var i = 1; i < this.max_available_actors(); i++) {$gameParty.addActor(i)};
	var membersTemp = $gameParty.members();
	$gameParty._actors = [];
	for (var i = 0; i < membersTemp.length; i++) {
	     var enable = $gameSwitches.value($gameSystem.sc_switchIds().baseActors + i);
		 var actor = membersTemp[i];
		 if (enable) {
			 this._actors.push(actor)
			 var fileName = String("" + actor._actorId)
		     this._faceBitmaps.push(ImageManager.load_face_hud(fileName));
			 this._faceBitmaps_S.push(ImageManager.load_face_hud(fileName));
			 this._pictureBitmaps.push(ImageManager.load_battler_hud(fileName));
		 }
	};
	this._maxPartySize = Math.min(Math.max(Moghunter.charSel_initPartySize,1),this._actors.length);
};
Scene_CharacterSelect.prototype.max_available_actors 		= function(){
	return 20;
};
Scene_CharacterSelect.prototype.maxActors 					= function(){
	return this._actors.length;
};
Scene_CharacterSelect.prototype.actor						= function(){
	return this._actors[this._ActorIndex];
};

Scene_CharacterSelect.prototype.createSprites				= function(){	
	this._field = new Sprite();
	this._field.opacity = 0;
	this.addChild(this._field);
	this.createBackgroundS();
	this.createPicture();
	this.createCursor();
	this.createFaces();
	this.createLayout();
	this.createName();
	this.createParameters();
	this.createMembers();
};
Scene_CharacterSelect.prototype.createBackgroundS			= function(){
	this._background = new Sprite(ImageManager.load_character_select("bg"));
	this._field.addChild(this._background);
	//this.create_mparticles();
};
Scene_CharacterSelect.prototype.createBackground 			= function(){
};
Scene_CharacterSelect.prototype.createLayout 				= function(){
	this._layout = new Sprite(ImageManager.load_character_select("layout"));
	this._field.addChild(this._layout);
};
Scene_CharacterSelect.prototype.createName 					= function(){
	this._name = new Sprite(new Bitmap(200,36));
	this._field.addChild(this._name);
};
Scene_CharacterSelect.prototype.createParameters 			= function(){
	this._parameters = new Sprite(new Bitmap(Graphics.boxWidth,Graphics.boxHeight));
	this._parameters.bitmap.fontSize = 18;
	this._field.addChild(this._parameters);
};
Scene_CharacterSelect.prototype.createCursor				= function(){
	this._cursor = new Sprite(ImageManager.load_character_select("cursor"));
	this._cursor.anchor.x = 0.5;
	this._cursor.anchor.y = 0.5;
	this._field.addChild(this._cursor);
};
Scene_CharacterSelect.prototype.createFaces					= function(){
	 this._facesSprites = [];
	 for (var i = 0; i < this._faceBitmaps.length; i++) {
		  this._facesSprites[i] = new Sprite(this._faceBitmaps[i]);
	  	  this._facesSprites[i].x = (Graphics.boxWidth / 2) + Moghunter.charSel_FaceX;
		  this._facesSprites[i].y = (Graphics.boxHeight / 2) + Moghunter.charSel_FaceY;
		  this._facesSprites[i].anchor.x = 0.5;
		  this._facesSprites[i].anchor.y = 0.5;
		  this._facesSprites[i].scale.x = 0.5;
		  this._facesSprites[i].scale.y = 0.5;
		  this._field.addChild(this._facesSprites[i]);
	 };
};
Scene_CharacterSelect.prototype.createPicture				= function(){
	this._picture = new Sprite();
	this._picture.anchor.x = 0.5;
	this._field.addChild(this._picture);
};
Scene_CharacterSelect.prototype.createMembers				= function(){
	 this._members = [];
     for (var i = 0; i < this._maxPartySize; i++) {
	      this._members[i] = new Sprite();
		  this._members[i].x = Moghunter.charSel_Face2X;
		  this._members[i].y = Moghunter.charSel_Face2Y + (Moghunter.charSel_Face2S * i);
		  this._field.addChild(this._members[i]);
	 };
};

Scene_CharacterSelect.prototype.drawPar						= function(par,x,y){
	this._parameters.bitmap.drawText(String(par),x,y,150,32,"right");
};
Scene_CharacterSelect.prototype.drawPar2					= function(par,x,y){
	this._parameters.bitmap.drawText(String(par),x,y,400,64,"right");
};

Scene_CharacterSelect.prototype.update						= function(){
	Scene_MenuBase.prototype.update.call(this);
	if (this._phase[0] === 1) {
		this.updateCommands();
	} else {
		this.updatePhase();
	};
	this.updateFaces();
	this.updateCursor();
	this.updateName();
	this.updateMembers();
	if (this._picture && this._picture.bitmap)this.updatePicture();
	if (this._index != this._ActorIndex) {this.refreshIndex()};
};
Scene_CharacterSelect.prototype.updatePhase					= function(){
     if (this._phase[0] === 0) {
		 this._field.opacity += 3;
		 if (this._field.opacity >= 255) {this._phase[0] = 1}; 
	 } else {
		 this._field.opacity -=  2;
		 if (this._field.opacity <= 0) {this.executeEnd()};
	 };
};	
Scene_CharacterSelect.prototype.updateFacePos				= function(i){
	  var rol_index = 1 / this.maxActors();
	  var now_p = rol_index * i;
	  var r_p = this._pi * -now_p;
	  this._np[0] = Math.floor(this._rol_range * Math.sin(r_p));
	  this._np[1] = -Math.floor(this._rol_range * Math.cos(r_p));
};
Scene_CharacterSelect.prototype.updateFaces					= function(){
	for (var i = 0; i < this._facesSprites.length; i++) {
		this.updateFacePos(i);
		var px = this._np[0] + (Graphics.boxWidth / 2) + Moghunter.charSel_FaceX;
		var py = this._np[1] + (Graphics.boxHeight / 2) + Moghunter.charSel_FaceY;
		this._facesSprites[i].x = this.faceMoveTo(this._facesSprites[i].x,px);
		this._facesSprites[i].y = this.faceMoveTo(this._facesSprites[i].y,py);;
	};
};
Scene_CharacterSelect.prototype.updatePicture				= function(){
	if (this._phase[0] === 0) {return};
	if (this._picture.x < Moghunter.charSel_PictureX) {
		this._picture.x += 5;
		this._picture.opacity += 13;
	    if (this._picture.x >= Moghunter.charSel_PictureX) {
			this._picture.x = Moghunter.charSel_PictureX;
			this._picture.opacity = 255;
		};
	};
	this._picture.y = (Graphics.boxHeight - this._picture.bitmap.height) + Moghunter.charSel_PictureY;
};
Scene_CharacterSelect.prototype.updateCommands				= function(){
	if (Input.isRepeated("right")) {this.nextIndex(-1)}
	else if (Input.isRepeated("left")) {this.nextIndex(1)}
	else if (Input.isRepeated("down")) {this.nextIndex(-1)}
	else if (Input.isRepeated("up")) {this.nextIndex(1)}
	else if (Input.isTriggered("ok")) {this.selectCharacter(true)}
	else if (Input.isTriggered("cancel") || TouchInput.isCancelled()) {this.cancelCharacter()};
	if (TouchInput.isTriggered()) {this.checkTouchOnFace()};
};
Scene_CharacterSelect.prototype.updateMembers				= function(i){
	for (var i = 0; i < this._members.length; i++) {
		 if (this._members[i].x > Moghunter.charSel_Face2X) {
			 this._members[i].x -= 5;
			 this._members[i].opacity += 25;
			 if (this._members[i].x <= Moghunter.charSel_Face2X) {
				 this._members[i].x = Moghunter.charSel_Face2X;
				 this._members[i].opacity = 255;
			 };			 
		 };
	};
};
Scene_CharacterSelect.prototype.updateName					= function(){
     this._name.x = Moghunter.charSel_NameX;
	 this._name.y = Moghunter.charSel_NameY;
};
Scene_CharacterSelect.prototype.updateCursor				= function(){
	this._cursor.rotation += Moghunter.charSel_CursorR;
    this._cursor.x = this._facesSprites[this._index].x + Moghunter.charSel_CursorX;
	this._cursor.y = this._facesSprites[this._index].y + Moghunter.charSel_CursorY;
	if (this._phase[0] != 1) {
		this._cursor.opacity -= 10;
	} else {
		this._cursor.opacity += 10;
	};
};

Scene_CharacterSelect.prototype.refresh_start				= function(){
	this.refreshIndex();
	this.refreshMembers();
}
Scene_CharacterSelect.prototype.refreshParameters			= function(){
	this._parameters.bitmap.clear();
	var xr = Moghunter.charSel_parX;
	var yr = Moghunter.charSel_parY;
	this.drawPar(this.actor().currentClass().name,xr + 130,yr + 5);
	this.drawPar(this.actor().hp, xr+10, yr+50);
	this.drawPar(this.actor().mp, xr+130, yr+50);
	this.drawPar(this.actor().atk, xr+10, yr+95);
	this.drawPar(this.actor().def, xr+130, yr+95);
	this.drawPar(this.actor().mat, xr+10, yr+140);
	this.drawPar(this.actor().mdf, xr+130, yr+140);
	this.drawPar(this.actor().agi, xr+10, yr+185);
	this.drawPar(this.actor().luk, xr+130, yr+185);
	this.drawPar2(this.actor().profile() , 20 , 560);
};
Scene_CharacterSelect.prototype.refreshMembers				= function(i,actor_id){
	  this._members[i].bitmap = this._faceBitmaps_S[actor_id];
	  this._members[i].x = Moghunter.charSel_Face2X + 50;
	  this._members[i].opacity = 0;
};
Scene_CharacterSelect.prototype.refreshPicture				= function(){
	this._picture.bitmap = this._pictureBitmaps[this._ActorIndex];
	this._picture.x = Moghunter.charSel_PictureX - 100;
	this._picture.opacity = 0;
};
Scene_CharacterSelect.prototype.refreshIndex				= function(){
	this._ActorIndex = this._index;
	this.refreshPicture();
	this.refreshName();
	this.refreshParameters();
};
Scene_CharacterSelect.prototype.refreshFaceOpacity			= function(){
    for (var i = 0; i < this._facesSprites.length; i++) {
		var sel = true;
        for (var f = 0; f < this._partySel.length; f++) {
			if (this._partySel[f] === i) {sel = false};
		};
        if (sel) {
			this._facesSprites[i].opacity = 255;
		} else {
			this._facesSprites[i].opacity = 125;
		};
	};	
};
Scene_CharacterSelect.prototype.refreshName					= function(){
     this._name.bitmap.clear();
     this._name.bitmap.drawText(this.actor().name(),0,0,190,32,"left");
};

Scene_CharacterSelect.prototype.cancelCharacter			= function() {
	if (this._partyIndex <= 0) {return};
    SoundManager.playCancel()	
	this._partyIndex--;
    this.clearMembers(this._partyIndex);
	this._partySel.pop();
	this.refreshFaceOpacity();
	if (this._partyIndex < 0) {this._partyIndex = 0};
};
Scene_CharacterSelect.prototype.selectCharacter			= function(next){
	if (this._partyIndex >= this._maxPartySize) {return};
	var enable = true;
	for (var i = 0; i < this._partySel.length; i++) {
		if (this._partySel[i] === this._index) {enable = false};
	};
	if (enable) {this.addCharacter(next)
	} else { SoundManager.playBuzzer()
	};

};
Scene_CharacterSelect.prototype.addCharacter				= function(next){
    SoundManager.playOk();
	this._partySel.push(this._index);
	this.refreshFaceOpacity();
    this.refreshMembers(this._partyIndex,this._index);
	this._partyIndex++;
	if (this._partyIndex >= this._maxPartySize) {this._phase[0] = 2};
};
Scene_CharacterSelect.prototype.faceMoveTo					= function(value,real_value){
	if (value == real_value) {return value};
	var dnspeed = 2 + (Math.abs(value - real_value) / 30);
	if (value > real_value) {value -= dnspeed;
	    if (value < real_value) {value = real_value};}
	else if (value < real_value) {value  += dnspeed;
		if (value  > real_value) {value  = real_value};
	};
	return Math.floor(value);
};
Scene_CharacterSelect.prototype.isOnFace					= function(sprite) {
	 var cw = sprite.bitmap.width / 2;
	 var ch = sprite.bitmap.height / 2;
	 if (TouchInput.x < sprite.x - cw) { return false};
	 if (TouchInput.x > sprite.x + cw) { return false};
	 if (TouchInput.y < sprite.y - ch) { return false};
	 if (TouchInput.y > sprite.y + ch) { return false};
	 return true;	 
};
Scene_CharacterSelect.prototype.checkTouchOnFace			= function(){
	for (i = 0; i < this._facesSprites.length; i++){
		 if (this.isOnFace(this._facesSprites[i])) {
			 this._index = i;
			 this.selectCharacter(false);
		 };		
	};
};
Scene_CharacterSelect.prototype.executeEnd					= function(){
	for (var i = 0; i < this._partySel.length; i++) {
		var actor = this._actors[this._partySel[i]];
		if (actor) {$gameParty.addActor(actor._actorId)};
	};
	SceneManager.pop();
};
Scene_CharacterSelect.prototype.clearMembers				= function(i){
	  if (!this._members[i]) {return};
	  this._members[i].bitmap = null;
};
Scene_CharacterSelect.prototype.nextIndex 					= function(value){
	if (this._phase[0] != 1) {return};
	SoundManager.playCursor();
    this._index += value;
	if (this._index >= this.maxActors()) {this._index = 0};
	if (this._index < 0) {this._index = this.maxActors() - 1};
};  




