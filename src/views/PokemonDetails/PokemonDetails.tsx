import { FC, memo, useMemo, useCallback } from "react";
import { PokemonPartial } from "../../types";
import styles from "./PokemonDetails.module.scss";
import getPokemonImageUrl from "../../utils/getPokemonImageUrl";
import PokemonDetailsPropertyWrapper from "./partials/PokemonDetailsPropertyWrapper";
import formatPokemonTypes from "../../utils/formatPokemonType";
import { useSelectState } from "../../store/slices/pokemonSlice";
import { useGetPokemonItemByIdQuery } from "../../services/pokemonApi";
import { useTypedSelector } from "../../store/store-hooks";

const PokemonDetails: FC = () => {
  const pokemonId = useTypedSelector(useSelectState('pokemonId')) || '';
  useGetPokemonItemByIdQuery(pokemonId);
  const pokemonData = useTypedSelector(useSelectState('selectedPokemon'));
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
      <PokemonDetailsPropertyWrapper title="Name" value={formattedName} key="Name"/>
      <PokemonDetailsPropertyWrapper title="Height" value={formattedHeight} key="Height"/>
      <PokemonDetailsPropertyWrapper title="Weight" value={formattedWeight} key="Weight"/>
      <PokemonDetailsPropertyWrapper title="Types" value={formattedTypes} isType={true} key="Types"/>
      <div className={styles['outer-border']}></div>
    </section>
  );
};

export default memo(PokemonDetails);
