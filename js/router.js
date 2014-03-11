(function(){

var getDevice = function(){
		var _userAgent = window.navigator.userAgent.toLowerCase(); 
		var _isTabletMatch = window.navigator.userAgent.toLowerCase().match(/ipad|android|playbook/);
		var _deviceOS = _userAgent.match(/iphone|ipad|android|blackberry|playbook/);
		var devOS, _isTablet = false;	   	

		if(_deviceOS != null){

			devOS = _deviceOS[0];
		}else{

			devOS = 'desktop';
		}
		
		if(_isTabletMatch != null){

			if(_isTabletMatch[0] == 'ipad' || _isTabletMatch[0] == 'playbook'){
				_isTablet = true;

			}else if(_isTabletMatch[0] == 'android' && _userAgent.match(/mobile/) == null){
				_isTablet = true;

			}
		}
		
		this.isTablet = _isTablet;
		this.deviceOs = devOS;		
	}

	var _deviceObject = new getDevice();
	var _templateLocation = 'mobile';   //Default for mobile

	if(_deviceObject['isTablet']){
		_templateLocation = 'tablet';
	}
	
require.config({
	//By default load any module IDs from js/lib
//     baseUrl: 'js/frameworks',
	paths: {
		text: 'frameworks/text',
		jquery: "frameworks/jquery-2.1.0",
		jquerymobile: "frameworks/jquery.mobile-1.4.1",
		underscore: "frameworks/underscore",
		backbone: "frameworks/backbone",
		router:"router",
		
		commonTemplates:'../templates/common',
		appTemplates: '../templates/'+_templateLocation,
    	commonWid:'widgets/common',
    	appWidgets: "widgets/"+_templateLocation,
    	VIRTUSA:'widgets/common/common',
    	commonView:'widgets/common/commonView',
    	baseView: "widgets/common/"+_templateLocation+"_baseView"
	},
	
	shim: {
		"backbone": {
			"deps": [ "jquery","underscore" ],
			"exports": "Backbone"  /* Export "Backbone" to the window global object */
		},
		"jquery":{
			"exports": "$"
		},
		"jquerymobile":{
			"deps": ["jquery"]
		},
		"router":{
			"deps":["backbone"]
		}
	} 
});	

define(['appWidgets/landing'], function(landing){
			
		var routerModule = Backbone.Router.extend({
			
			routes: {
				"":"homePage",
				"home":"homePage"
			},
			initialize: function(options) {
				console.log("Router Intilized");
				Backbone.history.start(); 
			},
			homePage:function() {
				this.loadModule(landing, 'categoryWrapper');
			},
			
			loadModule: function (module, page) {
				console.log("landing"+ landing+" : "+ page);
				console.log(module);
				new module[page]();
				return false;
			}
		
		});
		
	var _obj = new routerModule;
	
	window.commonObj = {};

	commonObj['deviceID'] = Math.round((Math.random() * (Math.pow(10,16)))); //device.uuid;
	commonObj['isTablet'] = _deviceObject['isTablet'];
	commonObj['deviceOS'] = _deviceObject['deviceOs']
	
	_obj.navigate("", {trigger: true});
	
});


})();