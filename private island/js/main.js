window.addEventListener("load", loadFX, false);

function loadFX() {
        var map = document.querySelector("#map");
        var output = document.querySelector("#output");
        var score = document.querySelector("#scoreOutput");
        // map :
        var arrMap = [
        [0, 2, 1, 0, 0, 3],
        [0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0],
        [0, 0, 2, 0, 1, 0],
        [0, 0, 0, 1, 0, 0]
    ];

        var arrObject = [
            [0, 0, 0, 0, 5, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [4, 0, 0, 0, 0, 0]
        ];

        var arrMapRows = arrMap[0].length;
        var arrMapColumns = arrMap.length;
        //map code :
        var PIVATE = 2;
        var ISLAND = 1;
        var HOME = 3;
        var WATER = 0;
        var SHIP = 4;
        var DRAGON = 5;

        //button code
        var SIZE = 64;
        var UP = 38;
        var DOWN = 40;
        var LEFT = 37;
        var RIGHT = 39;
    
        //game variables :
        var food = 1000;
        var gold = 1000;
        var exp = 0;
        var gameMessage = "Sử dụng phím điều hương để tìm đường về tới nhà ! ";
    
        //ship :
        var shipRow, shipColumn;
        //dragon :
        var monsterRow , monsterColumn;
        
        for (i = 0; i < arrMapRows; i++) {
            for (j = 0; j < arrMapColumns; j++) {
                if (arrObject[i][j] === SHIP) {
                    shipRow = i;
                    shipColumn = j;
                   
                }
                if(arrObject[i][j] === DRAGON){
                    monsterRow = i;
                    monsterColumn = j;
                    console.log("dragon x : " + monsterRow + "Dragon y : " + monsterColumn)
                }
            }
        } //get x va y cua ship va dragon 
    
    //render lai map : 
    render();
        
        //tao function bat thuoc tinh bam phim :
    window.addEventListener("keydown", keyDownRender, false);
    function keyDownRender(event) {
                switch (event.keyCode) {
                case UP:
                    if (shipRow > 0) {
                        //neu row >0 (thuyen con trong map thi moi cho di chuyen )
                        //clear curren row , col pos :
                        arrObject[shipRow][shipColumn] = 0;
                        //tru shiprow 1 don vi de di chuyen no len :
                        shipRow--;
                        //dat lai vi tri moi cua con thuyen do :
                        arrObject[shipRow][shipColumn] = SHIP;

                    }
                    break;

                case DOWN:
                    if (shipRow < arrMapRows - 1) {
                        arrObject[shipRow][shipColumn] = 0;
                        shipRow++;
                        arrObject[shipRow][shipColumn] = SHIP;

                    }
                    break;

                case LEFT:
                    if (shipColumn > 0) {
                        arrObject[shipRow][shipColumn] = 0;
                        shipColumn--;
                        arrObject[shipRow][shipColumn] = SHIP;

                    }
                    break;

                case RIGHT:
                    if (shipColumn < arrMapColumns - 1) {
                        arrObject[shipRow][shipColumn] = 0;
                        shipColumn++;
                        arrObject[shipRow][shipColumn] = SHIP;
                    }
                    break;
                }
                //xac dinh vi tri cua con tau :
                switch(arrMap[shipRow][shipColumn]){
                    case WATER :
                   
                    break;

                    case ISLAND : 
                    trade();
                    break;

                    case PIVATE:
                    fight();
                    break;

                    case HOME:
                    endGame();
                    break;
                        }
             
                food--;
        
            dragonMove();
          console.log("dragon x : " + monsterRow + "Dragon y : " + monsterColumn);
            if(gold <= 0 || food<=0){endGame();}
        
             if(arrObject[shipRow][shipColumn] === DRAGON){endGame();}
               
        render();
       } //end keydownRender

    function render() {
                //xoa toan bo img trong div map 
                if (map.hasChildNodes()) {
                    for (i = 0; i < arrMapColumns * arrMapRows; i++) {
                        map.removeChild(map.firstChild);
                    }
                }
                
                //chay vong for de xuat map ra man hinh :
                for (i = 0; i < arrMapColumns; i++) {
                    for (j = 0; j < arrMapRows; j++) {
                        //tao 1 cell :
                        var cell = document.createElement("img");
                        //gan cho cell thuoc tinh class la cell 
                        cell.setAttribute("class", "cell");
                        //gan cell cho vao map :
                        map.appendChild(cell);
                        
                        //thay doi img cho map :
                        switch (arrMap[i][j]) {
                        case WATER:
                            cell.src = "img/water.png";
                            break;

                        case ISLAND:
                            cell.src = 'img/island.png';
                            break;

                        case PIVATE:
                            cell.src = 'img/pirate.png';
                            break;

                        case HOME:
                            cell.src = 'img/home.png';
                            break;
                        }
                        
                        //du chuyen con tau
                        switch (arrObject[i][j]) {
                        case SHIP:
                            cell.src = 'img/ship.png';
                            break;
                                
                        case DRAGON : 
                            cell.src='img/monster.png';    
                            break;
                        
                        }
                        cell.style.top = i * (SIZE) + "px";
                        cell.style.left = j * (SIZE) + "px";
                        
                    }
              
                } //end for xuat ra man hinh chinh
          console.log("thuyen x : " + shipRow + "ship y : " + shipColumn);
                if(arrObject[shipRow][shipColumn] === 0){endGame();}
                score.innerHTML = "Vàng : <span id='bold'>" + gold + "</span> Thực phẩm : <span id='bold'>" + food +"</span> Kinh nghiệm : <span id='bold'>" + exp + "</span>";
                output.innerHTML = gameMessage;
            } //end render() function 
    
    function trade(){
            var islandFood = food + exp;
            var cost = Math.ceil(islandFood*Math.random());
                if(gold > cost){
                    food += islandFood;
                    gold -= cost;
                    exp += 2 ;
                    gameMessage = "bạn đã mua được " + islandFood + " thực phẩm và bị trừ " + cost ;
                }else{
                    gameMessage = "không đủ tiền để mua đò";
                    exp+= 1;
                }
            
        }//end trade function 
    
    function fight(){
        var shipStreng = Math.ceil((food+gold)/2);
        var pivateStreng = Math.ceil(Math.random()*shipStreng*2);
            if(shipStreng > pivateStreng){
                gold += Math.ceil(pivateStreng/2);
                exp += Math.ceil(pivateStreng/4);
                gameMessage = "chúc mừng bạn đã chiến thắng lũ cướp biển gian ác , bạn nhận được số tiền là : " + gold +" và " +exp +" kinh nghiệm ,sức mạnh của tàu còn : " + shipStreng + " ,kinh nghiệm : " + exp;
            }else{
                gold -= Math.ceil(pivateStreng/2);
                exp +=1;
                food -= Math.ceil(pivateStreng/2);
                gameMessage = "bạn đã thất bại trong quá trình chiến đấu với lũ hải tặc xấu xa , chúng đã lấy đi của bạn : "+gold +" và " + food+" sức mạnh của tàu còn : " + shipStreng + " ,kinh nghệm : " + exp ;
             }
    }//end fight()
    
    function dragonMove(){
        var UP = 0 ;
        var DOWN = 1 ;
        var LEFT = 2 ;
        var RIGHT = 3 ;
        var validMove = [];//mang chua nhung gia tri dung ma dragon co the di chuyen
        var move ; //gia tri cuoi cung dragon co the di chuyen
        
            //tim xung quanh dragon xem co nuoc ko ? neu co nuoc thi cho di , ko thi ko dc di , day ket qua dung vao mang validMove
            if(monsterRow > 0){
                var thingAbove = arrMap[monsterRow - 1][monsterColumn];
                    if(thingAbove === WATER){
                        validMove.push(UP);
                    }
            }
            
            if(monsterRow < arrMapRows - 1){
                var thingBelow = arrMap[monsterRow + 1][monsterColumn];
                    if(thingBelow === WATER){
                        validMove.push(DOWN);
                    }
            }
            
            if(monsterColumn < arrMapColumns - 1){
                var thingRight = arrMap[monsterRow][monsterColumn + 1];
                    if(thingRight === WATER){
                        validMove.push(RIGHT);
                    }
            }
        
            if(monsterColumn > 0 ){
                var thingLeft = arrMap[monsterRow][monsterColumn - 1];
                    if(thingLeft === WATER){
                        validMove.push(LEFT);
                    }
            }
        
            //neu tim duoc duong di dung (validMove ko trong ) :
            if(validMove.length !== 0){
                var randomNumber = Math.floor(Math.random() * validMove.length);
                move = validMove[randomNumber] ;//chon ngau nhien 1 so trong validMove
                
            //di chuyen monster : 
                switch(move){
                    case UP:
                    arrObject[monsterRow][monsterColumn] = 0;
                    monsterRow--;
                    arrObject[monsterRow][monsterColumn] = DRAGON ;
                    break;

                    case DOWN:
                    arrObject[monsterRow][monsterColumn] = 0;
                    monsterRow++;
                    arrObject[monsterRow][monsterColumn] = DRAGON ;
                    break;

                    case LEFT : 
                    arrObject[monsterRow][monsterColumn] = 0;
                    monsterColumn--;
                    arrObject[monsterRow][monsterColumn] = DRAGON ;
                    break;

                    case RIGHT:
                    arrObject[monsterRow][monsterColumn] = 0;
                    monsterColumn++;
                    arrObject[monsterRow][monsterColumn] = DRAGON;
                    break;
                }
            }
       
    }//end monsterMove
    
    function endGame(){
        if(arrMap[shipRow][shipColumn] === HOME){
            gameMessage = "chúc mừng bạn đã về được tới nhà ! " + "bạn dành được : "+gold + " và : "+ exp +" kinh nghiệm!";
            window.removeEventListener("keydown",keyDownRender,false);
            
        }
        else{
            if(gold <= 0 ){
            gameMessage = "bạn đã hết $ "  ;
            } 
            if(food <=  0 ){
            gameMessage += " bạn đã hết thức ăn";
            }
            
            gameMessage += " những thủy thủ đáng mến ném bạn xuống biển cho cá mập ăn thịt =)) ";
            
            if(arrObject[shipRow][shipColumn] === 0){
                gameMessage = "bạn đã bị con rồng xấu xí ăn thịt , đi đứng kiểu gì vậy == ";
            }
            
            window.removeEventListener("keydown",keyDownRender,false);
            
        }
    
    }//endGame()
    
    } //end load Event