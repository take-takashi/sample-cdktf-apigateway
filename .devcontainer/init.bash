#!/bin/bash

cd ~
echo "export AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID_CLIUSER}" >> .bashrc
echo "export AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY_CLIUSER" >> .bashrc
echo "export AWS_REGION=ap-northeast-1" >> .bashrc