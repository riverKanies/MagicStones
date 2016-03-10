App = React.createClass({
  mixins: [ReactMeteorData],
  getInitialState(){
    return {
      p:{x:0,y:0}
    }
  },
  getMeteorData(){
    if (!gameId) {
      var game = Games.findOne()
      window.gameId = game?game._id:null
    }
    return {
      game: Games.findOne(gameId)
    }
  },
  render() {
    var game = this.data.game
    if(game){
      //do canvas drawing here
      ctx.fillStyle = 'hsl(100,0%,20%)'
      ctx.fillRect(-canvas.width/2,-canvas.height/2,canvas.width,canvas.height)
      ctx.fillStyle = 'hsl(100,50%,20%)'
      ctx.fillRect(0,0,100,100)
      ctx.fillRect(game.p.x,game.p.y,100,100)

      return <div><AccountsUIWrapper /></div>
    }else{
      return (
        <div>
          <GamesList />
          <AccountsUIWrapper />
        </div>
      )
    }
  }
  /*renderFields() {
    return(
      <div>
        <Field top="10%" />
        <Field top="60%" />
      </div>
    )
  },
  render() {
    return (
      <div>
          {this.renderFields()}
      </div>
    )
  }*/
})
