/**
 * Flow subclass responsible for proper display of CSS files.
 */
HoneyProxy.HtmlFlow = HoneyProxy.PrettyFlow.extend({

}, {
	matches : function(data) {
		if (data.contentType)
			return !!data.contentType.match(/html/i);
		else if (data.path)
			return !!data.path.match(/\.html/i);
		return false;
	},
	getCategory : function() {
		return "html";
	}
});
HoneyProxy.flowModels.unshift(HoneyProxy.HtmlFlow);