Games = new Meteor.Collection("games")

if (Meteor.isClient) {
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  })

  Meteor.subscribe("games")

  Meteor.startup(function(){
    //init canvas
    window.canvas = document.getElementById('canvas')
    canvas.width = canvas.height = 500
    window.ctx = canvas.getContext('2d')
    ctx.translate(canvas.width/2,canvas.height/2)

    //init game id
      //!!! doesn't always work! looks like iron-router wiatOn solves this...
      // it looks like flow router doesn't allow anything like waitOn, so I'll user iron...?
    //window.gameId = Games.findOne()._id //'56e1ab090d7e6234dd1fda0d'
    window.gameId = null

    //init event listeners
    window.mousePos = {}
    canvas.addEventListener('mousedown', function(evt) {
      mousePos = getMousePos(canvas, evt);
      //test by moving player ther
      Meteor.call('move',gameId,{x:mousePos.x,y:mousePos.y})

    }, false);

    //render app to track data and draw
    React.render(<App />, document.getElementById("render-target"))
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

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left - canvas.width/2,
    y: evt.clientY - rect.top - canvas.height/2
  };
}
