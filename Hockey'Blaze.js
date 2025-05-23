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

Knaprardet.addEventListener("click", initGame);