import { useState, useEffect } from "react";

const PokeDisplay = ({ url, handleModalClose }) => {
  const [pokemon, setPokemon] = useState(null);

  const determineHeight = (height) => {
    return `${Math.round(Math.floor((height * 3.937) / 12))}' ${(
      (height * 3.937) %
      12
    ).toFixed(1)}"`;
  };

  useEffect(() => {
    if (!pokemon) {
      fetch(url)
        .then((res) => res.json())
        .then((obj) => {
          console.log(obj);
          setPokemon({
            name: obj.name,
            types: obj.types,
            sprite: obj.sprites.front_default,
            height: obj.height,
            weight: obj.weight,
          });
        });
    }
  }, [pokemon, url]);

  return (
    <div className="poke-display">
      {pokemon ? (
        <div className="inner-poke-display">
          <button
            className="close-button"
            onClick={() => {
              setPokemon(null);
              handleModalClose();
            }}
          >
            X
          </button>
          <h2>{pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</h2>
          <div className="sprite-wrapper">
            <img
              src={pokemon.sprite}
              alt={pokemon.name}
              className="poke-sprite"
            />
          </div>
          <p>
            {pokemon.types
              .map(
                (obj) => obj.type.name[0].toUpperCase() + obj.type.name.slice(1)
              )
              .join(" / ")}
          </p>
          <p>{`Height: ${determineHeight(pokemon.height)}`}</p>
          <p>{`Weight: ${Math.round(pokemon.weight / 4.536)} lbs`}</p>
        </div>
      ) : (
        <p>...loading</p>
      )}
    </div>
  );
};

export default PokeDisplay;
