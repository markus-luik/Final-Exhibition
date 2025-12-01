let nextPage = "FlockTree.html";
let imgWindow;
  let WindowWidth = 349;
  let WindowHeight = 562;
    let WindowX = 0;
    let WindowY = 0;
let imgWindowShadow;
  let shadowMovementDiv = 8;   
  let shadowTargetX = 0;
  let shadowX = 0;
  let shadowTargetY = 0;
  let shadowY = 0;
  let shadowLerp = 0.3;
let mouseSpeed;
let lightON = false;
  let bgColor = 0;
  let WindowDarkness = 25; //0 is black, 255 is white
  let WindowOpacity = 180;
  let lightBrightness = 255;
  let lightOpacity = 220;

function preload(){ //has to be preloaded :(
  imgWindow = loadImage('Assets/window.png');
  imgWindowShadow = loadImage('Assets/window_shadow_blurry.png');
}

function setup() {
  createCanvas(700, 800);
  resizeCanvas(windowWidth, windowHeight); //-1 to prevent scroll bars
    
  //window start x y
  WindowX = windowWidth/2-WindowWidth/2;
  WindowY = windowHeight/2-WindowHeight/2
}

function draw() {
  // clear(); //empty background
   background(bgColor);
  
  //SHADOW
  //pre-lerp
  //offsets shadow based on window pos and dimensions
  shadowTargetX = (WindowX - mouseX+WindowWidth/2)/shadowMovementDiv;//div determines shift size
  shadowTargetY = (WindowY - mouseY+WindowHeight/2)/shadowMovementDiv;
  //post-lerp
  shadowX = lerp(shadowX,shadowTargetX,shadowLerp);
  shadowY = lerp(shadowY,shadowTargetY,shadowLerp);
        //drawing shadow //IMPORTANT: shadow is drawn based on window xy
      push();
      tint(255, 60); // transparency
      image(imgWindowShadow, WindowX + shadowX, WindowY + shadowY, WindowWidth, WindowHeight);
      pop(); 
  
  //WINDOW
      //dark
    push();
    tint(WindowDarkness, WindowOpacity);
    image(imgWindow, WindowX, WindowY, WindowWidth, WindowHeight);
    pop();
      //revealed if light is off
    if(!lightON){
      noStroke();
      drawingContext.save();
      drawingContext.beginPath();
      drawingContext.arc(mouseX, mouseY, 100, 0, TWO_PI);
      drawingContext.clip();
        tint(lightBrightness, lightOpacity); //revealed
        image(imgWindow, WindowX, WindowY, WindowWidth, WindowHeight);
      drawingContext.restore();
      }

  
    //CURSOR CHANGE
     if (isMouseOverWindow()) { 
       cursor(HAND); 
     }else{
       cursor(ARROW);
     }
}

function mouseClicked(){
  if(lightON && isMouseOverWindow()){
    window.location.href = nextPage;
  } else if(!lightON && isMouseOverWindow()){
    lightON = true;
    bgColor = 255;
    WindowDarkness = 255;
    WindowOpacity = 255;
  }
}

function windowResized() { //window resizer
  resizeCanvas(windowWidth, windowHeight); //-1 to prevent scroll bars
    //Window (art) repositioning
  WindowX = windowWidth/2-WindowWidth/2;
  WindowY = windowHeight/2-WindowHeight/2
}


function isMouseOverWindow(){
  return(mouseX > WindowX && mouseY > WindowY && mouseX < WindowX+WindowWidth && mouseY < WindowY+WindowHeight);
}



