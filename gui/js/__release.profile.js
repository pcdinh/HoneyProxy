dependencies ={
  action: "release",
  releaseDir: "../../../../release",
  layers:  [
      {
        name: "../dojo/dojo.js", // overwrites regular dojo.js and ++'s your layer
        dependencies: [
         "HoneyProxy.main"
        ]
      }
  ],
  prefixes: [
    [ "dijit", "../dijit" ],
    [ "dojox", "../dojox" ],
    [ "HoneyProxy", "../../HoneyProxy" ]
  ]
}