// ID: 211470802
// ID: 208179267‏
var canvas=document.getElementById("canvas1");
var ctx=canvas.getContext("2d");
var x=canvas.width/2;
var y=canvas.height-30;
var dx=2;
var dy=-2;
var ballRadius=15;
var paddleHeight=15;
var paddleWidth=75;
var paddleX=(canvas.width-paddleWidth)/2;
var rightPressed=false;
var leftPressed=false;
var brickRowCount=6;
var brickColumnCount=8;
var brickWidth=75;
var brickHeight=20;
var brickPadding=10;
var brickOffSetTop=30;
var brickOffSetLeft=30;
var score=0;
var lives=3;

var bricks=[];
for(let c=0;c<brickColumnCount;c++)
{
	bricks[c]=[];
	for(let r=0;r<brickRowCount;r++)
	{
		bricks[c][r]={x:0,y:0,status:1};
	}
}

document.addEventListener("keydown",keyDownHandler);
document.addEventListener("keyup",keyUpHandler);

document.addEventListener("mousemove",mouseMoveHandler);

function mouseMoveHandler(e)
{
	var relativeX = e.clientX-canvas.offsetLeft;
	if(relativeX>0+paddleWidth/2 && relativeX < canvas.width-paddleWidth/2)
	{
		paddleX= relativeX-paddleWidth/2;
	}
}
function drawBricks()
{
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 6;
    ctx.strokeStyle = 'blue';
    ctx.stroke();
	for(let c=0;c<brickColumnCount;c++)
	{
		for(let r=0;r<brickRowCount;r++)
		{
			if(bricks[c][r].status==1)
			{
			var brickX=(c*(brickWidth+brickPadding)+brickOffSetLeft);
			var brickY=(r*(brickHeight+brickPadding)+brickOffSetTop);
			bricks[c][r].x=brickX;
			bricks[c][r].y=brickY;
			
			ctx.beginPath();
			ctx.rect(brickX,brickY,brickWidth,brickHeight);
			ctx.fillStyle="#FFFF00";
			ctx.fill();
			ctx.strokeStyle="#FFFF00";
			ctx.stroke();
			ctx.closePath();
			}

		}
	}
}
function keyDownHandler(e){
	if(e.keyCode==39)
	{
		rightPressed=true;
	}
	else if(e.keyCode==37)
	{
		leftPressed=true;
	}

}

function keyUpHandler(e){
	if(e.keyCode==39)
	{
		rightPressed=false;
	}
	else if(e.keyCode==37)
	{
		leftPressed=false;
	}

}

function drawBall()
{
	ctx.beginPath();
	ctx.arc(x,y,ballRadius,0,Math.PI*2);
	ctx.fillStyle="#FF0000";
	ctx.fill();
	ctx.closePath();
}

function drawPaddle()
{
	ctx.beginPath();
	ctx.rect(paddleX,canvas.height-(paddleHeight),paddleWidth,paddleHeight);
	ctx.fillStyle="#000000";
	ctx.fill();
    ctx.closePath();
}
function collisonDetection()
{
	for(var c=0;c<brickColumnCount;c++)
	{
		for(var r=0;r<brickRowCount;r++)
		{
			var b=bricks[c][r];
			if(b.status == 1)
			{
				if(x>b.x && x< b.x+brickWidth && y>b.y && y< b.y+brickHeight )
				{
					dy=-dy;
					b.status=0;
					++score;
					if(brickColumnCount*brickRowCount == score)
					{
						alert("YOU WIN time: "+document.getElementById("minutes").innerHTML+document.getElementById("Colon").innerHTML+document.getElementById("seconds").innerHTML);
						document.location.reload();
					}

				}
			}
		}
	}
}


function drawLives()
{
	ctx.font="16px Arial";
	ctx.fillStyle="#0095DD";
	ctx.fillText("Lives:"+lives,canvas.width-65,20);

}
function draw()
{
	ctx.clearRect(0,0,canvas.width,canvas.height)
	drawBricks();
	drawLives();
	drawBall();
	drawPaddle();
	collisonDetection();

	if(y+dy < ballRadius){
			dy=-dy;
	}
	else if(y+dy > canvas.height-2*ballRadius)
	{

		if(x>paddleX && x<paddleX +paddleWidth)
		{
			dy=-dy;
		}
		else{
			lives=lives-1;
			if(!lives)
			{
				alert("GAME OVER time: "+document.getElementById("minutes").innerHTML+document.getElementById("Colon").innerHTML+document.getElementById("seconds").innerHTML);
		    	document.location.reload();
			}
			else
			{
				x=canvas.width/2;
				y=canvas.height-30;
				dx=2;
				dy=-2;
				 paddleX=(canvas.width-paddleWidth)/2;
			}
	    }
	}

	if((x+dx < ballRadius|| (x+dx > canvas.width-ballRadius)) ){
			dx=-dx;
	}
	if(rightPressed && paddleX <canvas.width-paddleWidth)
	{
		paddleX+=7;
	}
	else if(leftPressed && paddleX>0){
		paddleX-=7;
	}
	x += dx;
	y += dy;
}


draw()
let btn = document.getElementById("start_btn")
btn.onclick = click_function

function click_function(){
    setInterval(draw,10);
	setInterval(timer, 1000);

}


var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;

function timer() {
	++totalSeconds;
	secondsLabel.innerHTML = t(totalSeconds % 60);
	minutesLabel.innerHTML = t(parseInt(totalSeconds / 60));
}

function t(val) {
	var valString = val + "";
	if (valString.length < 2) {
		return "0" + valString;
	} else {
		return valString;
	}
}