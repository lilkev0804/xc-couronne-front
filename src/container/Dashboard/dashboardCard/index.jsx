import React, { useCallback } from "react";
import styles from "./dashboardCard.module.scss";
import { useRouter } from "next/router";
export default function DashBoardCard({ onClick, label, children, target }) {
  const router = useRouter();
  const handleVisited = useCallback(() => {
    router.push(target);
    return;
  }, [router, target]);
  return (
    <div className={styles.container} onClick={handleVisited}>
      <h3>{label}</h3>
      <div>{children}</div>
    </div>
  );
}
