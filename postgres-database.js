import { randomUUID } from 'node:crypto';
import { sql } from './db.js';

export class PostgresDatabase {
  async list(search) {
    let videos;

    if (search) {
      videos = await sql`SELECT * from videos WHERE title ilike ${
        '%' + search + '%'
      }`;
    } else {
      videos = await sql`SELECT * from videos`;
    }

    return videos;
  }
  async create(video) {
    const videoId = randomUUID();
    const { title, description, duration } = video;
    await sql`INSERT into videos (id, title, description, duration) VALUES (${videoId}, ${title}, ${description}, ${duration}) `;
  }
  async update(id, video) {
    const { title, description, duration } = video;

    await sql`UPDATE videos SET title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${id}`;
  }
  async delete(duration) {
    await sql`DELETE from videos WHERE id = ${id}`;
  }
}
