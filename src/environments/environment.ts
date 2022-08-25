// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { initializeApp } from "firebase/app";

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAWIfFgzBWa25ARxAQUsSAJ_TWM-NQrqPI",
    authDomain: "teste-ponto-eletronico.firebaseapp.com",
    projectId: "teste-ponto-eletronico",
    storageBucket: "teste-ponto-eletronico.appspot.com",
    messagingSenderId: "460269283067",
    appId: "1:460269283067:web:2b4cf1b300c273b992725e"
  }
};

const app = initializeApp(environment.firebase);

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
