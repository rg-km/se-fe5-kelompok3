	const CELL_SIZE = 20;
	const CANVAS_SIZE = 600;
	const REDRAW_INTERVAL = 50;
	const MOVE_INTERVAL = 120;
	const WIDTH = CANVAS_SIZE / CELL_SIZE;
	const HEIGHT = CANVAS_SIZE / CELL_SIZE;

	const DIRECTION = {
		LEFT: 0,
		RIGHT: 1,
		UP: 2,
		DOWN: 3,
	}

	
	
	function initHeadAndBody() {
	    let head = {x: 4, y: 10};
	    let body = [{x: head.x, y: head.y}];
	    return {
	        head: head,
	        body: body,
	    }
	}
	
	function initDirection() {
	    return 1;
	}
	
	function initSnake(color) {
	    return {
	        color: color,
	        ...initHeadAndBody(),
	        direction: initDirection(),
	        score: 0,
	        life: 3,
	        level: 1,
	        speed: 120,
	    }
	}

	let absentValue = [];
	let isPrime = sieveOfEratosthenes(1000);
	function isPresent(x, y){
	    for(let i=0; i<absentValue.length; i++){
	        if(absentValue[i].x == x && absentValue[i].y == y){
	            return true;
	        }
	    }
	    return false;
	}
	
	function sieveOfEratosthenes(n) {
	    var array = [], upperLimit = Math.sqrt(n), output = [];
	
	    for (var i = 0; i < n; i++) {
	        array.push(true);
	    }
	
	    for (var i = 2; i <= upperLimit; i++) {
	        if (array[i]) {
	            for (var j = i * i; j < n; j += i) {
	                array[j] = false;
	            }
	        }
	    }
	    return array;
	};
	function initPosition() {
	    let y = Math.floor(Math.random() * HEIGHT);
	    let x = Math.floor(Math.random() * WIDTH);
	    while(isPresent(x, y)){
	        x = Math.floor(Math.random() * WIDTH);
	        y = Math.floor(Math.random() * HEIGHT);
	    }
	    return {
	        x: x,
	        y: y,
	    }
	}

	function createBarrier(x, y, width, height){
	    let positions = [];
	    for(let i=0; i<height; i++){
	        for(let j=0; j<width; j++){
	            positions.push({x: x+j, y: y+i});
	            absentValue.push({x: x+j, y: y+i});
	        }
	    }
	    return positions;
	}
	
	function dinding(level){
	    let positions = [];
	    
	   //membuat lev
	    if(level==2){
			
			let dindingLevelDua1 = createBarrier(5, HEIGHT-3, WIDTH - 10, 1);
	        positions  = dindingLevelDua1;
	    }else if(level==3){
			let dindingTiga1 = createBarrier(8, HEIGHT/2, WIDTH - 15, 1);
	    	let dindingTiga2 = createBarrier(5, HEIGHT-3, WIDTH - 10, 1);
	        positions  = dindingTiga1.concat(dindingTiga2);
	    }else if(level==4){
			
			let dindingLevelEmpat1 = createBarrier(5, HEIGHT-3, WIDTH - 10, 1);
			let dindingEmpat2 = createBarrier(5, HEIGHT/2, WIDTH - 15, 1);
	    	let dindingEmpat3 = createBarrier(25, 2, 1, HEIGHT-10);
	        positions  = dindingLevelEmpat1.concat(dindingEmpat2,dindingEmpat3);
	    }else if(level>=5){
			let dindingLevelLima1 = createBarrier(5, HEIGHT-27, WIDTH - 15, 1);
			let dindingLevelLima2 = createBarrier(5, HEIGHT-3, WIDTH - 10, 1);
			let dindingLevelLima3 = createBarrier(5, HEIGHT/2, WIDTH - 15, 1);
			let dindingLevelLima4 =  createBarrier(25, 2, 1, HEIGHT-10);
	        positions  = dindingLevelLima1.concat(dindingLevelLima2, dindingLevelLima3, dindingLevelLima4);
	    }
	    return positions;
	}
	
	

	let wall = [
	{
	    position: dinding(1),
	    color: "black",
	},
	{
	    level: 2,
	    position: dinding(2),
	    color: "black",
	},
	{
	    level: 3,
	    position: dinding(3),
	    color: "black",
	},
	{
	    level: 4,
	    position: dinding(4),
	    color: "black",
	},
	{
	    level: 5,
	    position: dinding(5),
	    color: "black",
	}]
	
	let apples = [{
	    color: "red",
	    position: initPosition(),
	},
	{
	    color: "green",
	    position: initPosition(),
	}]
	
	let snake1 = initSnake();
	
	let soul = {
	    position: initPosition(),
	    eaten: true,
	}
	
	function drawCell(ctx, x, y, color) {
	    ctx.fillStyle = color;
	    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
	}
	
	
	function drawScore(snake) {
	    let scoreCanvas;
	    scoreCanvas = document.getElementById("score1Board");
	    let scoreCtx = scoreCanvas.getContext("2d");
	
	    scoreCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
	    scoreCtx.font = "30px Arial";
	    scoreCtx.fillStyle = snake.color
	    scoreCtx.fillText(snake.score, 40, scoreCanvas.scrollHeight / 2 + 10);
	}
	
	function draw() {
	    setInterval(function() {
	        let snakeCanvas = document.getElementById("snakeBoard");
	        let ctx = snakeCanvas.getContext("2d");
	
	        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
	        
			let imgSnakeHead = document.getElementById("snake");
			ctx.drawImage(imgSnakeHead, snake1.head.x * CELL_SIZE, snake1.head.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
	        for (let i = 1; i < snake1.body.length; i++) {
				let imgSnakeBody = document.getElementById("dot");
				ctx.drawImage(imgSnakeBody, snake1.body[i].x * CELL_SIZE, snake1.body[i].y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
	        }
	
	        for (let i = 0; i < apples.length; i++) {
	            let apple = apples[i];
	 
	            let img = document.getElementById("apple");
	            ctx.drawImage(img, apple.position.x * CELL_SIZE, apple.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
	        }
	        for (let i=0; i<snake1.life; i++) {
	            let life = document.getElementById("life");
	            ctx.drawImage(life, i * CELL_SIZE, 0, CELL_SIZE, CELL_SIZE);
	        }
	        let level = snake1.level-1;
	        for(let i=0; i<wall[level].position.length; i++){
				let imgWall = document.getElementById("wall");
				ctx.drawImage(imgWall,  wall[level].position[i].x * CELL_SIZE , wall[level].position[i].y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
	           // drawCell(ctx, wall[level].position[i].x, wall[level].position[i].y, wall[level].color);
	        }
	        if(soul.eaten == false){
	            let life = document.getElementById("heart");
	            ctx.drawImage(life, soul.position.x * CELL_SIZE, soul.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
	        }
	        drawScore(snake1);
	    }, REDRAW_INTERVAL);
	}
	
	function teleport(snake) {
	    if (snake.head.x < 0) {
	        snake.head.x = CANVAS_SIZE / CELL_SIZE - 1;
	    }
	    if (snake.head.x >= WIDTH) {
	        snake.head.x = 0;
	    }
	    if (snake.head.y < 0) {
	        snake.head.y = CANVAS_SIZE / CELL_SIZE - 1;
	    }
	    if (snake.head.y >= HEIGHT) {
	        snake.head.y = 0;
	    }
	}
	
	function eat(snake, apples, soul) {
	    for (let i = 0; i < apples.length; i++) {
	        let apple = apples[i];
	        if (snake.head.x == apple.position.x && snake.head.y == apple.position.y) {
				let audio = new Audio('asset/eat.mp3');
       				audio.play();
	            apple.position = initPosition();
	            snake.score++;
	            snake.body.push({x: snake.head.x, y: snake.head.y});
	            if(snake.score%5==0 && snake.score >0 && snake.level<5){
	                snake.level++;
					let audio = new Audio('asset/naik-level.mp3');
       				audio.play();
	                alert("Kamu Naik Level" + snake.level);
	                snake.speed-=20;
	            }
	            if(snake1.score > 2 && isPrime[snake1.score]){
	                soul.eaten = false;
	            } 
	        }
	    }
	    if(snake.head.x == soul.position.x && snake.head.y == soul.position.y){
	        snake.life++;
	        soul.position = initPosition();
	        soul.eaten = true;
	    }
	}
	
	function moveLeft(snake) {
	    snake.head.x--;
	    teleport(snake);
	    eat(snake, apples, soul);
	}
	
	function moveRight(snake) {
	    snake.head.x++;
	    teleport(snake);
	    eat(snake, apples, soul);
	}
	
	function moveDown(snake) {
	    snake.head.y++;
	    teleport(snake);
	    eat(snake, apples, soul);
	}
	
	function moveUp(snake) {
	    snake.head.y--;
	    teleport(snake);
	    eat(snake, apples, soul);
	}
	
	function checkCollision(snakes, walls) {
	    let isCollide = false;
	    for (let i = 1; i < snakes.body.length; i++) {
	        if (snakes.head.x == snakes.body[i].x && snakes.head.y == snakes.body[i].y) {
	            isCollide = true;
	        }
	    }
	    let position = walls[snake1.level-1].position;
	    for(let i=0; i<position.length; i++){
	        if(snakes.head.x == position[i].x && snakes.head.y == position[i].y){
	            isCollide = true;
	        }
	    }
	    if (isCollide) {
	        if(snakes.life>0){
	            snakes.life--;
	        }else{
				let audio = new Audio('asset/game-over.mp3');
       			audio.play();
	            alert("Game Over");
	            snake1 = initSnake();
	        }
	    }
	    return isCollide;
	}
	
	function move(snake) {
	    switch (snake.direction) {
	        case DIRECTION.LEFT:
	            moveLeft(snake);
	            break;
	        case DIRECTION.RIGHT:
	            moveRight(snake);
	            break;
	        case DIRECTION.DOWN:
	            moveDown(snake);
	            break;
	        case DIRECTION.UP:
	            moveUp(snake);
	            break;
	    }
	    moveBody(snake);
	    if (!checkCollision(snake1, wall)) {
	        setTimeout(function() {
	            move(snake);
	        }, snake.speed);
	    } else {
	        initGame();
	    }
	}
	
	function moveBody(snake) {
	    snake.body.unshift({ x: snake.head.x, y: snake.head.y });
	    snake.body.pop();
	}
	
	function turn(snake, direction) {
	    const oppositeDirections = {
	        [DIRECTION.LEFT]: DIRECTION.RIGHT,
	        [DIRECTION.RIGHT]: DIRECTION.LEFT,
	        [DIRECTION.DOWN]: DIRECTION.UP,
	        [DIRECTION.UP]: DIRECTION.DOWN,
	    }
	
	    if (direction !== oppositeDirections[snake.direction]) {
	        snake.direction = direction;
	    }
	}
	
	document.addEventListener("keydown", function (event) {
	    if (event.key === "ArrowLeft") {
	        turn(snake1, DIRECTION.LEFT);
	    } else if (event.key === "ArrowRight") {
	        turn(snake1, DIRECTION.RIGHT);
	    } else if (event.key === "ArrowUp") {
	        turn(snake1, DIRECTION.UP);
	    } else if (event.key === "ArrowDown") {
	        turn(snake1, DIRECTION.DOWN);
	    }
	})
	
	function initGame() {
	    move(snake1);
	}
	
	initGame();

