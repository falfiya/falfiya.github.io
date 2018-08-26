#!/bin/bash
echo Enter your email address:
read ea
echo | ssh-keygen -t rsa -b 4096 -C "$ea"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa
cat ~/.ssh/id_rsa.pub | clip.exe
echo https://github.com/settings/ssh/new
