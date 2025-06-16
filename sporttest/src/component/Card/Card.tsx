import React from "react";
import styles from "./Card.module.css";

interface Props {
  id: string;
  name: string;
  type: string;
  alternateName?: string;
  onClick: (params: { id: string; name: string }) => void;
}

const Card: React.FC<Props> = (props) => {
  const { id, name, type, alternateName = "", onClick } = props;
  return (
    <div className={styles.card} onClick={() => onClick({ id, name })}>
      <div className={styles.name}>{name}</div>
      <div className={styles.type}>{type}</div>
      <div className={styles.altName}>{alternateName}</div>
    </div>
  );
};

export default Card;
