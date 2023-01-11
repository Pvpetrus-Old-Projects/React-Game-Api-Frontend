import React, {useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './gameDetails.module.css';

function GameDetails(props){
  const [gameDetails,setGameDetails] = useState(null);
  const [inFavourites,setInFavourites] = useState(false);
  const [error,setError] = useState("");
  const getGameDetails = () =>{
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '189b63fb8fmshed1746170f332a2p17de02jsn90473b3a1e05',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
    };
    if(gameDetails==null){
    fetch("https://free-to-play-games-database.p.rapidapi.com/api/games", options)
    .then(response => response.json())
    .then(apiData => {
        console.log("DANE: ",apiData)
        for(let j=0;j<apiData.length;j++)
          {
            if(props.gameForDetailsId==apiData[j]["id"])
            {
              console.log("Dodawane detali: ",apiData[j]);
              
              setGameDetails(apiData[j]);
              console.log(gameDetails);
              break;
            }
          }
        
    })
    .catch(err => console.error(err));
    }

      fetch("http://localhost:8000/games")
      .then(res=>{return res.json()})
      .then((data)=>{
        console.log(data);
        if(data)
        {
          for(let i=0;i<data.length;i++)
          {
            if(data[i]["id"]==gameDetails["id"])
            {
              console.log("Gra jest w ulubionych.");
              setInFavourites(true);
              return;
            }
          }
          console.log("Gra nie jest w ulubionych.");
              setInFavourites(false);
        }
      })

  }
  getGameDetails();

  const addToFavourites = () =>{
    console.log("Adding to favourites");
    let id=gameDetails["id"];
    let title=gameDetails["title"];
    console.log("Użytkownik: "+props.currentUser.id);
    let newGame={"id":id,"userId":props.currentUser.id, "title": title};

    fetch("http://localhost:8000/games",{
          method: "POST",
          headers: {"Content-type":"application/json"},
          body: JSON.stringify(newGame)
        })
        .then(()=>{
          console.log("Dodano grę do ulubionych");
          setInFavourites(true);
          setError("Added a game to favourites");
        });
  }

  const deleteFromFavourites = () =>{
    console.log("Deleting from favourites");
    let id=gameDetails["id"];
    console.log("Użytkownik: "+props.currentUser.id);
    let newGame={"id":id,"userId":props.currentUser.id};

    fetch("http://localhost:8000/games/"+id,{
          method: "DELETE"
        })
        .then(res => res.text())
        .then(()=>{
          console.log("Usunięto grę z ulubionych");
          setInFavourites(false);
          setError("Deleted a game from favourites");
        });
  }
  return(
    
  <div className={styles.GameDetails}>
    <p className={styles.Title}>Game Details</p>
    <div className={styles.Form}>
    {!inFavourites && <button onClick={ () => addToFavourites()}>
        Add to favourites
    </button>}
    {inFavourites && <button onClick={ () => deleteFromFavourites()}>
        Delete from favourites
    </button>}
    <p className="hiddenError">{error}</p>

    
      <button onClick={ () => props.changePage("Games")}>
        Go to Games
      </button>
      <button onClick={ () => props.changePage("Favourites")}>
        Go to your favourites
        </button>
    </div>
    <div className={styles.Details}>
      {gameDetails && 
        <ul>
          {Object.keys(gameDetails).map((key, index) =>  {
            if(typeof gameDetails[key] === "object")
            {
              let newData=gameDetails[key];
              Object.keys(newData).map((key, index) =>  {
                return <li>{key} : {newData[key]}</li>
              })
            }
            else
            {
              return <li>{key} : {gameDetails[key]}</li>
            }
          }
          )}
        </ul>
      }
    </div>
  </div>
  );
};

GameDetails.propTypes = {};

GameDetails.defaultProps = {};

export default GameDetails;
