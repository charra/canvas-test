const canvas = document.getElementById("canvas");
canvas.width = 600;
canvas.height = 300;
canvas.style.width = '600px';
canvas.style.height = '300px';
const context = canvas.getContext("2d");
let widthCanvas = 3;
let color = 'black';
let activeLine = {};
let paintedLines = [];
let paint;
let resizeDifference = 1;

const redraw = () => {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  context.lineJoin = "round";
  paintedLines.forEach(line => {
    context.lineWidth = line.width;
    context.strokeStyle = line.color;
    context.beginPath();
    context.moveTo(line.start.x, line.start.y);
    context.lineTo(line.end.x, line.end.y);
    context.closePath();
    context.stroke();
  })
}

const addPoint = (x, y, point) => {
  if (point === 'start') {
    activeLine.x = x / resizeDifference;
    activeLine.y = y / resizeDifference;
  } else {
    paintedLines.pop();
  }
  paintedLines.push({
    start: {
      x: activeLine.x / resizeDifference,
      y: activeLine.y / resizeDifference
    },
    end: {
      x: x / resizeDifference,
      y: y / resizeDifference
    },
    color: color,
    width: widthCanvas
  });
  redraw();
}

document.querySelector('#clear').addEventListener("click", e => {
  e.preventDefault();
  e.stopPropagation();
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  paintedLines = [];
  paint = false;
}, true);
document.querySelector('#size').addEventListener("keyup", e => {
  let newValue = document.querySelector('#size').value;
  widthCanvas = newValue.length > 1 ? newValue[1] : newValue;
  document.querySelector('#size').value = widthCanvas;
}, true);
document.querySelector('#sizePlus').addEventListener("click", e => {
  resizeDifference += 0.1;
  canvas.style.width = (canvas.width * resizeDifference) + 'px';
  canvas.style.height = (canvas.height * resizeDifference) + 'px';
}, true);
document.querySelector('#sizeMinus').addEventListener("click", e => {
  resizeDifference -= 0.1;
  canvas.style.width = (canvas.width * resizeDifference) + 'px';
  canvas.style.height = (canvas.height * resizeDifference) + 'px';
}, true);
document.querySelector('#color').addEventListener("change", e => {
  color = document.querySelector('#color').value;
  redraw();
}, true);
document.querySelector('#canvas').addEventListener("mousedown", function (e) {
  e.preventDefault();
  e.stopPropagation();
  paint = !paint;
  if (paint) {
    addPoint(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, 'start');
  } else {
    addPoint(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  }
}, true);
document.querySelector('#canvas').addEventListener("mousemove", function (e) {
  e.preventDefault();
  e.stopPropagation();
  if (paint) {
    addPoint(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  }
}, true);





