import { Task } from "../types/task";

const TASKS_KEY = "tasks";

export function saveTasksToStorage(tasks: Task[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }
}

export function loadTasksFromStorage(): Task[] {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(TASKS_KEY);
    if (data) return JSON.parse(data);
  }
  return [];
}