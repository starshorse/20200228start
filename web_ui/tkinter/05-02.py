import tkinter as tk
import tkinter.ttk as ttk
DATA = {
    "Data": [
        {"Name": "Tom", "Rollno": 1, "Marks": 50},
        {"Name": "Tim", "Rollno": 2, "Marks": 40},
        {"Name": "Jim", "Rollno": 3, "Marks": 60}
    ]
}
root = tk.Tk()
treeview = ttk.Treeview(root, show="headings", columns=("Name", "Rollno", "Marks"))
treeview.heading("#1", text="Name")
treeview.heading("#2", text="Rollno")
treeview.heading("#3", text="Marks")
treeview.grid()
for row in DATA["Data"]:
    treeview.insert("", "end", values=(row["Name"], row["Rollno"], row["Marks"]))
root.mainloop()
