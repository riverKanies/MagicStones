GameItemActive = React.createClass({
  handleClick(){
    console.log("play "+this.props.game._id)
    Meteor.call('setCurrentGame',this.props.game._id)//._str)
  },
  render(){
    var current = ((Meteor.user()||{}).profile||{}).currentGame
    //console.log('current',current,this.props.game._id)
    //console.log('game',(((Meteor.user()||{}).profile||{}).currentGame||{}))
    return(
      <li>
        My active game: {this.props.game._id._str}
        {!current || current._str !== this.props.game._id._str ?
          <button onClick={this.handleClick}>Play</button>
          :' (current)'}
      </li>
    )
  }
})
