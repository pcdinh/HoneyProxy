# -*- coding: utf-8 -*-
import random, json
from libhproxy.honey import HoneyProxy
from autobahn.websocket import WebSocketServerFactory, WebSocketServerProtocol
random = random.SystemRandom()

"""
    Handle all WebSocket sessions.
    For each new WebSocket connection, a new GuiSession is instantiated. As soon as a user is authenticated,
    the session gets added to a list of trusted sessions in the factory and receives global updates.
"""

#WebSocket GUI Session        
class GuiSession(WebSocketServerProtocol):
    def __init__(self):
        self.authenticated = False
    def onOpen(self):
        pass
        
    def connectionLost(self,reason):
        if self.authenticated:
            self.factory.clients.remove(self)
    def onMessage(self, data, binary):
        try:
            data = json.loads(data)
        except ValueError:
            self.factory.msg("Cannot decode WebSocket request.")
            return
        if not "action" in data:
            return
        
        #Handle Authentication
        if data.get("action") == "auth" and data.get("key") == HoneyProxy.getAuthKey() and not self.authenticated:
            self.authenticated = True
            self.factory.clients.add(self)
            self.factory.msg("Authenticated.")
            return
        #Forbid unauthenticated requests
        if not self.authenticated:
            self.factory.msg("Unauthorized request to WebSocket API.")
            return
        
        def notImplemented():
            self.factory.msg("Unimplemented function call")
            raise NotImplementedError()
        
        def read(data):
            f = HoneyProxy.getProxyMaster().getFlowCollection()
            if "id" in data and data["id"] != "all":
                self.factory.msg("read",{"id":data.get("id"), "data": f.getFlowsSerialized()[data.get("id")]},client=self)
            else:
                flows = f.getFlowsSerialized()
                self.factory.msg("read",{"id":"all","data": flows},client=self)
        
        try:
            {
                #'create': notImplemented,
                'read'  : read,
                #'update': notImplemented,
                #'delete': notImplemented,
            }[data.get("action")](data)
        except KeyError:
            notImplemented()
        
        

#WebSocket GUI Session Management
class GuiSessionFactory(WebSocketServerFactory):
    def __init__(self,url):
        WebSocketServerFactory.__init__(self, url)
        self.clients = set()
    
    def onNewFlow(self,flowSerialized):
        #we might add an event broker someday to fix such hardcoded references.
        self.msg("newflow",{"data":flowSerialized})
            
    def write(self,msg,client):

        msg = self.prepareMessage(msg)
        if(client == None):
            for client in self.clients:
                    client.sendPreparedMessage(msg)
        else:
            client.sendPreparedMessage(msg)
    def msg(self,msg,data={},client=None):
        data["msg"] = msg
        self.write(json.dumps(data,separators=(',',':'),encoding='latin1'),client=client)
        #del data["msg"]
    protocol = GuiSession