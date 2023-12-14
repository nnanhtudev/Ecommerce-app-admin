// config/index.js
import "dotenv/config";
import devConfig from "./development";
import prodConfig from "./production";

const environment = process.env.NODE_ENV || "production";
const config = environment === "development" ? devConfig : prodConfig;
console.log("Environment: " + environment);

export default config;
