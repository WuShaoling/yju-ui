#! /bin/bash


echo "installing gulp..."
apt-get install nodejs
npm install -g gulp

echo "Cleaning..."
gulp clean

echo "Building..."
gulp build