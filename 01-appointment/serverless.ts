import type { AWS } from "@serverless/typescript";
import { appointment, medic } from "./src/functions";

const serverlessConfiguration: AWS = {
  service: "appointment",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild"],
  provider: {
    name: "aws",
    runtime: "nodejs20.x",
    stage: "${opt:stage, 'dev'}",
    apiGateway: {
      restApiId:
        "${ssm:/digital/api-gateway-rest-api-id-${self:provider.stage}}",
      restApiRootResourceId:
        "${ssm:/digital/api-gateway-rest-api-root-resource-id-${self:provider.stage}}",
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    deploymentBucket: {
      name: "${ssm:/digital/s3-bucket-deployment-name-${self:provider.stage}}",
      serverSideEncryption: "AES256",
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    iam: {
      role: {
        name: "appointment-role-${self:provider.stage}",
        statements: [
          {
            Effect: "Allow",
            Action: [
              "logs:CreateLogGroup",
              "logs:CreateLogStream",
              "logs:PutLogEvents",
            ],
            Resource: "arn:aws:logs:*:*:*",
          },
          {
            Effect: "Allow",
            Action: "lambda:InvokeFunction",
            Resource: "arn:aws:lambda:*:*:function:*",
          },
        ],
      },
    },
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: true,
      target: "es2020",
      sourcemap: true,
      exclude: ["aws-sdk"],
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
    apiGateway: {
      restApiId: "t5b10qwid0",
      restApiRootResourceId: "77tlxm1h0k",
    },
  },
  functions: { appointment, medic },
};

module.exports = serverlessConfiguration;
