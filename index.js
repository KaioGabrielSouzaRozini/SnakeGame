const canvas = document.getElementById("canvas");
let points = document.getElementById("points");
let result = document.getElementById("result");
const pincel = canvas.getContext("2d");
document.body.addEventListener("keydown", (key) => {
  changeDirection(key);
});

class Snake {
  constructor(x, y, size) {
    (this.x = x),
      (this.y = y),
      (this.size = size),
      (this.directionX = 20),
      (this.directionY = 0),
      (this.win = false),
      (this.point = 0),
      (this.tail = [{ x: this.x, y: this.y }]);
  }
  direction() {
    this.x += this.directionX;
    this.y += this.directionY;
  }

  addTail() {
    let tail = { x: this.x, y: this.y };
    this.tail.push(tail);
  }

  snakeTail() {
    let oneTail;

    if (snake.directionX == 20) {
      oneTail = {
        x: this.tail[this.tail.length - 1].x + this.size,
        y: this.tail[this.tail.length - 1].y,
      };
    }
    if (snake.directionX == -20) {
      oneTail = {
        x: this.tail[this.tail.length - 1].x - this.size,
        y: this.tail[this.tail.length - 1].y,
      };
    }
    if (snake.directionY == 20) {
      oneTail = {
        x: this.tail[this.tail.length - 1].x,
        y: this.tail[this.tail.length - 1].y + this.size,
      };
    }
    if (snake.directionY == -20) {
      oneTail = {
        x: this.tail[this.tail.length - 1].x,
        y: this.tail[this.tail.length - 1].y - this.size,
      };
    }

    this.tail.shift();
    this.tail.push(oneTail);
  }
}

class Fruit {
  constructor(x, y, size) {
    (this.x = x), (this.y = y), (this.size = size), (this.eat = false);
  }
  changePosition() {
    (this.x = Math.round((Math.random() * (260 - 5) + 5) / 10) * 20),
      (this.y = Math.round((Math.random() * (260 - 5) + 5) / 10) * 20);
  }
}
let snake = new Snake(0, 0, 20);
let fruit = new Fruit(
  Math.round((Math.random() * (300 - 5) + 5) / 10) * 20,
  Math.round((Math.random() * (300 - 5) + 5) / 10) * 20,
  20
);

function changeDirection(x) {
  switch (x.key) {
    case "ArrowRight":
      if (snake.directionX != -20) {
        snake.directionX = 20;
        snake.directionY = 0;
      }
      break;
    case "ArrowLeft":
      if (snake.directionX != 20) {
        snake.directionX = -20;
        snake.directionY = 0;
      }
      break;
    case "ArrowUp":
      if (snake.directionY != 20) {
        snake.directionX = 0;
        snake.directionY = -20;
      }
      break;
    case "ArrowDown":
      if (snake.directionY != -20) {
        snake.directionX = 0;
        snake.directionY = 20;
      }
      break;
  }
}

function colision() {
  if (snake.x > 599 || snake.x < 0 || snake.y > 599 || snake.y < 0) {
    snake.win = true;
  }

  if (snake.tail.length > 1) {
    for (var i = 0; i < snake.tail.length - 1; i++) {
      if (
        snake.x == snake.tail[i].x &&
        snake.y == snake.tail[i].y &&
        !fruit.eat
      ) {
        snake.win = true;
      }
    }
  }
}
function update() {
  drawRect(0, 0, 600, "white");
  if (snake.x == fruit.x && snake.y == fruit.y) {
    snake.point += 10;
    points.innerText = snake.point;
    fruit.eat = true;
    fruit.changePosition();
    snake.addTail();
  } else {
    fruit.eat = false;
  }
  colision();
}

function draw() {
  drawRect(fruit.x, fruit.y, fruit.size, "red");
  for (var i = 0; i < snake.tail.length; i++) {
    drawRect(snake.tail[i].x, snake.tail[i].y, snake.size, "white");
    drawRect(snake.tail[i].x + 1, snake.tail[i].y + 1, snake.size - 2, "black");
  }
  snake.direction();
  snake.snakeTail();
}

function game() {
  update();
  draw();
  if (snake.win) {
    result.innerText = "Game Over: ";
    clearInterval(interval);
  }
}

function gameLoop() {
  pincel.fillStyle = "white";
  pincel.fillRect(0, 0, 600, 600);
  interval = setInterval(game, 1000 / 15);
}

function drawRect(x, y, size, color) {
  pincel.fillStyle = color;
  pincel.fillRect(x, y, size, size);
}

gameLoop();
