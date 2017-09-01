import Canvas from './canvas';

let canvas = new Canvas (document.getElementById("canvas"));


document.querySelector('#clear').addEventListener("click", e => {
  e.preventDefault();
  e.stopPropagation();
  canvas.context.clearRect(0, 0, canvas.context.canvas.width, canvas.context.canvas.height);
  canvas.paintedLines = [];
  canvas.paint = false;
}, true);
document.querySelector('#size').addEventListener("keyup", e => {
  let newValue = document.querySelector('#size').value;
  canvas.lineWidth = newValue.length > 1 ? newValue[1] : newValue;
  document.querySelector('#size').value = canvas.lineWidth;
}, true);
document.querySelector('#sizePlus').addEventListener("click", e => {
  canvas.resizeDifference += 0.1;
  canvas.canvas.style.width = (canvas.canvas.width * canvas.resizeDifference) + 'px';
  canvas.canvas.style.height = (canvas.canvas.height * canvas.resizeDifference) + 'px';
}, true);
document.querySelector('#sizeMinus').addEventListener("click", e => {
  canvas.resizeDifference -= 0.1;
  canvas.canvas.style.width = (canvas.canvas.width * canvas.resizeDifference) + 'px';
  canvas.canvas.style.height = (canvas.canvas.height * canvas.resizeDifference) + 'px';
}, true);
document.querySelector('#color').addEventListener("change", e => {
  canvas.color = document.querySelector('#color').value;
  canvas.redraw();
}, true); 


