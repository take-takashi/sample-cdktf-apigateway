# sample-cdktf-apigateway

CDK for Terraform を使って AWS の API Gateway を立ててみる

# Change history codespaces

- node:17.6.0 -> node:18.0.0

# add codespaces secret

- AWS_ACCESS_KEY_ID_CIUSER
- AWS_SECRET_ACCESS_KEY_CIUSER

## 環境変数の使い方（.devcontainer/init.bash）

```
#!/bin/bash

cd ~
echo "export AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID_CLIUSER}" >> .bashrc
echo "export AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY_CLIUSER}" >> .bashrc
echo "export AWS_REGION=ap-northeast-1" >> .bashrc
```

# CDK for Terraform Setup

```
mkdir infra && cd infra
cdktf init --template=typescript --local
```
