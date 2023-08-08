import tkinter as tK 
import tkinter.messagebox as msgbox 

class Window( tK.Tk ):
    def __init__(self):
        super().__init__() 
        self.geometry("640x480+100+100") 
        self.title("Hello tkinter")

        self.name_text = tK.StringVar() 
        self.name_text.set("StringVar") 
        self.name_entry = tK.Entry( self , textvar= self.name_text ) 
        self.name_entry.pack( fill=tK.BOTH, padx=20, pady=20 ) 


        self.label = tK.Label( self , text="hello label") 
        self.label.pack( expand=1, padx=100, pady=30 )
        hello_button = tK.Button( self, text="hello button", command = self.hello )
        hello_button.pack( side=tK.LEFT , padx=( 20, 0) , pady=(0,20) )
    def hello(self):
        self.label.configure(text="hello button") 
        msgbox.showinfo("showInfo", self.name_text.get() ) 
        self.after( 2000, self.destroy ) 
        


if __name__=="__main__":
    window = Window()
    window.mainloop()
