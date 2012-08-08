requirejs.config({
    baseUrl: './js/lib',
    paths: {
        HoneyProxy: '../HoneyProxy',
        template: '../../templates',
        jquery: 'jquery-1.7.2',
        goog: 'closure-library/closure/goog/base'
    },
    shim: {
    	'underscore': {
            exports: '_'
        },
        'backbone': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['underscore', 'jquery'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'Backbone'
        },
        'goog': {
        	exports: 'goog'
        }
    }
});
require(["HoneyProxy/HoneyProxy"], function(HoneyProxy) {
    HoneyProxy.initialize();
});