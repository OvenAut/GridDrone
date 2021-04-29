let stack = []


var Placed = function (){
   // var counter = 0
   // const Inerre = 0
   //this.stack = [];


}



Placed.prototype.getCounter = function(){
    
    return stack.length
}
Placed.prototype.addTile = function (uuid) {
    
    stack.push(uuid)
    //counter = stack.length
    //updateTile()
}
Placed.prototype.clearTile = function (uuid) {
    
    stack.splice( stack.indexOf(uuid),1)
    //counter = stack.length
    //updateTile()
}
Placed.prototype.getTiles = function (callback) {
    
    return  callback(stack)
}


export default Placed;