import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Details.module.css';
import Image from 'next/image';

export async function getStaticPaths() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
  const data = await response.json();

  return {
    paths: data.results.map((pokemon) => ({
      params: { id: pokemon.url.split('/')[6].toString() },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${params.id}`
  );
  const data = await response.json();
  return {
    props: {
      pokemon: {
        id: data.id,
        name: data.name,
        types: data.types,
        stats: data.stats,
      }
    },
    // revalidate: 30,
  };
}

export default function Details({ pokemon }) {
  return (
    <div>
      <Head>
        <title>
          {pokemon.id} - {pokemon.name}
        </title>
      </Head>
      <div>
        <Link href="/">
          <a>Back to Home</a>
        </Link>
      </div>
      <div className={styles.layout}>
        <div>
          <Image
            className={styles.picture}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
            alt={pokemon.name}
            width="300"
            height="300"
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
