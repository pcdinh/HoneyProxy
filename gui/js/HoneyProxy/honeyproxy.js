Ext.Loader.setConfig({
	enabled: true,
	paths: {
		'HoneyProxy': './js/HoneyProxy',
		'Ext'       : './js/extjs/src'
	}
});
Ext.require([
	'Ext.grid.*',
	'Ext.data.*',
	'Ext.util.*',
	'Ext.data.StoreManager',
	'Ext.grid.PagingScroller',
	'HoneyProxy.stores.FlowStore',
	'HoneyProxy.views.FlowGrid',
	'HoneyProxy.views.Viewport'
]);

Ext.onReady(function(){
	Ext.create('HoneyProxy.views.Viewport');
	
	store = Ext.create('HoneyProxy.stores.FlowStore');
	HoneyProxy.on("newflow",store.addSorted.bind(store));
	
	grid = Ext.create('HoneyProxy.views.FlowGrid', {
		store: store,
		renderTo: "grid"
	});
});


var HoneyProxy = {
		flowModels:[],
		currentSelection: undefined,
		templateRoot: "/app/templates",
		openPreview: function(){
			HoneyProxy.detailView.model = this.model;
			HoneyProxy.detailView.render();
			HoneyProxy.MainLayout.splitpaneResizer.openSecond();
			this.$el.addClass("selected");
			if(HoneyProxy.currentSelection){
				HoneyProxy.currentSelection.$el.removeClass("selected");
			}
			HoneyProxy.currentSelection = this;
		}
};
	
_.extend(HoneyProxy, Backbone.Events);

//debug
window.HoneyProxy = HoneyProxy;

$(function(){

	//initialize traffic object
	HoneyProxy.traffic = new HoneyProxy.Traffic;
	HoneyProxy.on("newflow",HoneyProxy.traffic.add.bind(HoneyProxy.traffic));
	
	//establish websocket communication after config has been loaded.
	HoneyProxy.on("configLoaded",function(){
		HoneyProxy.websocket.initialize();
	})
	
	//fetch traffic after websocket authentication
	HoneyProxy.on("authenticated",function(){
		console.time("fetch");
		HoneyProxy.traffic.fetch();
	});
	
	
	//capture first flow
	function firstFlowTrigger(reset,traffic){
		if(HoneyProxy.traffic.length > 0) {
			HoneyProxy.trigger("firstflow");
			HoneyProxy.off("firstflow");
			HoneyProxy.off("newflow",firstFlowTrigger);
			HoneyProxy.traffic.off("reset",firstFlowTrigger);
		}
	}
	HoneyProxy.on("newflow",firstFlowTrigger);
	HoneyProxy.traffic.on("reset",firstFlowTrigger);

	

	HoneyProxy.trafficView = new HoneyProxy.TrafficView({collection: HoneyProxy.traffic, el: $("#traffic")[0]});		
	HoneyProxy.detailView = new HoneyProxy.DetailView({el: $("#detail")});
});