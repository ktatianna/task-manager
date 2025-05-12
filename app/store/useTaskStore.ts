import { create } from "zustand";
import { Task } from "../types/task";
import { v4 as uuidv4 } from "uuid";
import { saveTasksToStorage } from "../utils/storage";

interface TaskStore {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (description: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  clearCompleted: () => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  addTask: (description) =>
    set((state) => {
      const newTasks = [...state.tasks, { id: uuidv4(), description, completed: false }];
      saveTasksToStorage(newTasks);
      return { tasks: newTasks };
    }),
  toggleTask: (id) =>
    set((state) => {
      const newTasks = state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      saveTasksToStorage(newTasks);
      return { tasks: newTasks };
    }),
  deleteTask: (id) =>
    set((state) => {
      const newTasks = state.tasks.filter((task) => task.id !== id);
      saveTasksToStorage(newTasks);
      return { tasks: newTasks };
    }),
  clearCompleted: () =>
    set((state) => {
      const newTasks = state.tasks.filter((task) => !task.completed);
      saveTasksToStorage(newTasks);
      return { tasks: newTasks };
    }),
}));
