import { FC } from "react";
import styles from "./PokemonDetailsPropertyWrapper.module.scss";

interface PropertyWrapperProps {
  title : string;
  value: string | Number;
  isType?: boolean
}
const PokemonDetailsPropertyWrapper:FC<PropertyWrapperProps> = ({title, value, isType=false}) => {
  return (
    <div className={styles["property-wrapper"]}>
      <p className={styles["property-title"]}>{title}</p>
      <span>{value.toString()}</span>
    </div>
  );
};

export default PokemonDetailsPropertyWrapper;
