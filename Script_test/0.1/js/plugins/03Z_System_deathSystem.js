
Scene_Map.prototype.refresh_death_character = function (){
	var _battler = $gameParty.battleMembers()[0];
	var _eventIndex = 0;
	var _id = 0;
	var _x = 0;
	var _y = 0;
	
	if($gameParty.leader().isDead()){
		
	}
	for(i = 1; i < $gameParty.battleMembers().length; i++){
	
		_battler = $gameParty.battleMembers()[i];
		
		if(_battler.isDead()){
			_id = _battler.actorId();
			_x = $gameFollowers._data[i]._x;
			_y = $gameFollowers._data[i]._y;
			
			$gameMap.add_event($gameSystem.sc_mapIds().mapDeath, _id ,_x , _y);
			$gameParty.removeActor(_id);
		}
	}
	$gamePlayer.refresh();
	$gameMap.requestRefresh();
};