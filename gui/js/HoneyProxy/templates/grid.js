Ext.require(['Ext.XTemplate'],function(){
	Ext.namespace('HoneyProxy.templates.grid');

	HoneyProxy.templates.grid.NameCell = new Ext.XTemplate('{[ console.log(this,JSON.stringify(arguments),arguments)]}Path: {request.path}');
	
	HoneyProxy.templates.grid.MethodCell = new Ext.XTemplate('{request.method}');
	
})

