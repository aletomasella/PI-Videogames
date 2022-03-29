import React from "react";

function Pages({ gamesXpage, videogames, handlePage }) {
  const pageNumbers = [];

  for (let i = 1; i < Math.ceil(videogames / gamesXpage) + 1; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <nav>
        <ul>
          {pageNumbers.length &&
            pageNumbers.map((number) => {
              return (
                <li key={number}>
                  <button onClick={(e) => handlePage(number)}>{number}</button>
                </li>
              );
            })}
        </ul>
      </nav>
    </>
  );
}

export default Pages;
