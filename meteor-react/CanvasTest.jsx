CanvasTest = React.createClass({
  render(){
    var c = document.getElementById('canvas')
    if(c) drawCanvas(c)
    return(
      <canvas id="canvas" ref={drawCanvas}></canvas>
    )
  }
})

function drawCanvas(c){
  if(!c) return //for some reason this get's called after canvas get's removed...
  c.width = c.height = 500
  var ctx = c.getContext('2d')
  ctx.translate(c.width/2,c.height/2)

  ctx.fillStyle = 'hsl(100,0%,20%)'
  ctx.fillRect(-c.width/2,-c.height/2,c.width,c.height)

  ctx.fillStyle = 'hsl(100,50%,20%)'
  ctx.fillRect(game.p1.x,game.p1.y,100,100)
  ctx.fillStyle = 'hsl(200,50%,20%)'
  ctx.fillRect(game.p2.x,game.p2.y,100,100)

  game.turnButton = turnButton = {
    x:200,y:-20,w:50,h:40
  }
  ctx.fillStyle = 'hsl(300,50%,40%)'
  ctx.fillRect(turnButton.x,turnButton.y,turnButton.w,turnButton.h)

  //c.removeEventListener('mousedown',MDlistener, false) // not necessary
  c.addEventListener('mousedown', MDlistener, false);
}

function MDlistener(evt) {
  // must not be an anonymous function:
    // if it is, multiple event listeners will pile up and freeze browser
  //console.log('click')
  mousePos = getMousePos(canvas, evt);

  //if clicking end button, do that and return
  if(collideRect(mousePos,game.turnButton)){
    console.log('ended turn')
    Meteor.call('endTurn',game._id)
  }
  //else...


  //test by moving player ther
  Meteor.call('move',game._id,{x:mousePos.x,y:mousePos.y})
}
function collideRect(point,rect){
  if(point.x>rect.x && point.x<rect.x+rect.w && point.y>rect.y && point.y<rect.y+rect.h){
    return true
  }else{
    return false
  }
}
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left - canvas.width/2,
    y: evt.clientY - rect.top - canvas.height/2
  };
}
