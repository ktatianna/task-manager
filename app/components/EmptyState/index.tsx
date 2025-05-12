import Image from "next/image";
import styles from "./index.module.css";

const EmptyState = () => {
  return (
    <div className={styles.container}>
      <Image src="/empty.jpg" alt="empty state" width={300} height={300} priority/>
      <span className={styles.message}>You have no tasks yet</span>
    </div>
  );
};

export default EmptyState;