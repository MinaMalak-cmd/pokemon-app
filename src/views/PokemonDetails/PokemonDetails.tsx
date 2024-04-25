import { FC, useEffect, memo, useMemo, useCallback } from "react";
import { PokemonPartial } from "../../types/types";
import styles from "./PokemonDetails.module.scss";
import getPokemonImageUrl from "../../utils/getPokemonImageUrl";
import PokemonDetailsPropertyWrapper from "./partials/PokemonDetailsPropertyWrapper";
import formatPokemonTypes from "../../utils/formatPokemonType";
import { useSelector } from "react-redux";
import { selectedPokemon } from "../../store/slices/pokemonSlice";

const PokemonDetails: FC = () => {
  const pokemonData = useSelector(selectedPokemon);

  const imgSrc = getPokemonImageUrl(pokemonData?.id);
  const valueOrEmpty = useCallback((key:string) => {
    return pokemonData && pokemonData[key as keyof PokemonPartial] ? pokemonData[key as keyof PokemonPartial] : '';  
  },[pokemonData])
  const formattedName = useMemo(() => {
    return valueOrEmpty('name') as any
  }, [valueOrEmpty])
  const formattedHeight = useMemo(() => {
    return `${valueOrEmpty('height')} cm`
  }, [valueOrEmpty]);
  const formattedWeight = useMemo(() => {
    return `${valueOrEmpty('weight')} kg`
  }, [valueOrEmpty]);
  const formattedTypes = useMemo(() => {
    return formatPokemonTypes(pokemonData?.types);
  }, [pokemonData?.types])
  return (
    <section>
      <h3 className={styles["pokemon-details-header"]}>{formattedName}</h3>
      <img src={imgSrc} alt="pokemon" className={styles['pokemon-details-image']}/>
      <PokemonDetailsPropertyWrapper title="Name" value={formattedName}/>
      <PokemonDetailsPropertyWrapper title="Height" value={formattedHeight}/>
      <PokemonDetailsPropertyWrapper title="Weight" value={formattedWeight}/>
      <PokemonDetailsPropertyWrapper title="Types" value={formattedTypes} isType={true}/>
      <div className={styles['outer-border']}></div>
    </section>
  );
};

export default memo(PokemonDetails);
