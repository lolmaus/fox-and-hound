import { loadEnv } from 'vite';
import dotenvExpand from 'dotenv-expand';

import { migrate } from 'drizzle-orm/postgres-js/migrator';

// @ts-expect-error This is a script loaded by `tsm`, it works like this.
import { conn } from './conn.server.ts';

const env = loadEnv('development', process.cwd(), '');
dotenvExpand.expand({ parsed: env });

await migrate(conn, { migrationsFolder: './drizzle' });

console.info('Migrations complete');

process.exit(0);
