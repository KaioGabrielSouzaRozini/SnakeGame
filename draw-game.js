export function drawRect(pincel, x, y, size, color) {
  pincel.fillStyle = color;
  pincel.fillRect(x, y, size, size);
}
export function draw(pincel, fruit, snake) {
  drawRect(pincel, fruit.x, fruit.y, fruit.size, "red");
  for (var i = 0; i < snake.tail.length; i++) {
    drawRect(pincel, snake.tail[i].x, snake.tail[i].y, snake.size, "black");
    drawRect(
      pincel,
      snake.tail[i].x + 1,
      snake.tail[i].y + 1,
      snake.size - 2,
      "white"
    );
  }
  snake.direction();
  snake.snakeTail();
}
