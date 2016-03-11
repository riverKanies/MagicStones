GameItemActive = React.createClass({
  handleClick(){
    console.log("play "+this.props.game._id)
  },
  render(){
    return(
      <li>
        My active game: {this.props.game._id._str}<button onClick={this.handleClick}>Play</button>
      </li>
    )
  }
})
