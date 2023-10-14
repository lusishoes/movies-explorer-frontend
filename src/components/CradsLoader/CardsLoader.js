import React from "react";
import "./CardsLoader.css";
function CardsLoader({ loadCrads }) {
  return (
    <button className="cards__loader" onClick={loadCrads}>
      Ещё
    </button>
  );
}

export default CardsLoader;
