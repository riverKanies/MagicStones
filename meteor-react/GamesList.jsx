GamesList = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
    return{
      openGames: Games.find({
        players:{$size: 1}
      }).fetch()
    }
  },
  renderOpenGames(){
    console.log(this.data.openGames)
    return this.data.openGames.filter((game)=>{
      return (game.players[0] != Meteor.userId())
    }).map((game,key)=>{
      return <li key={key}>Play with {game.players[0]}</li>
    })
  },
  render(){
    return(
      <div>
        <b>Create Game:</b>
        <br/>
        <b>Join Game:</b>
        <ul>
          {this.renderOpenGames()}
        </ul>
      </div>
    )
  }
})
