const crypto = require("crypto");
const secret = crypto.randomBytes(16).toString("base64");
module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'generated_secret_value_here'),
  },
  apiToken: {
    salt: secret,
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT', secret),
    },
  },
});
