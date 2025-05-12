import { saveTasksToStorage, loadTasksFromStorage } from "../../utils/storage";
import { Task } from "../../types/task";

describe("localStorage utils", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should save and load tasks", () => {
    const tasks: Task[] = [{ id: "1", description: "Test", completed: false }];
    saveTasksToStorage(tasks);
    const loaded = loadTasksFromStorage();
    expect(loaded).toEqual(tasks);
  });

  it("should return empty array if no tasks", () => {
    const loaded = loadTasksFromStorage();
    expect(loaded).toEqual([]);
  });
});
