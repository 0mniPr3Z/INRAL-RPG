function Sprite_ActorHud() {
    this.initialize.apply(this, arguments);
};

Sprite_ActorHud.prototype = Object.create(Sprite.prototype);
Sprite_ActorHud.prototype.constructor = Sprite_ActorHud;
Sprite_ActorHud.prototype.initialize = function(hud_id, x, y) {
    Sprite.prototype.initialize.call(this);
	this._xPos = x || 0;
	this._yPos = y || 0;
	this.visible = false;	
    this._data_initial_ref = [0,true];
	this._hud_id = hud_id;
	this._hud_size = [-1,-1,-1,-1];
    this.base_parameter_clear();
    this.load_img();
	if (!$gameSystem._ahud_visible){
		this.opacity = 0;
	}
	this.update();
};
Sprite_ActorHud.prototype.load_img = function() {
	this._bg_img 				= ImageManager.load_actor_hud("bg1");
	this._stateIco_img 		= ImageManager.loadSystem("IconSet");
	this._layer_img			= ImageManager.load_actor_hud("bg2");
	this._expFill_img 		= ImageManager.load_actor_hud("expFill");
	this._formFill_img 		= ImageManager.load_actor_hud("formFill");
	this._dietFill_img 		= ImageManager.load_actor_hud("dietFill");
	this._upperLayer_img		= ImageManager.load_actor_hud("bg3");
	this._formNum_img 		= ImageManager.load_actor_hud("formNum");
	this._lvNum_img			= ImageManager.load_actor_hud("lvNum");
};
Sprite_ActorHud.prototype.base_parameter_clear = function() {
 	 this._hp_old = [-1,-1];
	 this._maxhp_old = [-1,-1];
	 this._hp_old_ani = [-1,-1];
	 this._hp_flow = [false,0,0,0];
     this._mp_old = [-1,-1];
	 this._maxmp_old = [-1,-1];
	 this._mp_old_ani = [-1,-1];
	 this._mp_flow = [false,0,0,0];
	 this._tp_flow = [false,0,0,0];
	 this._exp_old = [-1,-1];
	 this._exp_flow = [false,0,0,0];	
	 this._hp_number_old = -1; 
	 this._hp_icon_old = [-1,-1];
	 this._mp_icon_old = [-1,-1];
	 this._tp_icon_old = [-1,-1];
	 this._hp_img_data = [0,0,0];
	 this._mp_img_data = [0,0,0];
	 this._tp_img_data = [0,0,0];
	 this._states_old = [];
	 this._states_data = [0,0,0];
	 this._active = false;
	 this._hud_size = [0,0];
};
Sprite_ActorHud.prototype.need_refreh_bhud				= function() {
	if (this._data_initial_ref[1]){
		return true
	};
	if(this._battler != $gameParty.members()[0]){
		return true
	};
	return false;
};
//* UPDATE
Sprite_ActorHud.prototype.update_sprites					= function() {	
	this.update_visible();
	this.update_face();	
    this.update_hp();
	this.update_mp();
    this.update_states();
	this.update_exp();
};
Sprite_ActorHud.prototype.update = function() {
    Sprite.prototype.update.call(this);	
	if (this.need_refreh_bhud()) {this.refresh_bhud()};
    if (!this._battler) {this.visible = false;return};
	if (!this._bg_img.isReady()) {return};
	if (this._hud_size[0] === 0) {this.refresh_position();return};
	this.update_sprites();
};
Sprite_ActorHud.prototype.update_visible = function() {
	 this.visible = true;
     if (this.needHide(false)) {
		 this.opacity -= 15;
	 } else {		 	
		if (this.needFade()) {
			if (this.opacity > 80) {
				this.opacity -= 10;
				if (this.opacity < 80){
					this.opacity = 80
				};
			 };
		} else {
				 this.opacity += 10;
		};		
	 };
	 $gameSystem._ahud_opacity = this.opacity;
};
Sprite_ActorHud.prototype.update_face = function() {
	if (!this._face) {return};
	if (!this._face.bitmap.isReady()) {return};
	if (this._face_data[4] && this._face_data[5]
			!= this._battler._ahud_face_data[2]){
		this.refresh_face();
	}
    /*this.update_face_animation();
    this.update_face_shake();
    this.update_face_zoom();*/
};
Sprite_ActorHud.prototype.update_hp = function() {
	if (this._hp_meter_blue) {
		this._hp_meter_blue.opacity += 15;
		this._hp_meter_red.opacity += 15;
		if(this._hp_flow[0]) {
		   if (this._hp_old[1] != this._battler.mhp) {
		       this._hp_old = [this._battler.hp,this._battler.mhp];
			   this.refresh_meter_flow(this._hp_meter_red,this._battler.hp,this._battler.mhp,1,this._hp_flow[1]);
		   };					
		   this.refresh_meter_flow(this._hp_meter_blue,this._battler.hp,this._battler.mhp,0,this._hp_flow[1]);
	   	   var dif_meter = this.update_dif(this._hp_old_ani[0],this._battler.hp,160)
		   if (this._hp_old_ani[0] != dif_meter) {this._hp_old_ani[0] = dif_meter;
	       this.refresh_meter_flow(this._hp_meter_red,this._hp_old_ani[0],this._battler.mhp,1,this._hp_flow[1]);
		   };
		   this._hp_flow[1] += 2;
		   if (this._hp_flow[1] > this._hp_flow[3]) {this._hp_flow[1] = 0};		   
   	    }
		else {
		   if (this.need_refresh_parameter(0)) {
				this.refresh_meter(this._hp_meter_blue,this._battler.hp,this._battler.mhp,0,2,0);
				this._hp_old = [this._battler.hp,this._battler.mhp];
			};
			var dif_meter = this.update_dif(this._hp_old_ani[0],this._battler.hp,160)
			if (this._hp_old_ani[0] != dif_meter) {this._hp_old_ani[0] = dif_meter;
			this.refresh_meter(this._hp_meter_red,this._hp_old_ani[0],this._battler.mhp,1,2,0);};		
	    };
    };
	if (this._hp_number) {
		var dif_number = this.update_dif(this._hp_number_old,this._battler.hp,30)
		if (this._hp_number_old != dif_number) {this._hp_number_old = dif_number;
		this.refresh_number(this._hp_number,this._hp_number_old,this._hp_img_data,this._hp_img_data[4],0);};
	};
};
Sprite_ActorHud.prototype.update_mp = function() {
	if (this._mp_meter_blue) {
     	this._mp_meter_blue.opacity += 15;
	    this._mp_meter_red.opacity += 15;			
		if(this._mp_flow[0]) {
		   if (this._mp_old[1] != this._battler.mmp) {
		       this._mp_old = [this._battler.mp,this._battler.mmp];
			   this.refresh_meter_flow(this._mp_meter_red,this._battler.mp,this._battler.mmp,1,this._mp_flow[1]);
		   };			
		   this.refresh_meter_flow(this._mp_meter_blue,this._battler.mp,this._battler.mmp,0,this._mp_flow[1]);
	   	   var dif_meter = this.update_dif(this._mp_old_ani[0],this._battler.mp,160);
		   if (this._mp_old_ani[0] != dif_meter) {this._mp_old_ani[0] = dif_meter;
	       this.refresh_meter_flow(this._mp_meter_red,this._mp_old_ani[0],this._battler.mmp,1,this._mp_flow[1]);
		   };
		   this._mp_flow[1] += 2;
		   if (this._mp_flow[1] > this._mp_flow[3]) {this._mp_flow[1] = 0};		   
   	    }
		else {		
			if (this.need_refresh_parameter(1)) {
				this.refresh_meter(this._mp_meter_blue,this._battler.mp,this._battler.mmp,0,2,0);
				this._mp_old = [this._battler.mp,this._battler.mmp];
			};
			var dif_meter = this.update_dif(this._mp_old_ani[0],this._battler.mp,160)
			if (this._mp_old_ani[0] != dif_meter) {this._mp_old_ani[0] = dif_meter;
			this.refresh_meter(this._mp_meter_red,this._mp_old_ani[0],this._battler.mmp,1,2,0);};
		};
    };
};
Sprite_ActorHud.prototype.update_states = function() {
	if (!this._state_icon) {return};
	this._states_data[2] += 1;
	if (this.need_refresh_states()) {this.refresh_states();};
};
Sprite_ActorHud.prototype.update_exp = function() {
	if (this._exp_meter) {
		this._exp_meter.opacity += 15; 
		if (this.need_refresh_parameter(3)) {
			if (this._battler.isMaxLevel()) {
			    this.refresh_meter(this._exp_meter,1,1,0,1,1);
		    } else {
     			this.refresh_meter(this._exp_meter,this._battler.current_exp_r(),this._battler.nextLevelExp_r(),0,1,1);
			};
			this._exp_old = this._battler.currentExp();
		};
    };
	if (this._level_number) {
		var dif_number = this.update_dif(
								this._level_number_old,this._battler.level,30)
		if (this._level_number_old != dif_number){
			this._level_number_old = dif_number;
		    if (this._hp_old_ani) {
				this._hp_old_ani[0] = 0
			};
			if(this._mp_old_ani){
				this._mp_old_ani[0] = 0
			};
			if(this._tp_old_ani){
				this._tp_old_ani[0] = 0
			};
		    this.refresh_number(
				this._level_number,
				this._level_number_old,
				this._level_img_data,
				this._level_img_data[4],
				1);
		}
	}
};
//* CREATE
Sprite_ActorHud.prototype.create_base_sprites			= function() {
	this.create_bg();
	this.create_face();
};
Sprite_ActorHud.prototype.create_sprites = function() {
	this.create_bg();
	this.create_face();
	this.create_layer();
	this.create_exp_meter();
	this.create_hp_meter();
	this.create_mp_meter();
	this.create_upper_layer();
	this.create_hp_number();
	this.create_level_number();
    this.create_states();	
	this.create_name();
};
Sprite_ActorHud.prototype.create_bg						= function() {
	this.removeChild(this._bg);
	if (!this._battler) {return};
	this._bg = new Sprite(this._bg_img);
	this._bg.x = this._pos_x;
	this._bg.y = this._pos_y;
	this.addChild(this._bg);
};
Sprite_ActorHud.prototype.create_face						= function(){
	this.removeChild(this._face);
	if (!this._battler) {return};
	this._face = new Sprite(ImageManager.load_single_face(this._battler._actorId));
	this._face.anchor.x = 0.5;
	this._face.anchor.y = 0.5;
	this._face_data = [0,0,false,false,false,-1];
	this._battler._ahud_face_data = [0,0,0,0];
	this.addChild(this._face);
};
Sprite_ActorHud.prototype.create_layer						= function() {
	this.removeChild(this._bg2);
	if (!this._battler) {return};
	this._bg2 = new Sprite(this._layer_img);
	this._bg2.x = this._pos_x;
	this._bg2.y = this._pos_y;
	this.addChild(this._bg2);
};
Sprite_ActorHud.prototype.create_hp_meter = function() {
	this.removeChild(this._hp_meter_blue);
	this.removeChild(this._hp_meter_red);
	if (!this._battler) {return};
	this._hp_meter_red = new Sprite(this._formFill_img);
	this._hp_meter_red.x = this._pos_x + 15;
	this._hp_meter_red.y = this._pos_y + 134;
	this._hp_meter_red.rotation = 0;
	this._hp_meter_red.setFrame(0,0,0,0);
	this.addChild(this._hp_meter_red);		
	this._hp_meter_blue = new Sprite(this._formFill_img);
	this._hp_meter_blue.x = this._hp_meter_red.x;
	this._hp_meter_blue.y = this._hp_meter_red.y;
	this._hp_meter_blue.rotation = 0;
	this._hp_meter_blue.setFrame(0,0,0,0);
	this.addChild(this._hp_meter_blue);
	this._hp_old_ani[0] = this._battler.hp - 1;
};
Sprite_ActorHud.prototype.create_mp_meter = function(){
	this.removeChild(this._mp_meter_blue);
	this.removeChild(this._mp_meter_red);
	if (!this._battler) {return};
	this._mp_meter_red = new Sprite(this._dietFill_img);
	this._mp_meter_red.x = this._xPos + 12;
	this._mp_meter_red.y = this._yPos + 153;
	this._mp_meter_red.rotation = 0;
	this._mp_meter_red.setFrame(0,0,0,0);
	this.addChild(this._mp_meter_red);		
	this._mp_meter_blue = new Sprite(this._dietFill_img);
	this._mp_meter_blue.x = this._mp_meter_red.x;
	this._mp_meter_blue.y = this._mp_meter_red.y;
	this._mp_meter_blue.rotation = 0;
	this._mp_meter_blue.setFrame(0,0,0,0);
	this.addChild(this._mp_meter_blue);
	this._mp_old_ani[0] = this._battler.mp - 1;
	this._mp_flow[0] = true;
	this._mp_flow[2] = this._dietFill_img.width / 3;
	this._mp_flow[3] = this._mp_flow[2] * 2;
	this._mp_flow[1] = Math.floor(Math.random() * this._mp_flow[2]);
};
Sprite_ActorHud.prototype.create_exp_meter = function(){
	this.removeChild(this._exp_meter);
	if (!this._battler) {return};
	this._exp_meter = new Sprite(this._expFill_img);
	this._exp_meter.x = this._pos_x + 15;
	this._exp_meter.y = this._pos_y + 133;
	this._exp_meter.rotation = 270 * Math.PI / 180;
	this.addChild(this._exp_meter);
	this._exp_flow[0] = true;
    this._exp_flow[2] = this._expFill_img.width / 3;
	this._exp_flow[3] = this._exp_flow[2] * 2;
	this._exp_flow[1] = Math.floor(Math.random() * this._exp_flow[2]);
	this._exp_meter.setFrame(0,0,0,0);
};
Sprite_ActorHud.prototype.create_upper_layer						= function() {
	this.removeChild(this._bg3);
	if (!this._battler) {return};
	this._bg3 = new Sprite(this._upperLayer_img);
	this._bg3.x = this._pos_x + 9;
	this._bg3.y = this._pos_y + 125;
	this.addChild(this._bg3);
};
Sprite_ActorHud.prototype.create_hp_number = function(){
	if (this._hp_number){
		for (var i = 0; i < this._hp_number.length; i++){
			this.removeChild(this._hp_number[i]);
		}
	};
	if (!this._battler) {return};
	this._hp_number = [];
	this._hp_number.align = 1;
	this._hp_img_data = [
		this._formNum_img.width,
		this._formNum_img.height,
	    this._formNum_img.width / 10,
		this._formNum_img.height / 2,
		this._pos_x + 20,
		this._pos_y + 132,
	];
	for (var i = 0; i < 5; i++) {
	   this._hp_number[i] = new Sprite(this._hp_number_img);
	   this._hp_number[i].visible = false;
	   this._hp_number[i].x = this._hp_img_data[4];
	   this._hp_number[i].y = this._hp_img_data[5];
	   this.addChild(this._hp_number[i]);
	};	
	this._hp_number_old = this._battler.hp;	
	this.refresh_number(
			this._hp_number,
			this._hp_number_old,
			this._hp_img_data,
			this._hp_img_data[4],
			0);	
};
Sprite_ActorHud.prototype.create_level_number = function(){
	if (this._level_number){
		for (var i = 0; i < this._level_number.length; i++){
			this.removeChild(this._level_number[i]);
		}
	};
	if (!this._battler) {return};
	this._level_number = [];
	this._level_number.align = 1;
	this._level_img_data = [
		this._lvNum_img.width,this._lvNum_img.height,
	    this._lvNum_img.width / 10, this._lvNum_img.height / 2,
		this._pos_x + 20,
		this._pos_y + 10,
	];
	for (var i = 0; i < 3; i++){
	   this._level_number[i] = new Sprite(this._lvNum_img);
	   this._level_number[i].visible = false;
	   this._level_number[i].x = this._level_img_data[4];
	   this._level_number[i].y = this._level_img_data[5];
	   this.addChild(this._level_number[i]);
	};	
	this._level_number_old = this._battler.level;
	this.refresh_number(this._level_number,this._level_number_old,this._level_img_data,this._level_img_data[4],1);	
};
Sprite_ActorHud.prototype.create_states = function() {
	this.removeChild(this._state_icon);
	if (!this._battler) {return};
	this._states_data = [0,0,0];
	this._state_icon = new Sprite(this._state_img);
	this._state_icon.x = this._pos_x + 124;
	this._state_icon.y = this._pos_y + 20;
	this._state_icon.visible = false;
	this.addChild(this._state_icon);
	this.refresh_states();	
};
Sprite_ActorHud.prototype.create_name = function() {
	this.removeChild(this._name);
	if (!this._battler) {return};	
	this._name = new Sprite(new Bitmap(300,48));
	this._name.x = this._pos_x + 46;
	this._name.y = this._pos_y - 10;
	this._name.bitmap.fontSize = 20;
	this._name.bitmap.outlineWidth = 1;
	this.addChild(this._name);	
	this.refresh_name();
};
//REFRESH
Sprite_ActorHud.prototype.refresh_bhud					= function() {
	 this._data_initial_ref[1] = false;
	 this._battler = $gameParty.members()[0];
	 this._hud_size = [0,0];
	 this.base_parameter_clear();
	 this.create_base_sprites();
};
Sprite_ActorHud.prototype.refresh_position				= function() {
	 this.set_hud_position();	 
	 this.visible = true;     
	 this.create_sprites();
 	 this._bg.x = this._pos_x;
	 this._bg.y = this._pos_y;
	 if (this._face) {
     	 this._face.x = this._pos_x + 100;
 	     this._face.y = this._pos_y + 80;
		 this._battler._face_pos = [this._face.x,this._face.y]; 
     };
};
Sprite_ActorHud.prototype.refresh_face = function() {
	this._face_data[5] = this._battler._ahud_face_data[2];
	var cw = this._face.bitmap.width / 5;
	var ch = this._face.bitmap.height;
	this._face.setFrame(cw * this._face_data[5], 0, cw, ch);
};
Sprite_ActorHud.prototype.refresh_states = function() {
	this._states_data[0] = 0;
	this._states_data[2] = 0;
	this._state_icon.visible = false;
	if (this._battler.allIcons().length == 0) {this._states_data[1] = 0;return};
       if (this._battler.allIcons()[this._states_data[1]]) {	
		this._states_data[0] = this._battler.allIcons()[this._states_data[1]];
		this._state_icon.visible = true;
		var sx = this._states_data[0] % 16 * 32;
		var sy = Math.floor(this._states_data[0] / 16) * 32;
		this._state_icon.setFrame(sx, sy, 32, 32);
		this._battler.need_refresh_bhud_states = false;	
	
	   };
	this._states_data[1] += 1;
	if (this._states_data[1] >= this._battler.allIcons().length) {
		this._states_data[1] = 0
	};
};
Sprite_ActorHud.prototype.refresh_name = function() {
	this._name.bitmap.clear();
	this._name.bitmap.drawText(
		this._battler._name,
		0,
		0,
		this._name.bitmap.width,
		this._name.bitmap.height,
		0);	
};
//* SET
Sprite_ActorHud.prototype.set_hud_position = function() {
     this._hud_size[0] = this._xPos - ($gameMap.tileWidth() / 2);
     this._hud_size[1] = this._yPos - ($gameMap.tileHeight() / 2);
     this._hud_size[2] = this._xPos + this._bg.bitmap.width - $gameMap.tileWidth();
     this._hud_size[3] = this._yPos + this._bg.bitmap.height;	 
	 this._pos_x = this._xPos;
	 this._pos_y = this._yPos ;
};
Sprite_ActorHud.prototype.setColorIndex = function(i,mode,par,par_max,realvalue,isMaxValue,colorIndex,colorMax,maxvalue) {	
     if (par === 0) {return 0};
	 if (colorIndex >= colorMax || par > maxvalue) {return colorMax - 1}
     if (mode === 0) {return colorIndex};
	 if (mode === 1) {
		 if (realvalue === 0) {return colorIndex};
		 return colorIndex + 1;
	 };
     return 0;
};
//* TOOLS
/*Sprite_ActorHud.prototype.hasSetImage = function() {
	return	$gameCharacterCreations.hasInfo(1);
};
Sprite_ActorHud.prototype.get_face_bitmap = function(actorId) {
	if(false){//under construction
		$gameCharacterCreations.buildBitmapFace($gameParty.members()[0].actorId());
	} else {
		return ImageManager.load_face(actorId, 0);
	}
};*/

Sprite_ActorHud.prototype.need_refresh_states = function() {
	if (this._battler.need_refresh_bhud_states) {return true};
	if (this._states_data[2] > 60) {return true};
	return false;
};
Sprite_ActorHud.prototype.needHide = function(start) {
    if (!this._battler) {return true};	
	if (!$gameSystem._ahud_visible) {return true};
	if (!$gameSystem._ahud_autoFade) {return false};
	if ($gameMessage.isBusy()) {return true};
	return false
};
Sprite_ActorHud.prototype.needFade = function() {
    if (this._hud_size[0] === -1) {return false};
	if (!this._battler) {return false};
	if (!$gameSystem._ahud_smartFade) {return false};
	if ($gamePlayer.screen_realX() < this._hud_size[0]) {return false};
	if ($gamePlayer.screen_realX() > this._hud_size[2]) {return false};
	if ($gamePlayer.screen_realY() < this._hud_size[1]) {return false};
	if ($gamePlayer.screen_realY() > this._hud_size[3]) {return false};	
    return true;
};
Sprite_ActorHud.prototype.update_dif = function(value,real_value,speed) {
	if (value == real_value) {return value};
	var dnspeed = 1 + (Math.abs(value - real_value) / speed);
	if (value > real_value) {value -= dnspeed;
	    if (value < real_value) {value = real_value};}
    else if (value < real_value) {value  += dnspeed;
    	if (value  > real_value) {value  = real_value};		
    };
	return Math.floor(value);
};
Sprite_ActorHud.prototype.refresh_meter = function(sprite,value,value_max,type,div){
	var ch = sprite.bitmap.height / div;
    var meter_rate = sprite.bitmap.width * value / value_max;
	sprite.setFrame(0,type * ch, meter_rate, ch);
};
Sprite_ActorHud.prototype.refresh_meter_flow = function(sprite,value,value_max,type,flow) {
	var cw = sprite.bitmap.width / 3;
	var ch = sprite.bitmap.height / 2;
    var meter_rate = cw * value / value_max;
	sprite.setFrame(flow,type * ch, meter_rate, ch);
};
Sprite_ActorHud.prototype.refresh_number = function(sprites,value,img_data,x,center) {
    numbers = Math.abs(value).toString().split("");  
   	for (var i = 0; i < sprites.length ; i++) {sprites[i].visible = false;
	   if (i > numbers.length) {return};
	   var n = Number(numbers[i]);
	   sprites[i].setFrame(n * img_data[2], 0, img_data[2], img_data[1]);
	   sprites[i].visible = true;
	   var nx = -(img_data[2] * i) + (img_data[2] * numbers.length);
	   if (sprites.align === 1) {
	      var xi = (img_data[2] * numbers.length) / 2;		   
		   sprites[i].x = x + xi - nx;
       } else if (sprites.align === 2) {
	       var xi = img_data[2] * numbers.length;		   
		   sprites[i].x = x + xi - nx;
   	   } else {
		   sprites[i].x = x - nx;
	   }; 
    };
};
Sprite_ActorHud.prototype.setFrameIcon = function(icon,image,i,hp,cw,ch) {	
	var sX = cw + 2 + icon.spc[0];
	var sY = ch + 2 + icon.spc[1];
	var lX = sX * icon.rows;
	var lines = Math.floor(i / icon.rows);
	icon.scale.y = icon.scale.x;
	icon.setFrame(hp,0,cw,ch);
	icon.x = icon.org[0] + (sX * i) - (lX * lines);
	icon.y = icon.org[1] + (sY * lines);
};
//* ICONS ???
Sprite_ActorHud.prototype.refresh_icons = function(sprites,image,par,par_max,mode) {	
    if (sprites.iconMode) {
		this.refreshIconHalfMode(sprites,image,par,par_max,mode);
	} else {
		this.refreshIconNormalMode(sprites,image,par,par_max,mode);
	};
};
Sprite_ActorHud.prototype.refreshIconNormalMode = function(sprites,image,par,par_max,mode) {	
    for (var i = 0; i < sprites.length; i++) {
	   var icon = sprites[i];
       var cw = image.width / icon.colorMax;
	   var ch = image.height;	   
	   var iconMax = icon.rows;
	   var colorIndex = Math.floor(par / iconMax);
	   var colorMax = icon.colorMax;
	   var avaliableValue = Math.floor(colorIndex * iconMax)
	   var realvalue = par - avaliableValue;
	   var isMaxValue = par === avaliableValue ? true : false;
	   var colorIndex2 = Math.floor(par_max / iconMax);
	   var avaliableValue2 = Math.floor(colorIndex2 * iconMax)
	   var realvalue2 = par_max - avaliableValue2;
	   var maxvalue = iconMax * (colorMax - 1);
	   var hp = cw * this.setColorIndex(i,mode,par,par_max,realvalue,isMaxValue,colorIndex,colorMax,maxvalue);
       icon.visible = this.isIconVisible(i,mode,par,par_max,realvalue,isMaxValue,colorIndex,colorIndex2,realvalue2,icon,maxvalue);
	   icon.enable = this.isIconEnabled(i,mode,par,par_max,realvalue,iconMax,colorIndex,colorMax,maxvalue);
	   icon.scale.x = 1.00;
	   icon.zoomData = [0,0,0,icon.scale.x]; 
	   this.setFrameIcon(icon,image,i,hp,cw,ch);
	};
};
Sprite_ActorHud.prototype.refreshIconHalfMode = function(sprites,image,par,par_max,mode) {	
    var halfpar = Math.floor(par / 2);
	var parOdd1 = par%2;
	var parOdd2 = parOdd1 == 0 ? true : false;
	var prepar = par;
	par = sprites.iconMode ? (halfpar + parOdd1) : par;
	var prepar2 = par;
	var halfmaxpar = Math.floor(par_max / 2);
	var parmaxOdd1 = par_max%2;
	var parmaxOdd2 = parmaxOdd1 == 0 ? true : false;
	var preparmax = par_max;
	par_max = sprites.iconMode ? (halfmaxpar + parmaxOdd1) : par_max;
	var preparmax2 = par_max;	
	if (mode === 1 && par > sprites.length) {

			var mx_g = Math.floor(par / sprites.length);
			var mx_l = sprites.length * mx_g;
			var par = par - mx_l;
			if (par === 0) {par = sprites.length};
	};
	for (var i = 0; i < sprites.length; i++) {
		var icon = sprites[i];
		icon.visible = false;
		icon.opacity = 255;
		icon.enable = (prepar2 > 0 && i === (prepar2 - 1) && mode === 1) ? true : false;
		var cw = image.width / icon.colorMax;
		var ch = image.height;
		if (par > 0 && icon.colorMax > 2) {
			var lines  = Math.floor((prepar - 1) / sprites.length) + 1;
			if (lines >= icon.colorMax - 1) {
				var hp = (icon.colorMax - 1) * cw;
				if (mode === 1) {icon.opacity = 0};
			} else {
              if (mode === 0 && lines > 0) {lines--};
			  var hp = lines * cw;	
			};
		} else {
			if (mode === 1 && prepar2 > sprites.length) {
				par = prepar;
				icon.enable = false;
			};		
		    var hp = mode === 1 ? cw : 0;
		};
		var sX = cw + 2 + icon.spc[0];
		var sY = ch + 2 + icon.spc[1];
		var lX = sX * icon.rows;
		var lines = Math.floor(i / icon.rows);
		if (sprites.iconMode) {
			if (mode === 0) {
				icon.scale.x = 1.00;
				if (par_max <= sprites.length && i == par_max - 1) {
					icon.scale.x = !parmaxOdd2 ? 0.5 : 1.00;
				};
			} else  {
				if (prepar2 - 1 === i) {
					icon.scale.x = parOdd2 ? 1.00 : 0.50;
				} else {
					icon.scale.x = 1.00;
				};		
			};
		} else {
			icon.scale.x = 1.00;
		};
		icon.scale.y = icon.scale.x;
		icon.zoomData = [0,0,0,icon.scale.x]; 
		icon.visible = true
		if (par_max < sprites.length && i > (par_max - 1)) {icon.visible = false};
	 	if (mode === 1) {
			icon.visible = i > prepar2 - 1 ? false : true
		};
		icon.setFrame(hp,0,cw,ch);
		icon.x = icon.org[0] + (sX * i) - (lX * lines);
		icon.y = icon.org[1] + (sY * lines);
	};
};
Sprite_ActorHud.prototype.updateIconZoomAnime = function(sprites) {
	for (var i = 0; i < sprites.length; i++) {
		 var icon = sprites[i];
		 if (icon.enable) {
			 icon.zoomData[1]++;
			 if (icon.zoomData[1] > 2) {
			     icon.zoomData[1] = 0;
				 icon.zoomData[2]++;
			     if (icon.zoomData[2] < 15) {
			         icon.zoomData[0] += 0.02;
				 } else if (icon.zoomData[2] < 30) {
					 icon.zoomData[0] -= 0.02;
				 } else {
					 icon.zoomData[0] = 0;
				     icon.zoomData[2] = 0;
				 };
			     icon.scale.x = icon.zoomData[3] + icon.zoomData[0];
			     icon.scale.y = icon.scale.x;
			 };
		 };
	};
};
//* GET & ASK
Sprite_ActorHud.prototype.need_refresh_parameter = function(parameter) {
  switch (parameter) {
  	case 0:
         if (this._hp_old[0] != this._battler.hp) {return true};
		 if (this._hp_old[1] != this._battler.mhp) {return true};
         break;
  	case 1:
         if (this._mp_old[0] != this._battler.mp) {return true};
		 if (this._mp_old[1] != this._battler.mmp) {return true};
         break;			
  	case 2:
         if (this._tp_old[0] != this._battler.tp) {return true};		 
		 if (this._tp_old[1] != this._battler.maxTp()) {return true};
         break;	
  	case 3:
         if (this._exp_old != this._battler.currentExp()) {return true};
         break;			 				
  };
  return false;
};
Sprite_ActorHud.prototype.isIconVisible = function(i,mode,par,par_max,realvalue,isMaxValue,colorIndex,colorIndex2,realvalue2,icon,maxvalue) {	
    icon.opacity = 255;
	icon.blendMode = 0;
	if (mode === 0) {
	    if (i >= par_max) {return false};
		return true; 
	};
	if (par === 0) {return false};
	if (par > maxvalue) {
		icon.opacity = 155;
		icon.blendMode = 1;
		return true;
	};
    if (isMaxValue) {return true};
	if (colorIndex > 0 && colorIndex2 >= colorIndex) {
	    icon.opacity = i >= realvalue ? 0 : 255;
		icon.blendMode = i >= realvalue ? 1 : 0;
		if (colorIndex2 > colorIndex) {return true};
		if (i >= realvalue2) {return false};
    } else {
	  if (i >= realvalue) {return false};
    };
    return true;
};
Sprite_ActorHud.prototype.isIconEnabled = function(i,mode,par,par_max,realvalue,iconMax,colorIndex,colorMax,maxvalue) {	
     if (mode === 0) {return false};
	 if (par === 0) {return false};
	 if (colorIndex >= colorMax || par > maxvalue) {return true}
	 if (realvalue != 0 && i === (realvalue - 1)) {return true};
	 if (realvalue === 0 && i === (iconMax - 1)) {return true};
     return false
};

/*
Sprite_ActorHud.prototype.update_face_animation = function() {
	if (this._battler._ahud_face_data[3] > 0) {this._battler._ahud_face_data[3] -= 1;
	    if (this._battler._ahud_face_data[3] === 0) {
			if (this._battler.isDead()) {this._battler._ahud_face_data[2] = 4}
			else if (this._battler.hp <= 30 * this._battler.mhp / 100) {this._battler._ahud_face_data[2] = 3}
			else {this._battler._ahud_face_data[2] = 0};
			};
	};
};
Sprite_ActorHud.prototype.update_face_zoom = function() {
	if (this._battler._ahud_face_data[1] > 0) {this._battler._ahud_face_data[1] -= 1;
	    if (this._battler._ahud_face_data[1] == 0) {this._face.scale.x = 1.00}
		else if (this._battler._ahud_face_data[1] < 20) {this._face.scale.x -= 0.01;
		         if (this._face.scale.x < 1.00) {this._face.scale.x = 1.00;};	
	    }
		else if (this._battler._ahud_face_data[1] < 40){this._face.scale.x += 0.01;
		         if (this._face.scale.x > 1.25) {this._face.scale.x = 1.25;};
	    };
	    this._face.scale.y = this._face.scale.x;
	};
};
Sprite_ActorHud.prototype.update_face_shake = function() {
	this._face.x = this._pos_x + Moghunter.ahud_face_pos_x;
	if (this._face_data[2] && this._battler._ahud_face_data[0] > 0) {this._battler._ahud_face_data[0] -= 1;
	    this._face.x = this._pos_x + Moghunter.ahud_face_pos_x + ((Math.random() * 12) - 6);
	};
};
*/
