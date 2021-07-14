import { useState, useEffect } from "react";
import { useInput } from "../hooks/useInput";

const PokeQuery = ({ pokeList, handleSubmit }) => {
  const [availableNames, setAvailableNames] = useState([]);

  const {
    value: name,
    bind: bindName,
    reset: resetName,
    setValue: setName,
  } = useInput("");

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!pokeList.includes(name.trim().toLowerCase())) {
      setName("Invalid Pokemon Entry!");
    } else {
      handleSubmit(
        `https://pokeapi.co/api/v2/pokemon/${name.trim().toLowerCase()}`
      );
      setAvailableNames([]);
      resetName("");
    }
  };

  const handleClick = (event) => {
    handleSubmit(`https://pokeapi.co/api/v2/pokemon/${event.target.id}`)
  }

  useEffect(() => {
    if (name.length > 0) {
      console.log(name)
      let available = pokeList.filter((pokemon) =>
        pokemon.startsWith(`${name.trim().toLowerCase()}`)
      );
      setAvailableNames(available);
    }
    if (name.length === 0) setAvailableNames([]);
  }, [name, pokeList]);

  return (
    <form className="poke-query" onSubmit={handleFormSubmit}>
      <input
        autoComplete="off"
        type="text"
        className="text-input"
        {...bindName}
      />
      <input
        type="submit"
        value="Go!"
        className="submit-button"
        disabled={name.length === 0}
      />
      {availableNames.length > 0 && (
        <div className="available-names">
          {availableNames.map((name) => (
            <p
              key={name}
              id={name}
              className="available-name"
              onClick={(event) => {
                handleClick(event);
                setAvailableNames([]);
                resetName();
              }}
            >
              {name[0].toUpperCase() + name.slice(1)}
            </p>
          ))}
        </div>
      )}
    </form>
  );
};

export default PokeQuery;
