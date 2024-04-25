import { FC, memo, useMemo } from "react";
import styles from "./PokemonDetailsPropertyWrapper.module.scss";

interface PropertyWrapperProps {
  title: string;
  value: string | Number | string[];
  isType?: boolean;
}
const PokemonDetailsPropertyWrapper: FC<PropertyWrapperProps> = ({
  title,
  value,
  isType = false,
}) => {
  const propertyValue = useMemo(() => {
    return !isType ? (
      <span>{value.toString()}</span>
    ) : (
      <div>
        {Array.isArray(value) &&
          value?.map((type: string) => <div>{type}</div>)}
      </div>
    );
  }, []);
  return (
    <div className={styles["property-wrapper"]}>
      <p className={styles["property-title"]}>{title}</p>
      {propertyValue}
    </div>
  );
};

export default memo(PokemonDetailsPropertyWrapper);
