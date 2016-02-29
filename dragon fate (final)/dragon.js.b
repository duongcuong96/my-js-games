(function(){
            var canvas = document.querySelector("canvas");
                var getContext = canvas.getContext("2d");
                
                //array store many image :
                var assetToLoad = [];
                var assetLoaded = 0;
                var sprites = [];
                
                //buttons : 
                var UP = 38,DOWN=40,LEFT = 37,RIGHT=39,SPACE = 32;
                
                //can movie ? :
                var moveUp=false,moveDown = false,moveLeft = false,moveRight = false,fire=false,canMakeBoss = true;
                
                //gameState :
                var gameState = 0; //0 = loading ,1 = playing , 2 = over 
                
                //item , fireBall, monster
                var monsters = [];
                var monstersEscaped = 0 ;
                var score = 50 ;
                
                //hein thi message :
                var gameMessage  = [] ;
                
                //gia tri cua boss :
                var bossArray = [] ; //chua boss
                var bossFireArray = []; //chua đạn của boss
                var bossFireAfterTime = 0;
                var bossFireFrequency = 80;
    
                //gia tri cua player :
                var dragonArray = []; ///chua dragon 
                var fires = []; //chua dan cua dragon 
                var dragonLife = 300;
    
                //monsterFrequency : 
                var monsterFrequency = 30;
                var monsterCreateAfterTime = 0;
                var tmpObject = {
                    imageSrc : '',
                    sourceX : 0,
                    sourceY : 50,
                    sourceWidth : 20,
                    sourceHeight : 64,
                    
                    x : 0,
                    y : 0,
                    width : this.sourceWidth,
                    height : this.sourceHeight,
                    
                    currentFrame : 0,
                    totalFrames : 8,
                    forward : true,
                    columns : 0,
                    updateAnmation : function(){
                        if(this.currentFrame === 0 ) this.forward = true;
                        if(this.currentFrame = this.numberOfFrame) this.forward = false;
                        if(this.forward = true) this.currentFrame++;
                        if(this.forward = false) this.currentFrame--;
                        this.sourceX = Math.floor(this.currentFrame % this.columns)*this.sourceWidth;
                        this.sourceY = Math.floor(this.currentFrame / this.columns)*this.sourceHeight;
                        
                    },
                    centerX : function(){
                        return this.width/2 + this.x ;
                    },
                    centerY : function(){
                        return this.height/2 + this.y;
                    },
                    halfWidth : function(){
                        return this.width/2;
                    },
                    halfHeight : function(){
                        return this.height/2 ; 
                    }
                    
                    
                };
                  
                var background = Object.create(tmpObject);
                    background.sourceWidth  = 1120;
                    background.sourceHeight = 264;
                    background.sourceX = 0;
                    background.sourceY = 504;
                    
                    background.x = 0;
                    background.y = 236 ;
                    background.width = background.sourceWidth;
                    background.height = background.sourceHeight;
                
                //background image :
                    backgroundImage = new Image();
                    backgroundImage.src = 'pics/background.png';

                assetToLoad.push(backgroundImage);
                sprites.push(background);
                    

                
                
                
                var dragon = Object.create(tmpObject);
                    dragon.sourceWidth = 168;
                    dragon.sourceHeight = 129;
                    dragon.sourceX = 0;
                    dragon.sourceY = 0;
                    dragon.columns = 1;
                    
                    dragon.width = dragon.sourceWidth/2;
                    dragon.height = dragon.sourceHeight/2;
                    dragon.x = 0;
                    dragon.y = 0;
                    

                    dragonImage = new Image();
                    dragonImage.src = 'pics/dragon.png';
                
                    assetToLoad.push(dragonImage);
                sprites.push(dragon);
                dragonArray.push(dragon);
                
                var monster = Object.create(tmpObject);
                    monster.sourceWidth = 71;
                    monster.sourceHeight = 56;
                    monster.sourceX = 0;
                    monster.sourceY = 0;
   
                    
                    monster.x = 0;
                    monster.y = 0;
                    monster.width = 0;
                    monster.height = 0;
    
                    monsterImage = new Image();
                    monsterImage.src = 'pics/monster.png';
                
                assetToLoad.push(monsterImage);
                sprites.push(monster);
                
                var boss = Object.create(tmpObject);
                    boss.sourceWidth = 302;
                    boss.sourceHeight = 300 ;
                    boss.sourceX = 148;
                    boss.sourceY = 0 ;
                    
                    boss.x = 0;
                    boss.y = 0;
                    boss.height = 0;
                    boss.width = 0;
                    
                    bossImage = new Image();
                    bossImage.src = 'pics/boss.png';
    
                assetToLoad.push(bossImage);
                sprites.push(boss);
                
               //boss hp bar " 
                var hpBar = Object.create(tmpObject);
                    hpBar.sourceWidth  = 450;
                    hpBar.sourceHeight = 5;
                    hpBar.sourceX = 0;
                    hpBar.sourceY = 0 ;
                    hpBar.x = 0 ;
                    hpBar.y = 0;
                    hpBar.width = 0;
                    hpBar.height = 0;
    
                var hpBarImage = new Image();
                    hpBarImage.src = 'pics/hpBar.png';
    
                assetToLoad.push(hpBarImage);
                sprites.push(hpBar);
    
                //dragon hp bar :
                var dragonHpBar = Object.create(hpBar);
                    dragonHpBar.width = dragonLife ;
                    dragonHpBar.height = 2;
                sprites.push(dragonHpBar);
    
                //put image :
                monsterImage.addEventListener("load",loadHandler,false);
                dragonImage.addEventListener("load",loadHandler,false);
                backgroundImage.addEventListener("load",loadHandler,false);
                bossImage.addEventListener("load",loadHandler,false);
                hpBarImage.addEventListener("load",loadHandler,false);
//                fireBallImage.addEventListener("load",loadHandler,false);
                
                //movie dragon :
                    window.addEventListener("keydown",function(e){
                        switch(e.keyCode){
                            case UP :
                                moveUp = true;
                            break;
                                
                            case DOWN:
                                moveDown = true;
                                break;
                                
                            case LEFT :
                                moveLeft = true;
                                break;
                                
                            case RIGHT:
                                moveRight = true;
                                break;
                                
                            case SPACE :
                                fire = true;
                                fireBall();
                            break;
                        }
                    },false);
                
                //remove if keydown :
                    window.addEventListener("keyup",function(e){
                        switch(e.keyCode){
                            case UP:
                                moveUp = false;
                                break;
                                
                            case DOWN :
                                moveDown = false;
                                break;
                                
                            case LEFT:
                                moveLeft = false;
                                break;
                                
                            case RIGHT:
                                moveRight = false;
                                break;
                                
                            case SPACE :
                                fire = false;
                                break;
                        }
                    },false);
                
                //loadHander check xem da load het xong anh hay chua ?
                    function loadHandler(){
                        assetLoaded++;
                            if(assetLoaded === assetToLoad.length){
                                for(i=0;i<assetToLoad.length;i++){
                                     sprites[i].imageSrc = assetToLoad[i]; 
                                }
                                
                                gameState = 1;
                                playGame(); 
                                console.log("playing");
                            }
                    }//end loadhandler()
                
                function playGame(){
                    switch(gameState){
                        case 1:
                            update();
                        break;
                            
                        case 2:
                            gameOver();
                        break;
                            
                    }    
                }//end playGame
                
                function fireBall(){
                    var fireObject  = Object.create(dragon);
                        fireObject.sourceWidth = 16;
                    fireObject.sourceHeight = 16;
                    fireObject.sourceX = 168;
                    fireObject.sourceY = 0 ;
                    
                    fireObject.x = dragon.x + dragon.halfWidth()  + 10;
                    fireObject.y =  dragon.y +30;
                    fireObject.width = 16;
                    fireObject.height = 16;
                    fireObject.vx =  8;
                    
                    fires.push(fireObject);
                    sprites.push(fireObject);
                    
                }//end fireBall 
                
                function makeMonster(){
                    var monsterObject = Object.create(monster);
                    monsterObject.x = canvas.width - monsterObject.width;

                    monsterObject.vx = 2;
                    monsterObject.width = monsterObject.sourceWidth ;
                    monsterObject.height = monsterObject.sourceHeight;
                       //cho monster xuat hien ngau nhien tren truc y :
                    var randomPosition = Math.floor(Math.random()*7);
                    monsterObject.y = randomPosition*monsterObject.height;
                    
                    sprites.push(monsterObject);
                    monsters.push(monsterObject);
                    
                }
        
                function bossFire(x,y){
                    var b = Object.create(boss);
                        b.sourceWidth = 115;
                        b.sourceHeight = 66;
                        b.sourceX = 0;
                        b.sourceY = 234;
//                        b.width = 115;
//                        b.height= 66; 
                        b.width = 115*1.5;
                        b.height= 66*1.5;
                        b.x = x ;
                        b.y = y ;

                        bossFireArray.push(b);
                        sprites.push(b);
                        
                }//end bossFire (ban cau lua )
    
                function makeBoss(){
                    var bossObject = Object.create(boss);

                        
                        var randomPosition = Math.floor(Math.random()*1);
//                        bossObject.y = randomPosition*bossObject.height ;
                        bossObject.y = 100 ;
                        console.log("toa do y cua boss : " + boss.y);
                        
                        bossObject.vx = 2;
                        bossObject.width = bossObject.sourceWidth;
                        bossObject.height = bossObject.sourceHeight;
                        bossObject.x = canvas.width - bossObject.width;
                    
                     //lay toa do cua bossObject cho vao boss 
                        boss.y = bossObject.y ;
                        boss.x = bossObject.x ;
                    sprites.push(bossObject);
                    bossArray.push(bossObject);   
                    console.log("maked boss ");
                }
    
                function removeObject(object,arrayContainsObject){
                    var i = arrayContainsObject.indexOf(object) ;
                        if( i !== -1 ){
                            arrayContainsObject.splice(i,1);
                        }
                    }//end removeObject()
                
                //function update status :
        function update(){
                       requestAnimationFrame(update,canvas);
                    
                // DRAGON :
//                        antiOverlappingCricles(dragon,monster);
                        if(moveLeft && !moveRight) dragon.vx =- 5;
                        if(moveRight && !moveLeft ) dragon.vx = 5;
                        if(moveUp && !moveDown) dragon.vy =- 5;
                        if(moveDown && !moveUp) dragon.vy = 5;
                        
                        if(!moveLeft && !moveRight) dragon.vx = 0;
                        if(!moveUp && !moveDown) dragon.vy = 0;
                        
                    dragon.x = Math.max(0,Math.min(dragon.x+dragon.vx,canvas.width - dragon.sourceWidth/2));
                    dragon.y = Math.max(0,Math.min(dragon.y + dragon.vy , canvas.height - dragon.sourceHeight/2));
                //dragon hp :
                    dragonHpBar.x = dragon.x ;
                    dragonHpBar.y = dragon.y - dragon.y/2;
                    dragonHpBar.width = dragonLife;
                // FIREBALLS :
            
                    // CREATE MONSTERS 
                        monsterCreateAfterTime++;
                        if(monsterCreateAfterTime === monsterFrequency && canMakeBoss === true){
                            makeMonster();
                            monsterCreateAfterTime = 0;
                        }
                    
                      //movie monsters :
                    for(i = 0 ; i<monsters.length;i++){
                        var m = monsters[i];
                        m.x -= m.vx;
                        if(m.x < 0){ 
                        console.log("chay qua ");
                        removeObject(m,monsters);
                        removeObject(m,sprites);
                        
                       }
                    }
                    
                    //movie fireball cua dragon 
                    for (i = 0; i < fires.length; i++) {
                        var fire = fires[i];
                        fire.x += fire.vx;
                    }

                        //create boss neu score = 60 :
                        if(score > 50 && canMakeBoss === true){
                            makeBoss();
                        //hp bar cua Boss 
                            hpBar.x = boss.x ;
                            hpBar.y = boss.y - 50 ;
                            hpBar.width = hpBar.sourceWidth -150;
                            hpBar.height = hpBar.sourceHeight;
                            
                            canMakeBoss = false;
//                            bossFire();
                        }
        
                    

                    
//               di chuyen vien dan cua boss :  
                    for(i=0;i<bossFireArray.length;i++){
                        var f = bossFireArray[i];
                            f.x -= 7;
                    }
// di chuyen boss :
                  for(i=0;i<bossArray.length;i++){
                    var b =bossArray[i];
                      console.log(b.y);
                      
                        if(b.y > canvas.height - b.height){
                            b.forward = false;
                        }
                      
                        if(b.y < -50){
                            b.forward = true;
                        }
                          if(b.forward || b.forward === undefined){
                            b.y++;
                          }else{
                            b.y--;
                          }
                         //boss ban dan :
                    if(canMakeBoss === false){
                        bossFireAfterTime++;
                            if(bossFireAfterTime === bossFireFrequency){
                        bossFire(b.x,b.y+140);
                        bossFireAfterTime = 0;
                        console.log("boss da ban dan " );
                        }
                    }
                      
                  }
                    
 
                    
                //check va cham giua đạn của  dragon va quái monsters :
                        for(i=0;i<monsters.length;i++){
                            var monsterOb = monsters[i];
                                for(j=0;j<fires.length;j++){
                                    var fireOb = fires[j];
                                        if(isCollisionCricles(fireOb,monsterOb)){
                                            removeObject(monsterOb,monsters);
                                            removeObject(monsterOb,sprites);
                                            removeObject(fireOb,fires);
                                            removeObject(fireOb,sprites);
                                            console.log("trung" );
                                            score++;
                                        }
                                }
                        //check gameOVER
                            if(monsterOb.x< 0){
                                console.log("game over ");
//                                gameOver();
                            };
                        }
                    
            //check va cham giua dragon va monster :
                    for(i=0 ; i<dragonArray.length;i++){
                        var d = dragonArray[i];
                                for(j=0;j<monsters.length;j++){
                                    var m = monsters[j];
                                        if(isCollisionCricles(d,m)){
                                            antiOverlappingCricles(d,m);
                                            console.log("dragon was hit by monster!  ");
                                            dragonLife--;
                                            console.log(dragonLife);
                                        }
                                }
                        }//END CHECK                     
                    
                    
                // check va cham  ĐẠN dragon vs boss  :
                        for(i=0;i<fires.length;i++){
                            var dragonFireBall = fires[i];
                                for(j=0;j<bossFireArray.length;j++){
                                    var bossFireBall = bossFireArray[j];
                                        if(isCollisionCricles(dragonFireBall,bossFireBall)){
                                            antiOverlappingCricles(dragonFireBall,bossFireBall);
                                            console.log("va cham dan dragon vs boss ");

                                        }
                                }
                        }//END CHECK 
                    
                //check va cham giua dragon và đạn  của  boss :
                    for(i=0 ; i<dragonArray.length;i++){
                        var d = dragonArray[i];
                                for(j=0;j<bossFireArray.length;j++){
                                    var bossFireBall = bossFireArray[j];
                                        if(isCollisionCricles(d,bossFireBall)){
                                            antiOverlappingCricles(d,bossFireBall);
                                            console.log("dragon was hit !  ");
                                            dragonLife--;
                                        }
                                }
                        }//END CHECK 
                    
                    //check va chạm giữa dragon và Boss :
                    for(i=0 ; i<dragonArray.length;i++){
                        var d = dragonArray[i];
                                for(j=0;j<bossArray.length;j++){
                                    var bossFireBall = bossArray[j];
                                        if(isCollisionCricles(d,bossFireBall)){
                                            antiOverlappingCricles(d,bossFireBall);
                                            console.log("dragon collide boss  ");
                                            dragonLife--;
                                        }
                                }
                        }//END CHECK 
                    
                    //check va cham gia đạn của dragon và boss :
                    for(i=0 ; i<fires.length;i++){
                        var d = fires[i];
                                for(j=0;j<bossArray.length;j++){
                                    var bossFireBall = bossArray[j];
                                        if(isCollisionCricles(d,bossFireBall)){
                                            antiOverlappingCricles(d,bossFireBall);
                                            console.log("dragon hit boss !!!   ");
                                            hpBar.width -= 0.03 ;
                                            hpBar.sourceWidth -=0.03;
                                                if(hpBar.width < 1){
                                                    gameMessage[gameMessage.length] = "bạn đã chiến thắng con rồng xấu xí ! Vương quốc đã được bảo vệ :3";
                                                }
                                        }
                                }
                        }//END CHECK 
                    
                        render();
                    }//end update()
            function gameOver(){
                gameMessage[gameMessage.length] = "lũ quái vật xấu xa đã xâm chiếm hành tinh của rồng , bạn đã thất bại :(( " ;
            }   //end gameOver             
    
                function render(){
                    getContext.clearRect(0,0,canvas.width,canvas.height);
                    
                       if(sprites.length !== 0 ){
                            for(i =0 ;i<sprites.length;i++){
                                var sprite = sprites[i];
                                getContext.drawImage(sprite.imageSrc,
                                                     sprite.sourceX,sprite.sourceY,sprite.sourceWidth,sprite.sourceHeight,
                                                      sprite.x,sprite.y,sprite.width,sprite.height);
                            }
                       }
                    //hien thi gameMessage :

                }//end render();
})();
    
                
                