
const Knaprardet = document.getElementById("Knaprardet");
const Titelkort = document.getElementById("Titelkort");

Knaprardet.addEventListener("click", event =>{

  Titelkort.style.display = "none";
});

var c = document.getElementById(MinCanvas)
var ctx = c.getContext("2d");
ctx.fillstyle = "blue"; // <--    Fylls egentligen redan med Css så det kan vara onödigt. Samtidigt kan det vara  
ctx.fillRect(0, 0, c.width, c.heigth) /*användbart för senare så låter det vara för tillfället*/
ctx.beginpath();
ctx.rect(20, 20, 150, 100)
ctx.stroke();
ctx.getElementById("klubba") // <-- Det här kanske förstör det jag tänkt med att göra det omvända av det jag gjorde 
/*med spelknappen därför kommenterar jag det såg jag veta vad det är jag kan behöva ta bort sen*/