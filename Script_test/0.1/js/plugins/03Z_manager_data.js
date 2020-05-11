_alias._SC_DataManager_loadDatabase = DataManager.loadDatabase;
DataManager.loadDatabase = function(){
	_alias._SC_DataManager_loadDatabase.call(this);
	this.load_sc_database();
};
DataManager.load_sc_database = function() {
    for (var i = 0; i < this.sc_databaseFiles().length; i++) {
        var name = this.sc_databaseFiles()[i].name;
        var src = this.sc_databaseFiles()[i].src;
        this.load_sc_dataFile(name, src);
    }
};
DataManager.sc_databaseFiles = function(){
	return [
		{name: '$dataPreloadScene',		src: 'Data_Preload.json'}
	];
};
DataManager.load_sc_dataFile = function(name, src) {
    var xhr = new XMLHttpRequest();
    var url = 'data/SC_engine/' + src;
    xhr.open('GET', url);
    xhr.overrideMimeType('application/json');
	
    xhr.onload = function() {
        if (xhr.status < 400) {
           window[name] = JSON.parse(xhr.responseText);
		   DataManager.onLoad(window[name]);
        }
    };
    xhr.onerror = this._mapLoader || function() {
        DataManager._errorUrl = DataManager._errorUrl || url;
    };
    xhr.send();
};
 
_alias._SC_DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!_alias._SC_DataManager_isDatabaseLoaded.call(this)) {
		return false;
	}else{
		return this.is_sc_database_loaded();
	}
};
DataManager.is_sc_database_loaded = function() {
    this.checkError();
    for (var i = 0; i < this.sc_databaseFiles().length; i++) {
        if (!window[this.sc_databaseFiles()[i].name]) {
            return false;
        }
    }
    return true;
};