playerCar = null;
var CARS = [];
var score =0;
this.container = null;
this.gameOver = null;
function createRoad(width, height) {
  this.width = width;
  this.height = height;
  this.lane1 = null;
  this.lane2 = null;
  this.yVelocity = 0;

  this.init = function() {
    this.container = document.createElement("div");
    this.container.style.height = this.height + "px";
    this.container.style.width = this.width + "px";
    this.container.style.position = "relative";
    this.container.style.backgroundColor = "#000000";
    this.container.style.margin = "0 auto";
    this.container.style.overflow = "hidden";
    document.body.appendChild(this.container);
  };

  this.addLane = function() {
    this.lane1 = document.createElement("div");
    this.lane1.style.backgroundImage = "url(Border.png)";
    this.lane1.style.position = "absolute";
    this.lane1.style.width = 10 + "px";
    this.lane1.style.height = 100 + "%";
    this.lane1.style.left = 33 + "%";
    this.lane1.style.top = this.yVelocity;
    this.container.appendChild(this.lane1);
    this.lane2 = document.createElement("div");
    this.lane2.style.backgroundImage = "url(Border.png)";
    this.lane2.style.position = "absolute";
    this.lane2.style.width = 10 + "px";
    this.lane2.style.height = 100 + "%";
    this.lane2.style.left = 66 + "%";
    this.lane2.style.top = this.yVelocity;
    this.container.appendChild(this.lane2);
  };

  this.gameOver = function()
  {
    this.gameOver = document.createElement('div');
    this.gameOver.setAttribute('id','gameover');
    this.gameOver.style.width = 400 + 'px';
    this.gameOver.style.height = 50 + 'px';
    this.gameOver.style.bottom = 50 + '%';
    this.gameOver.style.position = 'absolute';
    this.gameOver.style.display = 'none';
    this.gameOver.style.left = 20 + '%';
    this.gameOver.style.cursor = 'pointer';
    this.gameOver.innerHTML = 'Click here to play Again';
    this.gameOver.style.fontSize = 40 + 'px';
    this.gameOver.style.backgroundColor = 'gray';
    this.gameOver.style.zIndex = '10';
    this.gameOver.onclick = function()
    {
      location.reload();
    }
    this.container.appendChild(this.gameOver);
  }

  this.moveLane = function() {
    this.yVelocity += 1;
  };

  this.updateY = function() {
    this.lane1.style.backgroundPositionY = this.yVelocity + "px";
    this.lane2.style.backgroundPositionY = this.yVelocity + "px";
  };

  return this;
}

function insertCar(width, height, parent) {
  this.width = width;
  this.height = height;
  this.parent = parent;
  this.carTop = -80;
  this.car = null;
  this.laneNumber = 0;
  this.init = function() {
    this.car = document.createElement("img");

    console.log(CARS);
    this.car.setAttribute("src", "../Images/moving-down.png");
    this.car.style.width = this.width + "px";
    this.car.style.height = this.height + "px";
    this.car.style.position = "absolute";
    this.laneNumber = Math.floor(Math.random() * 3) + 1;
    if (this.laneNumber === 1) {
      this.car.style.left = 80 + "px";
    }
    if (this.laneNumber === 2) {
      this.car.style.left = 290 + "px";
    }
    if (this.laneNumber === 3) {
      this.car.style.left = 480 + "px";
    }
    this.parent.appendChild(this.car);
  };

  this.moveCar = function() {
    this.carTop += 1;
    {
      if (this.carTop == 601) {
        this.carTop = -80;
        this.laneNumber = Math.floor(Math.random() * 3) + 1;

        if (this.laneNumber === 1) {
          this.car.style.left = 80 + "px";
        }
        if (this.laneNumber === 2) {
          this.car.style.left = 290 + "px";
        }
        if (this.laneNumber === 3) {
          this.car.style.left = 480 + "px";
        }
      }
    }
  };

  this.updateTop = function() {
    this.car.style.top = this.carTop + "px";
  };

  this.countScore = function()
  {
    for(var i=0;i<CARS.length; i++)
    {
      if(parseInt(this.car.style.top)>=600)
      {
        score ++;
        console.log(score);
      }
    }
  }

  this.collisionDetection = function()
  {
    for(var i=0;i<CARS.length;i++)
    {
      if((parseInt(playerCar.style.left)<(parseInt(this.car.style.left)+40))&&((parseInt(playerCar.style.left) + 40) >parseInt(this.car.style.left))&&
      (parseInt(playerCar.style.top) < (parseInt(this.car.style.top)+80)))
      {
        clearInterval(interval);
        clearTimeout(timeout1);
        clearTimeout(timeout2);
        var gameover=document.getElementById('gameover');
        gameover.style.display = 'block';
        
      }
    }
  }
}

function createPlayerCar(width, height, parent) {
  this.width = width;
  this.height = height;
  this.parent = parent;
  var playerCarLane=2;
  this.init = function() {
    playerCar = document.createElement("img");
    playerCar.setAttribute("src", "../Images/moving-up.png");
    playerCar.style.height = this.height + "px";
    playerCar.style.position = "absolute";
    playerCar.style.top = 520 + 'px';
    playerCar.style.left = 290 + "px";
    parent.appendChild(playerCar);
    document.addEventListener("keypress", changeDirection);
      }
      function changeDirection(e) {
        var x = e.keyCode;
        
        if (x == "97" || x == "65") 
        {

            if(playerCarLane===2)
            {
                
          playerCar.style.left = 80 + "px";
          playerCarLane=1;
            }
            if(playerCarLane===3)
            {
                playerCar.style.left = 290 + "px";
                playerCarLane=2;
            }
        }
        if (x == "100" || x == "68") 
        {
            if(playerCarLane===2)
           {
            playerCar.style.left = 480 + 'px';
            playerCarLane = 3;
           }
           if(playerCarLane===1)
           {
               playerCar.style.left = 290 + "px";
               playerCarLane=2;
           }
           
        }
  }

}


function createCars() {
  for (var i = 0; i <= Math.floor(Math.random() * 2); i++) {
    var car = new insertCar(40, 80, road.container);
    CARS.push(car);
    car.init();
  }
}

var timeout1=setTimeout(function() {
  createCars();
}, 4500);
var timeout2 =setTimeout(function() {
  createCars();
}, 9000);


var interval =setInterval(function() {
  road.moveLane();
  road.updateY();
  for (var i = 0; i < CARS.length; i++) {
    CARS[i].moveCar();
    CARS[i].updateTop();
    CARS[i].collisionDetection();
    CARS[i].countScore();
  }
}, 10);

var road = new createRoad(600, 600);
road.init();
road.addLane();
road.gameOver();
new createPlayerCar(40, 80, road.container).init();
createCars();

