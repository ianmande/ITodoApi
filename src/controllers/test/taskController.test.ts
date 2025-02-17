import {
  addTask,
  getTasks,
  updatedTask,
  deleteTask,
  deleteTaskCompleted,
} from '@controllers/taskController';
import { TaskModel } from '@models/taskModel';
import { validateTask } from '@utils/validatorTask';
import { Task } from 'src/types';

jest.mock('@models/taskModel');
jest.mock('@utils/validatorTask');

describe('Task Controller', () => {
  const mockResponse = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('addTask', () => {
    it('Should add a new task if validation succeeds', () => {
      const data: Task = {
        id: 1,
        description: 'Learn Jest',
        completed: false,
        priority: 1,
      };

      (validateTask as jest.Mock).mockReturnValue(true);
      (TaskModel.save as jest.Mock).mockReturnValue(data);

      addTask(mockResponse, data);

      expect(validateTask).toHaveBeenCalledWith(data);
      expect(TaskModel.save).toHaveBeenCalledWith(
        data.description,
        data.priority
      );
      expect(mockResponse).toHaveBeenCalledWith(201, {
        data,
        message: 'Task created',
      });
    });

    it('Should return an error if validation fails', () => {
      const data = null;

      (validateTask as jest.Mock).mockReturnValue(false);

      addTask(mockResponse, data);

      expect(validateTask).toHaveBeenCalledWith(data);
      expect(TaskModel.save).not.toHaveBeenCalled();
      expect(mockResponse).toHaveBeenCalledWith(400, {
        error: 'Validation Error',
      });
    });
  });

  describe('getTasks', () => {
    it('Should return all tasks', () => {
      const tasks = [
        { id: 1, description: 'Task 1', completed: false, priority: 1 },
        { id: 2, description: 'Task 2', completed: true, priority: 2 },
      ];

      (TaskModel.get as jest.Mock).mockReturnValue(tasks);

      getTasks(mockResponse, null);

      expect(TaskModel.get).toHaveBeenCalled();
      expect(mockResponse).toHaveBeenCalledWith(200, { data: tasks });
    });
  });

  describe('updatedTask', () => {
    it('Should update an existing task', () => {
      const data = {
        id: 1,
        task: { description: 'Updated Task', completed: true, priority: 2 },
      };

      const task = {
        id: 1,
        description: 'Updated Task',
        completed: true,
        priority: 2,
      };

      (TaskModel.put as jest.Mock).mockReturnValue(task);

      updatedTask(mockResponse, data);

      expect(TaskModel.put).toHaveBeenCalledWith(data.id, data.task);
      expect(mockResponse).toHaveBeenCalledWith(200, {
        data: task,
        message: 'Update Task!',
      });
    });

    it('Should return an error if the task does not exist', () => {
      const data = {
        id: 999,
        task: {
          description: 'Non-existent Task',
          completed: false,
          priority: 3,
        },
      };

      (TaskModel.put as jest.Mock).mockReturnValue(null);

      updatedTask(mockResponse, data);

      expect(TaskModel.put).toHaveBeenCalledWith(data.id, data.task);
      expect(mockResponse).toHaveBeenCalledWith(404, {
        error: 'Task not found',
      });
    });

    it('Should return an error if the data is invalid', () => {
      const data = { id: 'invalid', task: null };

      updatedTask(mockResponse, data);

      expect(TaskModel.put).not.toHaveBeenCalled();
      expect(mockResponse).toHaveBeenCalledWith(400, { error: 'Bad Request' });
    });
  });

  describe('deleteTask', () => {
    it('Should delete an existing task', () => {
      const data = { id: 1 };

      (TaskModel.delete as jest.Mock).mockReturnValue(true);

      deleteTask(mockResponse, data);

      expect(TaskModel.delete).toHaveBeenCalledWith(data.id);
      expect(mockResponse).toHaveBeenCalledWith(200, {
        message: 'Task removed',
      });
    });

    it('Should return an error if the task does not exist', () => {
      const data = { id: 999 };

      (TaskModel.delete as jest.Mock).mockReturnValue(false);

      deleteTask(mockResponse, data);

      expect(TaskModel.delete).toHaveBeenCalledWith(data.id);
      expect(mockResponse).toHaveBeenCalledWith(404, {
        error: 'Task not found',
      });
    });

    it('Should return an error if the ID is invalid', () => {
      const data = { id: 'invalid' };

      deleteTask(mockResponse, data);

      expect(TaskModel.delete).not.toHaveBeenCalled();
      expect(mockResponse).toHaveBeenCalledWith(400, { error: 'Bad Request' });
    });
  });

  describe('deleteCompleted', () => {
    it('Should delete all completed tasks', () => {
      (TaskModel.deleteCompleted as jest.Mock).mockReturnValue(true);

      deleteTaskCompleted(mockResponse, {});

      expect(TaskModel.deleteCompleted).toHaveBeenCalled();
      expect(mockResponse).toHaveBeenCalledWith(200, {
        message: 'Tasks removed',
      });
    });

    it('Should return an error if no completed tasks exist', () => {
      (TaskModel.deleteCompleted as jest.Mock).mockReturnValue(false);

      deleteTaskCompleted(mockResponse, {});

      expect(TaskModel.deleteCompleted).toHaveBeenCalled();
      expect(mockResponse).toHaveBeenCalledWith(404, {
        error: 'Task not found',
      });
    });
  });
});
