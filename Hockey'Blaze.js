const Knaprardet = document.getElementById("Knaprardet");
const Titelkort = document.getElementById("Titelkort");
const klubba = document.getElementById("klubba");
const banan = document.getElementById("banan");
const container = document.querySelector(".container");

// Game state
let gameActive = false;
let klubbaX = 150;
const klubbaSpeed = 5; // pixels per frame
const klubbaWidth = 30;

// Initialize game
function initGame() {
  gameActive = true;
  klubba.style.visibility = "visible";
  Titelkort.style.display = "none";
  Knaprardet.style.display = "none";
  
  // Set initial position (centered)
  const bananRect = banan.getBoundingClientRect();
  klubbaX = (bananRect.width - klubbaWidth) / 2;
  updateKlubbaPosition();
}

// Update club position
function updateKlubbaPosition() {
  const bananRect = banan.getBoundingClientRect();
  const minX = 0;
  const maxX = bananRect.width - klubbaWidth;
  
  // Ensure within bounds
  klubbaX = Math.max(minX, Math.min(klubbaX, maxX));
  
  klubba.style.left = `${klubbaX}px`;
  klubba.style.position = "absolute";
}

// Handle keyboard input
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

// Start game
Knaprardet.addEventListener("click", initGame);