GameItemActive = React.createClass({
  handleClick(){
    console.log("play "+this.props.game._id)
    Meteor.call('setCurrentGame',this.props.game._id)//._str)
  },
  render(){
    //var current = Meteor.user().profile.currentGame
    //console.log('current',current,this.props.game._id)
    return(
      <li>
        My active game: {this.props.game._id._str}
        {(((Meteor.user()||{}).profile||{}).currentGame||{})._str !== this.props.game._id._str ?
          <button onClick={this.handleClick}>Play</button>
          :' (current)'}
      </li>
    )
  }
})
