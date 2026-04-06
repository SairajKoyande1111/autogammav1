module.exports = {
  apps: [
    {
      name: "autogamma",
      script: "./dist/index.cjs",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: 3005,

        // ─── Database ───────────────────────────────────────────────────────────
        // PostgreSQL connection string
        // Format: postgresql://USER:PASSWORD@HOST:5432/DATABASE_NAME
        DATABASE_URL: "postgresql://postgres:yourpassword@localhost:5432/autogamma",

        // ─── Email (SMTP) ────────────────────────────────────────────────────────
        EMAIL_HOST: "smtp.gmail.com",
        EMAIL_PORT: 587,
        EMAIL_USER: "your-email@gmail.com",
        EMAIL_PASSWORD: "your-app-password",

        // ─── Recipient ───────────────────────────────────────────────────────────
        // Who receives contact / booking / warranty form submissions
        RECIPIENT_EMAIL: "info@autogamma.in",
      },
    },
  ],
};
