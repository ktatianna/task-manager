import Image from "next/image";
import styles from "./index.module.css";

const EmptyState = () => {
  return (
    <div className={styles.container}>
      <Image src="/lazy.jpg" alt="empty state" width={300} height={180} />
      <span className={styles.message}>You have no tasks yet</span>
    </div>
  );
};

export default EmptyState;