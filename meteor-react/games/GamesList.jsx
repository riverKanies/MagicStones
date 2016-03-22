GamesList = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
    return{
      openGames: Games.find({
        players:{$size: 1}
      }).fetch(),
      activeGames: Games.find({$and:[{players:Meteor.userId()},{players:{$size:2}}]}).fetch(),
      currentUser: Meteor.user()
    }
  },
  handleJoin(){
    console.log(Meteor.userId()+' joining game...')
  },
  renderOpenGames(){
    //console.log('open: ',this.data.openGames)
    return this.data.openGames.filter((game)=>{
      return (game.players[0] != Meteor.userId())
    }).map((game,key)=>{
      return (
        <GameItem key={key} game={game} />
      )
    })
  },
  renderActiveGames(){
    //console.log('active: ',this.data.activeGames)
    return this.data.activeGames.filter((game)=>{
      return true//game._id._str !== Meteor.user().profile.currentGame
    }).map((game,key)=>{
      return <GameItemActive key={key} game={game} />
    })
  },
  handleClick(e){
    console.log(Meteor.userId()+' creating a game...')
    Meteor.call('createGame')
  },
  render(){
    return(
      <div>
        {this.data.currentUser && this.data.currentUser._id ?
          <button onClick={this.handleClick}>Create Game</button>
        :''}
        <br/>
        <p><b>Active Games:</b></p>
        <ul>
          {this.renderActiveGames()}
        </ul>
        <b>Join Game:</b>
        <ul>
          {this.renderOpenGames()}
        </ul>
      </div>
    )
  }
})
