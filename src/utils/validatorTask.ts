import { Task } from 'src/types';

export const validateTask = (data: Task | null) => {
  if (!data) {
    console.error('No data provided.');

    return false;
  }

  const { description, priority } = data;

  if (typeof description !== 'string' || description.trim().length < 3) {
    console.error('Description must be a string with at least 3 characters.');
    return false;
  }

  if (typeof priority !== 'number') {
    console.error('Priority must be a number.');
    return false;
  }

  return true;
};
