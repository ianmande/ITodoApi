// Logical of business
export interface Task {
  id: number;
  description: string;
  completed: boolean;
  priority: number;
}

//types of routes
export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface RouteHandler {
  method: Method;
  url: string;
  handler: (
    response: (statusCode: number, data: any) => void,
    data: any
  ) => void;
}

// types of controle
export type Controller = (
  response: (statusCode: number, data: any) => void,
  data: any
) => void;
