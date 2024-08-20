const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
  },
  jest: {
    configure: {
      moduleNameWrapper: {
        "^@(.*)$": "<rootDir>/src$1",
      },
    },
  },
};
