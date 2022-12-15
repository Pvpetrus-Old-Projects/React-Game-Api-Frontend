import React, {useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './games.module.css';

function Games(props){
  const [error,setError] = useState("");
  const [filter,setFilter] = useState("");
  const [sort,setSort] = useState("");
  const [games,setGames] = useState("");
  const defaultGames = () =>{
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '189b63fb8fmshed1746170f332a2p17de02jsn90473b3a1e05',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
    };
    fetch("https://free-to-play-games-database.p.rapidapi.com/api/games", options)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setGames(data);
    })
    .catch(err => console.error(err));
  }
  defaultGames();
  const sortGames = () => {
    console.log("Sorting games by: ",sort);
  }
  const filterGames = () => {
    console.log("Filtering games by name: ",filter);
  }
  return(
    <div className={styles.Login}>
      <p className={styles.Title}>Games</p>
      <div className={styles.Form}>
        <div>
          <p htmlFor="descending">Sort by name descending</p>
          <input
            type="radio"
            name="sort"
            autoComplete="off"
            value={sort}
            onChange={(e) => sortGames("descending")}
            className={styles.Button}
          />
          <p htmlFor="ascending">Sort by name ascending</p>
          <input
            type="radio"
            name="sort"
            value={sort}
            onChange={(e) => sortGames("ascending")}
            className={styles.Button}
          />
        </div>
        <div>
          <p htmlFor="username">Filter by name</p>
          <input
            type="username"
            name="username"
            id="username"
            autoComplete="off"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={styles.Button}
          />
        </div>
        <button onClick={ () => filterGames()}>
        Filter
        </button>
        <br></br>
        <p className="hiddenError">{error}</p>
        <p className="games">Games:</p>
        {games &&  <ul>{games.map((game) => {return (<li>{game.title}</li>)})}</ul>}
        <button onClick={ () => props.changePage("Favourites")}>
        Go to your favourites
        </button>
        <br></br>
        <button onClick={ () => props.changePage("Login")}>
        Log out
        </button>
      </div>
  </div>
  )
};

Games.propTypes = {};

Games.defaultProps = {};

export default Games;
