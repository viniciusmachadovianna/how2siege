const canvas = document.querySelector("canvas");
const mapCanva = document.getElementById("map");
const maps = document.querySelectorAll('li');
// const color = document.getElementById(input[type="color"]);
const color = document.getElementById('lineColor');
maps.forEach(map => {
    map.addEventListener("click",(e)=>{
        mapCanva.style.display = "initial";
        canvas.style.background =
        `url("assets/maps/bp/${e.currentTarget.getAttribute('data-map')}-1F.jpg")`;
    })
});
currentColor = '#000'
color.addEventListener("input",(e)=>{
    currentColor = e.target.value;
});
const ctx = canvas.getContext('2d');

canvas.width = 700;
canvas.height = 700;

let drawing = false;
let lastX = 0;
let lastY = 0;
const drawingData = [];

function startDrawing(e) {
  drawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
}

function draw(e) {
  if (!drawing) return;

  const currentX = e.offsetX;
  const currentY = e.offsetY;

  ctx.lineWidth = 10;
  ctx.strokeStyle = currentColor;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(currentX, currentY);
  ctx.stroke();

  drawingData.push({
    startX: lastX,
    startY: lastY,
    endX: currentX,
    endY: currentY,
    color: currentColor,
    lineWidth: 10
  });

  [lastX, lastY] = [e.offsetX, e.offsetY];
}

function stopDrawing() {
  drawing = false;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);


document.getElementById('saveButton').addEventListener('click', () => {
  localStorage.setItem('drawingData', JSON.stringify(drawingData));
  alert('Drawing saved!');
});

document.getElementById('loadButton').addEventListener('click', () => {
  const loadedData = localStorage.getItem('drawingData');
  if (loadedData) {
      const parsedData = JSON.parse(loadedData);
      reDrawFromData(parsedData);
  } else {
      alert('No saved drawing found!');
  }
});
function reDrawFromData(data) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  data.forEach(line => {
      ctx.lineWidth = line.lineWidth;
      ctx.strokeStyle = line.color;
      ctx.beginPath();
      ctx.moveTo(line.startX, line.startY);
      ctx.lineTo(line.endX, line.endY);
      ctx.stroke();
  });
}
document.getElementById("close").addEventListener("click", () =>{
  mapCanva.style.display = "none";
})/
document.getElementById('clearButton').addEventListener('click', clearCanvas);

const saveButton = document.getElementById('saveBtn');
saveButton.addEventListener('click', () => {
  const imageUrl = canvas.toDataURL('image/png');
  
  const link = document.createElement('a');
  link.href = imageUrl;
  link.download = 'drawing.png';
  link.click();
});