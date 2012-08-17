function amd(mid) {
    if(/main\.js/.test(mid) || /MainLayout\.js/.test(mid) )
        return true;
    return false;
}
var profile = {
    releaseDir: "../../release",
 
    basePath: "..",
 
    action: "release",
 
    /*
    cssOptimize: "comments",
 
    mini: true,
 
    optimize: "closure",
 
    layerOptimize: "closure",
 
    stripConsole: "all",
 
    selectorEngine: "acme",
 */
    layers: {
        "dojo/dojo": {
            include: [ "dojo/dojo", "HoneyProxy/main" ],
            customBase: true,
            boot: true
        }
    },
 
    resourceTags: {
        // Files that contain test code.
        test: function (filename, mid) {
            return false;
        },

        // Files that should be copied as-is without being modified by the build system.
        copyOnly: function (filename, mid) {
            return !amd(mid) && /\.js$/.test(filename);
        },

        // Files that are AMD modules.
        amd: function (filename, mid) {
            return amd(mid);
        },

        // Files that should not be copied when the “mini” compiler flag is set to true.
        miniExclude: function (filename, mid) {
            return false;
        }
    },
};