#! /bin/bash

echo install gulp
npm install -g gulp

echo "Cleaning..."
gulp clean

echo "Building..."
gulp build