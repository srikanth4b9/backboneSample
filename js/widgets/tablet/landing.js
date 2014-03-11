var modArray = new Array("text!appTemplates/category.html!strip","VIRTUSA","baseView");

define(modArray, function(data, VIRTUSA, baseView){
	
	var html = $(data).siblings('script');
	var _this;
	
	var categoryView = function(){
		_this = this;
	};
	
	categoryView.prototype = {

		categoryWrapper:Backbone.View.extend({
			id:"topWrapper",
			tagName:"div",
			className:"mobile-container",
			attributes:{"data-role":"page"},
			template: _.template($(html).siblings('#tabletWrapper').text()),
			initialize:function(){

				var _leftSide = new _this.getLandingTabletLeft;
				var _rightSide = new _this.getLandingTabletRight;
// 
				var _headerObj = new baseView.getHeader({name:"Landing Screen", type:"mobile", back:"n", isBackReq:true});

				var _leftContent = new _this.leftContentBlock;
   				//$(_leftSide.el).append(_leftContent.el); 	
   							
				//$(this.el).append(_headerObj.el);
				$(this.el).append(_leftSide.el);
				$(this.el).append(_rightSide.el);
				this.render();
			},
			render: function(){
				console.log("view rendered...");
				
				$('body').find('div[data-role=page]').remove();
				$('body').append(this.el);
				VIRTUSA.pageRefresh();
			}
		}),
		getLandingTabletHeader : Backbone.View.extend({
			tagName:"div",
			attributes:{"data-role":"header"},
			template:_.template(html.siblings('#getQuoteHeader').text()),
			initialize:function(model){
				this.model = model;
				this.render();
			},
			render:function(){
				$(this.el).html(this.template(this.model))
			}
		}),

		getLandingTabletLeft: Backbone.View.extend({
			id:"tabletLeft",
			tagName:"div",
			className:"iPad-a",
			template: _.template($(html).siblings('#categoriesPage').text()),
			initialize: function(){
				var _leftContent = new _this.leftContentBlock;
   				$(this.el).append(_leftContent.el); 
	  			this.render();
			},
			render: function(){
				$(this.el).find('.scrollContent').html(this.template());
			}
		}),

		leftContentBlock: Backbone.View.extend({
			events:{},
			tagName:"div",
			id:"contentBlock",
			attributes:{"data-role":"content"},
			initialize:function(){
				$(this.el).html('<div id="scrollContent" class="scrollContent"></div>');				
			}
		}),
		getLandingTabletRight: Backbone.View.extend({
			id:"tabletRight",
			tagName:"div",
			className:"iPad-b",
			template:_.template(html.siblings("#tabletB").text()),
			initialize:function(){
				this._bottomContent = new baseView.get_RB_Container();
			},
			render: function(){
				$(this._bottomContent.el).append(this.template());
				$(this.el).append(this._bottomContent.el);
			}
			
		})
	}
	return new categoryView;
});