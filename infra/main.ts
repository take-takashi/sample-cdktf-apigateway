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
    const s3object = new aws.s3Object.S3Object(this, 's3Object', {
      bucket: s3bucket.bucket,
      key: 'lambda/helloworld.zip',
      lifecycle: {
        ignoreChanges: ['etag', 'metadata'],
      },
    })

    // lambda用のロール
    const iamRole = new aws.iamRole.IamRole(this, 'iamRole', {
      name: `${projectName}-role`,
      assumeRolePolicy: JSON.stringify({
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'sts:AssumeRole',
            Effect: 'Allow',
            Sid: '',
            Principal: {
              Service: 'lambda.amazonaws.com',
            },
          },
        ],
      }),
    })

    // lambda用のロールにマネージドポリシーをアタッチ
    // Add execution role for lambda to write to CloudWatch logs
    new aws.iamRolePolicyAttachment.IamRolePolicyAttachment(this, 'lambda-managed-policy', {
      policyArn: 'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
      role: iamRole.name,
    })

    new aws.lambdaFunction.LambdaFunction(this, 'lambdaFunction', {
      functionName: 'helloworld',
      s3Bucket: s3bucket.bucket,
      s3Key: s3object.key,
      role: iamRole.arn,
      // TODO
    })
  }
}

const app = new App()
new MyStack(app, 'infra')
app.synth()
