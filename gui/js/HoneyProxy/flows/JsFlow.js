HoneyProxy.JSFlow = HoneyProxy.PrettyFlow.extend({
	getCategory: function(){
		return "js";
	}
}, {matches: function(data){
	if(data.contentType)
		return !!data.contentType.match(/(javascript|json)/i);
	else if(data.path)
		return !!data.path.match(/(\.js|\.json)$/i);
	return false;
}});
HoneyProxy.flowModels.unshift(HoneyProxy.JSFlow);