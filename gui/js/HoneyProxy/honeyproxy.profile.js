var profile = (function(){
  amd = function(filename,mid){
    if(/main.js/.test(filename) ||
       /MainLayout.js/.test(filename))
       return true;
	return false;
  };

  return {
	resourceTags:{
		test: function(filename, mid){
			return false;
		},

		copyOnly: function(filename, mid){
			return !amd(filename,mid);
		},

		amd: amd
	},

	trees:[
		[".", ".", /(\/\.)|(~$)/]
	]
  };
})();