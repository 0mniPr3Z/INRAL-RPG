var $debug = true;
if($debug){
	if (Utils.isNwjs() && Utils.isOptionValid('test')) {
		require('nw.gui').Window.get().showDevTools();
	}
}
var _alias = {};