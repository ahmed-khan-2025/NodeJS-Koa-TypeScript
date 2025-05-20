import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import router from './routes/movieRoutes';
import serve from 'koa-static';
import path from 'path';

const app = new Koa();
app.use(bodyParser());

// API routes
app.use(router.routes()).use(router.allowedMethods());

// Serve frontend
app.use(serve(path.join(__dirname, '../../frontend')));
app.use(serve(path.join(__dirname, '../../frontend', 'public')));
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
