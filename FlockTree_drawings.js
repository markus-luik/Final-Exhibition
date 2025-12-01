let nextPage = "CrowdTree.html";
let imgTree;
  let TreeX;
  let TreeY;
  let TreeWidth;
  let TreeHeight;
let padding = 100;

let palette = ["#7b4800", "#002185", "#003c32", "#fcd300", "#ff2702", "#6b9404"];
let ripples = [];

function preload(){ //has to be preloaded :(
  imgTree = loadImage('Assets/FlockTree.JPG');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  brush.load()
  angleMode(DEGREES);
  
  imageMode(CENTER);
   let Scale = min(windowWidth/imgTree.width, windowHeight/ imgTree.height);
  TreeWidth = imgTree.width * Scale - padding;
  TreeHeight =  imgTree.height * Scale - padding;

  translate(-width / 2, -height / 2);
  // Activate the flowfield we're going to use
    brush.noField("curved")
    
    // Activate the new face brush
   
    frameRate(15)
    
}

function draw() {
    resetMatrix();
    translate(-width / 2, -height / 2);
    clear(); //empty background
     
    
  // Update and draw all ripples
for (let i = ripples.length - 1; i >= 0; i--) {
  ripples[i].update();
  if (ripples[i].isDone()) {
    ripples.splice(i, 1);
  }
}

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
   let Scale = min(windowWidth/imgTree.width, windowHeight/ imgTree.height);
  TreeWidth = imgTree.width * Scale - padding;
  TreeHeight =  imgTree.height * Scale - padding;
}

function mouseClicked(){
  if( isMouseOverTree()){
    window.location.href = nextPage;
  }
}

function mousePressed() {
     // Create a raindrop ripple at click location
  ripples.push(new Ripple(mouseX, mouseY, 4, 6));
}


function isMouseOverTree(){
  return(mouseX > TreeX-TreeWidth/2 && mouseY > TreeY-TreeHeight/2 && mouseX < TreeX+TreeWidth/2 && mouseY < TreeY+TreeHeight/2);
}

// ----------------------
// Ripple class
// ----------------------
class Ripple {
  constructor(x, y, layers = 4, delay = 6) {
    this.x = x;
    this.y = y;
    this.layers = layers;     // number of rings
    this.delay = delay;       // frames between rings
    this.timer = delay;
    this.currentLayer = 0;

    this.sizeBase = random(10, 20);   // how large the ripple grows
  }

  update() {
    if (this.currentLayer >= this.layers) return;  // finished

    this.timer--;

    // time to draw the next circle?
    if (this.timer <= 0) {
      this.drawCircle();
      this.currentLayer++;
      this.timer = this.delay; // reset for next layer
    }
  }

  drawCircle() {
    let size = (this.currentLayer + 1) * this.sizeBase;

    // pick brush per ring
    brush.set("marker", random(palette), random(0.5, 1));

    brush.circle(this.x, this.y, size);
  }

  isDone() {
    return this.currentLayer >= this.layers;
  }
}
