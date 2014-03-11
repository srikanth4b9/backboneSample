
define(function(){
	var _this;
	var VIRTUSA = function(){
		// Initialization Function
		_this = this;
	}
	
	VIRTUSA.prototype = {
		
		decodeHtmlData:function(data){
			data = data.replace(/&lt;/g,"<");
			data = data.replace(/&gt;/g,">");
			return data;
		},
		
		setPersistenceData:function(key, value){
			window.localStorage.setItem(key, value);
		},
		
		getPersistenceData:function(key){
			return window.localStorage.getItem(key);
		},
		
		removePersistenceData:function(key){
			window.localStorage.removeItem(key);
		},
		
		pageRefresh:function(){
			$("div[data-role=page]").page().show();
		},
		
		controlRefresh:function(el){
			el.trigger('create');
			$('select').selectmenu('refresh');
		},
		
	  	getMobileHeader:Backbone.View.extend({
			events:{},
			tageName:"",
			className:"",
			id:"",
			attributes:"",
			intialize:function(_model){
			
			},
			render:function(_markup){
				$(this.el).html(_modArray.template(_markup,_model));
				return this;
			}
	    }),				
		getFloatingNumber:function(amount){
			return amount.toFixed(2);
		},
		
		getDateFormat:function(date){
	  		var df = new Date(date);
			return df.getMonth()+1+"."+df.getDate()+"."+df.getFullYear();
		}
  }
	return new VIRTUSA();
});
