import classNames from "classnames";
import React from "react";
import styles from "./RiderCard.module.scss";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Link from "next/link";
import Image from "next/image";
import { formatPratique } from "@/utils/formatEnum";
export default function RiderCard({
  encadrant = false,
  data,
  isWhite,
  fullCard,
}) {
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
          >
            {data?.avatar && (
              <Image
                src={`/assets/avatar/${data?.avatar}`}
                alt="img"
                width={100}
                height={150}
                className={styles.avatar}
              />
            )}
          </div>
        </div>
        <div className={styles.leftCard}>
          <div className={styles.nameVisibCOntainer}>
            <p
              className={classNames(styles.name, {
                [styles.whiteName]: !isWhite,
              })}
            >
              {data?.username}
            </p>
            <Link href={`/profils/${data?.id}`}>
              <VisibilityIcon sx={{ color: isWhite ? "navy" : "white" }} />
            </Link>
          </div>
          {!fullCard && !encadrant && (
            <div className={styles.fullCardContainerWhite}>
              <p>
                🏴 Discipline :{" "}
                {data?.information?.pratiques?.map((el, i) => (
                  <span key={i} className={styles.word}>
                    {i !== 0 && " - "}
                    {formatPratique(el)}
                  </span>
                )) ?? "NC"}
              </p>
            </div>
          )}
        </div>
      </div>

      {fullCard && (
        <>
          <div className={styles.fullCardContainer}>
            <div>
              <p>
                🏴 Discipline :{" "}
                {data?.information?.pratiques?.map((el, i) => (
                  <span key={i} className={styles.word}>
                    {i !== 0 && " - "}
                    {formatPratique(el)}
                  </span>
                )) ?? "NC"}
              </p>
            </div>
          </div>
          <div className={styles.fullCardInline}>
            <div className={styles.fullCardContainer}>
              <div>
                <p>
                  🚵‍♀️ Nombre d&apos;Activités : {data?.participations.length}
                </p>
              </div>
            </div>
            <div className={styles.fullCardContainer}>
              <div>
                <p>🏆 Nombre de Podium : {data?.participations.length}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
