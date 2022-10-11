#!/bin/bash 



###############################################################
#  Django installation 
###############################################################
conda install django 
django-admin startproject mysite 
cd mysite
python manage.py runserver 





