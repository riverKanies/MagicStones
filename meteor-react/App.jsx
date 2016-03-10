App = React.createClass({
  renderFields() {
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
  }
})
