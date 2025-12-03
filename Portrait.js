let nextPage = "CrowdTree.html";
let img;
  let imgX;
  let imgY;
  let imgWidth;
  let imgHeight;
let padding = 100;

function preload(){ //has to be preloaded :(
  img = loadImage('Assets/FinalPortrait.JPG');
}

function setup() {
  createCanvas(700, 800);
  resizeCanvas(windowWidth, windowHeight); //-1 to prevent scroll bars
  
  imageMode(CENTER);
   let Scale = min(windowWidth/img.width, windowHeight/ img.height);
  imgWidth = img.width * Scale - padding;
  imgHeight =  img.height * Scale - padding;
}

function draw() {
  // clear(); //empty background
   background(255);
  
  //Tree
  imgX = width/2;
  imgY = height/2;
  image(img, imgX, imgY, imgWidth, imgHeight);
  
      //CURSOR CHANGE
     if (isMouseOverImg()) { 
       cursor('/Assets/bird32.png'); 
     }else{
       cursor(ARROW);
     }
}

function windowResized() { //window resizer
  resizeCanvas(windowWidth, windowHeight); //-1 to prevent scroll bars
   let Scale = min(windowWidth/img.width, windowHeight/ img.height);
  imgWidth = img.width * Scale - padding;
  imgHeight =  img.height * Scale - padding;
}

function mouseClicked(){
  if( isMouseOverImg()){
    window.location.href = nextPage;
  }
}

function isMouseOverImg(){
  return(mouseX > imgX-imgWidth/2 && mouseY > imgY-imgHeight/2 && mouseX < imgX+imgWidth/2 && mouseY < imgY+imgHeight/2);
}
