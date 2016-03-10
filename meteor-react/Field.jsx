Field = React.createClass({
  render() {
    var style = {
      top: this.props.top
    }
    return(
      <div className="field" style={style} >I'm a field</div>
    )
  }
})
