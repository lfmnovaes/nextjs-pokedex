import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    async function getPokemons() {
      const response = await fetch(
        'https://pokeapi.co/api/v2/pokemon?limit=50'
      );
      const data = await response.json();
      setPokemon(data.results);
    }
    getPokemons();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon List</title>
      </Head>
      <h2>Pokemon List</h2>
      <div className={styles.grid}>
        {pokemon.map((pokemon) => (
          <div className={styles.card} key={pokemon.url.split('/')[6]}>
            <Link href={`/pokemon/${pokemon.url.split('/')[6]}`}>
              <a>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
                    pokemon.url.split('/')[6]
                  }.svg`}
                  alt={pokemon.name}
                />
                <h3>{pokemon.name}</h3>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
