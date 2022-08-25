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