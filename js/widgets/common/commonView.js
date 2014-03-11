var modArray = new Array("text!commonTemplates/common.html!strip", "VIRTUSA");
define(modArray, function(data,VIRTUSA){
	
	var _this ;
	var html = $(data).siblings('script');
	window.commonHTML = html;
	var commonView = function(){
		_this = this;
	};
	
	commonView.prototype={
		
		getHeaderView:Backbone.View.extend({
			tagName:"div",
			events:{
			
			},
			attributes:{"data-role":"header"},
			template:_.template($(html).siblings('#getMobileHeader').text()),
			initialize:function(model){
				console.log(this.template);
				console.log(this.model);
				this.model = model;
			},
			render:function(){	
				return $(this.el).html(this.template(this.model));
			}
		}),
		
		scn_getQuoteBackButton:Backbone.View.extend({
			tagName:"a",
			events:{"click .ui-btn-inner":"goBack"},
			className:"goback",
			attributes:{"data-icon":"back", "data-theme":"b"},
			initialize:function(model){
				this.model = model;
				backBtnContext = this;
			},
			goBack:function(e){
				if(this.model['back'] == 'n'){
		       	 	navigator.app.exitApp();
			    }else{
			        SCNRouter.navigate(this.model['back'], {trigger: true});
			        if (!commonObj['isTablet']) {
// 			        	SCN['setMenuClosed']();
			        }
			    }	
			},
			render:function(){
				$(this.el).html('Back');
				return $(this.el);
			}
		}),
		
		vir_left_container:Backbone.View.extend({
			id:"contentBlock",
			className:"ui-content",
			attributes:{"data-role":"content"},
			initialize:function(){
				$(this.el).html('<div id="scrollContent" class="scrollContent"></div>');
				this.render();
			},
			render:function(){
				var _thisSelf = this;
				
				$('body').bind('Left_Content_Added',function(e,param,_context){
					_thisSelf.addIscroll(e,param,_context);
				});
				
				$('body').bind('Left_Content_Refreshed',function(e){
					_thisSelf.refreshContainer(e);	
				});
			},
			addIscroll:function(e,param,_context){
				// Add the Iscroll Here
				this._iScroll = new iScroll('contentBlock',_this.getIscrollParam(param));				
			},
			refreshContainer:function(e){
				// Refresh and reset the iscoll and container height here.
				var _thisSelf = this;
				if(this._iScroll != null){
					var _minHeight = $(window).height()- 70;
					$('#contentBlock').css('height',($(window).height() - 50)+'px');
					
					// Fixing the left pane viewprot( Scrollabel height ) Based on the orientation change
					$('.iPad-a').css('min-height',_minHeight+"px");
					
					setTimeout(function(){
						_thisSelf._iScroll.refresh();
					},0);
				}
			},
			
			_iScroll:null
		}),
		
		getIscrollParam:function(_obj){
			if(_obj == null)
			return new Object(_this.defaultIscrollParam)
			else
			return _obj;
		},
		defaultIscrollParam:{
			vScrollbar:true,
			onBeforeScrollStart : function(e) {
				var target = e.target;
				while (target.nodeType != 1)
				target = target.parentNode;
				if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
				e.preventDefault();
			}
		}
		
	}
	return new commonView();
	
});