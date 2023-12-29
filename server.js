import { fastify } from 'fastify';
// import { LocalDatabase } from './local-database.js';
import { PostgresDatabase } from './postgres-database.js';

const server = fastify();

// const database = new LocalDatabase();
const database = new PostgresDatabase();

server.post('/videos', async (req, res) => {
  try {
    const { title, description, duration } = req.body;

    await database.create({
      title,
      description,
      duration,
    });
    return res.status(201).send(); // 201: means "CREATED"
  } catch (err) {
    console.error(err);
  }
});

server.get('/videos', async (req, res) => {
  try {
    const { search } = req.query;
    const videos = await database.list(search);

    return res.send(videos); // 200: default of any "get" request. Means "OK"
  } catch (err) {
    console.error(err);
  }
});

server.put('/videos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, duration } = req.body;

    await database.update(id, { title, description, duration });

    return res.status(204).send(); // 204: means "NO CONTENT" (understand as an OK!)
  } catch (err) {
    console.error(err);
  }
});

server.delete('/videos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await database.delete(id);
    return res.status(204).send();
  } catch (err) {
    console.error(err);
  }
});

server.listen({ port: 3333 ?? process.env.PORT });
