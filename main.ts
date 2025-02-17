import http from 'http';

import { Routes } from '@routes/router';
import {
  addTask,
  deleteTask,
  deleteTaskCompleted,
  getTasks,
  updatedTask,
} from '@controllers/taskController';

const PORT = 3000;

const URL_PREFIX = '/api/task';

Routes.addRoute('GET', '/api', (response) => {
  response(200, { message: 'Welcome to the home page!' });
});

Routes.addRoute('GET', `${URL_PREFIX}/get-all`, getTasks);

Routes.addRoute('POST', `${URL_PREFIX}/create`, addTask);

Routes.addRoute('PUT', `${URL_PREFIX}/edit`, updatedTask);

Routes.addRoute('DELETE', `${URL_PREFIX}/remove`, deleteTask);

Routes.addRoute('DELETE', `${URL_PREFIX}/clear-completed`, deleteTaskCompleted);

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204); // No Content
    res.end();
    return;
  }

  Routes.resolve(req, res);
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
