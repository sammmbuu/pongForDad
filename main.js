var canvas = document.getElementById("gameCanvas");
var cntx = canvas.getContext("2d");
var player1Score = 0;
var player2Score = 0;

//format canvas to look like pong
function canvasFormat(){
    cntx.beginPath();
    cntx.strokeStyle = "white";
    cntx.lineWidth = "10";
    cntx.setLineDash([20,15]);
    cntx.moveTo(canvas.width/2, 10);
    cntx.lineTo(canvas.width/2, canvas.height - 10);
    cntx.stroke();
}

//paddle objects
var Paddle = function(x, y){
    this.x = x;
    this.y = y;
    this.speed = 2;
    this.width = 16;
    this.height = 80;
};

Paddle.prototype.create = function(){
    cntx.fillStyle = "white";
    cntx.fillRect(this.x, this.y - this.height/2, this.width, this.height);
};

Paddle.prototype.move1 = function(){
    
    document.addEventListener("onkeydown", function(e){
        if (e.keycode === 87){
            this.y -= this.speed;
        }   else if (e.keyCode === 83) {
            this.y += this.y + this.speed;
        }
    });
    
    //don't let it go past canvas edge
    if(this.y < 0){
        this.y = 0;
    }  else if (this.y + this.height > canvas.height){
        this.y = canvas.height - this.height;
    }
};
    
Paddle.prototype.move2 = function(){
        document.addEventListener("onkeydown", function(e){
            if (e.keycode === 38){
                this.y -= this.speed;
            }   else if (e.keyCode === 40) {
                this.y += this.speed;
            }
        });
    
    //don't let it go past canvas edge
    if(this.y < 0){
        this.y = 0;
    }  else if (this.y + this.height > canvas.height){
        this.y = canvas.height - this.height;
    }
};

Paddle.prototype.ballCheck1 = function(){
    if(this.x + 16 === ball.x - ball.radius && 
        this.y - this.height + ball.radius < ball.y && 
        this.y + this.height - ball.radius > ball.y){
            ball.xSpeed = ball.xSpeed * -1;
        }
};

Paddle.prototype.ballCheck2 = function(){
    if(this.x === ball.x + ball.radius && 
        this.y - this.height + ball.radius < ball.y && 
        this.y + this.height - ball.radius > ball.y){
            ball.xSpeed = ball.xSpeed * -1;
        }
};

var paddle1 = new Paddle(40, canvas.height/2);
var paddle2 = new Paddle(canvas.width - 40, canvas.height/2);

//ball object
var Ball = function(){
    this.x = canvas.width/2;
    this.y = canvas.height/2;
    this.xSpeed = 1;
    this.ySpeed = 2;
    this.radius = 8;
};

Ball.prototype.make = function(){
    cntx.beginPath();
    cntx.fillStyle = "white";
    cntx.arc(this.x, this.y, this.radius, 0, 360);
    cntx.closePath();
    cntx.fill();
};

Ball.prototype.checkWalls = function(){
    if(this.x - this.radius === 0){
        this.xSpeed = this.xSpeed * -1;
    }
    if(this.x + this.radius > canvas.width) {
        this.xSpeed = this.xSpeed * -1;
    }
    if(this.y - this.radius < 0){
        this.ySpeed = this.ySpeed * -1;
    }
    if(this.y + this.radius > canvas.height){
        this.ySpeed = this.ySpeed * -1;
    }
};

Ball.prototype.moveBall = function(){
    this.x += this.xSpeed;
    this.y += this.ySpeed;
};

var ball = new Ball();

function mainProgram() {
    //clear canvas
    cntx.clearRect(0, 0, canvas.width, canvas.height);
    
    //formatting
    canvasFormat();
    
    paddle1.move1();
    paddle2.move2();
    paddle1.ballCheck1();
    paddle2.ballCheck2();
    ball.checkWalls();
    ball.moveBall();
    
    
    ball.make();
    
    paddle1.create();
    paddle2.create();
    
}

setInterval(mainProgram, 5);