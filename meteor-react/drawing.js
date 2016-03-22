draw = {
  hands(ctx){
    var c = {
      w: 20,
      h: 40
    }
    window.thisPlayer = utils.thisPlayer()
    window.otherPlayer = utils.otherPlayer(thisPlayer)
    //console.log('this: ',thisPlayer,", other: ",otherPlayer)
    ctx.fillStyle = 'hsl(50,50%,20%)'
    var numCards = thisPlayer.hand.length
    thisPlayer.hand.forEach(function(card,i){
      card.x = -c.w/2 -3*c.w/4*(numCards-1) + i*c.w*1.5
      card.y = 200-c.h/2
      card.w = c.w
      card.h = c.h
      ctx.fillRect(card.x,card.y,card.w,card.h)
      //ctx.fillRect(-c.w/2 -3*c.w/4*(numCards-1) + i*c.w*1.5, 200-c.h/2, c.w, c.h)
    })
  },
  viewCard(ctx){
    //viewCard
    var viewCard = Session.get('viewCard')
    if(viewCard){
      console.log('drawing viewCard')

      ctx.fillStyle = 'hsl(300,0%,70%)'
      var w = 140 // width (used as scale)
      var offX = -150
      ctx.beginPath()
      ctx.rect(-w/2+offX,-w, w, 2 * w)
      ctx.fill()
      ctx.stroke()
      ctx.fillStyle = 'hsl(100,0%,20%)'
      ctx.font = w/8+"px Arial";
      ctx.fillText(viewCard.atk+"/"+viewCard.def,w/4+offX,w - w/5);
      ctx.fillText(viewCard.effect,-w/2+w/10+offX,w/2);
      ctx.fillText(viewCard.cost,-w/2+w/10+offX,-w +w/5);
    }
  }
}
