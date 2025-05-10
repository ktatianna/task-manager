"use client";

import { useState } from "react";
import { useTaskStore } from "@/app/store/useTaskStore";

import styles from "./index.module.css";

const TaskForm = () => {
  const [description, setDescription] = useState("");
  const addTask = useTaskStore((state) => state.addTask);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim() === "") {
      return;
    }
    addTask(description.trim());
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        className={styles.input}
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Add a new task"
        aria-label="Add a new task"
      />
      <button
        className={styles.button}
        type="submit"
      >
        Add
      </button>
    </form>
  );
};

export default TaskForm;
