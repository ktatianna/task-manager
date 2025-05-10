import { create } from "zustand";
import { Task } from "../types/task";
import { v4 as uuidv4 } from "uuid";

interface TaskStore {
  tasks: Task[];
  addTask: (description: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  clearCompleted: () => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  addTask: (description) =>
    set((state) => ({
      tasks: [...state.tasks, { id: uuidv4(), description, completed: false }],
    })),
  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
  clearCompleted: () =>
    set((state) => ({
      tasks: state.tasks.filter((task) => !task.completed),
    })),
}));
