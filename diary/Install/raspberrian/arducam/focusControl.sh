#!\bin\bash

# Press the Up/Down Arrow for focus adjustment , press "Ctrl+C" to save or "r" to reset 
cd Arducam-Pivariety-V4L2-Driver/focus
python3 FocuserExample.py -d /dev/v4l-subev1 
