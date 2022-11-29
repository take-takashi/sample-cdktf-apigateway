# sample-cdktf-apigateway

CDK for Terraform を使って AWS の API Gateway を立ててみる

# Change history codespaces

- node:17.6.0 -> node:18.0.0
  - 理由：cdk for terraform インストールするときに node バージョンでエラーが出たため
- codespaces のマシンのメモリ 2GB -> 4GB
  - 理由：cdktf synth コマンドでメモリ不足でエラーが出るため

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
cdktf provider add "aws@~>4.0"
```

# CDKTF で apply するまで

```
cd infra/
cdktf synth
cdktf apply
```

# Lambda setup

```
mkdir lambda && cd lambda
mkdir src && cd src
touch index.ts #
cd ..
npm init
touch tsconfig.json # どこかのtsconfig.jsonを真似する
# typescriptはtscコマンドでトランスパイルするために使用
# npm-pack-zipはディレクトリをZIP化するのに使用
npm i -D typescript npm-pack-zip
```

- npm-pack-zip のために package.json を編集
  - files
  - bundledDependencies
  - scripts commands
    - build
    - zip
    - deploy

## Lambda Deploy

```
cd lambda/
npm run build
npm run zip
npm run deploy
```
