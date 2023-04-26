import classNames from "classnames";
import React from "react";
import styles from "./RiderCard.module.scss";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Link from "next/link";
export default function RiderCard({ data, isWhite }) {
  return (
    <div
      className={classNames(styles.container, {
        [styles.whiteContainer]: isWhite,
      })}
    >
      <div className={styles.containerInfoCard}>
        <div className={styles.avatarNameContainer}>
          <div
            className={classNames(styles.avatarContainer, {
              [styles.whiteAvatar]: !isWhite,
            })}
          ></div>
          <p
            className={classNames(styles.name, {
              [styles.whiteName]: !isWhite,
            })}
          >
            {data?.username}
          </p>
        </div>
        <div>
          <Link href={`/profils/${data?.id}`}>
            <VisibilityIcon sx={{ color: isWhite ? "navy" : "white" }} />
          </Link>
        </div>
      </div>
    </div>
  );
}
