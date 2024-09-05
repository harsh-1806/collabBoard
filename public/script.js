let canvas = document.getElementById('canvas');
let colorPicker = document.getElementById('color-picker');
let brushSize = document.getElementById('brush-size');

canvas.width = 0.98 * window.innerWidth;
canvas.height = window.innerHeight * 0.85;

var io = io.connect('http://localhost:8080');
let ctx = canvas.getContext("2d");
let x, y;
let mouseDown = false;

// Set initial color and brush size
ctx.strokeStyle = colorPicker.value;
ctx.lineWidth = brushSize.value;
ctx.lineCap = "round";  // This makes the line smoother

// Get mouse position relative to the canvas
function getMousePos(e) {
  let rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}

// Update color on color picker change
colorPicker.addEventListener('input', (e) => {
  ctx.strokeStyle = e.target.value;
  // Emit the color change to the server
  io.emit('colorChange', e.target.value);
});

// Update brush size on slider change
brushSize.addEventListener('input', (e) => {
  ctx.lineWidth = e.target.value;
  // Emit the brush size change to the server
  io.emit('brushSizeChange', e.target.value);
});

// Get mouse position and draw on canvas
window.onmousedown = (e) => {
  let pos = getMousePos(e);
  ctx.moveTo(pos.x, pos.y);
  io.emit('down', { x: pos.x, y: pos.y });
  mouseDown = true;
};

window.onmouseup = (e) => {
  mouseDown = false;
};

io.on("ondraw", ({ x, y, color, lineWidth }) => {
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.lineTo(x, y);
  ctx.stroke();
});

io.on("ondown", ({ x, y, color, lineWidth }) => {
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.moveTo(x, y);
});

window.onmousemove = (e) => {
  let pos = getMousePos(e);
  x = pos.x;
  y = pos.y;

  if (mouseDown) {
    io.emit("draw", { x, y, color: ctx.strokeStyle, lineWidth: ctx.lineWidth });
    ctx.lineTo(x, y);
    ctx.stroke();
  }
};

// Handle color and brush size changes from other clients
io.on('colorChange', (color) => {
  ctx.strokeStyle = color;
});

io.on('brushSizeChange', (lineWidth) => {
  ctx.lineWidth = lineWidth;
});
