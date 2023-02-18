
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.createApi": { type: "done.invoke.createApi"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.createApi": { type: "error.platform.createApi"; data: unknown };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "createApi": "done.invoke.createApi";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          "setApi": "CONNECT_SUCCESS";
"unsetApi": "DISCONNECT" | "ERROR";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          "createApi": "xstate.init";
        };
        matchesStates: "Connected" | "Disconnected" | "Loading";
        tags: never;
      }
  