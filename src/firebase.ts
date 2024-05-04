import { credential } from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getMessaging } from "firebase-admin/messaging";

var serviceAccount = require("../credentials.json");

initializeApp({
  credential: credential.cert(serviceAccount),
});

const db = getFirestore();
const messaging = getMessaging();

export { db, messaging };
