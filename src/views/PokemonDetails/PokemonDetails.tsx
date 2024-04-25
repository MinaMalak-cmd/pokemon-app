import { FC, useEffect, memo, useMemo, useCallback } from "react";
import { PokemonPartial } from "../../types/types";
import styles from "./PokemonDetails.module.scss";
import getPokemonImageUrl from "../../utils/getPokemonImageUrl";
import PokemonDetailsPropertyWrapper from "./partials/PokemonDetailsPropertyWrapper";

interface PokemonDetailsProps {
  pokemonData: PokemonPartial;
}
const PokemonDetails: FC<PokemonDetailsProps> = ({ pokemonData }) => {
  console.log("🚀 ~ pokemonData:", pokemonData);
  const imgSrc = getPokemonImageUrl(pokemonData?.id);
  const valueOrEmpty = useCallback((key:string) => {
    return pokemonData[key as keyof PokemonPartial] || '';  
  },[])
  const formattedName = useMemo(() => {
    return valueOrEmpty('name') as any
  }, [])
  const formattedHeight = useMemo(() => {
    return `${valueOrEmpty('height')} cm`
  }, []);
  const formattedWeight = useMemo(() => {
    return `${valueOrEmpty('weight')} kg`
  }, []);
  return (
    <section>
      <h3 className={styles["pokemon-details-header"]}>{formattedName}</h3>
      <img src={imgSrc} alt="pokemon" className={styles['pokemon-details-image']}/>
      <PokemonDetailsPropertyWrapper title="Name" value={formattedName}/>
      <PokemonDetailsPropertyWrapper title="Height" value={formattedHeight}/>
      <PokemonDetailsPropertyWrapper title="Weight" value={formattedWeight}/>
      <PokemonDetailsPropertyWrapper title="Types" value={'ddfk'}/>

      <div className={styles['outer-border']}></div>
    </section>
  );
};

export default memo(PokemonDetails);
