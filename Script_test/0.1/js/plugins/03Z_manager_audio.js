AudioManager.playPreload = function(){
	var _bgm = {
        name: '03Z_intro',
        volume: 100,
        pitch: 60,
        pan: 50,
        pos: 0
	};
	AudioManager.playBgm(_bgm);
};
