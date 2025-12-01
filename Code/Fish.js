let nextPageLeft = "TeaTime.html";
let nextPageRight = "Bedroom.html";

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
    let imgSIZEmult = 1.1;
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
        let leftSIZEmult = 1.65; 
    let leftBrightness = defaultBrightness;
    let leftOpacity = defaultOpacity;

function preload(){ //has to be preloaded :(
  img = loadImage('Assets/Fish.JPG');
  left = loadImage('Assets/TeaTime.JPG');
  right = loadImage('Assets/Bedroom.JPG');
}

function setup() { 
  createCanvas(700, 800);
  resizeCanvas(windowWidth, windowHeight); //-1 to prevent scroll bars
  
  imageMode(CENTER);
  imagePositioner();
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
  
    //CURSOR CHANGE //NOTE: i'm sure there's a better way of structuring the cursor change aside from repeating it in both if statements
    if (!isMouseOver(imgX,imgY,imgWidth,imgHeight)) {  //NOT on the main image 
        if (isMouseOver(rightX,rightY,rightWidth,rightHeight)){ //right
            rightBrightness = 255;
            rightOpacity = 225;
            cursor(HAND);
        } else{
            rightBrightness = defaultBrightness; 
            rightOpacity = defaultOpacity;}
        if (isMouseOver(leftX,leftY,leftWidth,leftHeight)){ //left
            leftBrightness = 255;
            leftOpacity = 225;
            cursor(HAND);
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
function mouseClicked(){ // (p5.js)
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

function isMouseOver(somethingX, somethingY, somethingWidth, somethingHeight){
  return(mouseX > somethingX-somethingWidth/2 && mouseY > somethingY-somethingHeight/2 && mouseX < somethingX+somethingWidth/2 && mouseY < somethingY+somethingHeight/2);
}

function windowResized() { //window resizer (p5.js)
  resizeCanvas(windowWidth, windowHeight);
  imagePositioner();
}

function imagePositioner(){
    //checks img scale and references it to the others
    //img
    let mainScale = img.width/ img.height;
    imgHeight =  height
    imgWidth = imgHeight*mainScale
    //right
    let leftScale = right.width/ right.height;
    rightHeight = height;
    rightWidth = rightHeight*leftScale
    //left
    let rightScale = left.width/ left.height;
    leftHeight = height;
    leftWidth = leftHeight*rightScale

  //Starting / Reset Locations
    //img [imgXY: Coordinate of img Center]
    imgX = width/2;
    imgY = height/2;
    //right
    rightX = imgX+(imgWidth/2)+(rightWidth/2); //PROBLEM: 125 is hardcoded to make the elephant roughly equal distance to the fish (from the central image); however when the window has a small height, the elephant dissapears faster than the fish
    rightY = height/2;
    //left
    leftX = imgX-(imgWidth/2)-(leftWidth/2);
    leftY = height/2;
}