const Knaprardet = document.getElementById("Knaprardet");
const Titelkort = document.getElementById("Titelkort");
const klubba = document.getElementById("klubba");
const banan = document.getElementById("banan");
const container = document.querySelector(".container");




let gameActive = false;
let klubbaX = 150;
const klubbaSpeed = 5;
const klubbaWidth = 30;


Knaprardet.style.display = "block";
function initGame() {
  gameActive = true;
  klubba.style.visibility = "visible";
  puck.style.visibility = "visible";
  Titelkort.style.display = "none";
  Knaprardet.style.display = "none";
 


  const bananRect = banan.getBoundingClientRect();
  klubbaX = (bananRect.width - klubbaWidth) / 2;
  updateKlubbaPosition();
}


function updateKlubbaPosition() {
  const bananRect = banan.getBoundingClientRect();
  const minX = 0;
  const maxX = bananRect.width - klubbaWidth;
 


  klubbaX = Math.max(minX, Math.min(klubbaX, maxX));
 
  klubba.style.left = `${klubbaX}px`;
  klubba.style.position = "absolute";
}


document.addEventListener("keydown", (e) => {
  if (!gameActive) return;
 
  if (e.key === "a" || e.key === "ArrowLeft") {
    klubbaX -= klubbaSpeed;
  }
  else if (e.key === "d" || e.key === "ArrowRight") {
    klubbaX += klubbaSpeed;
  }
 
  updateKlubbaPosition();
});


// Uppdaterar klubbans position
function updateKlubbaPosition() {
  const bananRect = banan.getBoundingClientRect();
  const minX = 0;
  const maxX = bananRect.width - klubbaWidth;
 
  // Ser till att klubban inte flyr från spelbrädan typeshit
  klubbaX = Math.max(minX, Math.min(klubbaX, maxX));
 
  klubba.style.left = `${klubbaX}px`;
  klubba.style.position = "absolute";
}


// Lägg till dessa variabler för pucken
const puck = document.getElementById("puck");
let puckX = 170; // Startposition X
let puckY = 100;  // Startposition Y
let puckSpeedX = 2; // Hastighet X
let puckSpeedY = 2; // Hastighet Y
const puckSize = 20; // Måste matcha CSS-width/height


// Initiera spelet med puck
function initGame() {
  gameActive = true;
  klubba.style.visibility = "visible";
  puck.style.visibility = "visible"; // Visa pucken
  Titelkort.style.display = "none";
  Knaprardet.style.display = "none";
 
  // Återställ puckens position
  puckX = (container.clientWidth - puckSize) / 2;
  puckY = 50;
  updatePuckPosition();
 
  // Starta spelloopen
  requestAnimationFrame(gameLoop);
}


// Uppdatera puckens position och kollision
function updatePuck() {
  // Flytta pucken
  puckX += puckSpeedX;
  puckY += puckSpeedY;
 
  // Kolla kollision med väggar
  const containerRect = container.getBoundingClientRect();
 
  // Vänster & höger vägg
  if (puckX <= 0 || puckX + puckSize >= containerRect.width) {
    puckSpeedX *= -1; // Studsa horisontellt
  }
 
  // Tak (överkant)
  if (puckY <= 0) {
    puckSpeedY *= -1; // Studsa vertikalt
  }
 
  // Golv (underkant) = Förlust?
  if (puckY + puckSize >= containerRect.height) {
    // Spelet över (eller reset)
    alert("Pucken gick in i mål! Spelet är över.");
    resetGame();
    return;
  }
 
  // Kolla kollision med klubban
  const klubbaRect = klubba.getBoundingClientRect();
  if (
    puckY + puckSize >= klubbaRect.top &&
    puckY <= klubbaRect.bottom &&
    puckX + puckSize >= klubbaRect.left &&
    puckX <= klubbaRect.right
  ) {
    puckSpeedY *= -1; // Studsa uppåt
    // Extra: Lägg till lite horisontell kraft baserat på klubbans rörelse
    puckSpeedX += (klubbaX - prevKlubbaX) * 0.2;
  }
 
  updatePuckPosition();
}


// Uppdatera puckens CSS-position
function updatePuckPosition() {
  puck.style.left = `${puckX}px`;
  puck.style.top = `${puckY}px`;
}


// Spelloop (ersätt din gamla keydown-logik med detta)
let prevKlubbaX = klubbaX;
function gameLoop() {
  if (!gameActive) return;
 
  updateKlubbaPosition();
  updatePuck();
 
  prevKlubbaX = klubbaX; // Spara för att beräkna klubbans rörelse
  requestAnimationFrame(gameLoop);
}


// Återställ spelet
function resetGame() {
  gameActive = false;
  Titelkort.style.display = "block";
  Knaprardet.style.display = "block";
  klubba.style.visibility = "hidden";
  puck.style.visibility = "hidden";
}


// Starta spelet (befintlig kod)
Knaprardet.addEventListener("click", initGame);


// Tangentbordslyssnare (befintlig kod)
document.addEventListener("keydown", (e) => {
  if (!gameActive) return;
  if (e.key === "a" || e.key === "ArrowLeft") klubbaX -= klubbaSpeed;
  else if (e.key === "d" || e.key === "ArrowRight") klubbaX += klubbaSpeed;
});
Knaprardet.addEventListener("click", initGame);
