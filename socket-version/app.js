//current IP: http://192.168.1.4:3000
var express = require('express')
var app = express()
var server = require('http').createServer(app)
var io = require('socket.io')(server)

var canvasWidth = 500

app.use(express.static('public'))
app.get('/', function(req, res){
  res.sendfile('public/index.html');
});

io.on('connection',function(socket){
  console.log('connection made: '+socket.id)
  if (game.players.length < 2){
    game.players.push({
      id:socket.id
    })
  }
  console.log('players: '+game.players.map(function(player){return player.id}).join(','))
  socket.on('disconnect',function(){
    console.log('disconnected from '+this.id)
    var thisPlayer = this.id
    game.players.forEach(function(player,i){
      if (player.id === thisPlayer){
        game.players.splice(i,1)
      }
    })
  })
  socket.on('action',function(action){
    if (action.playerId !== activePlayer) return
    //if (actionIsValid) performAction
  })
})

var game = {
  players:[]
}
setInterval(function(){

  io.sockets.emit('update',game)
},30)


server.listen(3000)
