from twisted.web.resource import Resource  
import json
from libhproxy.honey import HoneyProxy

class HoneyProxyApi(Resource):
    def __init__(self):
        Resource.__init__(self)
        self.putChild("flows", FlowsApiResource())
        
        
class FlowsApiResource(Resource):
    isLeaf = True

    def render_GET(self, request):
        try:
            flows = HoneyProxy.getProxyMaster().getFlowCollection().getFlowsSerialized()
            return json.dumps(flows,separators=(',',':'),encoding='latin1')
        except Exception as e:
            print e
            return "<html><body>Invalid request.</body></html>"         