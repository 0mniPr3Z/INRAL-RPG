//* IMAGES MANAGER
ImageManager.load_preload = function(filename){
	return this.loadBitmap('img/titles1/preload/', filename, 0, true);
};

ImageManager.load_time_hud = function(filename) {
    return this.loadBitmap('img/gui/time/', filename, 0, true);
};
ImageManager.load_actor_hud = function(filename) {
    return this.loadBitmap('img/gui/actorhud/', filename, 0, true);
};
ImageManager.load_battler_hud = function(filename){
	return this.loadBitmap('img/gui/battler/', filename, 0, true);
}
ImageManager.load_face_hud = function(filename){
	return this.loadBitmap('img/SumRndmDde/character-creator-ex/Face/face/', filename, 0, true);
}
ImageManager.load_character_hud = function(filename){
	return this.loadBitmap('img/SumRndmDde/character-creator-ex/Face/walk/', filename, 0, true);
}
ImageManager.load_character_select = function(filename){
	return this.loadBitmap('img/gui/characterSelect/', filename, 0, true);
};
ImageManager.load_world_map = function(filename){
	return this.loadBitmap('img/gui/worldMap/', filename, 0, true);
};
ImageManager.load_world_map_location = function(filename){
	return this.loadBitmap('img/gui/worldMap/locations/', filename, 0, true);
};