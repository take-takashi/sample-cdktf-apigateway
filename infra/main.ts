// Copyright (c) HashiCorp, Inc
// SPDX-License-Identifier: MPL-2.0
import { Construct } from 'constructs'
import { App, TerraformStack } from 'cdktf'
import * as aws from '@cdktf/provider-aws'

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id)

    // define resources here

    // aws provider (default)
    new aws.provider.AwsProvider(this, 'aws', {
      region: 'ap-northeast-1',
    })

    new aws.apigatewayv2Api.Apigatewayv2Api(this, 'apigatewayv2Api', {
      name: 'nametest', // API Gatewayの名前になる
      protocolType: 'HTTP',
    })
  }
}

const app = new App()
new MyStack(app, 'infra')
app.synth()
