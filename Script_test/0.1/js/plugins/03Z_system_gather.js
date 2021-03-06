
//INITIALIZE
/*Game_System.prototype.initialize_sc_action = function(){
	this.set_action_var();
};
Game_System.prototype.set_action_var = function(){
	this.set_action_globalVar();
	this.set_action_playerVar();
	if($gameParty.size()>1){
		this.set_action_escortVar();
	}
};
Game_System.prototype.set_action_globalVar =function(){
	var _talent_iconId	= $gameSystem.talent_iconId();
	var _partySize		= $gameParty.size();
	
	
	var _talentIco_varId	= $gameSystem.sc_varIds().talentIco;
	var _partySize_varId	=  $gameSystem.sc_varIds().partySize;
	
	$gameVariables.setValue(_ico_varId, _ico_IconId);
}
Game_System.prototype.set_action_playerVar =function(){
	var _faceIco_id = $gameParty.leader().actorId() + 255;
	var _talentNiv =$gameSystem.get_actor_talent();
	var _form = $gameActors._data[$gameParty.leader().actorId()]._hp;
	
	var _faceIco_varId = $gameSystem.sc_varIds().playerIco;
	var _talentNiv_varId = $gameSystem.sc_varIds().playerTalNiv;
	var _form_varId = $gameSystem.sc_varIds().playerForm;
	
	$gameVariables.setValue(_faceIco_varId, _faceIco_id);
	$gameVariables.setValue(_talentNiv_varId, _talentNiv);
	$gameVariables.setValue(_form_varId, _form);
}
Game_System.prototype.set_action_escortVar =function(){
	var _talentId, _actorId, _value;
	
	for(i = 1; i <= $gameParty.size(); i++){
		_actorId = $gameParty.members()[i].actorId();
		_talentNiv = this.get_actor_talent(_actorId);
		
		_talentNiv_varId = $gameSystem.sc_varIds().escortTalentVal[i - 1];
		_faceIco_varId = $gameSystem.sc_varIds().escortIco[i - 1];
		
		$gameVariables.setValue(_talentNiv_varId, _talentNiv);
		$gameVariables.setValue(_faceIco_varId, _actorId + 250);
	}
};
Game_System.prototype.set_condition_choice = function(){
	for(i = 1; i < 8; i++){
		$gameMessage._hiddenChoiceConditions[i] = i < $gameParty.size();
	}
}
*/

Game_System.prototype.setup_gather_choices = function(itemId, talentId, talentReq, formReq){
	
	// global settings
	var _normalColor 					= "\c[1]";
	var _talentColor					="";
	var _formColor 					="";
	var _choices						= [];
	var -choiceOption					= "";
	var _is_assignment_icon			= "";
	//params
	$gameMap._itemId 					= itemId || 0;
	$gameMap._talentId				= talentId || 0;
	$gameMap._action_talentReq		= talentReq || 0;
	$gameMap._action_formReq 		= formReq || 0;

	//ACTION
	var _itemIcon						= $dataItems[$gameMap._itemId].iconIndex;
	var _action_item_iconId			= 0;
	var _action_talent_iconId		= 0;

	//ACTOR
	var _actorId						= 0;
	var _battler						= {};
	var _actorSc						= {};
	var _actor 						= {};

	var _actor_face_iconId			= 0;

	var _actor_talent_value			= 0;
	var _actor_form_value			= 0;

	var _msg_a							= "";
	var _msg_talent					= "";
	var _msg_form						= "";
	
	
	
	

	for(i = 0; i < $gameParty.size(); i++){
		
		if(i > 0){
			_is_assignment_icon = "\i[33]";
		}
		
		_battler = $gameParty.members()[i];
		_actorId = _battler.actorId();
		
		_actor =$gameActors._data[_actorId];
		 
		_actor_face_iconId = _actorId + 255;
		
		_msg_a =
			_normalColor
			+ _is_assignment_icon
			+ " \i[" + _action_item_iconId
			+ "]\i[" + _actor_face_iconId + "]";
			
		if($gameMap._talentId != 0){
			_actorSc = this.sc_actors[_actorId];
			_actor_talent_value = _actorSc.talents[$gameMap._talentId].niv;
			
			if($gameMap._action_talentReq < _actor_talent_value){
				_talentColor = "\c[3]";
			}else{
				_talentColor = "\c[2]";
			}
			
			_msg_talent =
				"\i["
				+ _action_talent_iconId
				+ "]"
				+ _talentColor
				+ _actor_talent_value
				+ _normalColor
				+"/"
				+ $gameMap._action_talentReq;
		}else{
			_msg_talent = "";
		}
		if( $gameMap._action_formReq != 0){
			_actor_form_value = _actor._hp;
			
			if($gameMap._action_formReq > _actor_form_value + 15){
				_formColor = "\c[3]";
			}else{
				_formColor = "\c[2]";
			}
			_msg_form =
				+" \i[232]"
				+ _formColor
				+ _actor_form_value
				+ _normalColor
				+ "/"
				+ $gameMap._action_formReq;
		}else{
			_msg_form = "";
		}
		_choiceOption  = String(_msg_a + _msg_talent + _msg_form);
		_choices.push(_choiceOption);
	}

	var cancel_type = -2;
	var defaultType = -1;
    var positionType = 1;
    var background = 2;
	
    $gameMessage.setChoices(_choices, 0, -1);
    $gameMessage.setChoiceBackground(background);
    $gameMessage.setChoicePositionType(positionType);
	$gameMessage.setChoiceCallback(function(n) {
		$gameMap.resolve_sc_action(n);
	});
};
Game_Map.prototype.resolve_sc_action = function(n) {
	if(n == 0){
		this.resolve_sc_selfAction();
	}else{
		this.resolve_sc_assign(n);
	}
};
Game_Map.prototype.resolve_sc_selfAction = function(){

			$gameMap._interpreter.setWaitMode('message');
			$gameMessage.setPositionType(1);
			var _msg = "lololo";
			$gameMessage.addText(_msg);
};
Game_Map.prototype.resolve_sc_assign = function(actorId){
	setTimeout(function() {
		$gameMap._interpreter.setWaitMode('message');
		$gameMessage.setPositionType(1);
		$gameMessage.addText("\pop[a"+$gameParty.members()[actorId].actorId()+"]"+TextManager.atAction());
	}, 1000);
};



//MAKE CHOICE
_alias._SC_WindowChoiceList_makeCommandList = Window_ChoiceList.prototype.makeCommandList;
Window_ChoiceList.prototype.makeCommandList = function(){
	$gameMessage.save_choices();
	this.clear_choice_data();
	
	_alias._SC_WindowChoiceList_makeCommandList.call(this);
		   
	/* Remove choices in reverse to avoid index issues */    
	var needsUpdate = false;
	for (var i = this._list.length; i > -1; i--){
		if ($gameMessage.is_hidden_choice(i)) {
			this._list.splice(i, 1)
			$gameMessage._choices.splice(i, 1)        
			needsUpdate = true;
		}else{
			/* Add this to our choice map */
			this._choiceMap.unshift(i);
		}
	}
	if (needsUpdate === true) {
		this.updatePlacement();
	}
};
Window_ChoiceList.prototype.clear_choice_data = function(){
	this._choiceMap = [];
};
Window_ChoiceList.prototype.callOkHandler = function() {
	$gameMessage.onChoice(this._choiceMap[this.index()]);
	this._messageWindow.terminateMessage();
	this.close();
};  


Game_Message.prototype.onChoice = function(n) {
    if (this._choiceCallback) {
        this._choiceCallback(n);
        this._choiceCallback = null;
    }

Window_ChoiceList.prototype.callOkHandler = function() {
    $gameMessage.onChoice(this.index());
    this._messageWindow.terminateMessage();
    this.close();
};
Game_Message.prototype.save_choices = function() {
	this._choices = this._oldChoices.clone();
}
Game_Message.prototype.is_hidden_choice = function(choiceNum){
	return this._hiddenChoiceConditions[choiceNum];
};
Game_Message.prototype.backupChoices = function() {
	this._oldChoices = this._choices.clone();
};
_alias._SC_GameMessage_Clear = Game_Message.prototype.clear;
Game_Message.prototype.clear = function() {
	_alias._SC_GameMessage_Clear.call(this);
	this._hiddenChoiceConditions = {};
	this._oldChoices = [];
};
Game_Message.prototype.hideChoice = function(choiceNum, bool) {
	this._hiddenChoiceConditions[choiceNum] = bool;
};
_alias._SC_GameInterpreter_setupChoices = Game_Interpreter.prototype.setupChoices;
Game_Interpreter.prototype.setupChoices = function(params){  
	params = this.combineChoices();
	$gameMessage.backupChoices();
	_alias._SC_GameInterpreter_setupChoices.call(this, params)      
};
Game_Interpreter.prototype.combineChoices = function(params){  
/* IMPORTANT If we don't clone this, we will modify the event permanently */
	this._list = JSON.parse(JSON.stringify(this._list))
	var currIndex = this._index
	var numChoices = 0;
	var firstCmd = this._list[this._index];    
	this._index++;
	while(this._index < this._list.length){
		var cmd = this._list[this._index];
		var nextCmd = this._list[this._index+1];
		if (cmd.indent === this._indent){
			/* Reached "End Choices" command. See if next command is "Show Choices" */
			if (cmd.code === 404 && (nextCmd === undefined || nextCmd.code !== 102)){
				break;
			}else if(cmd.code === 102){
// Update cancel choice -2 is "cancel" -1 is "disallow" 0 to 5 are zero-indexed choices
				var cancelType = cmd.parameters[1]
				if (cancelType > -1) {
					firstCmd.parameters[1] = cancelType + numChoices
				}else if(cancelType === -2){
					firstCmd.parameters[1] = cancelType;            
				}
				/* Update default choice */
				var defaultType = cmd.parameters[2]
				if (defaultType > -1) {
					firstCmd.parameters[2] = defaultType + numChoices;
				}
				/* Add all of the parameters to the current command */
				var options = cmd.parameters[0];                    
				for (var i = 0; i < options.length; i++) {
					firstCmd.parameters[0].push(options[i]);
				}
				/* Delete the "end choice" and "show choice" commands */
				this._list.splice(this._index - 1, 2)
				this._index -= 2;
			}else if(cmd.code === 402) {/* Update the branch number */     
				cmd.parameters[0] = numChoices;
				numChoices++;
			}
			this._index++;
		}
	}
	/* Go back to where we left off */
	this._index = currIndex;
	/* Return the new parameters for the first choice command */
	return firstCmd.parameters;
};
Game_Interpreter.prototype.hideChoice = function(choiceNum, formula) {
	var num = Math.floor(choiceNum) - 1;    
	$gameMessage.hideChoice(num, eval(formula));
};
//TEST
Game_System.prototype.is_gather_ok =function(talentId, talentReq, formeReq, actorId){
	if(
		this.is_talent_enougth(talentId, talentReq, actorId)
		&& this.is_forme_enougth(formeReq, actorId)
	)return true;
	return false;
}
Game_System.prototype.is_forme_enougth =function(value, actorId){
	var _actorId = _actorId || $gameParty.members()[0].actorId();
	var _actor = $gameActors._data[_actorId];
	var _value = value || $gameVariables.value(this.sc_varIds().formReq);
	
	if(_actor._hp >= _value + 10){
		return true;
	}
	return false;
};

Game_System.prototype.is_talent_enougth =function(talentId, value, actorId){

	var _value		= value	|| $gameVariables.value(this.sc_varIds().talentReq);
	
	if(this.get_actor_talent(_actorId, _talentId) > 0){
		if (_actor.talents[id].niv >= _value){
			return true;
		}
	}else{
		return true;
	}
	return false;
};
Game_System.prototype.talent_iconId =function(talentId){
	var _talentId = talentId || $gameVariables.value(this.sc_varIds().talentReqId);
	return this.sc_actors[1].talents[talentId].iconId;
}

Game_System.prototype.get_actor_talent =function(actorId, talentId){
	var _actorId = actorId || $gameParty.members()[0].actorId();
	var _talentId = talentId || $gameVariables.value(this.sc_varIds().talentReqId);
	
	return  this.sc_actors[_actorId].talents[_talentId].niv
};
