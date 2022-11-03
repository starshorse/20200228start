import win32com.client


class XASessionEventHandler:
    def __init__(self):
        self.parent = None
        self.is_login = False
        self.is_waiting_message = False

    def OnLogin(self, code, msg):
        self.is_login = True if code == "0000" else False
        self.is_waiting_message = False
        if self.parent:
            self.parent.on_login(code, msg)

    def OnDisconnect(self):
        self.is_login = False
        self.is_waiting_message = False
        if self.parent:
            self.parent.on_disconnect()


class XASession:
    def __init__(self, parent=None):
        self.session = win32com.client.DispatchWithEvents("XA_Session.XASession", XASessionEventHandler)
        self.session.parent = parent

    def login(self, id, passwd, cert_passwd="", server="demo.ebestsec.co.kr"):
        # server: demo.ebestsec.co.kr / hts.ebestsec.co.kr
        is_connect = self.session.ConnectServer(server, 20001)
        if not is_connect:
            return False

        is_request = self.session.Login(id, passwd, cert_passwd, 0, 0)
        if not is_request:
            return False

        self.session.is_waiting_message = True
        return True
