#! /bin/bash

echo "Cleaning..."
gulp clean

echo "Building..."
gulp build

echo "Releasing..."
git add .
git ci -am "Release"
git push