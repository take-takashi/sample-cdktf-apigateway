#!/bin/sh

# distフォルダ
rm -rf ./dist

# TypeScriptビルド
npx tsc -p tsconfig.json

# package.jsonをdistにコピー
cp -f ./package.json ./package-lock.json ./dist
cd dist
# packageのインストール
npm install --production
# uploadするためにzip化
zip -r ./lambda.zip ./

# zipデータをlambdaにアップロード
#aws lambda update-function-code \
#    --function-name typescript-lambda \
#    --zip-file fileb://lambda.zip

aws s3 cp lambda.zip s3://sample-cdktf-apigateway-lambda-test-s3/lambda/helloworld.zip