let nextPage = "Bedroom.html";
let imgCrowd;
  let XCrowd;
  let YCrowd;
  let WidthCrowd;
  let HeightCrowd;
let imgTree;
  let XTree;
  let YTree;
  let WidthTree;
  let HeightTree;
let padding = 0;
let movement_freedom_px = 120;
let mov_speed = 2;
let size_factor = 0.90;

//background colors
let startingColor = [255,0,0];
let bgR = startingColor[0];
let bgG = startingColor[1];
let bgB = startingColor[2];
let opacity = 20;

function preload(){ //images preload
  imgCrowd = loadImage('Assets/CrowdTree_Crowd.png');
  imgTree = loadImage('Assets/CrowdTree_Tree.png');
}

function setup() {
  createCanvas(700, 800);
  resizeCanvas(windowWidth, windowHeight); //canvas same size as window
  
  //centers images
  imageMode(CENTER);

  //sets width & height
    //NOTE: Crowd scaling is based on tree scaling
    //tree
    let ScaleTree = min(windowWidth/imgTree.width, windowHeight/ imgTree.height); //determines ratio/scale of image
    WidthTree = (imgTree.width * ScaleTree - padding) * size_factor;
    HeightTree =  (imgTree.height * ScaleTree - padding) * size_factor;
    //crowd
    WidthCrowd = (imgCrowd.width * ScaleTree - padding) * size_factor;
    HeightCrowd = (imgCrowd.height * ScaleTree - padding) * size_factor;

  //starting locations
    //crowd
      XCrowd = width/2;
      YCrowd = height/2;
    //tree
      XTree = width/2;
      YTree = YCrowd - WidthTree;
}

function draw() {
  // clear(); //empty background
  background(5, 5, 5, 10);
  background(bgR,bgG,bgB,opacity);

  if(YTree > (-height/3) && YTree < (height/20)){
    bgR = map(YTree, -height/3, height/20, 255, 0);
    bgB = map(YTree, -height/3, height/20, 0, 255);
  }
  if(YTree > (height/20) && YTree < (height/2)){
    bgG = map(YTree, height/20, height/2, 0, 255);
    bgB = map(YTree, height/20, height/2, 255, 0);
  }

    //DEBUG/////
      if(debugMode){
        push();
          //text settings
          textSize(12);
          fill(255);
            //YTree
          text(YTree, 10, 10);
            //breakpoints
          text("-height/3 = " + (-height/3), 10, 30);
          text("height/20 = " + (height/20), 10, 45);
          text("height/2 = " + (height/2), 10, 60);
            //rgb
          text("bgR = " + bgR, 10, 90);
          text("bgG = " + bgG, 10, 105);
          text("bgB = " + bgB, 10, 120);
        pop();
      }
    /////////
  
  
  //Crowd
  image(imgCrowd, XCrowd, YCrowd, WidthCrowd, HeightCrowd);
  //Tree
  image(imgTree, XTree, YTree, WidthTree, HeightTree);
  
    //CURSOR CHANGE
    if (isMouseOverTree()) { 
      cursor(HAND); 
    }else{
      cursor(ARROW);
    }

  //moving
  if (focused === true){ //checks if browser is focused
    //UP
      if (mouseY < 0+movement_freedom_px){
        if (YTree - HeightTree / 2 - mov_speed > 0) {
          YCrowd -= 0;
          YTree -= 0;
        }else{
          YCrowd += mov_speed;
          YTree += mov_speed;
        }
    }
    //RIGHT
      if (mouseX > windowWidth-movement_freedom_px){
        if (XCrowd + WidthCrowd / 2 + mov_speed < width) {
          XCrowd += 0;
          XTree += 0;
        }else{
          XCrowd -= mov_speed;
          XTree -= mov_speed;
        }
      }
    //DOWN
      if (mouseY > windowHeight-movement_freedom_px){
        if (YCrowd + HeightCrowd / 2 + mov_speed < height) {
          YCrowd += 0;
          YTree += 0;
        }else{
          YCrowd -= mov_speed;
          YTree -= mov_speed;
        }
    }
    //LEFT
      if (mouseX < 0+movement_freedom_px){
        // stop if moving would push image off the left side
        if (XCrowd - WidthCrowd / 2 - mov_speed > 0) {
          XCrowd -= 0;
          XTree -= 0;
        }else{
          XCrowd += mov_speed;
          XTree += mov_speed;
        }
    }
  }

}

function windowResized() { //window resizer
  resizeCanvas(windowWidth, windowHeight); //-1 to prevent scroll bars
  //sets width & height
    //NOTE: Crowd scaling is based on tree scaling
    //tree
    let availableW = max(0, windowWidth - padding);
    let availableH = max(0, windowHeight - padding);
      let ScaleTree = min(availableW/imgTree.width, availableH/ imgTree.height); //determines ratio/scale of image
    WidthTree = imgTree.width * ScaleTree;
    HeightTree =  imgTree.height * ScaleTree;
     //crowd
    WidthCrowd = imgCrowd.width * ScaleTree - padding;
    HeightCrowd = imgCrowd.height * ScaleTree - padding;

    //Resets location
    //crowd
      XCrowd = width/2;
      YCrowd = height/2;
    //tree
      XTree = width/2;
      YTree = YCrowd - WidthTree;
}

function mouseClicked(){
  if( isMouseOverTree()){
    window.location.href = nextPage;
  }
}

function isMouseOverTree(){
  return(mouseX > XTree-WidthTree/2 && mouseY > YTree-HeightTree/2 && mouseX < XTree+WidthTree/2 && mouseY < YTree+HeightTree/2);
}
