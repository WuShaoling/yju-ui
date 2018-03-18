#! /bin/bash

echo "installing gulp..."
apt-get update
apt-get install -y npm
ln -s /usr/bin/nodejs /usr/bin/node

echo "install bower..."
npm install -g bower

echo "install gulp..."
npm install -g gulp

echo "npm installing..."
npm install

echo "bower installing..."
bower install --allow-root

echo "Cleaning..."
gulp clean

echo "Building..."
gulp build