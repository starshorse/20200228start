import tkinter as tK 
from math import *

window = tK.Tk()
window.title("hello Tkinter")
window.geometry("640x480+100+100")
def calc(event):
    label.config(text="결과="+str(eval(entry.get()))) 
entry = tK.Entry(window) 
entry.bind("<Return>", calc )
entry.pack() 
label = tK.Label(window)
label.pack()
window.mainloop()



