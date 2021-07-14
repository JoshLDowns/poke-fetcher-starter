const PokeList = ({ pokeData, handleModalOpen }) => {
  return (
    <div className="poke-list">
      {pokeData ? (
        pokeData.map((pokemon, index) => (
          <div
            className="poke-list-item"
            key={index}
            onClick={() => handleModalOpen(pokemon.url)}
          >
            <p>{pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PokeList;
