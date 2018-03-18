#! /bin/bash

echo "installing gulp..."
apt-get update
apt-get install -y npm
ln -s /usr/bin/nodejs /usr/bin/node

echo "npm installing..."
npm install

echo "bower installing..."
bower install

echo "Cleaning..."
gulp clean

echo "Building..."
gulp build