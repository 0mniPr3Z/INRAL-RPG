_alias._sceneBoot_start = Scene_Boot.prototype.start
Scene_Boot.prototype.start = function() {
	if(!$debug)
		Graphics._requestFullScreen();
	if (!DataManager.isBattleTest() && !DataManager.isEventTest()) {
	   SceneManager.goto(Scene_Splash);
	   return;
    };
	_alias._sceneBoot_start.call(this);
};