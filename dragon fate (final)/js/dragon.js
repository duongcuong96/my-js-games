(function(){
            var canvas = document.querySelector("canvas");
                var getContext = canvas.getContext("2d");
                
                //array store many image :
                var assetToLoad = [];
                var assetLoaded = 0;
                var sprites = [];
                var assetSoundToLoad = [];
                var assetSoundLoaded = 0 ;
                //buttons : 
                var UP = 38,DOWN=40,LEFT = 37,RIGHT=39,SPACE = 32;
                
                //can movie ? :
                var moveUp=false,moveDown = false,moveLeft = false,moveRight = false,fire=false;
                
                //gameState :
                var gameState = 0; //0 = loading ,1 = playing , 2 = over 
                var canMakeBoss = true;
                var isMonsterWin = false;
                var  isBossWin = false;
                var isMonsterKill = false;
                var isDragonWin = false;
                //item , fireBall, monster
                var monsters = [];
                var monstersEscaped = 0 ;
                var score = 0 ;
                var scoreMakeBoss = 100;
                
                //hein thi message :
                var gameMessage  = [] ;
                var monsterSayArr = [];
                //gia tri cua boss :
                var bossArray = [] ; //chua boss
                var bossFireArray = []; //chua đạn của boss
                var bossFireAfterTime = 0;
//                var bossFireFrequency = 80;
    
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
            
                var messageObject = {
                    fontsize : 18,
                    color : "#fff",
                    text : '',
                    fillStyle : "#fff",
                    textBaseline : "top"
                };
            
                //game Sounds :
                var backgroundSound = document.querySelector("#backgroundSound");
                    backgroundSound.addEventListener("canplaythrough",loadHandler,false);
                    backgroundSound.load();
                assetSoundToLoad.push(backgroundSound);
    
                var fireSound = document.querySelector("#fireSound");
                    fireSound.addEventListener("canplaythrough",loadHandler,false);
                    fireSound.load();
//                        fireSound.volume = 5 ;
                assetSoundToLoad.push(fireSound);
    
                var explodeSound = document.querySelector("#explodeSound");
                    explodeSound.addEventListener("canplaythrough",loadHandler,false);
                    explodeSound.load();
                assetSoundToLoad.push(explodeSound);
    
    
                function monsterRandomText(){
                        var arr =  [
                            "á,chết em","hự","vĩnh biệt cuộc đời","éc","quác","cục tác...","ặc","thôi xong","thôi,em đi","trước khi chết em muốn nói đôi lời ...","vĩnh biệt anh em ","á con rồng xấu xa >< ","em đi xa quá...","vĩnh biệt sếp,em đi" ,"vĩnh biệt vợ con","ê!ghi hộ tao di chúc nhé T_T","á hự","ặc ặc","ẳng ẳng ","hix hixx","em còn chưa lấy vợ... T_T" ];
                        var randomNum =Math.floor(Math.random()*arr.length);
                        return arr[randomNum];
                    }
        
                var monsterSays = Object.create(messageObject);
                    monsterSays.fontFamily = "bold 5px Arial ";
//                    monsterSays.fontFamily = "5px Arial";
    
                var gameScoreMessage = Object.create(messageObject);
                    gameScoreMessage.fillStyle = "#E0C8B0";
                    gameScoreMessage.fontFamily = "bold 18px Arial";
                    gameScoreMessage.x =10;
                    gameScoreMessage.y = 10;
                    gameScoreMessage.text = "Điểm : 0000 ";
                    gameMessage.push(gameScoreMessage);
    
                var gameOverMessage = Object.create(messageObject);
                    gameOverMessage.fillStyle = "#FF5041";
                    gameOverMessage.fontFamily = "bold 50px Arial";
                    gameOverMessage.x = canvas.width/3;
                    gameOverMessage.y = canvas.height/2;
                        
    
                var bossSays = Object.create(gameMessage);
                    bossSays.fillStyle = "#000000";
                    bossSays.fontFamily = "bold 30px Arial";
                    bossSays.x = canvas.width-10;
                    bossSays.y = 10;
                    
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
                    monster.sourceWidth = 50;
                    monster.sourceHeight = 50;
                    monster.sizeX = 307;
                    monster.sizeY = 188;
                    monster.sourceY = 76;
                    monster.currentFrame = 0;
                    monster.numberOfFrames = 6;
                    monster.forward = true;
                     monster.sourceX = 151;
//                     monster.sourceX = 50;
                    monster.x = 0;
                    monster.y = 0;
                    monster.width = 0;
                    monster.height = 0;
    
                    monsterImage = new Image();
                    monsterImage.src = 'pics/birdOK.png';
                
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
                                fireSound.currentTime = 0 ;
                                fireSound.play();
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
                        assetSoundLoaded++;
                            if(assetLoaded === assetToLoad.length ){
                                for(i=0;i<assetToLoad.length;i++){
                                     sprites[i].imageSrc = assetToLoad[i]; 
                                }
                                backgroundSound.play();
                                backgroundSound.volume = 0.5;
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
                    bossSays.text = "khá lắm , dám hạ hết lũ quái trứng thối của ta,xem ta đây  ! ";
                    bossSays.x = bossObject.x-200 ;
                    gameMessage.push(bossSays);
                    bossSays.y =bossObject.y -20;
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
                
                function displayGameMessage(){
                    for(i =0 ;i<gameMessage.length;i++){
                        var m = gameMessage[i];
                            getContext.fillStyle = "#E0C8B0";
                            getContext.fillText(m,0,0);
                            getContext.font = "bold Arial 18px;";
                            
                    }
                }
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
                                if(score > 50) monsterFrequency = 10;
                        }
                      //movie monsters :
                    for(i = 0 ; i<monsters.length;i++){
                        var m = monsters[i];
                        m.x -= m.vx;
                        if(m.x < 0){ 
                        console.log("chay qua ");
                        gameState = 2; //over
                        removeObject(m,monsters);
                        removeObject(m,sprites);
                            gameOverMessage.text = "lũ quái vật xấu xa đã xâm chiến hành tinh rồng tươi đẹp , nhiệm vụ thất bại :( ";
                            gameOverMessage.x = canvas.width/3;
                            gameOverMessage.y = canvas.height/2;
                            gameMessage.push(gameOverMessage);
                            gameState = 2; //over 
                            isMonsterWin = true;
                           
                        }
                    }

                    
                    //movie fireball cua dragon 
                    for (i = 0; i < fires.length; i++) {
                        var fire = fires[i];
                        fire.x += fire.vx;
                    }

                        //create boss neu score = 60 :
                        if(score > scoreMakeBoss && canMakeBoss === true){
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
                      
                        if(b.y < -100){
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
                                if(hpBar.width < 200 && hardMode === false){
                                bossFireFrequency = 60;
                            }
                                if(hpBar.width < 100) bossFireFrequency = 40;
                                if(hpBar.width < 10) bossFireFrequency = 10;
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
                                            score++;
                                            gameScoreMessage.text = "Điểm: " +score +"000" ;
                                            monsterSays.text = monsterRandomText();
                                            monsterSays.x = monsterOb.x ;
                                            monsterSays.y = monsterOb.y - 5;
                                            monsterSays.fillStyle = "#000000";
                                            monsterSays.font = "bold 5px Arial";
                                            monsterSayArr.push(monsterSays);
                                            explodeSound.currentTime = 0;
                                            explodeSound.play();
                                        }
                                }
                        //check gameOVER
                            if(monsterOb.x < 0){
                                gameOverMessage.text("Lũ quái vật đã xâm chiếm ngôi làng yên bình... game Over ");
                                gameMessage.push(gameOverMessage);
                                gameState = 2 ;
                                isMonsterWin = true;
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
                                                if(dragonLife < 0){
                                                    isMonsterKill = true;
                                                    gameState = 2 ;
                                                }
                                            console.log(dragonLife);
                                        }
                                }
                        }//END CHECK                     
                    
                    
                // check va cham  ĐẠN dragon vs đạn  boss  :
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
                                            dragonLife -=2;
                                            
                                            if(dragonLife < 0){
                                            gameState = 2 ;
                                            isBossWin = true;
                                            }
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
                                            dragonLife -= 5;
                                           
                                        }
                                }
                        }//END CHECK 
                    
                    //check va cham gia đạn của dragon và boss :
                    for(i=0 ; i<fires.length;i++){
                        var d = fires[i];
                                for(j=0;j<bossArray.length;j++){
                                    var bossFireBall = bossArray[j];
                                        if(isCollisionCricles(d,bossFireBall)){
//                                            antiOverlappingCricles(d,bossFireBall);
                                            console.log("dragon hit boss !!!   ");
                                            
                                            hpBar.width -= 0.5 ;
                                            hpBar.sourceWidth -= 0.5;
                                            explodeSound.currentTime = 0 ;
                                            explodeSound.play();
                                             removeObject(d,fires);
                                            removeObject(d,sprites);
                                            score++;
                                            
                                            gameScoreMessage.text = "Điểm: " +score +"000" ;

                                                if(hpBar.width < 1){
                                                    gameOverMessage.text = "bạn đã chiến thắng con rồng xấu xí ! Vương quốc đã được bảo vệ :3";                                             gameMessage.push(gameOverMessage);
                                                    gameState = 2 ;
                                                    isDragonWin = true;
                                                }
                                        }
                                }
                        }//END CHECK 
                    
                        //check xem dragon con mau ko ? 
                     if(dragonLife  < 0){
                         gameOverMessage.text = "Dragon đã hết máu , chết rất là tức tưởi T_T , gameOver ! ";
                         gameMessage.push(gameOverMessage);
                         gameState = 2; //over 
                     }
                    
                    //check gameOver()
                    
                    gameOver();
                        render();
                    }//end update()
    
                 function gameOver(){
                    if(gameState == 2){
//                        if(dragonLife < 0){
//                                alert("con rồng khốn khổ bị bạn điều khiển đã hết sạch máu \n hành tinh đáng thương bạn đang bảo vệ đãn bị tụi quái vật trứng thối tiêu diệt , gameOVER :( \n điểm của bạn " + score*1000);
//                           
//                        }
                        
                        if(isDragonWin){
                            alert("Chúc mừng bạn đã chiến thắng con quái vật trứng thối chúa xấu xí   ! \n Hành tinh rồng đã được bạn bảo vệ!\n tuyệt vời! \n Điểm :  " + score*1000);
                        }
                        
                        if(isMonsterWin){
                            alert("Lũ quái vật trứng thối đã xâm chiến hành tinh của rồng ! \n Chúng tàn phá,cướp bóc tất cả mọi thứ,biến mọi thần dân rồng thành món trứng rán sau đó đem về cho quái vật trứng thối chúa ! \n Điểm của bạn : "+score*1000);
                        }
                        if(isBossWin){
                            alert("Hahaha! con gà , à quên,con rồng đáng thương , kẻ điều khiển ngươi quá kém cỏi nên đã bị ta hạ gục ! \n Cứ yên tâm nhắm mắt đi ! ta sẽ biến hành tinh của ngươi thành nô lệ phải nấu trứng rán cho lũ con trứng thối của ta ăn ! \n Điểm của ngươi là : "  + score*1000);}
                        if(isMonsterKill){
                            alert("Con rồng đáng thương bạn điều khiển đã bị lũ quái trứng thối tấn công không còn 1 giọt máu :( ! \n hành tinh rồng sau đó thì tất nhiên bị xâm chiếm , sau đó lũ quái trứng thối đã biến mọi thần dân rồng thành món trứng rán sau đó đem về cho quái vật trứng thối chúa ! \n Điểm của bạn : " + score*1000);
                        }
                        
                location.reload();
                    }

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
                 if(gameMessage.length > 0){
                    for(i =0;i<gameMessage.length;i++){
                        var m = gameMessage[i];
                            getContext.fillStyle = m.fillStyle;
                            getContext.fillText(m.text,m.x,m.y);
                            getContext.font = m.fontFamily;
                            getContext.textBaseline = m.textBaseline;
                    }
                 }
                    //hien thi monster say message :
                        if(monsterSayArr.length > 0){
                            for(i=0;i<monsterSayArr.length;i++){
                                var m = monsterSayArr[i];
                                    getContext.fillStyle = m.fillStyle;
                                    getContext.fillText(m.text,m.x,m.y);
                                    getContext.textBaseline = m.textBaseline;
                            }
                            if(monsters.length === 0){
                                monsterSayArr = [] ;
                            }
                        }

                }//end render();
})();
    
                
                