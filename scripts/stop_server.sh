#!/bin/bash
sudo pm2 delete all
cd home/ec2-user/brewcraft/client
sudo rm -r node_modules dist
cd home/ec2-user/brewcraft/server
sudo rm -r node_modules
