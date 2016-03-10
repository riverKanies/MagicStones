AccountsUIWrapper = React.createClass({
  componentDidMount() {
    this.view = Blaze.render(Template.loginButtons,
      React.findDOMNode(this.refs.container))
  },
  componentWillUnmount() {
    Blaze.remove(this.view)
  },
  render() {
    //placeholder that get's filled in with blaze template
    return <span ref="container" />
  }
})
