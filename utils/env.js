const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

function loadEnv() {
  const envFilePath = path.resolve(__dirname, "../.env.local");
  if (fs.existsSync(envFilePath)) {
    dotenv.config({ path: envFilePath });
  }
}
function updateEnv(key, value) {
  const envFilePath = path.resolve(__dirname, "../.env.local");

  const envVariables = fs.existsSync(envFilePath)
    ? dotenv.parse(fs.readFileSync(envFilePath))
    : {};

  envVariables[key] = value;

  const envFileContent = Object.entries(envVariables)
    .map(([k, v]) => `${k}=${v}`)
    .join("\n");

  fs.writeFileSync(envFilePath, envFileContent, { encoding: "utf8" });
}

module.exports = {
  loadEnv,
  updateEnv,
};
