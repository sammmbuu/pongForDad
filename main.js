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
    this.width = 15;
    this.height = 80;
};

Paddle.prototype.create = function(){
    cntx.fillStyle = "white";
    cntx.fillRect(this.x, this.y - this.height/2, this.width, this.height);
};

Paddle.prototype.move = function(){
    if(this.x < canvas.width){
        canvas.addEventListener("onkeydown", function(e){
            if (e.keycode === 87){
                this.y -= this.speed;
            }   else if (e.keyCode === 83) {
                this.y += this.y + this.speed;
            }
        });
    }
    
    if(this.x > canvas.width){
        canvas.addEventListener("onkeydown", function(e){
            if (e.keycode === 38){
                this.y -= this.speed;
            }   else if (e.keyCode === 40) {
                this.y += this.speed;
            }
        });
    }
    
    //don't let it go past canvas edge
    if(this.y < 0){
        this.y = 0;
    }  else if (this.y + this.height > canvas.height){
        this.y = canvas.height - this.height;
    }
};

Paddle.prototype.ballCheck = function(){
    
};

var paddle1 = new Paddle(40, canvas.height/2);
var paddle2 = new Paddle(canvas.width - 40, canvas.height/2);

function mainProgram() {
    //clear canvas
    cntx.clearRect(0, 0, canvas.width, canvas.height);
    
    //formatting
    canvasFormat();
    
    paddle1.move();
    paddle2.move();
    //paddle1.ballCheck();
    //paddle2.ballCheck();
    
    
    paddle1.create();
    paddle2.create();
    
}

setInterval(mainProgram, 20);