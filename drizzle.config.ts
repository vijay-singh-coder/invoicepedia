import { configDotenv } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

configDotenv({ path: './.env.local' });

export default defineConfig({
    out: './db/migrations',
    schema: './db/schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.XATA_DATABASE_URL!,
    },
});

