const canvas = document.querySelector("canvas");
const maps = document.querySelectorAll('li');
// const color = document.getElementById(input[type="color"]);
const color = document.getElementById('lineColor');
maps.forEach(map => {
    map.addEventListener("click",(e)=>{
        canvas.style.background =
        `url("assets/maps/bp/${e.currentTarget.getAttribute('data-map')}-1F.jpg")`;
    })
});
color.addEventListener("input",(e)=>{
    currentColor = e.target.value;
});
const ctx = canvas.getContext('2d');

// Set the canvas size (you can adjust these values)
canvas.width = 1000;
canvas.height = 1000;

// Variables for drawing
let drawing = false;
let lastX = 0;
let lastY = 0;

// Function to start drawing
function startDrawing(e) {
  drawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
}

// Function to draw on the canvas
function draw(e) {
  if (!drawing) return; // Don't draw if the mouse isn't pressed

  ctx.lineWidth = 10    ;
  ctx.strokeStyle = currentColor;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY); // Move to the last point
  ctx.lineTo(e.offsetX, e.offsetY); // Draw a line to the current mouse position
  ctx.stroke(); // Apply the stroke (draw the line)

  [lastX, lastY] = [e.offsetX, e.offsetY]; // Update last position
}

// Function to stop drawing
function stopDrawing() {
  drawing = false;
}

// Function to clear the canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clears the entire canvas
}

// Event listeners for mouse interactions
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Clear button functionality
document.getElementById('clearButton').addEventListener('click', clearCanvas);
