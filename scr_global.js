// scr_global.js is readable by all pages and contains shared code and variables.

//debug mode boolean
bugCathcerMode = false;

//Focus switch (between pop-ups)
let popupActive = false;

// Initialize flags from localStorage (persist across page loads).
// Use sessionStorage instead if you want values to clear when the tab closes.
let hasGoneToBedroom = localStorage.getItem('hasGoneToBedroom') === 'true';
let hasGoneToFish = localStorage.getItem('hasGoneToFish') === 'true';
let hasGoneToElephant = localStorage.getItem('hasGoneToElephant') === 'true';
let hasGoneToTeaTime = localStorage.getItem('hasGoneToTeaTime') === 'true';

//for flicker
let offset = 0.5;

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
  constructor(imgX, imgY, imgWidth, imgHeight, relX, relY, sizeWratio, sizeHratio, img) {
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
    this.image = img;
    this.sizeMult = 1;

    // Initialize based on current image geometry
    this.resetPos(imgX, imgY, imgWidth, imgHeight);
  }
show(showX, showY, showWidth, showHeight) {
  if (!showX || showX === 'undefined') { showX = this.x; }
  if (!showY || showY === 'undefined') { showY = this.y; }
  if (!showWidth || showWidth === 'undefined') { showWidth = this.width; }
  if (!showHeight || showHeight === 'undefined') { showHeight = this.height; }
  // optional graphics buffer: passed as 5th argument
  const gfx = arguments.length > 4 ? arguments[4] : null;

  // If an image was provided, draw it (uses imageNeon)
  if (this.image) {
    // When hovered/active you may want a different glow color
    let glowColor = color(332, 58, 91, 100);
    if (typeof imageNeon === 'function') {
      // imageNeon(asset, x, y, width, height, glowColor, gfx)
      imageNeon(this.image, showX, showY, showWidth * this.sizeMult, showHeight * this.sizeMult, glowColor, gfx);
    } else {
      if (gfx) {
        gfx.push();
        gfx.imageMode(CENTER);
        gfx.image(this.image, showX, showY, showWidth * this.sizeMult, showHeight * this.sizeMult);
        gfx.pop();
      } else {
        push();
        imageMode(CENTER);
        image(this.image, showX, showY, showWidth * this.sizeMult, showHeight * this.sizeMult);
        pop();
      }
    }
    // keep cursor + hover behavior consistent (only meaningful on main canvas)
    if (!gfx && this.hoveredOver()) { cursor(HAND); }
  }

  // Existing rectangle fallback — draw into gfx if provided
  if (bugCathcerMode) {
    if (gfx) {
      if (this.hoveredOver()) {
        this.color = this.colorHover;
        if (this.active) this.color = this.colorActive;
      } else if (!this.active) {
        this.color = this.colorRegular;
      }
      gfx.push();
      gfx.fill(this.color);
      gfx.rect(this.x, this.y, this.width * this.sizeMult, this.height * this.sizeMult);
      gfx.pop();
    } else {
      push();
      if (this.hoveredOver()) {
        this.color = this.colorHover;
        cursor(HAND);
        if (this.active) this.color = this.colorActive;
      } else if (!this.active) {
        this.color = this.colorRegular;
      }
      fill(this.color);
      rect(this.x, this.y, this.width * this.sizeMult, this.height * this.sizeMult);
      pop();
    }
  }
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

  static placementMode(imgX, imgY, imgWidth, imgHeight) {
    // Placement works by first clicking the top-left corner, then clicking
    // the opposite corner to set the size. step: 0 waiting, 1 top-left set.
    let step = 0; // 0: waiting, 1: top-left placed
    let topLeftX, topLeftY, finalW, finalH;
    let currentMouseX = 0, currentMouseY = 0;

    return {
      isActive: () => step > 0,
      // call on mouse click to advance placement steps
      handleClick: (mx, my) => {
        if (step === 0) {
          // first click defines the top-left corner
          topLeftX = mx;
          topLeftY = my;
          step = 1;
          console.log("Top-left placed. Click to set size.");
        } else if (step === 1) {
          // second click defines the opposite corner; compute size
          finalW = Math.abs(mx - topLeftX);
          finalH = Math.abs(my - topLeftY);
          // compute center of the box (midpoint between top-left and clicked corner)
          const centerX = (topLeftX + mx) / 2.0;
          const centerY = (topLeftY + my) / 2.0;
          // compute rel offsets from image CENTER (fractions of image width/height)
          const relX = ((centerX - imgX) / imgWidth).toFixed(3);
          const relY = ((centerY - imgY) / imgHeight).toFixed(3);
          const sizeWratio = (finalW / imgWidth).toFixed(3);
          const sizeHratio = (finalH / imgHeight).toFixed(3);
          console.log(`new Interaction(imgX, imgY, imgWidth, imgHeight, ${relX}, ${relY}, ${sizeWratio}, ${sizeHratio})`);
          step = 0;
        }
      },
      // call every frame (or on mouse move) to update preview values
      updateMouse: (mx, my) => {
        currentMouseX = mx;
        currentMouseY = my;
      },
      // return an object useful for rendering a preview
      getPreview: () => {
        if (step === 0) {
          return { step, mouseX: currentMouseX, mouseY: currentMouseY };
        }
        if (step === 1) {
          // dynamic rectangle from top-left to current mouse
          const w = Math.abs(currentMouseX - topLeftX);
          const h = Math.abs(currentMouseY - topLeftY);
          // center is midpoint between top-left and current mouse (works when dragging in any direction)
          const cx = (topLeftX + currentMouseX) / 2.0;
          const cy = (topLeftY + currentMouseY) / 2.0;
          return { step, topLeftX, topLeftY, centerX: cx, centerY: cy, width: w, height: h, mouseX: currentMouseX, mouseY: currentMouseY };
        }
        // after completion return final box
        return { step, topLeftX, topLeftY, width: finalW, height: finalH };
      },
      reset: () => { step = 0; }
    };
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

      return{
        width: (img.width * Scale)*sizeMultiplier,
        height: (img.height * Scale)*sizeMultiplier,
        Scale: Scale
      }
    }

/**
 * Small wrapper that creates a placement UI controller for a page.
 * Use the returned API to initialize with image geometry, toggle placement mode,
 * forward clicks, and draw/update the live preview. Keeps placement wiring
 * centralized so pages only call a few methods.
 */
function createPlacementUI() {
  let ctrl = null;
  let active = false;

  return {
    init: (imgX, imgY, imgW, imgH) => { ctrl = Interaction.placementMode(imgX, imgY, imgW, imgH); },
    refresh: (imgX, imgY, imgW, imgH) => { ctrl = Interaction.placementMode(imgX, imgY, imgW, imgH); },
    toggle: () => { active = !active; if (!active && ctrl) ctrl.reset(); return active; },
    isActive: () => active,
    handleClick: (mx, my) => { if (active && ctrl) ctrl.handleClick(mx, my); },
    updateAndDraw: () => {
      if (!active || !ctrl) return;
      ctrl.updateMouse(mouseX, mouseY);
      const p = ctrl.getPreview();
      if (!p) return;
      push();
      noFill();
      stroke(255, 200, 0);
      strokeWeight(2);
      if (p.step === 0) {
        line(p.mouseX - 8, p.mouseY, p.mouseX + 8, p.mouseY);
        line(p.mouseX, p.mouseY - 8, p.mouseX, p.mouseY + 8);
      } else if (p.step === 1) {
        rectMode(CENTER);
        rect(p.centerX, p.centerY, p.width, p.height);
      }
      pop();
    }
  };
}

//Glow effect
function imageNeon(asset, x, y, width, height, glowColor, gfx) {
  // If a graphics buffer is provided, draw into it; otherwise draw to main canvas
  const g = gfx || null;

  if (g) {
    // draw multiple passes into the graphics buffer with shadow on its drawingContext
    const ctx = g.drawingContext;

    g.push();
    g.tint(0, 0, 40, 100);
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = 0;
    g.image(asset, x, y, width, height);
    g.pop();

    g.push();
    g.tint(0, 0, 100, flickering());
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = 160;
    g.image(asset, x, y, width, height);
    g.pop();

    g.image(asset, x, y, width, height);

    g.push();
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = 80;
    g.image(asset, x, y, width, height);
    g.pop();

    g.image(asset, x, y, width, height);

    g.push();
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = 12;
    g.image(asset, x, y, width, height);
    g.pop();

    g.image(asset, x, y, width, height);

    // restore defaults
    ctx.shadowColor = 'rgba(0,0,0,0)';
    ctx.shadowBlur = 0;
    g.noTint();
  } else {
    // tint(h, s, b, transparency) overlaid on image (main canvas)
    push();
    tint(0, 0, 40, 100);
    glow(glowColor, 0);
    image(asset, x, y, width, height);
    pop();

    push();
    tint(0, 0, 100, flickering()); // keep as-is or change flickering() to smoother version
    glow(glowColor, 160);
    image(asset, x, y, width, height);
    pop();
    image(asset, x, y, width, height);

    push();
    glow(glowColor, 80);
    image(asset, x, y, width, height);
    pop();
    image(asset, x, y, width, height);

    push();
    glow(glowColor, 12);
    image(asset, x, y, width, height);
    pop();
    image(asset, x, y, width, height);

    // Restore defaults to avoid leaking shadow/tint to other draws
    glow('rgba(0,0,0,0)', 0);
    noTint();
  }
}

function glow(glowColor, blurriness, gfx) {
  const ctx = gfx ? gfx.drawingContext : drawingContext;
  ctx.shadowColor = glowColor;
  ctx.shadowBlur = blurriness;
}

// function flickering() {
//   offset += 0.08;
//   let n = noise(offset);
//   if (n < 0.30) return 0;
//   else return 100;
// }

// smoother
function flickering() {
  offset = (offset + 0.008) % 10000; // prevent unbounded growth
  let n = noise(offset); // 0..1
  // Map noise to a smooth alpha between 30 and 100
  return map(n, 0, 1, 30, 100);
}
