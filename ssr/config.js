/* eslint-disable max-len */

if (process.env.BROWSER) {
  throw new Error(
    "Do not import `config.js` from inside the client-side code."
  );
}

module.exports = {
  // Node.js app
  port: process.env.PORT || 3333,

  // https://expressjs.com/en/guide/behind-proxies.html
  trustProxy: process.env.TRUST_PROXY || "loopback",

  // API Gateway
  api: {
    // API URL to be used in the client-side code
    clientUrl: process.env.BROWSER_API_URI || "",
    // API URL to be used in the server-side code
    serverUrl:
      process.env.SERVER_API_URL ||
      `http://localhost:${process.env.PORT || 4242}`
  },

  // Database
  databaseUrl: process.env.DATABASE_URL,

  // Web analytics
  analytics: {
    // https://analytics.google.com/
    googleTrackingId: process.env.GOOGLE_TRACKING_ID // UA-XXXXX-X
  },

  // Authentication
  auth: {
    jwt: { secret: process.env.JWT_SECRET || "ReactionUI" },

    // https://developers.facebook.com/
    facebook: {
      id: process.env.FACEBOOK_APP_ID,
      secret: process.env.FACEBOOK_APP_SECRET
    },

    // https://cloud.google.com/console/project
    google: {
      id: process.env.GOOGLE_CLIENT_ID,
      secret: process.env.GOOGLE_CLIENT_SECRET
    },

    // https://apps.twitter.com/
    twitter: {
      key: process.env.TWITTER_CONSUMER_KEY,
      secret: process.env.TWITTER_CONSUMER_SECRET
    }
  }
};
