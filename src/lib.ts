import { randomBytes } from "crypto";
import { Messaging } from "firebase-admin/messaging";

export async function listAll(
  collectionName: string,
  db: FirebaseFirestore.Firestore
) {
  const snapshots = await db.collection(collectionName).get();
  console.log("List docs");
  snapshots.docs.forEach((doc) => {
    console.log(doc.data());
  });
}

// Creates a new Firebase ID
// Implementation taken from Firebase repo
export function autoId(): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let autoId = "";
  while (autoId.length < 20) {
    const bytes = randomBytes(40);
    bytes.forEach((b) => {
      // Length of `chars` is 62. We only take bytes between 0 and 62*4-1
      // (both inclusive). The value is then evenly mapped to indices of `char`
      // via a modulo operation.
      const maxValue = 62 * 4 - 1;
      if (autoId.length < 20 && b <= maxValue) {
        autoId += chars.charAt(b % 62);
      }
    });
  }
  return autoId;
}

export async function sendPushNotification(
  messaging: Messaging,
  token: string,
  body: string,
  title?: string
) {
  const message = {
    notification: {
      title: title,
      body: body,
    },
    token: token,
  };
  messaging
    .send(message)
    .then((response) => {
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
}
