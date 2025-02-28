const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const selfsigned = require("selfsigned");

// Create certs directory if it doesn't exist
const certsDir = path.join(__dirname, "certs");
if (!fs.existsSync(certsDir)) {
    fs.mkdirSync(certsDir);
}

// Generate self-signed certificate
const attrs = [{ name: "commonName", value: "localhost" }];
const pems = selfsigned.generate(attrs, {
    algorithm: "sha256",
    days: 365,
    keySize: 2048,
});

// Write certificate files
fs.writeFileSync(path.join(certsDir, "server.key"), pems.private);
fs.writeFileSync(path.join(certsDir, "server.crt"), pems.cert);

console.log("Self-signed certificate generated successfully in the certs directory.");
