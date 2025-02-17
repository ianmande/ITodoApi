import Database from 'better-sqlite3';
import { TaskModelDB } from '@models/taskModel';

describe('TaskModel', () => {
  let db;
  let taskModel: TaskModelDB;

  beforeEach(() => {
    db = new Database(':memory:');
    db.exec(`
      CREATE TABLE tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        description TEXT NOT NULL,
        completed INTEGER NOT NULL DEFAULT 0,
        priority INTEGER NOT NULL DEFAULT 3
      );
    `);

    taskModel = new TaskModelDB(db);
  });

  it('should save a new task', () => {
    const task = taskModel.save('Learn Jest', 1);
    expect(task).toEqual({
      id: 1,
      description: 'Learn Jest',
      completed: false,
      priority: 1,
    });
  });

  it('should retrieve all tasks', () => {
    taskModel.save('Task 1', 1);
    taskModel.save('Task 2', 2);

    const tasks = taskModel.get();
    expect(tasks).toHaveLength(2);
  });

  it('should update an existing task', () => {
    const task = taskModel.save('Task to update', 1);
    const updatedTask = taskModel.put(task.id, { completed: true });

    expect(updatedTask).toEqual({
      id: task.id,
      description: 'Task to update',
      completed: true,
      priority: 1,
    });
  });

  it('should delete an existing task', () => {
    const task = taskModel.save('Task to delete', 1);
    const result = taskModel.delete(task.id);

    expect(result).toBe(true);
    expect(taskModel.get()).toHaveLength(0);
  });

  it('should delete all completed tasks', () => {
    taskModel.save('Task 1', 1); // Not completed
    taskModel.save('Task 2', 2); // Not completed
    taskModel.save('Completed Task 1', 1); // Completed
    taskModel.save('Completed Task 2', 2); // Completed

    // Mark some tasks as completed
    taskModel.put(3, { completed: true });
    taskModel.put(4, { completed: true });

    // Ensure there are 4 tasks before deletion
    expect(taskModel.get()).toHaveLength(4);

    taskModel.deleteCompleted();

    const remainingTasks = taskModel.get();
    expect(remainingTasks).toHaveLength(2);
  });
});
