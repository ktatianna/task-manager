'use client'

import { useTaskStore } from "@/app/store/useTaskStore"
import TaskItem from "../TaskItem"
import styles from "./index.module.css"
import EmptyState from "../EmptyState"

const TaskList = () => {
  const tasks = useTaskStore((state) => state.tasks)
  const clearCompleted = useTaskStore((state) => state.clearCompleted)
  const hasCompleted = tasks.some(task => task.completed)

  if (tasks.length === 0) {
    return <EmptyState />
  }

  return (
    <>
      {hasCompleted && (
        <button
          onClick={clearCompleted}
          className={styles.clearCompletedBtn}
        >
          Delete completed tasks
        </button>
      )}
      <ul className={styles.list}>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
          />
        ))}
      </ul>
    </>
  )
}

export default TaskList;