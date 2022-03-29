const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// add admin role to a user
exports.addAdminRole = functions.https.onCall(async (data, context) => {
  // get user and add custom claim (admin)
  try {
    const user = await admin.auth().getUserByEmail(data.email);
    await admin.auth().setCustomUserClaims(user.uid, {
      admin: true,
    });
    return {
      message: `Success! ${user.email} has been made an admin!`,
    };
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
});
