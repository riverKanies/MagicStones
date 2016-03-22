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
  Meteor.publish('games', function(){
    //db.games.insert({p:{x:10,y:10},players:["BFxJzFhuWrZARaDfZ","mWAwQaXbTcCapocfR"]})
    //following query will match userId agains all values in the players array (as if it were a single player id)
    return Games.find({
      $or:[
        {players:this.userId},
        {players:{$size:1}}
      ]
    })
  })
}

Meteor.methods({
  move(gameId,p){
    //console.log('moving for ',gameId)
    //needs security
    Games.update(gameId, {
      $set: {p: p}
    })
    //console.log('moved to ',Games.findOne(gameId))
  },
  createGame(){
    var currentGame = Games.findOne({$and:[{players:Meteor.userId()},{players:{$size:2}}]})
    var currentUser = Meteor.userId()
    if(!currentGame && currentUser){
      Games.insert({p:{x:0,y:0},players:[currentUser]})
    }
  },
  setCurrentGame(gameId){
    Meteor.users.update(Meteor.userId(),{$set:{"profile.currentGame":gameId}})
    console.log('current game: ',Meteor.user().profile.currentGame)
  }
})
