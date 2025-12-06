// scr_global.js is readable by all pages and contains shared code and variables.

// Initialize flags from localStorage (persist across page loads).
// Use sessionStorage instead if you want values to clear when the tab closes.
let hasGoneToBedroom = localStorage.getItem('hasGoneToBedroom') === 'true';
let hasGoneToFish = localStorage.getItem('hasGoneToFish') === 'true';
let hasGoneToElephant = localStorage.getItem('hasGoneToElephant') === 'true';
let hasGoneToTeaTime = localStorage.getItem('hasGoneToTeaTime') === 'true';

//debug mode boolean
bugCathcerMode = true;

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

// Optional helper to reset all visit flags (for testing) -- not used anywhere currently
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
  
  static placementMode(imgX, imgY, imgWidth, imgHeight) {
    let step = 0; // 0: waiting, 1: center placed, 2: size placed
    let centerX, centerY, sizeX, sizeY;

    return {
      isActive: () => step > 0,
      handleClick: (mx, my) => {
        if (step === 0) {
          centerX = mx;
          centerY = my;
          step = 1;
          console.log("Center placed. Click to set size.");
        } else if (step === 1) {
          sizeX = Math.abs(mx - centerX) * 2;
          sizeY = Math.abs(my - centerY) * 2;
          step = 2;
          const relX = ((centerX - imgX) / imgWidth).toFixed(3);
          const relY = ((centerY - imgY) / imgHeight).toFixed(3);
          const sizeWratio = (sizeX / imgWidth).toFixed(3);
          const sizeHratio = (sizeY / imgHeight).toFixed(3);
          console.log(`new Interaction(imgX, imgY, imgWidth, imgHeight, ${relX}, ${relY}, ${sizeWratio}, ${sizeHratio})`);
          step = 0;
        }
      },
      reset: () => { step = 0; }
    };
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
    rect(this.x, this.y, this.width, this.height);
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

/**
 * Checks if mouse is over a defined rectangle
 * @param {number} x  - X coordinate of the center of the area
 * @param {number} y - Y coordinate of the center of the area
 * @param {number} Width - Width of the area
 * @param {number} Height - Height of the area
 * @returns {boolean} True if mouse is over the area, false otherwise
 */
function isMouseOver(x, y, Width, Height){
  return(mouseX > x-Width/2 && mouseY > y-Height/2 && mouseX < x+Width/2 && mouseY < y+Height/2);
}

/**
 * Calculates responsive image dimensions while maintaining aspect ratio
 * @param {p5.Image} image - The image to scale (must be loaded)
 * @param {number} paddingPx - Padding to subtract from available space (default: 0)
 * @param {number} sizeMultiplier - Optional multiplier for final dimensions (default: 1)
 * @returns {Object} Object with width and height properties, or null if validation fails
 */
function imageSizeCalculator(img, imgWidth, imgHeight, padding = 0, sizeMultiplier = 1){
  //a lot of this was written with AI assistance
        // Validation: check if image is valid
      if (!img || !img.width || !img.height) {
        console.warn('calculateImageScale: Invalid image. Image must be loaded with width and height.');
        return null;
      }
      //Validation: check if window dimensions are valid
      if (windowWidth <= 0 || windowHeight <= 0) {
        console.warn('calculateImageScale: Invalid window dimensions.');
        return null;
      }
      //Validation: check if window dimensions are valid
      if (windowWidth <= 0 || windowHeight <= 0) {
        console.warn('calculateImageScale: Invalid window dimensions.');
        return null;
      }
      // Validation: check if size multiplier is positive
      if (sizeMultiplier <= 0) {
        console.warn('calculateImageScale: Size multiplier must be positive.');
        return null;
      }
      // Calculate available space
      let availableW = max(0, windowWidth - padding);
      let availableH = max(0, windowHeight - padding);

      // Avoid division by zero
      if (availableW === 0 || availableH === 0) {
        console.warn('calculateImageScale: No available space after padding.');
        return null;
      }

      // Calculate scale factor (maintains aspect ratio)
      let Scale = min(availableW / img.width, availableH / img.height);
      print(Scale);

      return{
        width: (img.width * Scale)*sizeMultiplier,
        height: (img.height * Scale)*sizeMultiplier,
        Scale: Scale
      }
    }