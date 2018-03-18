#! /bin/bash

echo "installing gulp..."
add-apt-repository ppa:chris-lea/node.js
apt-get update
apt-get install nodejs
npm install -g gulp

echo "Cleaning..."
gulp clean

echo "Building..."
gulp build