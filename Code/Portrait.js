let nextPage = "CrowdTree.html";
let imgTree;
  let TreeX;
  let TreeY;
  let TreeWidth;
  let TreeHeight;
let padding = 100;

function preload(){ //has to be preloaded :(
  imgTree = loadImage('Assets/FlockTree.JPG');
}

function setup() {
  createCanvas(700, 800);
  resizeCanvas(windowWidth, windowHeight); //-1 to prevent scroll bars
  
  imageMode(CENTER);
   let Scale = min(windowWidth/imgTree.width, windowHeight/ imgTree.height);
  TreeWidth = imgTree.width * Scale - padding;
  TreeHeight =  imgTree.height * Scale - padding;
}

function draw() {
  // clear(); //empty background
   background(255);
  
  //Tree
  TreeX = width/2;
  TreeY = height/2;
  image(imgTree, TreeX, TreeY, TreeWidth, TreeHeight);
  
      //CURSOR CHANGE
     if (isMouseOverTree()) { 
       cursor(HAND); 
     }else{
       cursor(ARROW);
     }
}

function windowResized() { //window resizer
  resizeCanvas(windowWidth, windowHeight); //-1 to prevent scroll bars
   let Scale = min(windowWidth/imgTree.width, windowHeight/ imgTree.height);
  TreeWidth = imgTree.width * Scale - padding;
  TreeHeight =  imgTree.height * Scale - padding;
}

function mouseClicked(){
  if( isMouseOverTree()){
    window.location.href = nextPage;
  }
}

function isMouseOverTree(){
  return(mouseX > TreeX-TreeWidth/2 && mouseY > TreeY-TreeHeight/2 && mouseX < TreeX+TreeWidth/2 && mouseY < TreeY+TreeHeight/2);
}
