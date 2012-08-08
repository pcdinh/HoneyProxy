Ext.require(['HoneyProxy.templates.grid'], 
function(){
	Ext.define('HoneyProxy.views.FlowGrid',{
		extend: 'Ext.grid.Panel',
		header: false,
		border: false,
		columns:[{
	        text: 'Name',
	        xtype:'templatecolumn',
	        tpl: HoneyProxy.templates.grid.NameCell
	    },
	    {
	        text: 'Method',
	        xtype:'templatecolumn',
	        tpl: HoneyProxy.templates.grid.MethodCell
	    },
	    {
	        text: 'Status',
	        dataIndex: 'response',
	        renderer: function(response) {
	            return response.code;
	        }
	    }],
	});
});