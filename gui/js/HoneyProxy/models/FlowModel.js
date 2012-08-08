Request = function(flow){
	this._flow = flow;
};
Request.prototype = {
	get data() {
		return this._flow.get("request");
	},
	get method()  {
		return "foo"+this.data.method; 
	},
};

Response = function(flow){
	this._flow = flow;
};
Response.prototype = {
	get data() {
		return this._flow.get("response");
	},
	get code() {
		return this.data.code;
	}
};

Ext.define('HoneyProxy.models.FlowModel', {
    extend   : 'Ext.data.Model',
    fields   : [
        'id',
        'request',
        'response',
        'error',
        'version'
    ],
    constructor: function() {
    	this.callParent(arguments);
    	this.request = new Request(this);
    	this.response = new Response(this);
    }
});