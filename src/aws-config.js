import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "us-east-1_cs9G6OSca",
      userPoolClientId: "3iqlm8kfho6j3afl04fa2i8fu4",
    },
  },
});