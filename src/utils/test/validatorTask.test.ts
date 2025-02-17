import { validateTask } from '@utils/validatorTask';
import { Task } from 'src/types';

describe('validateTask', () => {
  it('Should return true for valid data', () => {
    const validTask: Task = {
      id: 1,
      description: 'Learn TypeScript',
      completed: false,
      priority: 1,
    };

    const result = validateTask(validTask);
    expect(result).toBe(true);
  });

  it('Should return false if data is null', () => {
    const result = validateTask(null);
    expect(result).toBe(false);
  });

  it('Should return false if description is too short', () => {
    const invalidTask: Task = {
      id: 1,
      description: 'Hi',
      completed: false,
      priority: 1,
    };

    const result = validateTask(invalidTask);
    expect(result).toBe(false);
  });

  it('Should return false if description is not a string', () => {
    const invalidTask = {
      id: 1,
      description: 123,
      completed: false,
      priority: 1,
    };

    const result = validateTask(invalidTask as unknown as Task);
    expect(result).toBe(false);
  });

  it('Should return false if priority is not a number', () => {
    const invalidTask = {
      id: 1,
      description: 'Learn Jest',
      completed: false,
      priority: 'high',
    };

    const result = validateTask(invalidTask as unknown as Task);
    expect(result).toBe(false);
  });
});
