import { useTaskStore } from "../useTaskStore";

describe("useTaskStore", () => {
  beforeEach(() => {
    useTaskStore.setState({ tasks: [] });
  });

  it("should add a task", () => {
    useTaskStore.getState().addTask("Nueva tarea");
    const [task] = useTaskStore.getState().tasks;

    expect(task).toBeDefined();
    expect(task.description).toBe("Nueva tarea");
    expect(task.completed).toBe(false);
  });

  it("should toggle a task", () => {
    useTaskStore.getState().addTask("Tarea");
    const [task] = useTaskStore.getState().tasks;
    useTaskStore.getState().toggleTask(task.id);
    const [updatedTask] = useTaskStore.getState().tasks;

    expect(updatedTask.completed).toBe(true);
  });

  it("should delete a task", () => {
    useTaskStore.getState().addTask("Tarea");
    const [task] = useTaskStore.getState().tasks;
    useTaskStore.getState().deleteTask(task.id);

    expect(useTaskStore.getState().tasks.length).toBe(0);
  });

  it("should clear only completed tasks", () => {
    useTaskStore.getState().addTask("Tarea 1");
    useTaskStore.getState().addTask("Tarea 2");

    const [task1, task2] = useTaskStore.getState().tasks;
    useTaskStore.getState().toggleTask(task1.id);
    useTaskStore.getState().clearCompleted();

    const tasks = useTaskStore.getState().tasks;
    expect(tasks.length).toBe(1);
    expect(tasks[0].id).toBe(task2.id);
    expect(tasks[0].completed).toBe(false);
  });

  it("should do nothing if there are no completed tasks", () => {
    useTaskStore.getState().addTask("Tarea 1");
    useTaskStore.getState().addTask("Tarea 2");
    useTaskStore.getState().clearCompleted();
    const tasks = useTaskStore.getState().tasks;
    expect(tasks.length).toBe(2);
  });

  it("should remove all tasks if all are completed", () => {
    useTaskStore.getState().addTask("Tarea 1");
    useTaskStore.getState().addTask("Tarea 2");
    const [task1, task2] = useTaskStore.getState().tasks;
    useTaskStore.getState().toggleTask(task1.id);
    useTaskStore.getState().toggleTask(task2.id);
    useTaskStore.getState().clearCompleted();
    const tasks = useTaskStore.getState().tasks;
    expect(tasks.length).toBe(0);
  });
});
