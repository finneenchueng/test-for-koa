module.exports.isDev = process.env.NODE_ENV === "development";
module.exports.isLint = process.env.NODE_ENV === "lint";
module.exports.isProd = process.env.NODE_ENV === "production";
module.exports.isTest = process.env.NODE_ENV === "test";