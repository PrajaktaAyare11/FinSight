import arcjet, { tokenBucket, shield, detectBot } from "@arcjet/next";

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["userId"], // Track based on Clerk UserId
  rules: [
    // Shield protection for content and security
    shield({
      mode: "LIVE",
    }),
    // Bot detection
    detectBot({
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
        "GO_HTTP", // For Inngest
      ],
    }),
    // Rate limiting
    tokenBucket({
      mode: "LIVE",
      refillRate: 2,
      interval: 3600,
      capacity: 2,
    }),
  ],
});

export default aj;