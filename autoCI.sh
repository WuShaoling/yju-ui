#! /bin/bash

echo "installing gulp..."
apt-get update
apt-get install -y npm
npm install -g gulp

echo "Cleaning..."
gulp clean

echo "Building..."
gulp build