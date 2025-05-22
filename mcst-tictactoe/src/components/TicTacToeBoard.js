import { useRef, useEffect } from 'react';
import Sketch from 'react-p5';

const TicTacToeBoard = () => {
  const boardsRef = useRef([
    [['', '', ''], ['', '', ''], ['', '', '']],
    [['', '', ''], ['', 'X', ''], ['', '', '']],
    [['O', '', ''], ['', 'X', ''], ['', '', '']]
  ]);
  
  const boardSize = 150;
  const padding = 20;
  let offsetX = 0;
  let offsetY = 0;
  let isDragging = false;
  let dragStartX, dragStartY;
  let initialOffsetX, initialOffsetY;
  let scaleFactor = 1;
  const minScale = 0.2;
  const maxScale = 3;
  const scaleSensitivity = 0.001;
  const zoomFactor = 30;
  let w, h;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(800, 600).parent(canvasParentRef);
    w = boardSize / 3;
    h = boardSize / 3;
    p5.background(220);
  };

  const drawBoard = (p5, boardData, startX, startY) => {
    p5.push();
    p5.translate(startX, startY);
    p5.strokeWeight(2 / scaleFactor);

    // Draw the grid
    p5.line(w, 0, w, boardSize);
    p5.line(w * 2, 0, w * 2, boardSize);
    p5.line(0, h, boardSize, h);
    p5.line(0, h * 2, boardSize, h * 2);

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let x = w * j + w / 2;
        let y = h * i + h / 2;
        let spot = boardData[i][j];
        
        let dynamicTextSize = boardSize / 5;
        p5.textSize(dynamicTextSize);
        p5.textAlign(p5.CENTER, p5.CENTER);
        p5.strokeWeight(2 / scaleFactor);

        if (spot === 'X') {
          let xr = w / 4;
          p5.line(x - xr, y - xr, x + xr, y + xr);
          p5.line(x + xr, y - xr, x - xr, y + xr);
        } else if (spot === 'O') {
          p5.noFill();
          p5.ellipse(x, y, w / 2);
        }
      }
    }
    p5.pop();
  };

  const draw = (p5) => {
    p5.background(240);
    p5.push();
    p5.translate(offsetX, offsetY);
    p5.scale(scaleFactor);

    let currentX = padding;
    let currentY = padding;
    let rowMaxHeight = 0;

    for (let k = 0; k < boardsRef.current.length; k++) {
      drawBoard(p5, boardsRef.current[k], currentX, currentY);
      currentX += boardSize + padding;
      rowMaxHeight = Math.max(rowMaxHeight, boardSize);
    }
    p5.pop();
  };

  const mousePressed = (p5) => {
    if (p5.mouseX > 0 && p5.mouseX < p5.width && p5.mouseY > 0 && p5.mouseY < p5.height) {
      isDragging = true;
      dragStartX = p5.mouseX;
      dragStartY = p5.mouseY;
      initialOffsetX = offsetX;
      initialOffsetY = offsetY;
    }
  };

  const mouseDragged = (p5) => {
    if (isDragging) {
      offsetX = initialOffsetX + (p5.mouseX - dragStartX);
      offsetY = initialOffsetY + (p5.mouseY - dragStartY);
    }
  };

  const mouseReleased = () => {
    isDragging = false;
  };

  const mouseWheel = (p5, event) => {
    if (p5.mouseX < 0 || p5.mouseX > p5.width || p5.mouseY < 0 || p5.mouseY > p5.height) {
      return;
    }

    let mouseWorldXBeforeZoom = (p5.mouseX - offsetX) / scaleFactor;
    let mouseWorldYBeforeZoom = (p5.mouseY - offsetY) / scaleFactor;
    let delta = event.deltaY;
    
    if (delta > 0) {
      scaleFactor *= (1 - zoomFactor * scaleSensitivity);
    } else {
      scaleFactor *= (1 + zoomFactor * scaleSensitivity);
    }

    scaleFactor = p5.constrain(scaleFactor, minScale, maxScale);
    
    offsetX = p5.mouseX - mouseWorldXBeforeZoom * scaleFactor;
    offsetY = p5.mouseY - mouseWorldYBeforeZoom * scaleFactor;
    
    return false;
  };

  return (
    <div className="border border-black rounded-lg">
      <Sketch
        setup={setup}
        draw={draw}
        mousePressed={mousePressed}
        mouseDragged={mouseDragged}
        mouseReleased={mouseReleased}
        mouseWheel={mouseWheel}
      />
    </div>
  );
};

export default TicTacToeBoard;