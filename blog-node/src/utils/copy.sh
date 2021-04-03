#!/bin/sh
cd /e/学习/NodeJs/"Web Server"/blog-1/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log