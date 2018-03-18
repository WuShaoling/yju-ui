#! /bin/bash

echo "installing gulp..."
apt-get update
apt-get install -y npm
ln -s /usr/bin/nodejs /usr/bin/node
npm install -g gulp
npm install
bower install

echo "Cleaning..."
gulp clean

echo "Building..."
gulp build