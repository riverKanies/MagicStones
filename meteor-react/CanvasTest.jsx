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
  c.width = c.height = 500
  var ctx = c.getContext('2d')
  ctx.translate(c.width/2,c.height/2)

  ctx.fillStyle = 'hsl(100,0%,20%)'
  ctx.fillRect(-c.width/2,-c.height/2,c.width,c.height)
  ctx.fillStyle = 'hsl(100,50%,20%)'
  ctx.fillRect(0,0,100,100)
  ctx.fillRect(game.p.x,game.p.y,100,100)

  c.addEventListener('mousedown', function(evt) {
    mousePos = getMousePos(canvas, evt);
    //test by moving player ther
    Meteor.call('move',gameId,{x:mousePos.x,y:mousePos.y})
  }, false);
}
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left - canvas.width/2,
    y: evt.clientY - rect.top - canvas.height/2
  };
}
