Ext.define('HoneyProxy.stores.FlowStore', {
    extend    : 'Ext.data.Store',
    storeId: 'flows',
    model     : 'HoneyProxy.models.FlowModel',
    proxy: {
        type: 'ajax',
        url : '/api/flows',
        reader: {
            type: 'json'
        }
    },
    autoLoad: true
});

