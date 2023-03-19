
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.Keyring.Loading:invocation[0]": { type: "done.invoke.Keyring.Loading:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.Keyring.Loading:invocation[0]": { type: "error.platform.Keyring.Loading:invocation[0]"; data: unknown };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "loadAllAccounts": "done.invoke.Keyring.Loading:invocation[0]";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          "parseError": "error.platform.Keyring.Loading:invocation[0]";
"updateAccounts": "done.invoke.Keyring.Loading:invocation[0]";
"updateSelected": "SELECT-ACCOUNT";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          "loadAllAccounts": "RETRY" | "START";
        };
        matchesStates: "Error" | "Idle" | "Loading" | "Selected" | "Selecting";
        tags: never;
      }
  