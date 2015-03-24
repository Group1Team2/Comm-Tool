#!/bin/bash

# MAKE SURE YOU ARE USING THE CS673 VIRTUALENV

./django/manage.py runserver 0.0.0.0:8000 &
nodejs ./node/main.js
