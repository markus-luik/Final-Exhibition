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

function fitToWindow(imgWidth, imgHeight, padding = 0) {
  // available space after padding
  let availW = windowWidth - padding * 2;
  let availH = windowHeight - padding * 2;

  // scale based only on the limiting dimension
  let scale = min(availW / imgWidth, availH / imgHeight);

  return {
    w: imgWidth * scale,
    h: imgHeight * scale,
    x: windowWidth / 2,
    y: windowHeight / 2
  };
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  imageMode(CENTER);
  let s = fitToWindow(imgTree.width, imgTree.height, padding);
  TreeWidth = round(s.w);
  TreeHeight = round(s.h);
  TreeX = round(s.x);
  TreeY = round(s.y);
}

function draw() {
  resetMatrix();
  translate(-width / 2, -height / 2);
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
  resizeCanvas(windowWidth, windowHeight);
  let s = fitToWindow(imgTree.width, imgTree.height, padding);
  TreeWidth = round(s.w);
  TreeHeight = round(s.h);
  TreeX = round(s.x);
  TreeY = round(s.y);
}

function mouseClicked(){
  if( isMouseOverTree()){
    window.location.href = nextPage;
  }
}

function isMouseOverTree(){
  return(mouseX > TreeX-TreeWidth/2 && mouseY > TreeY-TreeHeight/2 && mouseX < TreeX+TreeWidth/2 && mouseY < TreeY+TreeHeight/2);
}
