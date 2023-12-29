/**
 * all statements here is just for pre-create a table in neon postgress database
 */
import { sql } from './db.js';

sql`
  CREATE TABLE videos (
    title TEXT,
    description TEXT,
    duration INTEGER
  );
`.then(() => console.log('Table created!'));
