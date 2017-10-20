var canvas = document.getElementById("gameCanvas");
var cntx = canvas.getContext("2d");
var player1Score = 0;
var player2Score = 0;

//format canvas to look like pong
    cntx.beginPath();
    cntx.strokeStyle = "white";
    cntx.lineWidth = "10";
    cntx.setLineDash([20,15]);
    cntx.moveTo(canvas.width/2, 10);
    cntx.lineTo(canvas.width/2, canvas.height - 10);
    cntx.stroke();


//paddle objects
var Paddle = function(x, y){
    this.x = x;
    this.y = y;
    this.speed = 2;
    this.width = 15;
    this.height = 40;
};

Paddle.prototype.create = function(){
    cntx.fillStyle = "white";
    cntx.fillRect(this.x, this.y, this.width, this.height);
};

Paddle.prototype.move = function(){
    if(this.x < canvas.width){
        canvas.addEventListener("onkeydown", function(e){
            if (e.keycode === 87){
                this.y = this.y - this.speed;
            }   else if (e.keyCode === 83) {
                this.y = this.y + this.speed;
            }
        });
    }   else if(this.x > canvas.width){
        canvas.addEventListener("onkeydown", function(e){
            if (e.keycode === 38){
                this.y = this.y - this.speed;
            }   else if (e.keyCode === 40) {
                this.y = this.y + this.speed;
            }
        });
    }
};
