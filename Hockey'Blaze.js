const Knaprardet = document.getElementById("Knaprardet");
const Titelkort = document.getElementById("Titelkort");
const klubba = document.getElementById("klubba");

Knaprardet.addEventListener("click", event =>{
  klubba.style.visibility = "visible";
  Titelkort.style.display = "none";
});

var c = document.getElementById("MinCanvas")
var ctx = c.getContext("2d");
ctx.fillStyle = "blue"; // <--    Fylls egentligen redan med Css så det kan vara onödigt. Samtidigt kan det vara  
ctx.fillRect(0, 0, c.width, c.heigth) /*användbart för senare så låter det vara för tillfället*/
ctx.beginpath();
ctx.rect(20, 20, 150, 100)
ctx.stroke();
ctx.getElementById("klubba")
// <-- Det här kanske förstör det jag tänkt med att göra det omvända av det jag gjorde 
/*med spelknappen därför kommenterar jag det såg jag veta vad det är jag kan behöva ta bort sen*/

//Den här delen kanske blir onödig så kommenterar bort den för tillfället
/*class Troligtmomentum {  
  constructor(symbol) { //Hittade lite kod som på stack overflow som gjorde något annat än jag 
    this.symbol = symbol; /*tänkt men gjorde något så jag tror min kod kannibaliserar dess användbarhet med sättet
                          /*det är ihopsatt nu trots att det kommer interagera väl sen. */
/*  }

  render() { 
    return this.symbol;
  }
}

class Spelet {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");  
  }

  render() {
    this.ctx.fillStyle = "black";  // Rätt kontext
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);  
  }
}

// Skapa objekt från Troligtmomentum och Spelet
const TroligtmomentumObj = new Troligtmomentum("symbol_data");  
const g = new Spelet(document.getElementById("MinCanvas"));  // 
g.render();  
*/

let circle = document.querySelector('.player');
let moveBy = 10; 

window.addEventListener('load', () =>{
    circle.style.position = 'absolute' ;
    circle.style.left = 0;
    circle.style.top = 0;
});

window.addEventListener('keydown', (e) =>{
    switch(e.key){
        case 'a' :
            circle.style.left = parseInt(circle.style.left) - moveBy + 'px' ;
            break;
        case 'd' :
            circle.style.left = parseInt(circle.style.left) + moveBy + 'px' ;
            break;
        case 'w' :
            circle.style.top = parseInt(circle.style.top) - moveBy + 'px' ;
            break;
        case 's' :
            circle.style.top = parseInt(circle.style.top) + moveBy + 'px' ;
            break;
    }
});
