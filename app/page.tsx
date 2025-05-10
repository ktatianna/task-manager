import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>To do List</h1>
      <TaskForm />
      <TaskList />
    </main>
  );
}
