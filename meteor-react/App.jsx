App = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
    /*if (!gameId) {
      // data isn't immediatelly available on client. iron-router wiatOn solves this...
      // it looks like flow router doesn't allow anything like waitOn, so I'll user iron...?
      var currentGameId = ((Meteor.user()||{}).profile||{}).currentGame
      console.log('current: ',currentGameId)
      window.game = Games.findOne(currentGameId)//{$and:[{players:Meteor.userId()},{players:{$size:2}}]})
      console.log('game ',game)
      window.gameId = game?game._id:null
      if(game)console.log('gameId ',game._id)
    }*/
    return {
      game: Games.findOne(((Meteor.user()||{}).profile||{}).currentGame),//gameId),
      currentUser: Meteor.user(),
      viewCard: Session.get('viewCard')
    }
  },
  endGame(){
    console.log('ending game ',game)
    Meteor.call('endGame',game)
  },
  render() {
    //console.log('rendering app',this.data.game)
    window.game = this.data.game
    //if(game)console.log('game: ',game,game._id._str)
    return(
      <div>
        <AccountsUIWrapper /><br/>
        { this.data.currentUser && game ?
          <div>
            <p>Game {game._id._str}: {game.players[0]} VS. {game.players[1]}</p>
            <CanvasTest data={game}/>
            <button onClick={this.endGame}>Concede</button>
            <br/>
            <br/>
          </div>
        :''}
        <GamesList />
      </div>
    )
  }
})
