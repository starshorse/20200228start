import tkinter as tK 

class Window( tK.Tk ):
   def  __init__(self):
       super().__init__() 
       self.title("Hello Tkinter")
       self.geometry("640x480+100+100")
       self.label_text = tK.StringVar() 
       self.label_text.set("Choose One") 
       label = tK.Label( self, textvar = self.label_text ) 
       label.pack(fill=tK.BOTH, expand=1 , padx=100 , pady=100 )
       hello_button = tK.Button( self , text="Click Me", command=self.hello ) 
       hello_button.pack( side=tK.LEFT , padx=( 20,0), pady=(0,20) ) 
   def hello(self):
        self.label_text.set("Hello click") 
        
if __name__ =='__main__':
    window = Window()
    window.mainloop() 

    

