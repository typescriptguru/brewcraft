#!/bin/bash
cd /home/ec2-user/brewcraft/client
sudo npm install
sudo npm install node-sass
sudo ng build
cd /home/ec2-user/brewcraft/server
sudo npm install