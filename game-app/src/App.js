import './App.css';
import Login from './components/login/login';
import Register from './components/register/register';
import Favourites from './components/favourites/favourites';
import GameDetails from './components/gameDetails/gameDetails';
import Games from './components/games/games';
import React, { Component,useEffect } from 'react';


class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
        whichPage:"Login"
    }
  }

  render(){
    if(this.state.whichPage==="Login")
    {
      return <Login addedNewUser={this.state.addedNewUser} loginUser={this.loginUser} changePage={this.changePage}></Login>;
    }
    if(this.state.whichPage==="Register")
    {
      return <Register addedNewUser={this.addedNewUser} changePage={this.changePage}></Register>;
    }
    if(this.state.whichPage==="Games")
    {
      return <Games currentUser={this.state.currentUser} changePage={this.changePage} setGameIdForDetailsId={this.setGameIdForDetailsId}></Games>;
    }
    if(this.state.whichPage==="GameDetails")
    {
      return <GameDetails currentUser={this.state.currentUser} changePage={this.changePage} gameForDetailsId={this.state.gameForDetailsId}></GameDetails>;
    }
    if(this.state.whichPage==="Favourites")
    {
      return <Favourites currentUser={this.state.currentUser} changePage={this.changePage} setGameIdForDetailsId={this.setGameIdForDetailsId}></Favourites>;
    }
  }
  changePage = (page)=>{
    this.setState({whichPage:page})
  }
  setGameIdForDetailsId = (gameId)=>{
    this.setState({gameForDetailsId:gameId})
  }
  addedNewUser = ()=>{
    this.setState({addedNewUser:true})
  }

  loginUser = (loggedInUser)=>{
    console.log("Logowanie użytkownika: ", loggedInUser);
    this.setState({currentUser:loggedInUser})
  };
}



export default App;
