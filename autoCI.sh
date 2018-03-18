#! /bin/bash

echo "installing gulp..."
apt-get update
apt-get install -y npm
npm install gulp
ln -s /usr/bin/nodejs /usr/bin/node

echo "Cleaning..."
gulp clean

echo "Building..."
gulp build