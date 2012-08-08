Ext.define('HoneyProxy.views.Viewport', {
	extend: 'Ext.container.Viewport',
    layout: 'border',
    items: [{
    	contentEl: 'header',
    	region: 'north',
    	header: false,
    	border: false,
        height: 75,
        collapsible: true
    }, {
    	contentEl: 'main',
        region: 'center',
        border: false
    }, {
    	contentEl: 'detail',
        region: 'south',
        collapsible: true,
        collapsed: true,
        split: true,
        header: false,
        height: 200,
        border: false,
        minHeight: 100,
        collapseMode: 'mini'
    }],
    renderTo: Ext.getBody()
});