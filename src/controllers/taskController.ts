import { TaskModel } from '@models/taskModel';
import { validateTask } from '@utils/validatorTask';

import { Controller, Task } from 'src/types';

export const addTask: Controller = (response, data: Task | null) => {
  const validation = validateTask(data);

  if (!validation) {
    response(400, { error: 'Validation Error' });
    return;
  }

  if (data) {
    const { description, priority } = data;
    const task = TaskModel.save(description, priority);

    response(201, { data: task, message: 'Task created' });
  } else {
    response(400, { error: 'Bad Request' });
  }
};

export const getTasks: Controller = (response) => {
  const tasks = TaskModel.get();

  response(200, { data: tasks });
};

export const updatedTask: Controller = (response, data) => {
  const { id, task } = data;

  if (typeof id !== 'number' || !task) {
    response(400, { error: 'Bad Request' });
    return;
  }

  const updatedTask = TaskModel.put(id, task);

  if (!updatedTask) {
    response(404, { error: 'Task not found' });
    return;
  }

  response(200, { data: updatedTask, message: 'Update Task!' });
};

export const deleteTask: Controller = (response, data) => {
  const { id } = data;

  if (typeof id !== 'number') {
    console.error('Priority must be a number.');
    response(400, { error: 'Bad Request' });
    return;
  }

  const isRemoved = TaskModel.delete(id);

  if (!isRemoved) {
    response(404, { error: 'Task not found' });
    return;
  }

  response(200, { message: 'Task removed' });
};

export const deleteTaskCompleted: Controller = (response) => {
  const isClearCompletedTask = TaskModel.deleteCompleted();

  if (!isClearCompletedTask) {
    response(404, { error: 'Task not found' });
    return;
  }

  response(200, { message: 'Tasks removed' });
};
