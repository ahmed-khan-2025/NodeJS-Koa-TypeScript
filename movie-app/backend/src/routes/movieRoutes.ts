import Router from 'koa-router';
import { Context } from 'koa';
import * as MovieModel from '../models/Movie';
import { Movie } from '../types/movie';
const router = new Router();

router.get('/movies', (ctx: Context) => {
  ctx.body = MovieModel.getAllMovies();
});

router.post('/movies', (ctx: Context) => {
  const { title, director, year } = ctx.request.body as Movie;

  if (!title || !director || !year) {
    ctx.status = 400;
    ctx.body = { error: 'Missing fields' };
    return;
  }

  const id = MovieModel.addMovie({ title, director, year });
  ctx.status = 201;
  ctx.body = { id };
});

router.delete('/movies/:id', (ctx: Context) => {
  const id = Number(ctx.params.id);

  if (isNaN(id)) {
    ctx.status = 400;
    ctx.body = { error: 'Invalid movie ID' };
    return;
  }
  const success = MovieModel.deleteMovie(id);
  if (success) {
    ctx.status = 200;
    ctx.body = { message: 'Movie deleted successfully' };
  } else {
    ctx.status = 404;
    ctx.body = { error: 'Movie not found' };
  }
});
router.put('/movies/:id', (ctx: Context) => {
  const id = Number(ctx.params.id);
  const { title, director, year } = ctx.request.body as Movie;

  if (!title || !director || !year) {
    ctx.status = 400;
    ctx.body = { error: 'Missing fields' };
    return;
  }

  const success = MovieModel.updateMovie(id, { title, director, year });
  if (success) {
    ctx.body = { message: 'Updated' };
  } else {
    ctx.status = 404;
    ctx.body = { error: 'Movie not found' };
  }
});

export default router;
