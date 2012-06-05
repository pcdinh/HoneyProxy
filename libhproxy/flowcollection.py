#import json

class FlowCollection:
    def __init__(self):
        #self._flows = []
        self._flows_json = []

    
#    def getFlow(self,i):
#        if(i < len(self._flows)):
#            return self._flows[i]
#        return None
    
    def getLastFlow(self):
        return self._flows_json[-1]
    
    def getFlowsAsJSON(self):
        return self._flows_json
    
    def getFlowsAsSingleJSON(self):
        return self._flows_json
        #return ''.join(["[",','.join(self._flows_json),"]"])
    
    def addFlow(self, flow):
        flowRepr = flow._get_state()
        flowRepr["id"] = len(self._flows_json)
        #self._flows_json.append(json.dumps(flowRepr,ensure_ascii=None))
        self._flows_json.append(flowRepr)
        return len(self._flows_json)-1
        
