let nextPageRight = "Elephant.html";
let nextPageLeft = "Fish.html";
let nextPage = "Portrait.html";

//side image defaults
let defaultBrightness = 200;
let defaultOpacity = 100;

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

//interactions
let interactionBird;
let interactionMoon;
let interactionMirror;

let moon;
let offset = 0.0;

//load image
function preload(){ //has to be preloaded :(
  moon = loadImage('Assets/moon.png');
  img = loadImage('Assets/Bedroom.JPG');
  right = loadImage('Assets/Elephant.jpg');
  left = loadImage('Assets/Fish.JPG');
}

// /**
//  * Calculates responsive image dimensions while maintaining aspect ratio
//  * @param {p5.Image} image - The image to scale (must be loaded)
//  * @param {number} paddingPx - Padding to subtract from available space (default: 0)
//  * @param {number} sizeMultiplier - Optional multiplier for final dimensions (default: 1)
//  * @returns {Object} Object with width and height properties, or null if validation fails
//  */
// function calculateImageScale(image, paddingPx = 0, sizeMultiplier = 1) {
//   // Validation: check if image is valid
//   if (!image || !image.width || !image.height) {
//     console.warn('calculateImageScale: Invalid image. Image must be loaded with width and height.');
//     return null;
//   }
  
//   // Validation: check if window dimensions are valid
//   if (windowWidth <= 0 || windowHeight <= 0) {
//     console.warn('calculateImageScale: Invalid window dimensions.');
//     return null;
//   }
  
//   // Validation: check if padding is reasonable
//   if (paddingPx < 0) {
//     console.warn('calculateImageScale: Padding cannot be negative.');
//     paddingPx = 0;
//   }
  
//   // Validation: check if size multiplier is positive
//   if (sizeMultiplier <= 0) {
//     console.warn('calculateImageScale: Size multiplier must be positive.');
//     return null;
//   }
  
//   // Calculate available space
//   let availableW = max(0, windowWidth - paddingPx);
//   let availableH = max(0, windowHeight - paddingPx);
  
//   // Avoid division by zero
//   if (availableW === 0 || availableH === 0) {
//     console.warn('calculateImageScale: No available space after padding.');
//     return null;
//   }
  
//   // Calculate scale factor (maintains aspect ratio)
//   let scale = min(availableW / image.width, availableH / image.height);
  
//   // Apply size multiplier and return dimensions
//   return {
//     width: image.width * scale * sizeMultiplier,
//     height: image.height * scale * sizeMultiplier,
//     scale: scale
//   };
// }

function setup() {
  createCanvas(700, 800);
  resizeCanvas(windowWidth, windowHeight);

  imageMode(CENTER);
  rectMode(CENTER);
  
  //placing images & interactions
  imagePositioner();

  //DUPLICATE CODE
  // //SETTING INTERACTIONS
  //for interactions,
  // a) make a global variable up top, 
  // b) create new Interaction here in setup and set its position with fractions, 
  // c) show interaction in draw loop, 
  // d) check for hover and clicks in draw and mouseClicked functions respectively

  //for interactions,
  // a) make a global variable up top, 
  // b) create new Interaction here in setup and set its position with fractions, 
  // c) show interaction in draw loop, 
  // d) check for hover and clicks in draw and mouseClicked functions respectively

  //SETTING INTERACTIONS (after imagePositioner so imgWidth/imgHeight exist)
  let birdRelX = -1/3.8;
  let birdRelY = 1/4;
  let birdWratio = 0.17; //this is a fraction of the image width
  let birdHratio = 0.2;
  interactionBird = new Interaction(imgX, imgY, imgWidth, imgHeight, birdRelX, birdRelY, birdWratio, birdHratio);

  let mirrorRelX = -1 / -2.55;
  let mirrorRelY = 1 / -7;
  let mirrorWratio = 0.18;
  let mirrorHratio = 0.3;
  interactionMirror = new Interaction(imgX, imgY, imgWidth, imgHeight, mirrorRelX, mirrorRelY, mirrorWratio, mirrorHratio);

  let moonRelX = -1 / -34; // small positive offset
  let moonRelY = 1 / -38;  // small negative offset
  let moonWratio = 0.11;
  let moonHratio = 0.11;
  interactionMoon = new Interaction(imgX, imgY, imgWidth, imgHeight, moonRelX, moonRelY, moonWratio, moonHratio);

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
   push();
    tint(rightBrightness,rightOpacity);
    image(right,rightX,rightY,rightWidth,rightHeight); 
   pop();
    //left
   push();
    tint(leftBrightness,leftOpacity);
    image(left,leftX,leftY,leftWidth,leftHeight); 
   pop();
    //img
   image(img, imgX, imgY, imgWidth, imgHeight); 

    //CURSOR CHANGE //NOTE: i'm sure there's a better way of structuring this
    if (!isMouseOver(leftX,leftY,leftWidth,leftHeight) && !isMouseOver(rightX,rightY,rightWidth,rightHeight)){ //left
      cursor(ARROW);
      leftBrightness = defaultBrightness;
      leftOpacity = defaultOpacity;
      rightBrightness = defaultBrightness;
      rightOpacity = defaultOpacity;
    } else if (isMouseOver(rightX,rightY,rightWidth,rightHeight)){ //right
            rightBrightness = 255;
            rightOpacity = 225;
            cursor(HAND);
        }else if (isMouseOver(leftX,leftY,leftWidth,leftHeight)){ //left
            leftBrightness = 255;
            leftOpacity = 225;
            cursor(HAND);
        }
    
    if (isMouseOver(imgX,imgY,imgWidth,imgHeight)){
          cursor(ARROW);
          leftBrightness = defaultBrightness;
          leftOpacity = defaultOpacity;
          rightBrightness = defaultBrightness;
          rightOpacity = defaultOpacity;


    //SHOW INTERACTIONS
    interactionBird.show();
    interactionMirror.show();
    if (hasGoneToBedroom 
      && hasGoneToFish 
      && hasGoneToElephant 
      && hasGoneToTeaTime)
      {interactionMoon.show();
        //Moon Draw
        imageNeon(interactionMoon.x, interactionMoon.y, interactionMoon.width, interactionMoon.height, color(332, 58, 91, 100));
        }
      } // IF ALL PAINTINGS VISITED, SHOW MOON INTERACTION

    //DEBUG/////
    if(bugCathcerMode){
      push();
        //text settings
        textSize(12);
        fill(255);
        //text - FPS
        text(frameRate(), 10, 10);
      pop();
    }
    /////////
}

function windowResized() { //window resizer
  resizeCanvas(windowWidth, windowHeight);
  imagePositioner();
}

function mouseClicked(){
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
function imagePositioner(){
    // Calculate dimensions for all images
    let mainImage = imageSizeCalculator(img, imgWidth, imgHeight, padding, 1);
      if (!mainImage) {
        console.error('imagePositioner: Failed to calculate main image dimensions.');
        return;
      }
    imgWidth = mainImage.width;
    imgHeight = mainImage.height;
    let rightImage = imageSizeCalculator(right, rightWidth, rightHeight, padding, rightSIZEmult);
      if (!rightImage) {
        console.error('imagePositioner: Failed to calculate right image dimensions.');
        return;
      }
    rightWidth = rightImage.width;
    rightHeight = rightImage.height;
    let leftImage = imageSizeCalculator(left, leftWidth, leftHeight, padding, leftSIZEmult);
      if (!leftImage) {
        console.error('imagePositioner: Failed to calculate left image dimensions.');
        return;
      }
    leftWidth = leftImage.width;
    leftHeight = leftImage.height;

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

}

//Moon effect
function imageNeon(imgX, imgY, width, height, glowColor) {
  // tint(h, s, b, transparency) overlaid on image
  tint(0, 0, 40, 100);
  glow(glowColor, 0);
  image(moon, imgX, imgY, width, height);
  tint(0, 0, 100, flickering());
  glow(glowColor, 160);
  image(moon, imgX, imgY, width, height);
  image(moon, imgX, imgY, width, height);
  glow(glowColor, 80);
  image(moon, imgX, imgY, width, height);
  image(moon, imgX, imgY, width, height);
  glow(glowColor, 12);
  image(moon, imgX, imgY, width, height);
  image(moon, imgX, imgY, width, height);
  tint(0, 0, 100, 100);
}

function glow(glowColor, blurriness) {
  drawingContext.shadowColor = glowColor;
  drawingContext.shadowBlur = blurriness;
}

function flickering() {
  offset += 0.08;
  let n = noise(offset);
  if (n < 0.30) return 0;
  else return 100;
}