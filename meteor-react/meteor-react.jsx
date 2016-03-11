Games = new Meteor.Collection("games")

if (Meteor.isClient) {
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  })

  Meteor.subscribe("games")

  Meteor.startup(function(){
    window.gameId = null
    window.mousePos = {}
    //render app to track data and draw
    ReactDOM.render(<App />, document.getElementById("render-target"))
  })
}

if(Meteor.isServer){
  console.log(this.userId)
  Meteor.publish('games', function(){
    //db.games.insert({p:{x:10,y:10},players:["mZ6KM6RWmKEkiynFz","eaBeXEtDq23gRHG2n"]})
    //following query will match userId agains all values in the players array (as if it were a single player id)
    return Games.find({"players":this.userId})
  })
}

Meteor.methods({
  move(gameId,p){
    Games.update(gameId, {
      $set: {p: p}
    })
  }
})
