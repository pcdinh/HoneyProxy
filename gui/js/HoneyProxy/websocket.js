/**
 * Backbone.sync implementation using WebSockets.
 * Supplies an id for each request and waits for a response with this id.
 * TODO: Use the JSON API instead.
 * WebSocket should be used for communicating newly arrived flows,
 * but it's clearly not made for a 1:1 request/response model.
 */
Backbone._syncrequests = {};
Backbone.sync = function(method, model, options) {
	if(method != "read")
	{
		console.warn("only read is supported");
		return;
	}
		
	
	id = model.id ? model.id : "all";
	var msg = {action:"read", id: id};
	Backbone._syncrequests[id] = {onError: window.setTimeout(function(){options.error("WebSocket Timeout.");},5000),
								  success: options.success};
	console.time("ws-send");
	HoneyProxy.websocket.send(msg);
	
};

/**
 * HoneyProxy Websocket Client.
 * Connect to the WS URL, perform authentication and listen for new flows or responses to sync requests.
 */
HoneyProxy.websocket = {
	send: function(jsonMsg){
		this.ws.send(JSON.stringify(jsonMsg));
	},
	initialize: function(){
		this.ws = new WebSocket(HoneyProxy.config.get("ws"));
		this.ws.onopen = function(e){
			HoneyProxy.websocket.send({action:"auth",key:HoneyProxy.config.get("auth")});
			console.log("Connection etablished");
		};
		this.ws.onmessage = this.onmessage;
	},
	onmessage: function onmessage(o) {
		var e = JSON.parse(o.data);
		switch(e.msg) {
			case "Authenticated.":
				HoneyProxy.trigger("authenticated");
				break;
			case "read":
				console.timeEnd("fetch");
				if(e.id in Backbone._syncrequests)
				{
					var req = Backbone._syncrequests[e.id];
					clearTimeout(req.onError);
					req.success(e.data);
				}
				break;
			case "newflow":
				HoneyProxy.trigger("newflow",e.data);
				break;
		}
		
		console.log(e);
	}
};