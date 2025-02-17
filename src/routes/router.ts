import { IncomingMessage, ServerResponse } from 'http';
import { Method, RouteHandler } from 'src/types';

const response = (res: ServerResponse) => (statusCode: number, data: any) => {
  try {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });

    res.end(JSON.stringify(data));
  } catch (error) {
    console.error('Error serializing response data:', error);

    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal Server Error' }));
  }
};

export const requestBody = async (req: IncomingMessage): Promise<any> => {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (chunk) => (body += chunk));

    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error('Invalid JSON'));
      }
    });

    req.on('error', reject);
  });
};

export class Routes {
  private static routes: RouteHandler[] = [];

  static addRoute(
    method: Method,
    url: string,
    handler: (
      response: (statusCode: number, data: any) => void,
      data: any
    ) => void
  ) {
    this.routes.push({ method, url, handler });
  }

  static async resolve(req: IncomingMessage, res: ServerResponse) {
    const { method, url } = req;
    const route = this.routes.find(
      (route) => route.method === method && route.url === url
    );

    if (!route) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Route not found' }));
      return;
    }

    const sendResponse = response(res);

    try {
      let data = null;

      if (['POST', 'PUT', 'DELETE'].includes(method || '')) {
        data = await requestBody(req);
      }

      route.handler(sendResponse, data);
    } catch (error) {
      console.error('Error handling request:', error);
      sendResponse(400, { error: error || 'Bad Request' });
    }
  }
}
