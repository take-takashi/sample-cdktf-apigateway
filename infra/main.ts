// Copyright (c) HashiCorp, Inc
// SPDX-License-Identifier: MPL-2.0
import { Construct } from 'constructs'
import { App, TerraformStack } from 'cdktf'
import * as aws from '@cdktf/provider-aws'

const projectName = 'sample-cdktf-apigateway'

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id)

    // define resources here

    // aws provider (default)
    new aws.provider.AwsProvider(this, 'aws', {
      region: 'ap-northeast-1',
    })

    // API Gatewayの作成
    new aws.apigatewayv2Api.Apigatewayv2Api(this, 'apigatewayv2Api', {
      name: `${projectName}-nametest`, // API Gatewayの名前になる
      protocolType: 'HTTP',
    })

    // Lambda用のS3バケット作成
    const s3bucket = new aws.s3Bucket.S3Bucket(this, 's3Bucket', {
      bucket: `${projectName}-lambda-test-s3`,
    })

    // Lambdaデプロイ用のS3オブジェクト
    // 実態なしのダミーファイルとして配置
    new aws.s3Object.S3Object(this, 's3Object', {
      bucket: s3bucket.bucket,
      key: 'lambda/helloworld.zip',
      lifecycle: {
        ignoreChanges: ['etag', 'metadata'],
      },
    })
  }
}

const app = new App()
new MyStack(app, 'infra')
app.synth()
