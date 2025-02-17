import { Database } from 'better-sqlite3';
import { Task } from '../types';
import db from '@data/database';

class TaskModelDB {
  private db: Database;

  constructor(database: Database) {
    this.db = database;
  }

  save(description: string, priority: number): Task {
    const result = this.db
      .prepare(
        'INSERT INTO tasks (description, completed, priority) VALUES (?, ?, ?)'
      )
      .run(description, 0, priority);

    return {
      id: Number(result.lastInsertRowid),
      description,
      completed: false,
      priority,
    };
  }

  get(id?: number): Task | Task[] | null {
    if (id) {
      const task = this.db
        .prepare('SELECT * FROM tasks WHERE id = ?')
        .get(id) as Task;
      return task || null;
    }
    const tasks = this.db.prepare('SELECT * FROM tasks').all() as Task[];

    return tasks;
  }

  deleteCompleted() {
    try {
      const result = this.db
        .prepare('DELETE FROM tasks WHERE completed = ?')
        .run(1);
      console.log(`Deleted ${result.changes} completed tasks`);
      return result.changes > 0;
    } catch (error) {
      console.error('Error deleting completed tasks:', error);
    }
  }

  put(id: number, task: Partial<Task>): Task | null {
    const existingTask = this.get(id) as Task;

    if (!existingTask) return null;

    const updatedTask = {
      ...existingTask,
      ...task,
    };

    this.db
      .prepare(
        'UPDATE tasks SET description = ?, completed = ?, priority = ? WHERE id = ?'
      )
      .run(
        updatedTask.description,
        updatedTask.completed ? 1 : 0,
        updatedTask.priority,
        id
      );

    return updatedTask;
  }

  delete(id: number): boolean {
    const existingTask = this.get(id) as Task;

    if (!existingTask) return false;

    const result = this.db.prepare('DELETE FROM tasks WHERE id = ?').run(id);
    return result.changes > 0;
  }
}

const TaskModel = new TaskModelDB(db);

export { TaskModelDB, TaskModel };
