#!/bin/sh
touch ./.env
echo "Generate .env"

echo "# This file is auto generated by packages/theme/build-env.sh changes will be overwritten after yarn dev" > .env
echo "PORT=3000" >> .env
echo "IP=$(ifconfig | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*' | grep -v '127.0.0.1:8080')" >> .env

cat ./.env | grep IP
cat ./.env | grep PORT
