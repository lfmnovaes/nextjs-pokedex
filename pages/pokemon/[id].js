import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Details.module.css';

export default function Details() {
  const {
    query: { id },
  } = useRouter();

  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    async function getPokemons() {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      setPokemon(data);
    }
    if (id) {
      getPokemons();
    }
  }, []);

  if (!pokemon) {
    return null;
  }

  return (
    <div>
      <Head>
        <title>{pokemon.name}</title>
      </Head>
      <div>
        <Link href="/">
          <a>Back to Home</a>
        </Link>
      </div>
      <div className={styles.layout}>
        <div>
          <img
            className={styles.picture}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
            alt={pokemon.name}
          />
        </div>
        <div>
          <div className={styles.name}>{pokemon.name}</div>
          <div className={styles.type}>
            {pokemon.types[0].type.name}
            {pokemon.types[1] !== undefined && (
              <>
                {', '}
                {pokemon.types[1].type.name}
              </>
            )}
          </div>
          <table>
            <thead className={styles.header}>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.stats.map((stats) => (
                <tr key={stats.stat.name}>
                  <td className={styles.attribute}>{stats.stat.name}</td>
                  <td>{stats.base_stat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
