App = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
    if (!gameId) {
      // data isn't immediatelly available on client. iron-router wiatOn solves this...
      // it looks like flow router doesn't allow anything like waitOn, so I'll user iron...?
      window.game = Games.findOne({$and:[{players:Meteor.userId()},{players:{$size:2}}]})
      window.gameId = game?game._id:null
    }
    return {
      game: Games.findOne(gameId),
      currentUser: Meteor.user()
    }
  },
  render() {
    console.log('rendering app')
    window.game = this.data.game
    return(
      <div>
        <AccountsUIWrapper /><br/>
        { this.data.currentUser && game ?
          <div>
            <p>Game {game._id._str}: {game.players[0]} VS. {game.players[1]}</p>
            <CanvasTest data={game}/>
          </div>
        :''}
        <GamesList />
      </div>
    )
  }
})
