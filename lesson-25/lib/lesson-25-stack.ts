import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { join } from "path";

export class Lesson25Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const getQuotesLambda = new Function(this, "getQuotesLambda", {
      runtime: Runtime.NODEJS_16_X,
      code: Code.fromAsset(join(__dirname, "../lambdas")),
      handler: "getQuotes.handler",
    });

    const getQuotesRestApi = new RestApi(this, "getQuotesRestApi", {
      description: "Quotes API",
    });

    const mainPath = getQuotesRestApi.root.addResource("quotes");
    mainPath.addMethod("GET", new LambdaIntegration(getQuotesLambda));
  }
}
