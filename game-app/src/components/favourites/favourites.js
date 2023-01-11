import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './favourites.module.css';

function Favourites(props){
  const [games,setGames] = useState(null);
  const [idOfGame,setidOfGame] = useState(null);
  const [error,setError] = useState("");
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '003b127189mshe25d64b662bd5f7p1b380bjsn5b30a7994f19',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
  };
  const settingUpFavourites = ()=>{
      console.log("SETGAMES DEFAULT FAVOURITES");
      fetch("http://localhost:8000/games/",{
        method: "GET"
      })
      .then(res => res.text())
      .then((ourData)=>{
        if(ourData)
        {
          console.log(ourData)
          ourData=JSON.parse(ourData)
          console.log(ourData)
          setGames(ourData)
          
        }
      })
  };

  if(games==null)
  {
    settingUpFavourites();
  }

  const goToGameDetails = (idOfGame) => {
    console.log("Sprawdzanie czy gra jest w ulubionych");
    fetch("http://localhost:8000/games/"+idOfGame,{
          method: "GET"
        })
        .then(res => res.text())
        .then(()=>{
          fetch("https://free-to-play-games-database.p.rapidapi.com/api/games", options)
          .then(response => response.json())
          .then(apiData => {
            console.log("DANE: ",apiData)
            for(let j=0;j<apiData.length;j++)
            {
              if(idOfGame==apiData[j]["id"])
              {
                console.log("Going to details of: ",idOfGame);
                props.setGameIdForDetailsId(idOfGame);
                props.changePage("GameDetails");
                return;
              }
            }
          })

          
        })
        .catch(err => console.error(err));
        //TODO złapać errora gdy nie ma id
    setError("Nie ma gry o takim id ")
    console.log("Podano id gry nie będącej w ulubionych")

  }

  return(
    <div className={styles.Favourites}>
    <p className={styles.Title}>Game Details</p>
    <div className={styles.Form}>
      <div>
        <p htmlFor="details">Write the id of the game to get details</p>
        <input
          type="details"
          name="details"
          id="details"
          autoComplete="off"
          value={idOfGame}
          onChange={(e) => setidOfGame(e.target.value)}
          className={styles.Button}
        />
      </div>
      <p className="hiddenError">{error}</p>
      <button onClick={ () => goToGameDetails(idOfGame)}>
        Go to game details
      </button>
      <button onClick={ () => props.changePage("Games")}>
        Go to Games
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
  );
};

Favourites.propTypes = {};

Favourites.defaultProps = {};

export default Favourites;
