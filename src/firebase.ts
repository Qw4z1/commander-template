import { credential } from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";


var serviceAccount = require("../credentials.json");

initializeApp({
  credential: credential.cert(serviceAccount),
});

const db = getFirestore();

export { db };
