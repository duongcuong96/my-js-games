function isCollisionCricles(ob1,ob2){
    var hit = false ;
    var vx = ob1.centerX() - ob2.centerX();
    var vy = ob1.centerY() - ob2.centerY();
    var vectorLong = Math.sqrt(vx*vx + vy*vy);
    var totalWidth = ob1.halfWidth() + ob2.halfWidth();
        if(vectorLong < totalWidth){
            //va cham 
            hit = true;
        }
    return hit ;
}//end check collision 

function antiOverlappingCricles(ob1,ob2){
    var vx = ob1.centerX() - ob2.centerX();
    var vy = ob1.centerY() - ob2.centerY();
    var vectorLong = Math.sqrt(vx*vx + vy*vy);
    var totalWidth = ob1.halfWidth() + ob2.halfWidth();  
        if(vectorLong < totalWidth){
            var overlapping = totalWidth - vectorLong;
            var dx = vx/vectorLong;
            var dy = vy/vectorLong;
            
            ob1.x += dx*overlapping;
            ob1.y += dy*overlapping;
        }
}//end antiOverlapping 

