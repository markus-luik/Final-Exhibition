let nextPage = "Portrait.html";
let imgTree;
  let TreeX;
  let TreeY;
  let TreeWidth;
  let TreeHeight;
let padding = 100;
//particles
let ps = []; 


function preload(){ //has to be preloaded :(
  imgTree = loadImage('Assets/FlockTree.JPG');
}

function setup() {
  createCanvas(700, 800);
  resizeCanvas(windowWidth, windowHeight);
  colorMode(HSB, 255);

  imageMode(CENTER);
   let Scale = min(windowWidth/imgTree.width, windowHeight/ imgTree.height);
  TreeWidth = imgTree.width * Scale - padding;
  TreeHeight =  imgTree.height * Scale - padding;
}

function windowResized() { //window resizer
  resizeCanvas(windowWidth, windowHeight);
   let Scale = min(windowWidth/imgTree.width, windowHeight/ imgTree.height);
  TreeWidth = imgTree.width * Scale - padding;
  TreeHeight =  imgTree.height * Scale - padding;
}

function mouseReleased(){
  if(!popupActive){
    if( isMouseOverTree()){
      window.location.href = nextPage;
    }
  }
}

function isMouseOverTree(){
  return(mouseX > TreeX-TreeWidth/2 && mouseY > TreeY-TreeHeight/2 && mouseX < TreeX+TreeWidth/2 && mouseY < TreeY+TreeHeight/2);
}

function draw() {
  // clear(); //empty background
  background(0);
  //Tree
  TreeX = width/2;
  TreeY = height/2;
  image(imgTree, TreeX, TreeY, TreeWidth, TreeHeight);
  
  cursor('Assets/bird32.png'); 
    //CURSOR CHANGE
    //  if (isMouseOverTree()) { 
       
    //  cursor('/assets/target.png')
    //  }else{
    //    cursor(ARROW);
    //  }
    if (abs(pmouseX - mouseX) > 0 || abs(pmouseY - mouseY) > 0) {
    ps.push(new System(mouseX, mouseY));
  }

  //particles
  for (let i=ps.length-1; i>=0; i--) {
    ps[i].update();
    ps[i].display();
    
    if (ps[i].done) {
      ps.splice(i, 1);
    }
  }
}