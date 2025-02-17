# Todo API

---

## Project Structure

```plaintext
back/
├── src/
│ ├── controllers/ # Request handlers for CRUD operations
│ ├── data/ # Data handling (e.g., SQLite database connection)
│ ├── models/ # Business logic and database interaction
│ ├── routes/ # Route definitions
│ ├── utils/ # Utility functions (e.g., validation)
│ ├── types.ts # TypeScript types for the application
├── main.ts # Server entry point
├── jest.config.js # Jest configuration for testing
├── package.json # Project dependencies and scripts
├── tsconfig.json # TypeScript configuration
├── package-lock.json # Dependency lock file
├── node_modules/ # Node.js dependencies
└── readme.md # Documentation (this file)
```

---

## Features

- **Add Todos:** Add a new task with a description and priority.
- **View Todos:** View all tasks or a specific task by ID.
- **Update Todos:** Update the description, completion status, or priority of a task.
- **Delete Todos:** Remove a task by ID.
- **Validation:** Ensures all inputs (e.g., `description`, `priority`) meet requirements.
- **SQLite Database:** Persists state using an SQLite database for lightweight storage.
- **Testing:** Comprehensive unit tests written with Jest.

---

## Scripts

The following scripts are defined in `package.json`:

| Command            | Description                                                                |
| ------------------ | -------------------------------------------------------------------------- |
| `npm run dev`      | Starts the server in development mode with hot-reloading.                  |
| `npm run build`    | Compiles TypeScript into JavaScript in the `dist` folder.                  |
| `npm run start`    | Runs the compiled server from the `dist` folder.                           |
| `npm test`         | Runs the unit tests using Jest.                                            |
| `npm run coverage` | Runs tests and generates a code coverage report in the `coverage/` folder. |

---

## Endpoints

| Method   | Endpoint     | Description           | Body (JSON)                                            |
| -------- | ------------ | --------------------- | ------------------------------------------------------ |
| `POST`   | `/tasks`     | Add a new task        | `{ "description": "Task", "priority": 1 }`             |
| `GET`    | `/tasks`     | Retrieve all tasks    | `-`                                                    |
| `GET`    | `/tasks/:id` | Retrieve a task by ID | `-`                                                    |
| `PUT`    | `/tasks/:id` | Update a task by ID   | `{ "description": "Updated Task", "completed": true }` |
| `DELETE` | `/tasks/:id` | Delete a task by ID   | `-`                                                    |

---

## Example Usage

**Adding a Task**:

```bash
curl -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d '{"description": "Learn Jest", "priority": 1}'
```

**Getting All Tasks**:

```bash
curl http://localhost:3000/tasks
```

**Updating a Task**:

```bash
curl -X PUT http://localhost:3000/tasks/1 -H "Content-Type: application/json" -d '{"description": "Learn TypeScript", "completed": true}'
```

**Deleting a Task**:

```bash
curl -X DELETE http://localhost:3000/tasks/1
```
