"use client";

import { IoTrashOutline } from "react-icons/io5";

import { Task } from "@/app/types/task";
import { useTaskStore } from "@/app/store/useTaskStore";

import styles from "./index.module.css";

type Props = {
  task: Task;
};

const TaskItem = ({ task }: Props) => {
  const toggleTask = useTaskStore((state) => state.toggleTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  return (
    <li className={`${styles.task} ${task.completed ? styles.completed : ""}`}>
      <div className={styles.taskContent}>
        <input
          type="checkbox"
          checked={task.completed}
          id={task.id}
          onChange={() => toggleTask(task.id)}
          aria-label={task.description}
          className={styles.checkbox}
        />
        <span className={styles.description}>{task.description}</span>
      </div>
      <button
        onClick={() => deleteTask(task.id)}
        aria-label="Delete task"
        className={styles.deleteButton}
      >
        <IoTrashOutline size={20} />
      </button>
    </li>
  );
};

export default TaskItem;
