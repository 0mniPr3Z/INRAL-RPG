SoundManager.play_jingle = function(){
	SoundManager.play_sound('03Z');
}
SoundManager.play_sound = function(name){
	var _se = {};
	_se.name = name;
	_se.pan = 0;
	_se.pitch =100;
	_se.volume = 90;
	AudioManager.playSe(_se);
};