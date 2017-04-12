#!/bin/bash
cd /home/ec2-user/brewcraft/client
npm install
npm run build
cd /home/ec2-user/brewcraft/server
npm install