let nextPageRight = "Elephant.html";
let nextPageLeft = "Fish.html";
let nextPage = "FlockTree.html";

//side image defaults
let defaultBrightness = 200;
let defaultOpacity = 100;

//GRAPHIC BUFFERS
let mainGraphics;
  let mainGraphicsON = true;
let interactionGraphics;
  let interactionGraphicsON = false;
//IMAGES
//main 3 image variables
let img;
  let imgX;
  let imgY;
  let imgWidth;
  let imgHeight;
    let padding = 100;
let right;
  let rightX;
  let rightY;
  let rightWidth;
  let rightHeight;
      let rightSIZEmult = 0.7; 
  let rightBrightness = defaultBrightness;
  let rightOpacity = defaultOpacity;
let left;
  let leftX;
  let leftY;
  let leftWidth;
  let leftHeight;
      let leftSIZEmult = 0.6; 
  let leftBrightness = defaultBrightness;
  let leftOpacity = defaultOpacity;

//INTERACTIONS
// a) make a global variable here, 
// b) create new Interaction here in setup and set its position with fractions, 
// c) show interaction in draw loop, 
// d) check for hover and clicks in draw and mouseClicked functions respectively
let interactionBird;
let interactionBird2;
let interactionBird3;
let interactionMoon;
let interactionMirror;
let interactionBath;
let interactionTap;
  //interaction images
let moon;
let bird;
let bird2;
let bird3;
let mirror;
let bath;
let tap;
//TOOL 
// Interaction Placement UI (shared wrapper from scr_global.js)
let placementUI = null;
let placementModeActive = false;

///
//PRELOAD
function preload(){ //has to be preloaded :(
  img = loadImage('Assets/Bedroom/Bedroom.JPG');
  right = loadImage('Assets/Elephant.jpg');
  left = loadImage('Assets/Fish.JPG');

  //interaction images
  moon = loadImage('Assets/Bedroom/moon.png');
  bird = loadImage('Assets/Bedroom/bird1.png');
  bird2 = loadImage('Assets/Bedroom/bird2.png');
  bird3 = loadImage('Assets/Bedroom/bird3.png');
  mirror = loadImage('Assets/Bedroom/mirror.png');
  bath = loadImage('Assets/Bedroom/bath.png');
  tap = loadImage('Assets/Bedroom/tap.png');
}

///
//SETUP
function setup() {
  createCanvas(1000, 800);
  resizeCanvas(windowWidth, windowHeight);

  //GRAPHIC BUFFERS
  mainGraphics = createGraphics(width, height);
  // match the display density to avoid unexpected internal scaling
  mainGraphics.pixelDensity(displayDensity());
  // use CENTER-based drawing inside buffers so coordinates match the main canvas
  mainGraphics.imageMode(CENTER);
  mainGraphics.rectMode(CENTER);
  mainGraphics.clear();
  interactionGraphics = createGraphics(width, height);
  interactionGraphics.pixelDensity(displayDensity());
  interactionGraphics.imageMode(CENTER);
  interactionGraphics.rectMode(CENTER);
  interactionGraphics.clear();

  //settings
  imageMode(CENTER);
  rectMode(CENTER);
  
  //placing images & interactions
  imagePositioner();

  //SETTING INTERACTIONS (after imagePositioner so imgWidth/imgHeight exist)
    //bird 1
  let birdRelX = -1/3.8;
  let birdRelY = 1/4;
  let birdWratio = 0.17; //this is a fraction of the image width
  let birdHratio = 0.2;
  interactionBird = new Interaction(imgX, imgY, imgWidth, imgHeight, birdRelX, birdRelY, birdWratio, birdHratio, bird);
    //bird 2
  let bird2RelX = -0.133;
  let bird2RelY = 0.140;
  let bird2Wratio = 0.073;
  let bird2Hratio = 0.057;
  interactionBird2 = new Interaction(imgX, imgY, imgWidth, imgHeight, bird2RelX, bird2RelY, bird2Wratio, bird2Hratio, bird2);
    //bird 3
  let bird3RelX = -0.029; 
  let bird3RelY = 0.124;
  let bird3Wratio = 0.057; 
  let bird3Hratio = 0.047;
  interactionBird3 = new Interaction(imgX, imgY, imgWidth, imgHeight, bird3RelX, bird3RelY, bird3Wratio, bird3Hratio, bird3);
    //mirror
  let mirrorRelX = -1 / -2.55;
  let mirrorRelY = 1 / -7;
  let mirrorWratio = 0.18;
  let mirrorHratio = 0.28;
  interactionMirror = new Interaction(imgX, imgY, imgWidth, imgHeight, mirrorRelX, mirrorRelY, mirrorWratio, mirrorHratio, mirror);
    //moon
  let moonRelX = -1 / -34; 
  let moonRelY = 1 / -38;  
  let moonWratio = 0.11;
  let moonHratio = 0.11;
  interactionMoon = new Interaction(imgX, imgY, imgWidth, imgHeight, moonRelX, moonRelY, moonWratio, moonHratio, moon);
    //bath
  let bathRelX = -0.251 
  let bathRelY = -0.281;  
  let bathWratio = 0.15;
  let bathHratio = 0.15;
  interactionBath = new Interaction(imgX, imgY, imgWidth, imgHeight, bathRelX, bathRelY, bathWratio, bathHratio, bath);
    //tap
  let tapRelX =  -0.388; 
  let tapRelY = -0.116;  
  let tapWratio = 0.052;
  let tapHratio = 0.075;
  interactionTap = new Interaction(imgX, imgY, imgWidth, imgHeight, tapRelX, tapRelY, tapWratio, tapHratio, tap);

  //GRAPHICS BUFFER
  //Adding images for first draw
  mainGraphics.push();
  mainGraphics.tint(leftBrightness,leftOpacity);
  mainGraphics.image(left,leftX,leftY,leftWidth,leftHeight);
  mainGraphics.pop();
  mainGraphics.push();
  mainGraphics.tint(rightBrightness,rightOpacity);
  mainGraphics.image(right,rightX,rightY,rightWidth,rightHeight);
  mainGraphics.pop();
  mainGraphics.image(img,imgX,imgY,imgWidth,imgHeight);
  
  // Draw interaction images into the interactionGraphics buffer
  interactionBird.show(imgX, imgY, imgWidth, imgHeight, interactionGraphics);
  interactionMirror.show(imgX, imgY, imgWidth, imgHeight, interactionGraphics);
  interactionBird2.show(imgX, imgY, imgWidth, imgHeight, interactionGraphics);
  interactionBird3.show(imgX, imgY, imgWidth, imgHeight, interactionGraphics);
  interactionBath.show(imgX, imgY, imgWidth, imgHeight, interactionGraphics);
  interactionTap.show(imgX, imgY, imgWidth, imgHeight, interactionGraphics);


  //Mark progress
  markVisited('Bedroom');

  //DEBUG/////
  if(bugCathcerMode){
    print("---- SETUP DEBUG INFO START ----");
    print("User has so far:");
    print("- gone to the Bedroom = "+ hasGoneToBedroom)
    print("- gone to the Fish = "+ hasGoneToFish);
    print("- gone to the Elephant = "+ hasGoneToElephant);
    print("- gone to the Tea Time = "+ hasGoneToTeaTime);
    print("Interactions set up as:");
    print("Bird = "); print(interactionBird);
    print("Moon = "); print(interactionMoon);
    print("Mirror = "); print(interactionMirror);
    print("---- SETUP DEBUG INFO END ----");
    //TOOL
    // initialize shared interaction placement UI
    if (typeof createPlacementUI === 'function') {
      placementUI = createPlacementUI();
      placementUI.init(imgX, imgY, imgWidth, imgHeight);
    }
  }

  //Moon SetUp
  colorMode(HSB, 360, 100, 100, 100);
  rectMode(CENTER);
  pixelDensity(2); // eliminate jaggies
  frameRate(24); // offet pixel density drag on processing
  text(frameRate(), 10, 10);
}

function draw() {
  clear(); //empty background
  //background(255);
  
   //DRAWING IMAGES
    //right
  //  push();
  //   tint(rightBrightness,rightOpacity);
  //   image(right,rightX,rightY,rightWidth,rightHeight); 
  //  pop();
  //   //left
  //  push();
  //   tint(leftBrightness,leftOpacity);
  //   image(left,leftX,leftY,leftWidth,leftHeight); 
  //  pop();
  //   //img
  //  image(img, imgX, imgY, imgWidth, imgHeight); 

  if (mainGraphicsON){
    // draw the buffer centered on the canvas — main canvas uses imageMode(CENTER)
    image(mainGraphics, width/2, height/2, width, height);
  }
  if (interactionGraphicsON){
    image(interactionGraphics, width/2, height/2, width, height);
  }
    
    if (isMouseOver(imgX,imgY,imgWidth,imgHeight)){
        cursor(ARROW);
        interactionGraphicsON = true;
        //SHOW INTERACTIONS
      // interactionBird.show(imgX, imgY, imgWidth, imgHeight);
      // interactionMirror.show(imgX, imgY, imgWidth, imgHeight); 
      // interactionBird2.show(imgX, imgY, imgWidth, imgHeight);
      // interactionBird3.show(imgX, imgY, imgWidth, imgHeight);
      // interactionBath.show(imgX, imgY, imgWidth, imgHeight);
      // interactionTap.show(imgX, imgY, imgWidth, imgHeight);
      // if (hasGoneToBedroom && hasGoneToFish && hasGoneToElephant && hasGoneToTeaTime)// IF ALL PAINTINGS VISITED, SHOW MOON INTERACTION
      //   {
      //     interactionMoon.show();
      //   }
        if (hasGoneToBedroom && hasGoneToFish && hasGoneToElephant && hasGoneToTeaTime)// IF ALL PAINTINGS VISITED, SHOW MOON INTERACTION
          {
            if(isMouseOver(interactionMoon.x, interactionMoon.y, interactionMoon.width, interactionMoon.height)){
              cursor(HAND)
            }
          }
      } else{
        interactionGraphicsON = false;
        if (isMouseOver(rightX,rightY,rightWidth,rightHeight)){
        rightImageHover();
        } 
        if (isMouseOver(leftX,leftY,leftWidth,leftHeight)){
          leftImageHover();
        }
      }
    if (!isMouseOver(rightX,rightY,rightWidth,rightHeight) && 
        !isMouseOver(leftX,leftY,leftWidth,leftHeight) &&
        (leftOpacity != defaultOpacity || rightOpacity != defaultOpacity )){
        leftBrightness = defaultBrightness;
        leftOpacity = defaultOpacity;
        rightBrightness = defaultBrightness;
        rightOpacity = defaultOpacity;
        graphicsBufferClear();
        graphicsBufferFill();
        cursor(ARROW);
        }

    //DEBUG/////
    if(bugCathcerMode){
      push();
        //text settings
        textSize(12);
        fill(255);
        //text - FPS
        text(frameRate(), 10, 10);
      pop();
      // Placement UI instructions & preview
      if (placementUI && placementUI.isActive()) {
        push();
        fill(255);
        textSize(14);
        textAlign(LEFT, TOP);
        text("Placement mode: click to place top-left, then click to set size. Press 'P' to cancel.", 10, 30);
        pop();
        placementUI.updateAndDraw();
      }
    }
    /////////
}

function windowResized() { //window resizer
  // Resize main canvas and recompute layout
  resizeCanvas(windowWidth, windowHeight);
  imagePositioner();

  // Recreate graphic buffers at the new canvas size so their internal
  // resolution and coordinate system match the main canvas.
  mainGraphics = createGraphics(width, height);
  mainGraphics.pixelDensity(displayDensity());
  mainGraphics.imageMode(CENTER);
  mainGraphics.rectMode(CENTER);
  mainGraphics.clear();

  interactionGraphics = createGraphics(width, height);
  interactionGraphics.pixelDensity(displayDensity());
  interactionGraphics.imageMode(CENTER);
  interactionGraphics.rectMode(CENTER);
  interactionGraphics.clear();

  // refill cached content
  graphicsBufferFill();
}

function mouseReleased(){
  if(!popupActive){
  if (bugCathcerMode){
    // If placement UI is active, forward click and skip normal navigation
    if (placementUI && placementUI.isActive()) {
      placementUI.handleClick(mouseX, mouseY);
      return;
    }
  }
    //check where to go based on click
    //NOTE: this is currently clunky since the first if statement is already being tested in the draw loop
    if(!isMouseOver(imgX,imgY,imgWidth,imgHeight)){
        print(true);
        //right
        if( isMouseOver(rightX,rightY,rightWidth,rightHeight)){
            window.location.href = nextPageRight;
        }
        //left
        if(isMouseOver(leftX,leftY,leftWidth,leftHeight)){
            window.location.href = nextPageLeft;
        }
    }

    if(interactionBird.hoveredOver()){interactionBird.activate()};
    if(interactionMirror.hoveredOver()){interactionMirror.activate()};
    if (hasGoneToBedroom && hasGoneToFish && hasGoneToElephant && hasGoneToTeaTime){ // IF ALL PAINTINGS VISITED, ALLOW MOON INTERACTION
      if(interactionMoon.hoveredOver()){
        interactionMoon.activate()
        window.location.href = nextPage; 
      };
    } 
  }

}
function imagePositioner(){
    // Calculate dimensions for all images
      //main
    let mainImage = imageSizeCalculator(img, imgWidth, imgHeight, padding, 1);
      if (!mainImage) {
        console.error('imagePositioner: Failed to calculate main image dimensions.');
        return;
      }
    imgWidth = mainImage.width;
    imgHeight = mainImage.height;
      //left
    let leftImage = imageSizeCalculator(left, leftWidth, leftHeight, padding, leftSIZEmult);
      if (!leftImage) {
        console.error('imagePositioner: Failed to calculate left image dimensions.');
        return;
      }
    leftWidth = leftImage.width;
    leftHeight = leftImage.height;
      //right
    let rightImage = imageSizeCalculator(right, rightWidth, rightHeight, padding, rightSIZEmult);
      if (!rightImage) {
        console.error('imagePositioner: Failed to calculate right image dimensions.');
        return;
      }
    rightWidth = rightImage.width;
    rightHeight = rightImage.height;

  //Starting / Reset Locations
      //img
    imgX = width/2;
    imgY = height/2;
      //right
    rightX = width + rightImage.width/6; //PROBLEM: 125 is hardcoded to make the elephant roughly equal distance to the fish (from the central image); however when the window has a small height, the elephant dissapears faster than the fish
    rightY = height/2;
      //left
    leftX = 0;
    leftY = height/2;

    if (typeof interactionBird !== 'undefined' && interactionBird) {
      interactionBird.resetPos(imgX,imgY,imgWidth,imgHeight, mainImage.Scale);
    }
    if (typeof interactionMoon !== 'undefined' && interactionMoon) {
      interactionMoon.resetPos(imgX,imgY,imgWidth,imgHeight, mainImage.Scale);
    }
    if (typeof interactionMirror !== 'undefined' && interactionMirror) {
      interactionMirror.resetPos(imgX,imgY,imgWidth,imgHeight, mainImage.Scale);
    }

    if (bugCathcerMode){
      // refresh placement UI controller with new geometry
      if (placementUI) placementUI.refresh(imgX, imgY, imgWidth, imgHeight);
    }

}

// Toggle placement mode with 'P'
function keyPressed() {
  if (bugCathcerMode){
    if (key === 'p' || key === 'P') {
      if (placementUI) {
        placementModeActive = placementUI.toggle();
        print('Placement mode', placementModeActive ? 'ON' : 'OFF');
      }
    }
  }
}

function leftImageHover(){
  graphicsBufferClear();
  cursor(HAND);
  leftBrightness = 255; leftOpacity = 255;
  graphicsBufferFill();
}

function rightImageHover(){
  graphicsBufferClear();
  cursor(HAND);
  rightBrightness = 255; rightOpacity = 255;
  graphicsBufferFill();
}

function graphicsBufferClear(){
  mainGraphics.clear();
  interactionGraphics.clear();
}

function graphicsBufferFill(){
  mainGraphics.push();
  mainGraphics.tint(leftBrightness,leftOpacity);
  mainGraphics.image(left,leftX,leftY,leftWidth,leftHeight);
  mainGraphics.pop();
  mainGraphics.push();
  mainGraphics.tint(rightBrightness,rightOpacity);
  mainGraphics.image(right,rightX,rightY,rightWidth,rightHeight);
  mainGraphics.pop();
  mainGraphics.image(img,imgX,imgY,imgWidth,imgHeight);
}