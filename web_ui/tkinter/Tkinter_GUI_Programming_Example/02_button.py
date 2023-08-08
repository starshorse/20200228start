# To pack or to grid ?
"""
    using Variable. 
"""
import tkinter as tK 

class Window(tK.Tk ):
    def __init__(self):
        super().__init__()
        self.title("Hello Tkinter")

        self.label_text = tK.StringVar()
        self.label_text.set("Choose One") 

        self.label = tK.Label( self , textvar= self.label_text ) 
        self.label.pack( fill=tK.BOTH, expand=1, padx=100, pady=30 )

        hello_button = tK.Button( self, text="Say Hello", command=self.say_hello )
        hello_button.pack( side=tK.LEFT, padx=( 20, 0), pady=(0, 20)) 

        goodbye_button = tK.Button( self, text="Say GoodBye", command=self.say_goodbye )
        goodbye_button.pack( side=tK.RIGHT, padx=( 0, 20), pady=( 0,20)) 
    
    def say_hello(self):
        #        self.label.configure( text="hello World")
        self.label_text.set("hello World")  
    def say_goodbye(self):
        self.label.configure( text="Goodbye! \n ( Closing in 2 seconds)") 
        self.after( 2000, self.destroy )

if __name__ == "__main__":
    window = Window()
    window.mainloop()


