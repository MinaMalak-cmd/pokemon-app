import { FC, useEffect, memo, useMemo, useCallback, ReactNode } from "react";
import { PokemonPartial } from "../../types/types";
import styles from "./PokemonDetails.module.scss";
import getPokemonImageUrl from "../../utils/getPokemonImageUrl";
import PokemonDetailsPropertyWrapper from "./partials/PokemonDetailsPropertyWrapper";
import formatPokemonTypes from "../../utils/formatPokemonType";
import { useSelector } from "react-redux";
import { useSelectState } from "../../store/slices/pokemonSlice";
import { useGetPokemonItemByIdQuery } from "../../services/pokemonApi";

interface PokemonDetailsProps {
  pokemonId : string | number;
}
const PokemonDetails: FC<PokemonDetailsProps> = ({pokemonId}) => {
  useGetPokemonItemByIdQuery(pokemonId);
  const pokemonData = useSelector(useSelectState('selectedPokemon'));

  const imgSrc = getPokemonImageUrl(pokemonData?.id);
  const valueOrEmpty = useCallback((key:string) => {
    return pokemonData && pokemonData[key as keyof PokemonPartial] ? pokemonData[key as keyof PokemonPartial] : '';  
  },[pokemonData])
  // const formattedName = useMemo(() => {
  //   return valueOrEmpty('name') as any
  // }, [valueOrEmpty, pokemonData?.name])
  const formattedName = valueOrEmpty('name') as ReactNode;
  console.log("🚀 ~ formattedName:", formattedName)
  const formattedHeight = useMemo(() => {
    return `${valueOrEmpty('height')} cm`
  }, [valueOrEmpty, pokemonData?.height]);
  const formattedWeight = useMemo(() => {
    return `${valueOrEmpty('weight')} kg`
  }, [valueOrEmpty, pokemonData?.weight]);
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
