'use client'

import { useEffect, useState } from "react"
import { useTaskStore } from "@/app/store/useTaskStore"
import { loadTasksFromStorage } from "@/app/utils/storage"
import TaskItem from "../TaskItem"
import styles from "./index.module.css"
import EmptyState from "../EmptyState"

const TaskList = () => {
  const tasks = useTaskStore((state) => state.tasks)
  const setTasks = useTaskStore((state) => state.setTasks)
  const clearCompleted = useTaskStore((state) => state.clearCompleted)
  const hasCompleted = tasks.some(task => task.completed)

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const tasksFromStorage = loadTasksFromStorage();
    setTasks(tasksFromStorage)
    setIsLoaded(true)
  }, [setTasks]);

  if (!isLoaded) {
    return <div  className={styles.loading}>Loading tasks...</div>
  }

  if (tasks.length === 0) {
    return <EmptyState />
  }

  return (
    <>
      <ul className={styles.list}>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
          />
        ))}
      </ul>
      {hasCompleted && (
        <button
          onClick={clearCompleted}
          className={styles.clearCompletedBtn}
        >
          Delete completed tasks
        </button>
      )}
    </>
  )
}

export default TaskList;