let nextPage = "CrowdTree.html";
let stars = [];

// Main portrait image
let img;
  let imgX;
  let imgY;
  let imgWidth;
  let imgHeight;

// Left closeup image (shown when left interaction is clicked)
let img_closeupLeft;
  let img_closeupLeftX;
  let img_closeupLeftY;
  let img_closeupLeftWidth;
  let img_closeupLeftHeight;

// Right closeup image (shown when right interaction is clicked)
let img_closeupRight;
  let img_closeupRightX;
  let img_closeupRightY;
  let img_closeupRightWidth;
  let img_closeupRightHeight;

// Padding around images to prevent edge clipping
let padding = 100;

// Interactive regions for left and right sides
let interactionLeft;
let interactionRight;

function preload(){ //has to be preloaded :(
  // Load all images before setup() runs so they're available immediately
  img = loadImage('Assets/FinalPortrait.jpg');
  img_closeupLeft = loadImage('Assets/FinalPortrait_closeup_blue.jpg');
  img_closeupRight = loadImage('Assets/FinalPortrait_closeup_red.JPG');
}


function setup() {
  createCanvas(700, 800);
  resizeCanvas(windowWidth, windowHeight); // Match canvas to browser window size
  
  imageMode(CENTER); // Draw images from their center point
  rectMode(CENTER); // Draw rectangles (interactions) from their center point
  
  // Calculate main image scale to fit in available space while preserving aspect ratio
  let availableW = max(0, windowWidth - padding);
  let availableH = max(0, windowHeight - padding);
  let Scale = min(availableW / img.width, availableH / img.height);
  imgWidth = img.width * Scale;
  imgHeight = img.height * Scale;
  
  // Calculate closeup image sizes using the same scale factor to keep proportions consistent
  img_closeupLeftWidth = img_closeupLeft.width * Scale;
  img_closeupLeftHeight = img_closeupLeft.height * Scale;
  img_closeupRightWidth = img_closeupRight.width * Scale;
  img_closeupRightHeight = img_closeupRight.height * Scale;
  
  // Center all images on the screen
  img_closeupLeftX = width/2;
  img_closeupLeftY = height/2;
  img_closeupRightX = width/2;
  img_closeupRightY = height/2;

  imgX = width/2;
  imgY = height/2;

  // Create interactive regions: left side and right side of the main image
  // relX: horizontal offset (-0.33 = 33% to the left, 0.33 = 33% to the right)
  // relY: vertical offset (0.00 = centered vertically)
  // sizeWratio/sizeHratio: 0.35 = 35% of image width/height, 1 = 100% of image height
  interactionLeft = new Interaction(imgX, imgY, imgWidth, imgHeight, -0.33, 0.00, 0.35, 1);
  interactionRight = new Interaction(imgX, imgY, imgWidth, imgHeight,  0.33, 0.00, 0.35, 1);
  
  print(interactionLeft);
  print(interactionRight); 

  print("Setup complete");
  print("imgX: "+imgX+ ", imgY: " + imgY, ", imgWidth: " + imgWidth + ", imgHeight: " + imgHeight);
  print("interactionLeft pos: x=" + interactionLeft.x + ", y=" + interactionLeft.y + ", width=" + interactionLeft.width + ", height=" + interactionLeft.height);
  print("interactionRight pos: x=" + interactionRight.x + ", y=" + interactionRight.y + ", width=" + interactionRight.width + ", height=" + interactionRight.height);
}

function draw() {
  background(255); // Clear the canvas with white background

  // Draw the main portrait image centered on screen
  image(img, imgX, imgY, imgWidth, imgHeight);
  
  // Show closeup images only when their corresponding interaction is active (clicked)
  // interactionLeft.active is true when user clicked the left interaction box
  if (interactionLeft.active) {
    image(img_closeupLeft, img_closeupLeftX, img_closeupLeftY, img_closeupLeftWidth, img_closeupLeftHeight);
  }
  // interactionRight.active is true when user clicked the right interaction box
  if (interactionRight.active) {
    image(img_closeupRight, img_closeupRightX, img_closeupRightY, img_closeupRightWidth, img_closeupRightHeight);
  }
  
  // Change cursor when mouse is over the main image
  if (isMouseOver(imgX, imgY, imgWidth, imgHeight)) { 
    cursor('Assets/bird32.png'); // Custom bird cursor
  } else {
    cursor(ARROW); // Default arrow cursor
  }

  // Draw the interactive regions (boxes on left and right sides)
  // show() draws the boxes and changes their color when hovered
  interactionLeft.show();
  interactionRight.show();

    for (let i = stars.length - 1;i >= 0;i--) {
    stars[i].update();
    stars[i].display();

    if (stars[i].done) {
      stars.splice(i, 1); 
    }
  }

}

function windowResized() {
  // Resize canvas to match new window size
  resizeCanvas(windowWidth, windowHeight);
  
  // Recalculate scale to fit the new window size while preserving aspect ratio
  let availableW = max(0, windowWidth - padding);
  let availableH = max(0, windowHeight - padding);
  let Scale = min(availableW / img.width, availableH / img.height);
  imgWidth = img.width * Scale;
  imgHeight = img.height * Scale;
  
  // Resize closeup images proportionally to the new scale

  
  // Recenter all images on the new window
  imgX = width/2;
  imgY = height/2;
  img_closeupLeftX = width/2;
  img_closeupLeftY = height/2;
  img_closeupRightX = width/2;
  img_closeupRightY = height/2;
  
  // Update interaction positions and sizes to match the resized main image
  interactionLeft.resetPos(imgX, imgY, imgWidth, imgHeight);
  interactionRight.resetPos(imgX, imgY, imgWidth, imgHeight);
}

function mouseClicked(){
  let num = random(20, 50);
  for (let i = 0; i < num; i++) {
    let velocity = p5.Vector.random2D().mult(random(2, 5));
    stars.push(new Star(mouseX, mouseY, velocity.x, velocity.y)); 
  }
  // Check if main image was clicked (for future navigation, currently commented out)
  if( isMouseOverImg()){
    // window.location.href = nextPage;
  }
  // Check if left interaction box was clicked, and toggle its active state (show/hide closeup)
  if(interactionLeft.hoveredOver()){
    interactionLeft.activate();
  }
  // Check if right interaction box was clicked, and toggle its active state (show/hide closeup)
  if(interactionRight.hoveredOver()){
    interactionRight.activate();
  }
}

// Helper function: returns true if mouse is currently over the main portrait image
function isMouseOverImg(){
  return(mouseX > imgX-imgWidth/2 && mouseY > imgY-imgHeight/2 && mouseX < imgX+imgWidth/2 && mouseY < imgY+imgHeight/2);
}
function mouseDragged() {
  stars.push(new Star(mouseX, mouseY, 0, 0));
}
function imagePositioner(){
    // Calculate dimensions for all images
      //main
    let mainImage = imageSizeCalculator(img, imgWidth, imgHeight, padding, 1);
      if (!mainImage) {
        console.error('imagePositioner: Failed to calculate main image dimensions.');
        return;
      }
    imgWidth = mainImage.width;
    imgHeight = mainImage.height;

    //closeups
    img_closeupLeftWidth = img_closeupLeft.width * mainImage.Scale;
    img_closeupLeftHeight = img_closeupLeft.height * mainImage.Scale;
    img_closeupRightWidth = img_closeupRight.width * mainImage.Scale;
    img_closeupRightHeight = img_closeupRight.height * mainImage.Scale;

  //Starting / Reset Locations
      //img
    imgX = width/2;
    imgY = height/2;
      //right
    rightX = width + rightImage.width/6; //PROBLEM: 125 is hardcoded to make the elephant roughly equal distance to the fish (from the central image); however when the window has a small height, the elephant dissapears faster than the fish
    rightY = height/2;
      //left
    leftX = 0;
    leftY = height/2;
    //closeups
    img_closeupLeftX = width/2;
    img_closeupLeftY = height/2;
    img_closeupRightX = width/2;
    img_closeupRightY = height/2;

}
