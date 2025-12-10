let nextPageLeft = "Elephant.html";
let nextPageRight = "Fish.html";

//side image defaults
let defaultBrightness = 200;
let defaultOpacity = 100;

let randomvariable = 0;
let randomvariable2 = 0;

let img;
  let imgX;
  let imgY;
  let imgWidth;
  let imgHeight;
        let imgSIZEmult = 1;
let padding = 50;
let right;
    let rightX;
    let rightY;
    let rightWidth;
    let rightHeight;
        let rightSIZEmult = 0.8; 
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


function preload(){ //has to be preloaded :(
  img = loadImage('Assets/TeaTime.jpg');
  left = loadImage('Assets/Elephant.jpg');
  right = loadImage('Assets/Fish.JPG');
}

function setup() { 
  createCanvas(700, 800);
  angleMode(DEGREES);
  resizeCanvas(windowWidth, windowHeight); //-1 to prevent scroll bars
  
  imageMode(CENTER);
  imagePositioner();

    markVisited('TeaTime');
    print("Has gone to the Tea Time = "+ hasGoneToTeaTime);
}

function draw() { //(run indefinitely)
  clear(); //empty background  
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
  
   if (!popupActive){
    //CURSOR CHANGE //NOTE: i'm sure there's a better way of structuring the cursor change aside from repeating it in both if statements
    if (!isMouseOver(imgX,imgY,imgWidth,imgHeight)) {  //NOT on the main image 
        if (isMouseOver(rightX,rightY,rightWidth,rightHeight)){ //right
            rightBrightness = 255;
            rightOpacity = 225;
            cursor('e-resize');
        } else{
            rightBrightness = defaultBrightness; 
            rightOpacity = defaultOpacity;}
        if (isMouseOver(leftX,leftY,leftWidth,leftHeight)){ //left
            leftBrightness = 255;
            leftOpacity = 225;
            cursor('w-resize');
        } else{
            leftBrightness = defaultBrightness; 
            leftOpacity = defaultOpacity;}
    }else{
            cursor(ARROW);
            leftBrightness = defaultBrightness; 
            leftOpacity = defaultOpacity;
            rightBrightness = defaultBrightness; 
            rightOpacity = defaultOpacity;
    }
  }
}

function mouseReleased(){ // (p5.js)
  if (!popupActive){
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
}

function isMouseOver(somethingX, somethingY, somethingWidth, somethingHeight){
  return(mouseX > somethingX-somethingWidth/2 && mouseY > somethingY-somethingHeight/2 && mouseX < somethingX+somethingWidth/2 && mouseY < somethingY+somethingHeight/2);
}

function windowResized() { //window resizer (p5.js)
  resizeCanvas(windowWidth, windowHeight);
  imagePositioner();
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
    //img [imgXY: Coordinate of img Center]
    imgX = width/2;
    imgY = height/2;
    //right
    rightX = width+rightImage.width/4; //PROBLEM: 125 is hardcoded to make the elephant roughly equal distance to the fish (from the central image); however when the window has a small height, the elephant dissapears faster than the fish
    rightY = height/2;
    //left
    leftX = 0 - leftImage.width/3;
    leftY = height/2;
}