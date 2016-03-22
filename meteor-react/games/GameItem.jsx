GameItem = React.createClass({
  handleJoin(){
    console.log("joining "+this.props.game._id)
    Meteor.call("joinGame",this.props.game._id)
  },
  render(){
    return(
      <li>
        Play with {this.props.game.players[0]}
        {Meteor.userId()? // need to make a gameLi component to handle join by id...
          <button onClick={this.handleJoin}>Join</button>
        :''}
      </li>
    )
  }
})
