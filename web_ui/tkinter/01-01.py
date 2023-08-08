import tkinter
import tkinter.ttk

window=tkinter.Tk()
window.geometry("640x400")
window.resizable( False , False ) 

treeview=tkinter.ttk.Treeview(window, columns=["one","two"], displaycolumns=["two","one"]) 
treeview.pack() 


window.mainloop() 
