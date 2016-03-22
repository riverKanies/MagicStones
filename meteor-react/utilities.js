utils = {
  randomCreature(cost, place, player){
    var magic = utils.getRandomIntInclusive(0,2)
    if(magic > cost-1) magic = cost-1
    var effect = magic > 0 ? ('has '+magic+' magic') : ''
    var weight = Math.floor(utils.getRandomIntInclusive(0,cost-1) - cost/3)
    return({
      cost: cost,
      atk: cost - magic + weight,
      def: cost - magic - weight + 1,
      effect: effect,
      in: place,
      owner: player
    })
  },
  getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  thisPlayer(){
    return (Meteor.userId() === game.players[0]) ? game.p1 : game.p2
  },
  otherPlayer(thisPlayer){
    if(thisPlayer === game.p1){
      return game.p2
    }else if(thisPlayer === game.p2){
      return game.p1
    }
  },
  overCardsInHand(){
    var collisionOccurred = false
    thisPlayer.hand.forEach(function(card){
      if(utils.collideRect(mousePos,card)){
        collisionOccurred = true
        //console.log('hover over ',card.cost)
        //if(Session.get('viewCard') != card){//always true...?
        if(!utils.isEquivalent(Session.get('viewCard'),card)){
          //update meteor session
          console.log('setting view to ',card)//,Session.get('viewCard'))
          Session.set('viewCard',card)
        }
      }
    })
    if(!collisionOccurred && Session.get('viewCard')){
      //update meteor session
      console.log('setting view to null')
      Session.set('viewCard',null)
    }
  },
  collideRect(point,rect){
    if(point.x>rect.x && point.x<rect.x+rect.w && point.y>rect.y && point.y<rect.y+rect.h){
      return true
    }else{
      return false
    }
  },
  isEquivalent(a, b) {
    //object equivalence, assuming non object properties
    if(!a) return false
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);
    if (aProps.length != bProps.length) {
        return false;
    }
    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];
        if (a[propName] !== b[propName]) {
            return false;
        }
    }
    return true;
  }
}
