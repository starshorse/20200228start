import tkinter as tK

class Window( tK.Tk):
    def __init__(self):
        super().__init__() 
        self.title("Hello Tkinter") 
        self.geometry("640x480+100+100") 
        label = tK.Label( self , text="Hello World")
        label.pack( fill=tK.BOTH, expand=1, padx=100, pady=50 )
   
if __name__ == '__main__':
    window = Window()
    window.mainloop() 


