#!/bin/bash
git pull origin master
git add -f *
git commit -m "auto commit by bash script"
git push origin master