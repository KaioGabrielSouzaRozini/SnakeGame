import { draw, drawRect } from "./draw-game.js";

const canvas = document.getElementById("canvas");
let result = document.getElementById("result");
const pincel = canvas.getContext("2d");
document.body.addEventListener("keydown", (key) => {
  changeDirection(key);
});

let interval;

class Snake {
  constructor(x, y, size) {
    (this.x = x),
      (this.y = y),
      (this.size = size),
      (this.directionX = 20),
      (this.directionY = 0),
      (this.win = false),
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
  drawRect(pincel, 0, 0, 600, "black");
  if (snake.x == fruit.x && snake.y == fruit.y) {
    fruit.eat = true;
    fruit.changePosition();
    snake.addTail();
  } else {
    fruit.eat = false;
  }
  colision();
}

function game() {
  update();
  draw(pincel, fruit, snake);
  if (snake.win) {
    result.innerText = "Game Over";
    clearInterval(interval);
  }
}

function gameLoop() {
  pincel.fillStyle = "black";
  pincel.fillRect(0, 0, 600, 600);
  interval = setInterval(game, 1000 / 15);
}

gameLoop();
