const express = require("express");
const admin = require("firebase-admin");

const app = express();

/* FIREBASE SERVICE ACCOUNT */
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pilakhub-default-rtdb.firebaseio.com"
});

const db = admin.database();

/* HOME ROUTE */
app.get("/", (req, res) => {
  res.send("PilakHub Notification Server Running");
});

/* REWARD CHECK ROUTE */
app.get("/checkRewards", async (req, res) => {

  try {

    const snapshot = await db.ref("users").once("value");
    const users = snapshot.val();

    const now = Date.now();
    const rewardDelay = 2 * 60 * 60 * 1000; // 2 hours

    for (const uid in users) {

      const user = users[uid];

      if (!user.last_gift_claim) continue;
      if (!user.fcm_token) continue;

      const lastClaim = user.last_gift_claim;

      if (now - lastClaim >= rewardDelay) {

        const message = {
          notification: {
            title: "🎁 Reward Available",
            body: `${user.name}, your reward is ready!`
          },
          token: user.fcm_token
        };

        try {

          await admin.messaging().send(message);
          console.log("Notification sent to:", user.name);

        } catch (error) {

          console.log("FCM error:", error);

        }

      }

    }

    res.send("Reward check completed");

  } catch (error) {

    console.log(error);
    res.status(500).send("Server error");

  }

});

/* START SERVER */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
