// scr_global.js — persistent visited flags

// Initialize flags from localStorage (persist across page loads).
// Use sessionStorage instead if you want values to clear when the tab closes.
let hasGoneToBedroom = localStorage.getItem('hasGoneToBedroom') === 'true';
let hasGoneToFish = localStorage.getItem('hasGoneToFish') === 'true';
let hasGoneToElephant = localStorage.getItem('hasGoneToElephant') === 'true';
let hasGoneToTeaTime = localStorage.getItem('hasGoneToTeaTime') === 'true';

// Utility: mark a painting visited (call from each page when user arrives)
function markVisited(painting) {
  // painting: 'Bedroom' | 'Fish' | 'Elephant' | 'TeaTime'
  const key = 'hasGoneTo' + painting;
  localStorage.setItem(key, 'true');
  // update runtime var too so current page can immediately react
  if (painting === 'Bedroom') hasGoneToBedroom = true;
  else if (painting === 'Fish') hasGoneToFish = true;
  else if (painting === 'Elephant') hasGoneToElephant = true;
  else if (painting === 'TeaTime') hasGoneToTeaTime = true;
}

// Optional helper to reset all visit flags (for testing)
function resetVisited() {
  localStorage.removeItem('hasGoneToBedroom');
  localStorage.removeItem('hasGoneToFish');
  localStorage.removeItem('hasGoneToElephant');
  localStorage.removeItem('hasGoneToTeaTime');
  hasGoneToBedroom = hasGoneToFish = hasGoneToElephant = hasGoneToTeaTime = false;
}

class Interaction {
  // relX, relY: offsets from image center, in fractions of image width/height (e.g. -0.3..0.3)
  // sizeWratio, sizeHratio: the width/height of the box as a fraction of the image width/height (e.g. 0.12)
  // Now accept both displayed imgWidth and imgHeight so sizes compute correctly
  constructor(imgX, imgY, imgWidth, imgHeight, relX, relY, sizeWratio, sizeHratio) {
    this.relX = relX;
    this.relY = relY;
    // Accept either a ratio (0..1) or a pixel value (>1). Normalize to ratio.
    this.sizeWratio = (typeof sizeWratio === 'number' && sizeWratio > 1) ? (sizeWratio / imgWidth) : sizeWratio;
    this.sizeHratio = (typeof sizeHratio === 'number' && sizeHratio > 1) ? (sizeHratio / imgHeight) : sizeHratio;
    // store pixel values; will be computed in resetPos
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.colorRegular = color(255, 255, 255, 128);
    this.colorHover = color(150, 150, 150, 128);
    this.colorActive = color(255, 0, 0, 128);
    this.color = this.colorRegular;
    this.active = false;

    // Initialize based on current image geometry
    this.resetPos(imgX, imgY, imgWidth, imgHeight);
  }

  show() {
    push();
    if (this.hoveredOver()) {
      this.color = this.colorHover;
      cursor(HAND);
      if (this.active) this.color = this.colorActive;
    } else if (!this.active) {
      this.color = this.colorRegular;
    }
    fill(this.color);
    //rect(this.x, this.y, this.width, this.height);
    pop();
  }

  hoveredOver() {
    return (
      mouseX > this.x - this.width / 2 &&
      mouseY > this.y - this.height / 2 &&
      mouseX < this.x + this.width / 2 &&
      mouseY < this.y + this.height / 2
    );
  }

  activate() {
    this.active = !this.active;
    print("activated");
  }

  // Compute pixel position & size from the image geometry.
  // imgWidth/imgHeight are the displayed (scaled) image size in pixels.
  resetPos(imgX, imgY, imgWidth, imgHeight) {
    // pixel offsets from center
    this.x = imgX + this.relX * imgWidth;
    this.y = imgY + this.relY * imgHeight;
    // size relative to image
    this.width = this.sizeWratio * imgWidth;
    this.height = this.sizeHratio * imgHeight;
  }
}

//THIS IS CURRENTLY IN EVERY SCRIPT BUT CAN BE MOVED HERE
// function isMouseOver(somethingX, somethingY, somethingWidth, somethingHeight){
//   return(mouseX > somethingX-somethingWidth/2 && mouseY > somethingY-somethingHeight/2 && mouseX < somethingX+somethingWidth/2 && mouseY < somethingY+somethingHeight/2);
// }