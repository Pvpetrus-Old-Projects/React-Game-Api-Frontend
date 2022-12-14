import './App.css';
import Login from './components/login/login';
import Register from './components/register/register';
import Favourites from './components/favourites/favourites';
import GameDetails from './components/gameDetails/gameDetails';
import Games from './components/games/games';
import React, { Component } from 'react';


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
      return( 
      <div>
      <Login whichPage={this.state.whichPage} changePage={this.changePage}></Login>
      </div>);
    }
    if(this.state.whichPage==="Register")
    {
      return <Register newUser={this.state.newUser} whichPage={this.state.whichPage} changePage={this.changePage}></Register>;
    }
    if(this.state.whichPage==="Games")
    {
      return <Games whichPage={this.state.whichPage}></Games>;
    }
    if(this.state.whichPage==="GameDetails")
    {
      return <GameDetails whichPage={this.state.whichPage}></GameDetails>;
    }
    if(this.state.whichPage==="Favourites")
    {
      return <Favourites whichPage={this.state.whichPage}></Favourites>;
    }
  }
  changePage = (page)=>{
    this.setState({whichPage:page})
  }
}



export default App;
