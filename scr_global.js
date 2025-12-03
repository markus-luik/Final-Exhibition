let hasGoneToBedroom = false;
let hasGoneToFish = true;
let hasGoneToElephant = true;
let hasGoneToTeaTime = true;

class Interaction{
    constructor(imgX, imgY, imgWidth, fractW, imgHeight, fractH, width, height){
        this.fractW = fractW;
        this.fractH = fractH;
        this.x = imgX - imgWidth/fractW;
        this.y = imgY + imgHeight/fractH;
        this.startingWidth = width;
        this.startingHeight = height;
        this.width = width;
        this.height = height;
        this.colorRegular = color(255, 255, 255, 128);
        this.colorHover = color(150, 150, 150, 128);
        this.colorActive = color(255, 0, 0, 128);
        this.color = this.colorRegular;
        this.active = false;
    }

    show(){
        push();
        if(this.hoveredOver()){
            this.color = this.colorHover;
            cursor(HAND);
            if(this.active){
                this.color = this.colorActive;
            }
        }else if (!this.active){
            this.color = this.colorRegular;
        }
        fill(this.color);
        rect(this.x, this.y, this.width, this.height);
        pop();
    }

    hoveredOver(){
    return(mouseX > this.x - this.width/2 && 
           mouseY > this.y - this.height/2 && 
           mouseX < this.x + this.width/2 && 
           mouseY < this.y + this.height/2);
    }

    activate(){
        if (!this.active) this.active = true; else this.active = false;
        print("activated");
    }

    resetPos(imgX, imgY, imgWidth, imgHeight, scale){
        this.x = imgX - imgWidth/this.fractW;
        this.y = imgY + imgHeight/this.fractH;
        this.width = this.startingWidth * scale;  // Scale the width by the image scale
        this.height = this.startingHeight * scale; // Scale the height by the image scale
    }

}

//THIS IS CURRENTLY IN EVERY SCRIPT BUT CAN BE MOVED HERE
// function isMouseOver(somethingX, somethingY, somethingWidth, somethingHeight){
//   return(mouseX > somethingX-somethingWidth/2 && mouseY > somethingY-somethingHeight/2 && mouseX < somethingX+somethingWidth/2 && mouseY < somethingY+somethingHeight/2);
// }