

function Sprite_TimeClock() {
    this.initialize.apply(this, arguments);
};

Sprite_TimeClock.prototype = Object.create(Sprite.prototype);
Sprite_TimeClock.prototype.constructor = Sprite_TimeClock;

Sprite_TimeClock.prototype.initialize					= function(x, y){
    Sprite.prototype.initialize.call(this);
	this._x = x || 0;
	this._y =  y || 0;
	this._maxMin = 60 / (Math.PI * 2);
	this._maxHour = 24 / (Math.PI * 4);
	this.load_images();
    this.create_sprites();
	this.opacity = 0;
};
Sprite_TimeClock.prototype.load_images					= function(){
    Sprite.prototype.initialize.call(this);
	var _climat = "";
	var $gameWeather = $gameWeather || false;
	if($gameWeather){
		_climat = $gameWeather.get_climat();
	}	
	this._phase_img 	= ImageManager.load_time_hud("dayPhase"+_climat);
    this._bg_img		= ImageManager.load_time_hud("bg");
	this._pt_min_img	= ImageManager.load_time_hud("pt_min");
	this._pt_hour_img	= ImageManager.load_time_hud("pt_hr");
	this._ul_img		= ImageManager.load_time_hud("ul");
	this._season_img	= ImageManager.load_time_hud("saisons" + _climat);
	this._scroll_img	= ImageManager.load_time_hud("scroll"); 
};
//CREATE
Sprite_TimeClock.prototype.create_sprites				= function(){
	//this.create_agenda();
	this.create_phase();
	this.create_bg();
	this.create_point();
	this.create_upLayer();
	this.create_scroll();
	this.create_season();
	this.create_dayDecade();
	this.create_dayNumber();
	this.create_month();
	this.create_year();
	//this.create_climat();
};
Sprite_TimeClock.prototype.create_phase				= function(){
     this._phase = new Sprite(this._phase_img);
	 this.addChild(this._phase);
	 this._phase.x = this._x + 34;
	 this._phase.y = this._y + 95;
	 this._phase.visible = false;
	 this._phase_old = -1;//taille du sprite, ???, phase_old
};
Sprite_TimeClock.prototype.create_bg					= function(){
     this._bg = new Sprite(this._bg_img);
	 this._bg.x = this._x;
	 this._bg.y = this._y;
	 this.addChild(this._bg);
};
Sprite_TimeClock.prototype.create_point				= function(){
	//min
	this._point_min = new Sprite(this._pt_min_img);
	this._point_min.x = this._x + 72;
	this._point_min.y = this._y + 131;
	this._point_min.anchor.x = 0.5;
	this._point_min.scale.y = -1;
	this.addChild(this._point_min);
	//HOUR
	this._point_hr = new Sprite(this._pt_hour_img);
	this._point_hr.x = this._point_min.x;
	this._point_hr.y = this._point_min.y;
	this._point_hr.anchor.x = 0.5;
	this._point_hr.scale.y = -1;
	this.addChild(this._point_hr);	 
};
Sprite_TimeClock.prototype.create_upLayer				= function(){
     this._ul = new Sprite(this._ul_img);
	 this._ul.x = this._x + 64;
	 this._ul.y = this._y + 122;
	 this.addChild(this._ul);
};
Sprite_TimeClock.prototype.create_season				= function(){
     this._season = new Sprite(this._season_img);
	 this.addChild(this._season);
	 this._season.x = this._x + 10;
	 this._season.y = this._y + 30;
	 this._season.visible = false;
	 this._season_old = -1;
};
Sprite_TimeClock.prototype.create_dayDecade			= function(){
	 this._day_old = $gameTime.get_dayDecade();
     this._day = new Sprite(new Bitmap(140,16));
	 this._day.x = this._x;
	 this._day.y = this.get_date_yPos(this.getIndexDateFormat("day"));
	 this._day.bitmap.fontSize = 12;
	 this.addChild(this._day);
	 this.refresh_day();
};
Sprite_TimeClock.prototype.create_dayNumber			= function(){
	 this._dayNumber_old = $gameTime.get_day();
     this._dayNumber = new Sprite(new Bitmap(140,16));
	 this._dayNumber.x = this._x;
	 this._dayNumber.y = this.get_date_yPos(this.getIndexDateFormat("dayNumber"));
	 this._dayNumber.bitmap.fontSize = 12;
	 this.addChild(this._dayNumber);
	 this.refresh_dayNumber();
};
Sprite_TimeClock.prototype.create_month				= function() {
	 this._month_old = $gameTime.get_month();
     this._month = new Sprite(new Bitmap(140,16));
	 this._month.x = this._x;
	 this._month.y = this.get_date_yPos(this.getIndexDateFormat("month"));
	 this._month.bitmap.fontSize = 12;
	 this.addChild(this._month);
	 this.refresh_month()
};
Sprite_TimeClock.prototype.create_year					= function() {
	 this._year_old = $gameTime.get_year();
     this._year = new Sprite(new Bitmap(140,16));
	 this._year.x = this._x;
	 this._year.y = this.get_date_yPos(this.getIndexDateFormat("year"));
	 this._year.bitmap.fontSize = 12;
	 this.addChild(this._year);
	 this.refresh_year()
};
Sprite_TimeClock.prototype.create_scroll				= function(){
     this._scroll = new Sprite(this._scroll_img);
	 this.addChild(this._scroll);
	 this._scroll.x = this._x + 10;
	 this._scroll.y = this._y + 10;
	 this._scroll.visible = false;
	 this._scroll_old = -1;
};
// TOOLS
/*Sprite_TimeClock.prototype.get_pos_x					= function(){
	return 1121;
};
Sprite_TimeClock.prototype.get_pos_y					= function(){
	return 15;
};*/
Sprite_TimeClock.prototype.get_date_yPos				= function(index){
	return index * 16 + 8 + this._y;
};
Sprite_TimeClock.prototype.getIndexDateFormat			=function(val){
	switch(val){
		case "day":
			return 0;
			break;
		case "dayNumber":
			return 1;
			break;
		case "month":
			return 2;
			break;
		case "year":
			return 3;
			break;
		default:
			return 0;
			break;
	}
};
//UPDATE
Sprite_TimeClock.prototype.update						= function(){
    Sprite.prototype.update.call(this);
	if (this.is_hud_open()){
		if($gameTime._hud_needRefresh){
			if(this._point_min){
				this.update_point();
			}
			if(this._day){
				this.update_day();
			}
			if(this._dayNumber){
				this.update_dayNumber();
			}
			if(this._month){
				this.update_month();
			}
			if(this._year){
				this.update_year();
			}
			if(this._phase){
				this.update_phase();
			}
			if(this._season){
				this.update_season()
			}
			if(this._scroll){
				this.update_scroll();
			}
		}
	}
};
Sprite_TimeClock.prototype.is_hud_open						= function(){
	if( $gameSwitches.value(/*Number($gameSystem.sc_switchIds().timeHud)*/35) ){
		if(!this.visible){
			this.visible = true;
		}else if(this.opacity <= 255){
			this.opacity += 5;
		}
		return true;
	}else if(this.opacity > 0){
		this.opacity -= 5;
		return true;
	}else if(this.visible){
		this.visible = false;
		return false;
	}else{
		return false;
	}
}
Sprite_TimeClock.prototype.update_point				= function(){
	this._point_min.rotation = this.min();
	this._point_hr.rotation = this.hour();
};
Sprite_TimeClock.prototype.min							= function(){
    return $gameTime.get_min() / this._maxMin;
};
Sprite_TimeClock.prototype.hour							= function(){
    return $gameTime.get_hour() / this._maxHour;
};
Sprite_TimeClock.prototype.update_day					= function(){
    if (this._day_old != $gameTime.get_dayDecade()){
		this.refresh_day();
	};
};
Sprite_TimeClock.prototype.update_dayNumber			= function(){
    if(this._dayNumber_old != $gameTime.get_day()){
		this.refresh_dayNumber();
	}
};
Sprite_TimeClock.prototype.update_month				= function(){
    if(this._month_old != $gameTime.get_month()){
		this.refresh_month();
	}
};
Sprite_TimeClock.prototype.update_year					= function(){
    if(this._year_old != $gameTime.get_year()){
		this.refresh_year();
	}
};
Sprite_TimeClock.prototype.update_phase				= function(){
	if(this._phase_old != $gameTime.get_dayPhase()){
		this.refresh_phase();
	}
	this._phase.opacity += 10;
};
Sprite_TimeClock.prototype.update_season				= function(){
	if (this._season_old != $gameTime.get_season()){
		this.refresh_season()
	};
	this._season.opacity += 10;
};
Sprite_TimeClock.prototype.update_scroll				= function(){
	if(this._scroll_old != $gameTime.get_scrolling_speed_id()){
		this.refresh_scroll();
	}
};
//REFRESH
Sprite_TimeClock.prototype.refresh_day					= function(){
	this._day_old = $gameTime.get_dayDecade();
	this._day.bitmap.clear();
	this._day.bitmap.drawText(
		$gameTime._days_decade_names[this._day_old] + " ",
		0,
		0,
		140,
		16,
		"right");
};
Sprite_TimeClock.prototype.refresh_dayNumber			= function(){
	this._dayNumber_old = $gameTime.get_day();
	this._dayNumber.bitmap.clear();
	this._dayNumber.bitmap.drawText(
		this._dayNumber_old + " ",
		0,
		0,
		140,
		16,
		"right");
};
Sprite_TimeClock.prototype.refresh_month				= function(){
	this._month_old = $gameTime.get_month();
	this._month.bitmap.clear();
	this._month.bitmap.drawText(
		$gameTime._months_names[this._month_old] + " ",
		0,
		0,
		140,
		16,
		"right");
};
Sprite_TimeClock.prototype.refresh_year				= function(){
	this._year_old = $gameTime.get_year();
	this._year.bitmap.clear();
	this._year.bitmap.drawText(
		this._year_old + " ",
		0,
		0,
		140,
		16,
		"right");
};
Sprite_TimeClock.prototype.refresh_phase				= function(){
    this._phase_old = $gameTime.get_dayPhase();
	this._phase.visible = true;
	this._phase.setFrame(
		74 * this._phase_old,
		0,
		74,
		74);
	this._phase.opacity = 0;
};
Sprite_TimeClock.prototype.refresh_season				= function(){
    this._season_old = $gameTime.get_season()
	this._season.visible = true;
	this._season.setFrame(
		36 * (this._season_old - 1),
		0,
		36,
		36);
	this._season.opacity = 0;
};
Sprite_TimeClock.prototype.refresh_scroll				= function(){
    this._scroll_old = $gameTime.get_scrolling_speed_id();
	this._scroll.visible = true;
	this._scroll.setFrame(
		28 * this._scroll_old,
		0,
		28,
		16);
};




















