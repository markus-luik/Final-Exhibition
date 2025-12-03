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
        let rightSIZEmult = 1.7; 
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

function preload(){ //has to be preloaded :(
  img = loadImage('Assets/Bedroom.JPG');
  right = loadImage('Assets/Elephant.jpg');
  left = loadImage('Assets/Fish.JPG');
}

function setup() {
  createCanvas(700, 800);
  resizeCanvas(windowWidth, windowHeight);

  imageMode(CENTER);
  rectMode(CENTER);
  
  //placing images & interactions
  imagePositioner();

  //SETTING INTERACTIONS (create after imagePositioner so imgWidth/imgHeight exist)
  // convert old fract values to relative offsets: relX = -1/fractW, relY = 1/fractH
  // compute size ratios from the intended pixel sizes so boxes keep the same visual size
  let birdRelX = -1/4;
  let birdRelY = 1/4;
  let birdWratio = 0.20; //this is a fraction of the image width
  let birdHratio = 0.20;
  interactionBird = new Interaction(imgX, imgY, imgWidth, imgHeight, birdRelX, birdRelY, birdWratio, birdHratio);

  let mirrorRelX = -1 / -2.55; // = +0.392...
  let mirrorRelY = 1 / -7;     // = -0.1428...
  let mirrorWratio = 90; //this is in pixels
  let mirrorHratio = 130;
  interactionMirror = new Interaction(imgX, imgY, imgWidth, imgHeight, mirrorRelX, mirrorRelY, mirrorWratio, mirrorHratio);

  let moonRelX = -1 / -34; // small positive offset
  let moonRelY = 1 / -38;  // small negative offset
  let moonWratio = 90;
  let moonHratio = 90;
  interactionMoon = new Interaction(imgX, imgY, imgWidth, imgHeight, moonRelX, moonRelY, moonWratio, moonHratio);

  markVisited('Bedroom');
  print("Has gone to the Bedroom = "+ hasGoneToBedroom)
  print("Has gone to the Fish = "+ hasGoneToFish);
  print("Has gone to the Elephant = "+ hasGoneToElephant);
  print("Has gone to the Tea Time = "+ hasGoneToTeaTime);

  //DEBUG
  print(interactionBird);
  print(interactionMoon);
  print(interactionMirror);
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
    }


    //SHOW INTERACTIONS
    interactionBird.show();
    interactionMirror.show();
    if (hasGoneToBedroom && hasGoneToFish && hasGoneToElephant && hasGoneToTeaTime){interactionMoon.show();} // IF ALL PAINTINGS VISITED, SHOW MOON INTERACTION

    text(frameRate(), 10, 10);

      
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

function isMouseOver(somethingX, somethingY, somethingWidth, somethingHeight){
  return(mouseX > somethingX-somethingWidth/2 && mouseY > somethingY-somethingHeight/2 && mouseX < somethingX+somethingWidth/2 && mouseY < somethingY+somethingHeight/2);
}

function imagePositioner(){
    //checks img scale and references it to the others
    //img — compute scale from available area (subtract padding first) to preserve aspect ratio
    let availableW = max(0, windowWidth - padding);
    let availableH = max(0, windowHeight - padding);
    let Scale = min(availableW / img.width, availableH / img.height);
    imgWidth = img.width * Scale;
    imgHeight = img.height * Scale;
    //right
    rightWidth = (right.width * Scale)*rightSIZEmult;
    rightHeight = (right.height * Scale)*rightSIZEmult;
    //left
    leftWidth = (left.width * Scale)*leftSIZEmult;
    leftHeight = (left.height * Scale)*leftSIZEmult;

    // circleSize = map(Scale, 0, 1, 50, 150)

  //Starting / Reset Locations
    //img
    imgX = width/2;
    imgY = height/2;
    //right
    rightX = width+125; //PROBLEM: 125 is hardcoded to make the elephant roughly equal distance to the fish (from the central image); however when the window has a small height, the elephant dissapears faster than the fish
    rightY = height/2;
    //left
    leftX = 0;
    leftY = height/2;

    if (typeof interactionBird !== 'undefined' && interactionBird) {
      interactionBird.resetPos(imgX,imgY,imgWidth,imgHeight, Scale);
    }
    if (typeof interactionMoon !== 'undefined' && interactionMoon) {
      interactionMoon.resetPos(imgX,imgY,imgWidth,imgHeight, Scale);
    }
    if (typeof interactionMirror !== 'undefined' && interactionMirror) {
      interactionMirror.resetPos(imgX,imgY,imgWidth,imgHeight, Scale);
    }

}
