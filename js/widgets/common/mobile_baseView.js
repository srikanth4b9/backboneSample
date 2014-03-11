var modArray = new Array("commonView");
define(modArray, function(commonView){
	var baseView = function(){
		_this = this;
	};
	
	baseView.prototype = {
		getHeader : commonView['getMobileHeader'],
		getContentContainer: commonView['vir_left_container']
	}
	
	return new baseView();
});