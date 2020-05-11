_alias._SC_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_alias._SC_pluginCommand.call(this,command, args);
	switch(command.toLowerCase()){
		case "character_select":
			SceneManager.push(Scene_CharacterSelect);
			this.wait(10);
			break;
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
		case "world_map":
			SceneManager.push(Scene_WorldMap);
			this.wait(10);
			break;
		case "enable_location":
			if ($data_locations[Number(args[1])])
			   $data_WorldMap.activeLoc[Number(args[1])] = true;
			break;
		case "disable_location":
			$data_WorldMap.activeLoc[Number(args[1])] = false;
			break;
		default:
			_Game_Interpreter_pluginCommand.call(this, command, args);
			break;
    }
	return true;
};