import { useState, useEffect } from "react";
import "./styles/app.css";

import PokeList from "./components/PokeList";
import PokeDisplay from "./components/PokeDisplay";
import PokeQuery from "./components/PokeQuery";

const App = () => {
  const [pokeData, setPokeData] = useState(null);
  const [pokeList, setPokeList] = useState(null);
  const [links, setLinks] = useState({ next: null, prev: null });
  const [modal, setModal] = useState(false);

  const handleModalOpen = (url) => {
    setModal(url);
  };

  const handleModalClose = () => {
    setModal(false);
  };

  const handleFetch = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((obj) => {
        setPokeData(obj.results);
        setLinks({ next: obj.next, prev: obj.previous });
      });
  };

  const handlePagination = (type) => {
    let url = type === "next" ? links.next : links.prev;
    handleFetch(url);
  };

  useEffect(() => {
    if (!pokeData) {
      handleFetch("https://pokeapi.co/api/v2/pokemon");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!pokeList) {
      fetch("https://pokeapi.co/api/v2/pokemon?limit=1118")
        .then((res) => res.json())
        .then((obj) => {
          setPokeList(obj.results.map((pokemon) => pokemon.name));
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="main-wrapper">
      {modal && <PokeDisplay url={modal} handleModalClose={handleModalClose} />}
      <PokeQuery pokeList={pokeList} handleSubmit={handleModalOpen} />
      <div className="inner-wrapper">
        <button
          className="arrow-button"
          onClick={() => handlePagination("prev")}
          disabled={!links.prev}
        >
          {"<"}
        </button>
        <PokeList pokeData={pokeData} handleModalOpen={handleModalOpen} />
        <button
          className="arrow-button"
          onClick={() => handlePagination("next")}
          disabled={!links.next}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default App;
