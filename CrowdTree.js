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
let movement_freedom_px = 70;
let mov_speed = 2;
let size_factor = 0.90;

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
   background(255);
  
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
      let ScaleTree = min(windowWidth/imgTree.width, windowHeight/ imgTree.height); //determines ratio/scale of image
    WidthTree = imgTree.width * ScaleTree - padding;
    HeightTree =  imgTree.height * ScaleTree - padding;
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
