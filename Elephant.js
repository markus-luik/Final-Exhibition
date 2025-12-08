let nextPageLeft = "Bedroom.html";
let nextPageRight = "TeaTime.html";

//side image defaults
let defaultBrightness = 200;
let defaultOpacity = 100;

let img;
  let imgX;
  let imgY;
  let imgWidth;
  let imgHeight;
let padding = 150;
let right;
    let rightX;
    let rightY;
    let rightWidth;
    let rightHeight;
        let rightSIZEmult = 0.75; 
    let rightBrightness = defaultBrightness;
    let rightOpacity = defaultOpacity;
let left;
    let leftX;
    let leftY;
    let leftWidth;
    let leftHeight;
        let leftSIZEmult = 0.75; 
    let leftBrightness = defaultBrightness;
    let leftOpacity = defaultOpacity;

    // Placement UI (shared wrapper from scr_global.js)
    let placementUI = null;
    let placementModeActive = false;

    let interactionArray = [];
    let imageArray = [];
    

function preload(){ //has to be preloaded :(
  imageArray[0] = loadImage('Assets/elephant1.png');
  imageArray[1] = loadImage('Assets/elephant2.png');
  imageArray[2] = loadImage('Assets/elephant3.png');
  imageArray[3] = loadImage('Assets/elephant4.png');
  imageArray[4] = loadImage('Assets/elephant5.png');
  imageArray[5] = loadImage('Assets/elephant6.png');
  imageArray[6] = loadImage('Assets/elephant7.png');
  imageArray[7] = loadImage('Assets/elephant8.png');
  imageArray[8] = loadImage('Assets/elephant9.png');
  img = loadImage('Assets/Elephant.jpg');
  left = loadImage('Assets/Bedroom/Bedroom.JPG');
  right = loadImage('Assets/TeaTime.jpg');
}

function setup() { 
  createCanvas(700, 800);
  resizeCanvas(windowWidth, windowHeight); //-1 to prevent scroll bars
  
  imageMode(CENTER);
  rectMode(CENTER);
  imagePositioner();

  // initialize shared placement UI (keeps coordinates in sync)
  if (typeof createPlacementUI === 'function') {
    placementUI = createPlacementUI();
    placementUI.init(imgX, imgY, imgWidth, imgHeight);
  }

  //SETTING INTERACTIONS (after imagePositioner so imgWidth/imgHeight exist)
   let e1relX = -0.309;
  let e1relY = -0.325;
  let e1Wr = 0.39;
  let e1Hr = 0.36;
  let e1img = imageArray[0];
  interactionArray[0] = new Interaction(imgX, imgY, imgWidth, imgHeight, e1relX, e1relY, e1Wr, e1Hr, e1img);
   let e2relX = -0.004;
  let e2relY = -0.323;
  let e2Wr = 0.45;
  let e2Hr = 0.355;
  let e2img = imageArray[1];
  interactionArray[1] = new Interaction(imgX, imgY, imgWidth, imgHeight, e2relX, e2relY, e2Wr, e2Hr, e2img);
   let e3relX = 0.335;
  let e3relY = -0.311;
  let e3Wr = 0.295;
  let e3Hr = 0.372;
  let e3img = imageArray[2];
  interactionArray[2] = new Interaction(imgX, imgY, imgWidth, imgHeight, e3relX, e3relY, e3Wr, e3Hr, e3img);
   let e4relX = -0.30;
  let e4relY = 0.015;
  let e4Wr = 0.388;
  let e4Hr = 0.372;
  let e4img = imageArray[3];
  interactionArray[3] = new Interaction(imgX, imgY, imgWidth, imgHeight, e4relX, e4relY, e4Wr, e4Hr, e4img);
   let e5relX = 0.03;
  let e5relY = 0.023;
  let e5Wr = 0.326;
  let e5Hr = 0.365;
  let e5img = imageArray[4];
  interactionArray[4] = new Interaction(imgX, imgY, imgWidth, imgHeight, e5relX, e5relY, e5Wr, e5Hr, e5img);
   let e6relX = 0.335;
  let e6relY = 0.018;
  let e6Wr = 0.303;
  let e6Hr = 0.35;
  let e6img = imageArray[5];
  interactionArray[5] = new Interaction(imgX, imgY, imgWidth, imgHeight, e6relX, e6relY, e6Wr, e6Hr, e6img);
   let e7relX = -0.345;
  let e7relY = 0.338;
  let e7Wr = 0.302;
  let e7Hr = 0.33;
  let e7img = imageArray[6];
  interactionArray[6]  = new Interaction(imgX, imgY, imgWidth, imgHeight, e7relX, e7relY, e7Wr, e7Hr, e7img);
  let e8relX = 0.004;
  let e8relY = 0.338;
  let e8Wr = 0.422;
  let e8Hr = 0.33;
  let e8img = imageArray[7];
  interactionArray[7]  = new Interaction(imgX, imgY, imgWidth, imgHeight, e8relX, e8relY, e8Wr, e8Hr, e8img);
  let e9relX = 0.335;
  let e9relY = 0.327;
  let e9Wr = 0.29; //this is a fraction of the image width
  let e9Hr = 0.315;
  let e9img = imageArray[8];
  interactionArray[8]  = new Interaction(imgX, imgY, imgWidth, imgHeight, e9relX, e9relY, e9Wr, e9Hr, e9img);
 

  markVisited('Elephant');
   //DEBUG/////
  if(bugCathcerMode){
    print("---- SETUP DEBUG INFO START ----");
    print("User has so far:");
    print("- gone to the Bedroom = "+ hasGoneToBedroom)
    print("- gone to the Fish = "+ hasGoneToFish);
    print("- gone to the Elephant = "+ hasGoneToElephant);
    print("- gone to the Tea Time = "+ hasGoneToTeaTime);
    print("Interactions set up as:");
    // print("Bird = "); print(interactionBird);
    // print("Moon = "); print(interactionMoon);
    // print("Mirror = "); print(interactionMirror);
    print("---- SETUP DEBUG INFO END ----");
  }
}

function draw() { //(run indefinitely)
  clear(); //empty background
//    background(255);
  
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
  
  

  
  //CURSOR CHANGE
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
          for (let i = 0; i < interactionArray.length; i++){
            let interaction = interactionArray[i];
            if (typeof interaction !== 'undefined' && interaction) {
              if (interaction.hoveredOver()){
                interaction.sizeMult = lerp(interaction.sizeMult, 1.2, 0.3);
                print("Mouse is over me! " + interaction)
              } else {interaction.sizeMult = lerp(interaction.sizeMult, 1, 0.4);}
              interaction?.show();
            }
          }
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
    }
    // Placement UI instructions & preview (shared helper)
    if (placementUI && placementUI.isActive()) {
      push();
      fill(255);
      textSize(14);
      textAlign(LEFT, TOP);
      text("Placement mode: click to place top-left, then click to set size. Press 'P' to cancel.", 10, 30);
      pop();
      placementUI.updateAndDraw();
    }
    /////////
}

function mouseClicked(){ // (p5.js)
  // If placement UI is active, forward click and skip normal navigation
  if (placementUI && placementUI.isActive()) {
    placementUI.handleClick(mouseX, mouseY);
    return;
  }

  //check where to go based on click
  //NOTE: this is currently clunky since the first if statement is already being tested in the draw loop
  if(!isMouseOver(imgX,imgY,imgWidth,imgHeight)){
    //right
    if( isMouseOver(rightX,rightY,rightWidth,rightHeight)){
      window.location.href = nextPageRight;
    }
    //left
    if(isMouseOver(leftX,leftY,leftWidth,leftHeight)){
      window.location.href = nextPageLeft;
    }
  }
}

function windowResized() { //window resizer (p5.js)
  resizeCanvas(windowWidth, windowHeight);
  imagePositioner();
}

// Toggle placement mode with 'P'
function keyPressed() {
  if (key === 'p' || key === 'P') {
    if (placementUI) {
      placementModeActive = placementUI.toggle();
      print('Placement mode', placementModeActive ? 'ON' : 'OFF');
    }
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
    rightX = width; //PROBLEM: 125 is hardcoded to make the elephant roughly equal distance to the fish (from the central image); however when the window has a small height, the elephant dissapears faster than the fish
    rightY = height/2;
      //left
    leftX = 0-leftImage.width/6;
    leftY = height/2;

    for (let i = 0; i < interactionArray.length; i++){
      let interaction = interactionArray[i];
      if (typeof interaction !== 'undefined' && interaction) {
        interaction?.resetPos(imgX, imgY, imgWidth, imgHeight);
      }
    }

    // refresh placement UI controller so coordinates remain accurate after resize
    if (placementUI) placementUI.refresh(imgX, imgY, imgWidth, imgHeight);
}
