#!/bin/bash

# Kill port 500 process
# 1. windows 
netstat -aon | findstr 5000 
# taskkill /f /pid 1234 

# Check Flask command if not readMe.md for virtualenv.. 
flask run --app app flsky --debug run --port 5000 
# --app flag is unavailable for Flask less than v2.2.x. Instead, we need to use the FLASK_APP command.
# set FLASK_APP=app
# set FALSK_DEBUG=1 
# flask run 
