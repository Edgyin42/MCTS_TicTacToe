let boards = [
    [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ],
    [
        ['', '', ''],
        ['', 'X', ''],
        ['', '', '']
    ],
    [
        ['O', '', ''],
        ['', 'X', ''],
        ['', '', '']
    ]
];

let boardSize = 150;
let padding = 20; 

let offsetX = 0;
let offsetY = 0;
let isDragging = false;
let dragStartX, dragStartY;
let initialOffsetX, initialOffsetY;

let scaleFactor = 1;
let minScale = 0.2;
let maxScale = 3; 
let scaleSensitivity = 0.001; 
let zoomFactor = 30;

let w; // width of each cell
let h; // height of each cell

function setup() {
    let canvas = createCanvas(1000, 800); // Fixed canvas size
    canvas.parent('main-board');
    canvas.style('border: 1px solid black; border-radius: 10px;');
    w = boardSize / 3;
    h = boardSize / 3;
    background(220); 
}

function drawBoard(boardData, startX, startY) {
    push(); 
    translate(startX, startY);

    strokeWeight(2 / scaleFactor); // Adjust line weight based on zoom

    // Draw the grid
    line(w, 0, w, boardSize);
    line(w * 2, 0, w * 2, boardSize);
    line(0, h, boardSize, h);
    line(0, h * 2, boardSize, h * 2);

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let x = w * j + w / 2;
            let y = h * i + h / 2;
            let spot = boardData[i][j];
            
            // Adjust text size based on board size and current scale
            let dynamicTextSize = boardSize / 5; 
            textSize(dynamicTextSize);
            textAlign(CENTER, CENTER);
            
            // Adjust symbol stroke weight based on zoom
            strokeWeight(2 / scaleFactor); 

            if (spot == 'X') {
                let xr = w / 4;
                line(x - xr, y - xr, x + xr, y + xr);
                line(x + xr, y - xr, x - xr, y + xr);
            } else if (spot == 'O') {
                noFill();
                ellipse(x, y, w / 2);
            }
        }
    }
    pop(); 
}

function draw() {
    background(240); 

    push(); 

    translate(offsetX, offsetY);
    scale(scaleFactor);

    let currentX = padding;
    let currentY = padding;
    let rowMaxHeight = 0; // For potentially varying board heights if that becomes a feature

    for (let k = 0; k < boards.length; k++) {
        drawBoard(boards[k], currentX, currentY);
        currentX += boardSize + padding;
        rowMaxHeight = max(rowMaxHeight, boardSize); // Keep track of max height in current row

        // Simple wrapping logic (can be improved for actual tree structures)
        // Checks if the *next* board would start beyond the visible width in world coordinates
        let worldViewWidth = (width / scaleFactor); // Visible width in world units
        if (currentX + boardSize > worldViewWidth && k < boards.length - 1) {
            // currentX = padding; // Reset X for new row
            // currentY += rowMaxHeight + padding; // Move Y to new row based on tallest element in previous row
            // rowMaxHeight = 0; // Reset for new row
        }
    }
    pop(); 
}

function mousePressed() {
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        isDragging = true;
        dragStartX = mouseX;
        dragStartY = mouseY;
        initialOffsetX = offsetX;
        initialOffsetY = offsetY;
    }
}

function mouseDragged() {
    if (isDragging) {
        offsetX = initialOffsetX + (mouseX - dragStartX);
        offsetY = initialOffsetY + (mouseY - dragStartY);
    }
}

function mouseReleased() {
    isDragging = false;
}

function mouseWheel(event) {
    // Check if mouse is within canvas bounds
    if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) {
        return; // Don't zoom if mouse is outside canvas
    }

    let mouseWorldXBeforeZoom = (mouseX - offsetX) / scaleFactor;
    let mouseWorldYBeforeZoom = (mouseY - offsetY) / scaleFactor;

    let delta = event.delta;
    
    // Adjust scaleFactor based on scroll direction
    // Multiplying by a factor slightly different from 1
    // (e.g., 1.05 or 0.95) can give a smoother feel than adding/subtracting
    if (delta > 0) { // Scrolling down or away (typically zoom out)
        scaleFactor *= (1 - zoomFactor * scaleSensitivity); // Zoom out
    } else { // Scrolling up or towards (typically zoom in)
        scaleFactor *= (1 + zoomFactor * scaleSensitivity); // Zoom in
    }

    scaleFactor = constrain(scaleFactor, minScale, maxScale);

    // Adjust offsetX and offsetY to keep the point under the mouse stationary
    offsetX = mouseX - mouseWorldXBeforeZoom * scaleFactor;
    offsetY = mouseY - mouseWorldYBeforeZoom * scaleFactor;

    return false; // Prevent default browser scrolling
}