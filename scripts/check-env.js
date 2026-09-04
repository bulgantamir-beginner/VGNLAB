/**
 * Validates required environment variables before the app starts.
 * Runs automatically via the "predev"/"prebuild"/"prestart" npm scripts.
 */
require("dotenv").config();

const required = ["DATABASE_URL", "JWT_SECRET"];
const recommended = ["ADMIN_BOOTSTRAP_SECRET"];

let hasError = false;

for (const key of required) {
  if (!process.env[key]) {
    console.error(`❌ Missing required environment variable: ${key}`);
    hasError = true;
  }
}

for (const key of recommended) {
  if (!process.env[key]) {
    console.warn(
      `⚠️  ${key} is not set — you won't be able to create the first admin account via /api/auth/register.`
    );
  }
}

if (process.env.NODE_ENV === "production" && (process.env.JWT_SECRET || "").length < 32) {
  console.error("❌ JWT_SECRET should be at least 32 random characters in production.");
  hasError = true;
}

if (process.env.DATABASE_URL && /\/DATABASE\?/.test(process.env.DATABASE_URL)) {
  console.warn(
    '⚠️  DATABASE_URL points at a database literally named "DATABASE" — this looks like a leftover placeholder. Consider renaming it to something like "vgn".'
  );
}

if (hasError) {
  console.error("\nFix the issues above (usually in your .env file) before continuing.\n");
  process.exit(1);
}

console.log("✅ Environment check passed.");
