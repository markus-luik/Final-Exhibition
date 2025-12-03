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
  
  //SETTING INTERACTIONS
  //for interactions, a) make a global variable up top, b) create new Interaction here in setup and set its position with fractions, c) show interaction in draw loop, d) check for hover and clicks in draw and mouseClicked functions respectively
  interactionBird = new Interaction(imgX,imgY,imgWidth,4,imgHeight,4,300,300);
  interactionMirror = new Interaction(imgX,imgY,imgWidth,-2.55,imgHeight,-7,350,580);
  interactionMoon = new Interaction(imgX,imgY,imgWidth,-34,imgHeight,-38,200,200);

  //placing images & interactions
  imagePositioner();

  hasGoneToBedroom = true;
  print("Has gone to the Bedroom = "+ hasGoneToBedroom)

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
    //img
    let Scale = min(windowWidth/img.width, windowHeight/ img.height);
    imgWidth = img.width * Scale - padding;
    imgHeight =  img.height * Scale - padding;
    //right
    rightWidth = (right.width * Scale)*rightSIZEmult;
    rightHeight = (right.height * Scale)*rightSIZEmult;
    //left
    leftWidth = (left.width * Scale)*leftSIZEmult;
    leftHeight = (left.height * Scale)*leftSIZEmult;

    circleSize = map(Scale, 0, 1, 50, 150)

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

    interactionBird.resetPos(imgX,imgY,imgWidth,imgHeight, Scale);
    interactionMoon.resetPos(imgX,imgY,imgWidth,imgHeight, Scale);
    interactionMirror.resetPos(imgX,imgY,imgWidth,imgHeight, Scale);

}
