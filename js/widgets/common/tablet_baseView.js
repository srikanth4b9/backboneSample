var modArray = new Array("commonView");
define(modArray, function(commonView){
	var baseView = function(){
		_this = this;
	};
	
	baseView.prototype = {
		getHeader : commonView['getHeaderView'],
		getLeftContentContainer: commonView['vir_left_container'],
		get_RT_Container: commonView['scnCarousalBlock'],
		
		get_RB_Container : Backbone.View.extend({
			id : "tabletRightBottom",
			className : "tabletContent",
			initialize : function() {
				var _selfThis = this;
				this.render();
			},
			render : function() {
				var _selfThis = this;
				
				$('body').bind("RB_Content_Added", function(e,_param,_context) {
					_selfThis.createIscroll(e);
				});

				$('body').bind("RB_Content_Refreshed", function(e) {
					_selfThis.refreshIscorllContent(e);	
				});
			},
			createIscroll:function(e,_param,_context){
				this._iScroll = new iScroll("tabletRightBottom",cView.getIscrollParam(_param));
				
			},
			refreshIscorllContent:function(e){
				var _thisSelf = this;
				if(this._iScroll != null){
					var _minHeight = $(window).height() - 10;
					$('.tabletContent').css('height', (_minHeight - $('.ui-header').outerHeight() - $('.tablet_image_header').outerHeight()) + "px");
					
					setTimeout(function(){
						_thisSelf._iScroll.refresh();
					},0);
				}
			},
			
			_iScroll:null
			
		})
		
	}
	
	return new baseView();
});