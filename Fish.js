let nextPageLeft = "TeaTime.html";
let nextPageRight = "Bedroom.html";
let bubbles = [];


//side image defaults
let defaultBrightness = 200;
let defaultOpacity = 100;

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

let eyeleft;
let eyeright;
let mouth;

function preload(){ //has to be preloaded :(
    eyeleft = loadImage('Assets/fishEyesLeft.png');
    eyeright = loadImage('Assets/fishEyesRight.png');
    mouth = loadImage('Assets/fishMouth.png');
    img = loadImage('Assets/Fish.JPG');
    left = loadImage('Assets/TeaTime.jpg');
    right = loadImage('Assets/Bedroom/Bedroom.JPG');
}

function setup() { 
  createCanvas(700, 800);
  resizeCanvas(windowWidth, windowHeight); //-1 to prevent scroll bars
  
  imageMode(CENTER);
  imagePositioner();

  	for (let i = 0; i < 15; i++) {
		 bubbles[i] = new p5.Vector(random(0, width), random(0, width), 0);
	}

    markVisited('Fish');
    print("Has gone to the Fish = "+ hasGoneToFish);
}

function draw() { //(run indefinitely)
    // clear(); //empty background
    //background(255);
	background(151, 20, 0, 20);
	noFill();
    stroke(105);
    for (let i = 0; i < bubbles.length; i++) {
      circle(bubbles[i].x, bubbles[i].y, bubbles[i].z);
      bubbles[i].z++;
	  if (bubbles[i].z >200){
        bubbles[i].z = 0;
        bubbles[i].x = random(width);
        bubbles[i].y = random(height);
    }}

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
  
   //Moving Eyes
   //Base size of image
    let baseW = imgWidth/10;
    let baseH = imgHeight/10;

    // Grow based on mouth X
    let scaleAmount = map(mouseX, 0, width, 0.5, 2);  
    let scaleMouse = map(mouseX, 0, width, 1.8, 3.5);  
    // New size
    let w = baseW * scaleAmount;
    let h = baseH * scaleAmount;
    let w1 = baseW * scaleMouse;
    let h1 = baseH * scaleMouse;
    // Draw image centered so enlargement expands in ALL directions
    image(eyeleft, imgX-imgWidth/4.1, imgY-imgHeight/50, w, h);
    image(eyeright, imgX+imgWidth/3.8, imgY-imgHeight/30, w, h);
    image(mouth, imgX, imgY+imgHeight/6, w1, h1);


    // Moving Points (Eyes substitute) 
    // stroke("black");
    // strokeWeight(mouseX/10);
    // point(imgX-imgWidth/4,imgY-imgHeight/50);
    // point(imgX+imgWidth/4,imgY-imgHeight/50);

    //CURSOR CHANGE //NOTE: i'm sure there's a better way of structuring the cursor change aside from repeating it in both if statements
    if (!isMouseOver(imgX,imgY,imgWidth,imgHeight)) {  //NOT on the main image 
        if (isMouseOver(rightX,rightY,rightWidth,rightHeight)){ //right
            rightBrightness = 255;
            rightOpacity = 225;
            cursor('not-allowed');
            filter(INVERT);
        } else{
            rightBrightness = defaultBrightness; 
            rightOpacity = defaultOpacity;
        }
        if (isMouseOver(leftX,leftY,leftWidth,leftHeight)){ //left
            leftBrightness = 255;
            leftOpacity = 225;
            cursor('w-resize');
        } else{
            leftBrightness = defaultBrightness; 
            leftOpacity = defaultOpacity;}
    }else{
            cursor('Assets/bird32.png');
            leftBrightness = defaultBrightness; 
            leftOpacity = defaultOpacity;
            rightBrightness = defaultBrightness; 
            rightOpacity = defaultOpacity;
        }
    }
function mouseReleased(){ 
    if(!popupActive){
        //check where to go based on click
        //NOTE: this is currently clunky since the first if statement is already being tested in the draw loop
        if(!isMouseOver(imgX,imgY,imgWidth,imgHeight)){
            //right
            // if( isMouseOver(rightX,rightY,rightWidth,rightHeight)){
            //     window.location.href = nextPageRight;
            // }
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

  //Starting / Reset Locations
    //img
    imgX = width/2;
    imgY = height/2;
    //right
    rightX = width+100; //PROBLEM: 125 is hardcoded to make the elephant roughly equal distance to the fish (from the central image); however when the window has a small height, the elephant dissapears faster than the fish
    rightY = height/2;
    //left
    leftX = -20;
    leftY = height/2;
}

