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
    var game = Games.findOne(gameId)
    if(Meteor.userId() !== game.players[game.turn]) {
      console.log("not your turn")
      return
    }
    if (Meteor.userId() === game.players[0]){
      Games.update(gameId, {
        $set: {p1: p}
      })
    }else if(Meteor.userId() === game.players[1]){
      Games.update(gameId, {
        $set: {p2: p}
      })
    }

    //console.log('moved to ',Games.findOne(gameId))
  },
  createGame(){
    var currentGame = Games.findOne({$and:[{players:Meteor.userId()},{players:{$size:2}}]})
    var currentUser = Meteor.userId()
    if(!currentGame && currentUser){
      Games.insert({turn:0,p1:{x:0,y:0},p2:{x:10,y:10},players:[currentUser]})
    }
  },
  setCurrentGame(gameId){
    Meteor.users.update(Meteor.userId(),{$set:{"profile.currentGame":gameId}})
    console.log('current game: ',Meteor.user().profile.currentGame)
  },
  joinGame(gameId){
    var gameToJoin = Games.findOne(gameId)
    console.log('joining ',gameToJoin)
    if(gameToJoin.players.length === 1){
      Games.update(gameId,{$push:{players:Meteor.userId()}})
    }
  },
  endGame(game){
    var gameId = game._id
    var p1id = game.players[0]
    var p2id = game.players[1]
    console.log(gameId,p1id,p2id)
    Meteor.users.update(p1id,{$set:{"profile.currentGame":null}})
    Meteor.users.update(p2id,{$set:{"profile.currentGame":null}})
    Games.remove(gameId)
  },
  endTurn(gameId){
    var game = Games.findOne(gameId)
    if(Meteor.userId() === game.players[game.turn]) {
      if(game.turn === 0){
        Games.update(gameId, {$set: {turn: 1}})
      }else{
        Games.update(gameId, {$set: {turn: 0}})
      }
    }
  }
})
