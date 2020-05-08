const TOP =0;
const BOTTOM  = 600;
const LEFT =0;
const RIGHT  = 600;
const ASTEROID_NUMBER =15;
var aImg = new Image();  
aImg.src = 'greenCir.png';

class Asteroid{
	x= 400	
	y= 500
	r = 15
	dx= 0
	dy= 50
	move(){
		this.x= this.x + this.dx;
        
		this.y= this.y +this.dy;
		
	}
	draw(){
		ctx.drawImage(aImg,this.x-this.r, this.y-this.r);
	}
}
//sets asteroids as array and creates asteroids until it has reached the amount set in the constant ASTEROID_NUMBER
var asteroids = [];
for(var i = 0; i< ASTEROID_NUMBER; i++)
	asteroids[i]=new Asteroid();

//Ship variables
var x=300
var y=450
var dx=10
var dy=10
var r = 30
var shipImg = new Image();  
shipImg.src = 'blueCir.png';


var ctx
var timer
var score = 0;
var scorecontinue = 1;

//draws the asteroids
function drawAsteroids(){
for(var i = 0; i< ASTEROID_NUMBER; i++)
	asteroids[i].draw();
}
//draws the ship
function drawShip(){
	ctx.drawImage(shipImg,x-r, y-r);
}
//draws the canvas and gets rid of the lines left by the ship and asteroids
function draw(){
	ctx.fillStyle = "#000000" ; 
    ctx.fillRect(LEFT, TOP, RIGHT, BOTTOM);
	drawShip(x, y);
	drawAsteroids();
}	

//moves the asteroids using move function set in the asteroid class
function AstroMove(){
	for(var i = 0; i< ASTEROID_NUMBER; i++)
	asteroids[i].move();
}
//circular collision detection for all asteroids
function Collision(){
	for(var i = 0; i< ASTEROID_NUMBER; i++){
		if (Math.sqrt((asteroids[i].x - x) * (asteroids[i].x - x)  + (asteroids[i].y - y) * (asteroids[i].y - y)) < (asteroids[i].r + asteroids[i].r)) {
			return true
		}
	}
	
}
//when the asteroids hit the bottom of the canvas they are randomly teleported across the y axis and randomly have a set dy value within a certain range
function returns(){
	for(var i = 0; i< ASTEROID_NUMBER; i++){
		if (asteroids[i].y >= BOTTOM){
			asteroids[i].x = Math.random() * ((LEFT - RIGHT) + 1) + RIGHT;
			asteroids[i].dy = Math.random() * ((15 - 10) + 1) + 10;
		}
	}
}

function update(){
	
	if(Collision()){
		x = 50
		y = 50
		dx = 0
		dy = 0
		//if collision is true then stop asteroids and ship from moving
		for(var i = 0; i< ASTEROID_NUMBER; i++){
			asteroids[i].dy = 0
			asteroids[i].dx = 0
		}
		//if a collision is detected then stop the score from going up and displays your score
		scorecontinue = 2
		document.write("Your score is " + score + " To try again reload the page again by pressing f5 on your keyboard.")
	}
	//movement for ship
	if(upKeyPressed) y -= dy
	if(downKeyPressed) y += dy
	if(leftKeyPressed) x -= dx
	if(rightKeyPressed) x += dx
	if(spacePressed){
		x = 10
		y= 10
	}

	//wrapping for the ship going off the screen
	if(x >= RIGHT) x = LEFT + 20
	if(x <= LEFT) x = RIGHT	- 20
	if(y >= BOTTOM) y = TOP + 20
	if(y <= TOP) y = BOTTOM - 20

	//wrapping for asteroids going off the screen
	for(var i = 0; i< ASTEROID_NUMBER; i++){
		if(asteroids[i].x >= RIGHT) asteroids[i].x = LEFT + 20
		if(asteroids[i].x <= LEFT) asteroids[i].x = RIGHT - 20
		if(asteroids[i].y >= BOTTOM) asteroids[i].y = TOP + 20
		if(asteroids[i].y <= TOP) asteroids[i].y = BOTTOM - 20
	}

	//draws the asteroids, moves them, randomly moves them across x axis when hits bottom
	draw()
	AstroMove()
	returns()
	if(scorecontinue == 1){
		score = score + 1;
	}
}


var upKeyPressed =false
var downKeyPressed =false
var leftKeyPressed =false
var rightKeyPressed =false
var spacePressed =false

function keyDown(e){
	changeKey(e.keyCode, true)
}

function keyUp(e){
	changeKey(e.keyCode, false)
}


function changeKey(which, to){
	switch (which){
		case 32: spacePressed =to; break
		case 37: leftKeyPressed =to; break 
		case 38: upKeyPressed =to; break
		case 39: rightKeyPressed =to; break 
		case 40: downKeyPressed=to; break
			
	}
}
window.onload=function(){
	ctx=document.getElementById("myCanvas").getContext("2d")
	document.onkeyup=keyUp
	document.onkeydown=keyDown
	timer = setInterval(update, 25)
}