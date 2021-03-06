

//---------------------------------------------------------------------
// Time_System
//
// The game object class for the time system data.
function Time_System() {
    this.initialize.apply(this, arguments);
};
//INIT
Time_System.prototype.initialize						= function(){
	this._stop_on_dial			= true;
    this._stop_on_event			= false;
	this._hud						= true;
	this._active					= true;
	this._last_playtime 			= $gameSystem.playtime();
	this._hud_needRefresh		= false;
	this._time_scrolling 		= 0;		//time_data 0
	this.init_max();
	
	this.init_words();
	this.init_tones();
	
	//this.init_weather();
    this.init_gameVariables();
	//this.initialize_timeEvents_List();
	this.update_season();
	this.update_decade();
    this.clear();
};
Time_System.prototype.init_max						= function(){
	this._max_value = [
		[59, 0], 					//sec
		[59, 0],					//min
		[23, 0],					//hour
		[30, 1],					//day
		[12, 1],					//month
	];
};
Time_System.prototype.init_words						= function(){
	this._days_decade_names = [
		null,
		"Lundar",
		"Timardar",
		"Wercredar",
		"Tjeurdar",
		"Vedirdar",
		"Saturmdar",
		"Soledar",
		"Savordar",
		"Aturdar",
		"Angeldar"
	];
	this._months_names =[
		null,
		"Janur",
		"Fermur",
		"Martial",
		"Aphrodys",
		"Mansys",
		"Junur",
		"Julfuria",
		"Augrut",
		"Septim",
		"Octos",
		"Nova",
		"Deshyone"
	];
	this._basic_saisons_names = [
		null,
		"Floral",
		"Solaire",
		"Moyenne",
		"Froide"
	];
	this.tropical_saisons_names = [
		null,
		"Douce",
		"Chaude",
		"Humide",
		"Mousson"
	];
	this._speed_word = [
		"back",
		"stop",
		"slow",
		"normal",
		"fast",
		"faster"
	];
};
Time_System.prototype.init_weather					= function(){
	this.weather = {
		active:0,			// for inner=0 no 1=yes 2=far
		weather_phase:[0,0]	// weather = [type, intensity] actual & next 
	};
};
Time_System.prototype.init_gameVariables				= function(){
	var _obj = $gameSystem.sc_varIds();
    $gameVariables._data[_obj.sec] 		= 0;
	$gameVariables._data[_obj.min] 		= 50;
	$gameVariables._data[_obj.hour] 		= 9;
	$gameVariables._data[_obj.day] 		= 21;
	$gameVariables._data[_obj.month]		= 6;
	$gameVariables._data[_obj.year] 		= 268;
	$gameVariables._data[_obj.dayDecade]	= 1;
	$gameVariables._data[_obj.season] 	= 1;

};
Time_System.prototype.clear							= function(){
	this.update_gameSwitches();
    this.update_tint();
	this._hud_needRefresh = true;
};
//UPDATE
Time_System.prototype.update							= function(){
	if(/*this.active*/true){
		this._time_scrolling = $gameVariables.value($gameSystem.sc_varIds().timeScroll);
		$gameVariables._data[$gameSystem.sc_varIds().sec] += this._time_scrolling;
		if(this.update_time('min')){
			this.update_tint();
			if(this.update_time('hour')){
				//this.update_weather();
				//this.update_timeEvents();
				this.update_health();
				this.update_gameSwitches();
				if(this.update_time('day')){
					this.update_decade();
					if(this.update_time('month')){
						this.update_season();
						if(this.update_years('year')){
							//this.year_event();
						}
					}
				}
			}
			this.clear();
		}
	}
};
Time_System.prototype.update_health	= function(){
	for(i = 0; i < $gameParty.members().length; i++){
		var _actor = $gameActors._data[$gameParty.members()[i].actorId()];
		var _perteHp =
			(Math.floor(Math.random() * _actor.param(0) / 50)
			- Math.floor(_actor._mp / 100))
			* -1;
		//console.log("PV PERDUS :\n"+_perteHp);
		_actor.gainHp(_perteHp);
		
		_actor.gainMp(
			Math.floor(Math.random() + 0.7)
			* -1
		);
	}
}
Time_System.prototype.update_gameSwitches			= function(){
	var _src = $gameSystem.sc_switchIds();
	this.setSwitches(_src.dayPhases, this.get_dayPhase(), );
	this.setSwitches(_src.daysDecade, this.get_dayDecade());
	this.setSwitches(_src.months, this.get_month());
	this.setSwitches(_src.seasons, this.get_season());
};
Time_System.prototype.update_time					= function(value){
	var _vars = [];

	switch(value){
		case 'min':
			_vars = [	
						$gameVariables._data[$gameSystem.sc_varIds().sec],
						this._max_value[0][0],
						this._max_value[0][1],
						$gameVariables._data[$gameSystem.sc_varIds().min]
					];
		break;
		case 'hour':
			_vars = [
						$gameVariables._data[$gameSystem.sc_varIds().min],
						this._max_value[1][0],
						this._max_value[1][1],
						$gameVariables._data[$gameSystem.sc_varIds().hour]
					];
		break;
		case 'day':
			_vars = [
						$gameVariables._data[$gameSystem.sc_varIds().hour],
						this._max_value[2][0],
						this._max_value[2][1],
						$gameVariables._data[$gameSystem.sc_varIds().day]
					];
		break;
		case 'month':
			_vars = [
						$gameVariables._data[$gameSystem.sc_varIds().day],
						this._max_value[3][0],
						this._max_value[3][1],
						$gameVariables._data[$gameSystem.sc_varIds().month]
					];
		break;
		case 'years':
			_vars = [
						$gameVariables._data[$gameSystem.sc_varIds().month],
						this._max_value[4][0],
						this._max_value[4][1],
						$gameVariables._data[$gameSystem.sc_varIds().year]
					];
		break;
		default:
		break;
	}
	
	if(_vars[0] > _vars[1]){
		switch(value){
			case 'min':
				$gameVariables.setValue(
					$gameSystem.sc_varIds().sec,
					0);
				$gameVariables.setValue(
					$gameSystem.sc_varIds().min,
					$gameVariables.value($gameSystem.sc_varIds().min) + 1);
			break;
			case 'hour':
				$gameVariables.setValue(
					$gameSystem.sc_varIds().min,
					0);
				$gameVariables.setValue(
					$gameSystem.sc_varIds().hour,
					$gameVariables.value($gameSystem.sc_varIds().hour) + 1);
			break;
			case 'day':
				$gameVariables.setValue(
					$gameSystem.sc_varIds().hour,
					0);
				$gameVariables.setValue(
					$gameSystem.sc_varIds().day,
					$gameVariables.value($gameSystem.sc_varIds().day) + 1);
			break;
			case 'month':
				$gameVariables.setValue(
					$gameSystem.sc_varIds().day,
					1);
				$gameVariables.setValue(
					$gameSystem.sc_varIds().month,
					$gameVariables.value($gameSystem.sc_varIds().month) + 1);
			break;
			case 'years':
				$gameVariables.setValue(
					$gameSystem.sc_varIds().month,
					1);
				$gameVariables.setValue(
					$gameSystem.sc_varIds().year,
					$gameVariables.value($gameSystem.sc_varIds().year) + 1);
			break;
			default:
			break;
		}
		return true
	}
	return false;
};
Time_System.prototype.updateMinute					= function(){

}
Time_System.prototype.update_weather				= function(){
	
};
Time_System.prototype.update_season					= function(){
	$gameVariables._data[$gameSystem.sc_varIds().saison] = Math.ceil(this.get_month() / 3);
};
Time_System.prototype.update_decade					= function(){
	$gameVariables._data[$gameSystem.sc_varIds().decade] = Math.ceil(this.get_day() / 10);
	$gameVariables._data[$gameSystem.sc_varIds().dayDecade] = $gameVariables._data[$gameSystem.sc_varIds().day] - $gameVariables._data[$gameSystem.sc_varIds().decade] * 10 + 10;
};
Time_System.prototype.setSwitches					= function(list, comp){
	var _src = $gameSystem.sc_varIds();
	for(i = 0; i < list.length; i++){
		if(comp == i + 1){
			$gameSwitches._data[Number(list[i])] = true;
		}else{
			$gameSwitches._data[Number(list[i])] = false;
		}
	}
}
//SCROLLING OPTIONS
Time_System.prototype.set_time_scroll				= function(value){
	$gameVariables.setValue(Number($gameSystem.sc_varIds().timeScroll), value/30);
	if(value != 0){
		this.active = true;
		$gameSwitches.setValue($gameSystem.sc_switchIds().timeHud, true);
	}
};
Time_System.prototype.set_fast_time_scroll			= function(){
	this.set_time_scroll(400);
};
Time_System.prototype.set_speed_time_scroll			= function(){
	this.set_time_scroll(150);
};
Time_System.prototype.set_normal_time_scroll		= function(){
	this.set_time_scroll(45);
};
Time_System.prototype.set_slow_time_scroll			= function(){
	this.set_time_scroll(15);
};
Time_System.prototype.stop_time_scroll			= function(){
	this.set_time_scroll(0);
};
//GET
Time_System.prototype.get_scrolling_speed_id		= function(){
	var _hr = $gameVariables._data[$gameSystem.sc_varIds().timeScroll];
	if(_hr < 0){
		return 0;
	}else if(_hr == 0){
		return 1;
	}else if(_hr <= 1){//normal
		return 2;	
	}else if(_hr <= 3){//speed
		return 3;
	}else if(_hr <= 100){//fast
		return 4;
	}else{//faster
		return 5;
	}
};
Time_System.prototype.get_scrolling_speed_info		=function(){
	return this._speed_word(this.get_scrolling_speed_id());
};
Time_System.prototype.get_sec						= function(){
	return $gameVariables._data[$gameSystem.sc_varIds().sec];
};
Time_System.prototype.get_min						= function(){
	return $gameVariables._data[$gameSystem.sc_varIds().min];
};
Time_System.prototype.get_hour						= function(){
	return $gameVariables._data[$gameSystem.sc_varIds().hour];
};
Time_System.prototype.get_day						= function(){
	return $gameVariables._data[$gameSystem.sc_varIds().day];
};
Time_System.prototype.get_month						= function(){
	return $gameVariables._data[$gameSystem.sc_varIds().month];
};
Time_System.prototype.get_year						= function(){
	return $gameVariables._data[$gameSystem.sc_varIds().year];
};
Time_System.prototype.get_decade						= function(){
	return $gameVariables._data[$gameSystem.sc_varIds().decade];
}
Time_System.prototype.get_dayDecade					= function(){
	return $gameVariables._data[$gameSystem.sc_varIds().dayDecade];
};
Time_System.prototype.get_sec						= function(){
	return $gameVariables._data[$gameSystem.sc_varIds().saison];
};
Time_System.prototype.get_dayPhase					= function(){
	if(this.get_hour() < 5 || this.get_hour() > 22){
		return 6;
	}else if(this.get_hour() < 7){
		return 0;
	}else if(this.get_hour() < 11){
		return 1;
	}else if(this.get_hour() < 13){
		return 2;
	}else if(this.get_hour() < 17){
		return 3;
	}else if(this.get_hour() < 20){
		return 4;
	}else{
		return 5;
	}
};
Time_System.prototype.get_season						= function(){
	return $gameVariables._data[$gameSystem.sc_varIds().saison];
};
//TONE
Time_System.prototype.init_tones						= function(){
	this.tints = {
		active:false, 			//time_data 4 pour désactiver dans les inner
		actual:[0,0,0,0],			//lastdayphase dayphase timedata 1,2
		tones:[
			[-80,-80,-30,-34],		//Aube			5h-7h
			[-10,-10,-10,0],			//Matin		7h-11h
			[0,0,0,0],				//Zenith		11h-13h
			[40,0,0,0],			//Après-midi	13h-17h
			[-40,-68,0,-40],		//Soir			17h-20h
			[-100,-100,-100,-68],		//Crépuscule	20h-22h
			[-150,-150,-150,-90],		//Nuit			22h-4h
		]
	}
};
Time_System.prototype.update_tint					= function(){
	var _newTone = this.get_tone();
	if(_newTone != this.tints.actual && this.tints.active){
		$gameScreen.startTint(
			this.get_tone(),
			600 - (this.get_scrolling_speed_id() - 1) * 120
		);
		this.tints.actual = this.get_tone();
	}
};
Time_System.prototype.get_tone						= function(){
	/*var _hr = this.get_hour();
	var _min = this.get_min();*/
	var _dayPh = this.get_dayPhase();
	var _tone = this.tints.tones;
	/*
	if((_hr == 5 || _hr == 8 || _hr == 11 || _hr == 14 || _hr == 18 || _hr == 21)
			&& _min <= 50){
		var _from = _dayPh - 1;
		if(_from < 0) _from = 6;
		return this.get_transition_tone(_min * 2, _tone[_dayPh ], _tone[_from]);
	}else{*/
		return _tone[_dayPh];
/*	}*/
};
Time_System.prototype.get_transition_tone			= function(purcent, _to, _from){
	var _diff = [];
	
	for(i =0; i < 4; i++){
		if(_to[i] - _from[i] > 0){
			_diff[i] = Math.floor(
				_to[i] / 100 * (100 - purcent)	- _from[i] / 100 * purcent
			);
		}else{
			_diff[i] = _from[i];
		}
	}
	return _diff;
};

//TOOLS
Time_System.prototype.get_actual_date_obj			= function(){
	return this.get_date_from_vars(
		this.get_hour(),
		this.get_day(),
		this.get_month(),
		this.get_year()
	);
}
Time_System.prototype.get_date_from_vars			= function(hr,d,m,yr){
	var _obj = {};
	_obj.hour	= hr;
	_obj.day 	= d;
	_obj.month	= m;
	_obj.year	= yr;
	return _obj;
};
Time_System.prototype.is_at_time					= function(obj){
	var comp = this.get_actual_date_obj();
	return
		(obj.year == comp.year
		&&	obj.month == comp.month
		&&	obj.day == comp.day
		&&	obj.hour == comp.hour);
};
Time_System.prototype.is_after_time					= function(obj, comp){
	return
	(
		obj.year > comp.year
	||
		(	obj.year == comp.year
			&&	obj.month > comp.month
		)
	||
		(	obj.year == comp.year
			&&	obj.month == comp.month
			&&	obj.day > comp.day
		)
	||
		(	obj.year == comp.year
			&&	obj.month == comp.month
			&&	obj.day == comp.day
			&&	obj.hour >= comp.hour		
		)
	);
};
Time_System.prototype.is_before_time 				= function(obj, comp){
	return
	(
		obj.year < comp.year
	||
		(	obj.year == comp.year
			&&	obj.month < comp.month
		)
	||
		(	obj.year == comp.year()
			&&	obj.month == comp.month
			&&	obj.day < comp.day()
		)
	||
		(	obj.year == comp.year()
			&&	obj.month == comp.month
			&&	obj.day == comp.day
			&&	obj.hour <= comp.hour		
		)
	);
};
Time_System.prototype.is_varList_ok					= function(obj){
	for(i = 0; i < obj.length; i++){
		if(!this.is_var_ok(obj[i][0], obj[i][1], obj[i][2]))
			return false;
	}
	return true;
};
Time_System.prototype.is_var_Ok						= function(varId, condi, comp){
	var _str = "$gameVariables.value(" + varId + ")" + condi + comp;
	return eval(_str);
};
Time_System.prototype.is_switches_mandatory_ok		= function(obj){
	for(i = 0; i < obj.length; i++){
		if(!$gameSwitches.value(obj[i])) return false;
	}
	return true;
};
Time_System.prototype.is_least_one_switch_ok		= function(obj){
	var _result = false;
	for(i = 0; i < obj.length; i++){
		if($gameSwitches.value(obj[i])) _result = true;
	}
	return _result;
};
Time_System.prototype.is_actors_mandatory_ok		= function(obj){
	for(i = 0; i < obj.length; i++){
		if(!this.isActorInParty(obj[i])) return false;
	}
	return true;
};
Time_System.prototype.is_least_one_actor_ok		= function(obj){
	var _result = false;
	for(i = 0; i < obj.length; i++){
		if(this.is_actor_in_party(obj[i])) _result = true;
	}
	return _result;
};
Time_System.prototype.is_actor_in_party				= function (actorId){
	var _src = $gameParty.allMembers();
	var _result = false;
	for(i = 0; i < _src.length; i++){
		if(_src[i].actorId() == actorId) _result = true;
	}
	return _result;
};
Time_System.prototype.is_least_one_map_ok			= function(obj){
	var _result = false;
	for(i = 0; i < obj.length; i++){
		if($gameMap.mapId() == obj[i]) _result = true;
	}
	return _result;
};

//---------------------------------------------------------------------
// Time_Event
//
// The game object class for the time event data.
function Time_Event(data){
    this.initialize.apply(this, arguments);
};
Time_Event.prototype.initialize = function(data){
	this._title					= data.title;
	this._short_desc				= data.shortDesc;
	this._desc						= data.desc;
	this.visible					= data.visible;
	this.active 					= data.active;
	this.date						= data.date;
	this.callback_date			= data.callbackDate;
	this.delay_date				= data.delayDate;
	this.stay_visible				= data.stayVisible;
	this.conditions				= data.conditions;
	this.effects					= data.effects;
	this.validate					= data.validate;
	this.init_words();
};
