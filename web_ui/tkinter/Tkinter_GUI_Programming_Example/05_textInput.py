# To pack or to grid ?
import tkinter as tK 
import tkinter.messagebox as msgbox

class Window(tK.Tk ):
    def __init__(self):
        super().__init__()
        self.title("Hello Tkinter")

        self.label = tK.Label( self , text="Choose One") 
        self.label.pack( fill=tK.BOTH, expand=1, padx=100, pady=30 )
        self.name_text = tK.StringVar() 

        self.name_entry = tK.Entry( self, textvar=self.name_text ) 
        self.name_entry.pack( fill=tK.BOTH, expand=1, padx=20, pady=20 )

        hello_button = tK.Button( self, text="Say Hello", command=self.say_hello )
        hello_button.pack( side=tK.LEFT, padx=( 20, 0), pady=(0, 20)) 

        goodbye_button = tK.Button( self, text="Say GoodBye", command=self.say_goodbye )
        goodbye_button.pack( side=tK.RIGHT, padx=( 0, 20), pady=( 0,20)) 
    
    def say_hello(self):
        self.label.configure( text="hello World")
        message = "Hello there" + self.name_entry.get() 
        msgbox.showinfo("Hello", message )
    def say_goodbye(self):
        self.label.configure( text="Goodbye! \n ( Closing in 2 seconds)") 
        msgbox.showinfo("Goodbye!", "Goodbye, it's been fun!")
        self.after( 2000, self.destroy )

if __name__ == "__main__":
    window = Window()
    window.mainloop()


