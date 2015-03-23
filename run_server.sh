#!/bin/bash

# MAKE SURE YOU ARE USING THE CS673 VIRTUALENV

node ./node/main.js &
./django/manage.py runserver 0.0.0.0:8000
