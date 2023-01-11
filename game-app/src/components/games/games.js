import React, {useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './games.module.css';

function Games(props){
  const [error,setError] = useState("");
  const [filter,setFilter] = useState("");
  const [sort,setSort] = useState("");
  const [games,setGames] = useState(null);
  const [gameName,setGameName] = useState("");
  const defaultGames = () =>{
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '189b63fb8fmshed1746170f332a2p17de02jsn90473b3a1e05',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
    };
    if(games===null){
    fetch("https://free-to-play-games-database.p.rapidapi.com/api/games", options)
    .then(response => response.json())
    .then(data => {
      //console.log(data)
        console.log("SETGAMES DEFAULT");
        setGames(data);
    })
    .catch(err => console.error(err));
    }
  }
  defaultGames();
  const sortGames = (sortingType) => {
    console.log("Sorting games by: ",sortingType);
    let sortedGames=games;
    let bufor=0;
    if(sortingType==="ascending")
    {
      sortedGames=[...sortedGames].sort((a, b) =>
      a.title > b.title ? 1 : -1,
      );
    }
    else
    {
      sortedGames=[...sortedGames].sort((a, b) =>
      a.title < b.title ? 1 : -1,
      );
    }
    console.log("SETGAMES SORT")
    setGames(sortedGames);
  }
  const filterGames = (filteredName) => {
    console.log("Filtering games by name: ",filteredName);
    
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
        console.log("GET GAMES FILTER DEFAULT")
        let filteredGames=data;
    for(let i=0;i<data.length;i++)
    {
      if(data[i].title.toLowerCase().includes(filteredName.toLowerCase()))
      {

      }
      else
      {
        filteredGames.splice(i, 1);
        i=i-1;
      }
    }
    console.log("SETGAMES FILTER")
    setGames(filteredGames)
    })
    .catch(err => console.error(err));

  }
  const checkGameDetails = (gameName) => {
    console.log("Checking if a game with a name: ",gameName, " is available");
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
      for(let i=0; i<data.length;i++)
      {
        if(data[i].title.toLowerCase()===gameName.toLowerCase())
        {
          console.log("Znaleziono grę o takiej nazwie");
          props.setGameIdForDetailsId(data[i].id);
          props.changePage("GameDetails");
          return;
        }
      }
      console.log("Nie znaleziono gry o takiej nazwie");
      setError("Nie znaleziono gry o takiej nazwie");
    })
    .catch(err => console.error(err));
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
        <button onClick={ () => filterGames(filter)}>
        Filter
        </button>
        <div>
          <p htmlFor="details">Write name of the game to get details</p>
          <input
            type="details"
            name="details"
            id="details"
            autoComplete="off"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            className={styles.Button}
          />
        </div>
        <button onClick={ () => checkGameDetails(gameName)}>
        See details
        </button>
        <br></br>
        <p className="hiddenError">{error}</p>
        <button onClick={ () => props.changePage("Favourites")}>
        Go to your favourites
        </button>
        <br></br>
        <button onClick={ () => props.changePage("Login")}>
        Log out
        </button>
      </div>
      <div className={styles.ListOfGames}>
        <p className="games">Games:</p>
        <div className={styles.ListOfGamesOne}>
        {games &&  <ul>{games.slice(0,games.length/4).map((game) => {return (<li>{game.title}</li>)})}</ul>}
        </div>
        <div className={styles.ListOfGamesTwo}>
        {games &&  <ul>{games.slice(games.length/4,games.length/2).map((game) => {return (<li>{game.title}</li>)})}</ul>}
        </div>
        <div className={styles.ListOfGamesThree}>
        {games &&  <ul>{games.slice(games.length/2,3*games.length/4).map((game) => {return (<li>{game.title}</li>)})}</ul>}
        </div>
        <div className={styles.ListOfGamesFour}>
        {games &&  <ul>{games.slice(3*games.length/4,games.length).map((game) => {return (<li>{game.title}</li>)})}</ul>}
        </div>
      </div>
  </div>
  )
};

Games.propTypes = {};

Games.defaultProps = {};

export default Games;
