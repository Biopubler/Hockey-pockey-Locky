const Knaprardet = document.getElementById("Knaprardet");
const Titelkort = document.getElementById("Titelkort");
const klubba = document.getElementById("klubba");
const banan = document.getElementById("banan");
const container = document.querySelector(".container");
const puck = document.getElementById("puck");

// Hur spelet ska funka
let gameActive = false;
let gameLoopId = null;
let score = 0;
let difficulty = 1.0;

// Klubbans egenskaper
let klubbaX = 150;
let klubbaSpeed = 8;
const klubbaWidth = 30;
const klubbaHeight = 160;

// Puck properties
let puckX = 170;
let puckY = 100;
let puckSpeedX = 3;
let puckSpeedY = 3;
const puckSize = 20;
let puckActive = true;
let respawnTimer = 0;
const respawnDelay = 1000;
let puckOriginX = (container.clientWidth - puckSize) / 2;
let puckOriginY = 50;
let lastPuckSpeedX = 3;
let lastPuckSpeedY = 3;

// Spelstart och hur det visar / påbröjar olika händelser i koden.
Knaprardet.style.display = "block";

function initGame() {
  if (gameLoopId) {
    cancelAnimationFrame(gameLoopId);
  }
  
  gameActive = true;
  klubba.style.visibility = "visible";
  puck.style.visibility = "visible";
  Titelkort.style.display = "none";
  Knaprardet.style.display = "none";
  
  // återställer
  score = 0;
  difficulty = 1.0;
  klubbaSpeed = 8;
  lastPuckSpeedX = 3;
  lastPuckSpeedY = 3;
  
  // Visar pukens personliga historia fr fr
  puckOriginX = (container.clientWidth - puckSize) / 2;
  puckOriginY = 50;
  
  resetPuck();
  
  // Återställer klubbis pubbis*/
  klubbaX = (container.clientWidth - klubbaWidth) / 2;
  updateKlubbaPosition();
  
  gameLoopId = requestAnimationFrame(gameLoop);
}

function resetPuck() {
  puckActive = true;
  respawnTimer = 0;
  puckX = puckOriginX;
  puckY = puckOriginY;
  
  const maxSpeed = 10;
  puckSpeedY = Math.abs(lastPuckSpeedY) * 1.00005 * difficulty; // Det som kommer släpps ska ner som en pannkaka fixades här det fixade vi här */
  puckSpeedX = Math.sign(puckSpeedX) * Math.min(Math.abs(puckSpeedX), maxSpeed);
  puckSpeedY = Math.sign(puckSpeedY) * Math.min(Math.abs(puckSpeedY), maxSpeed);
  updatePuckPosition();
  puck.style.visibility = "visible";
}

function updateKlubbaPosition() {
  const containerRect = container.getBoundingClientRect();
  klubbaX = Math.max(0, Math.min(klubbaX, containerRect.width - klubbaWidth));
  klubba.style.left = `${klubbaX}px`;
}

function checkPuckCollision() {
  const containerRect = container.getBoundingClientRect();
  const puckRect = {
    left: puckX,
    right: puckX + puckSize,
    top: puckY,
    bottom: puckY + puckSize
  };
  
  if (puckRect.top <= 51) {
    lastPuckSpeedX = puckSpeedX;
    lastPuckSpeedY = puckSpeedY;
    puckActive = false;
    puck.style.visibility = "hidden";
    respawnTimer = Date.now();
    return false;
  }
  
  const klubbaRect = {
    left: klubbaX,
    right: klubbaX + klubbaWidth,
    top: containerRect.height - klubbaHeight,
    bottom: containerRect.height
  };
  
  // Studsbolls ahhh fysik
  if (puckRect.left <= 0) {
    puckX = 0;
    puckSpeedX = Math.abs(puckSpeedX) * 1.02;
  } else if (puckRect.right >= containerRect.width) {
    puckX = containerRect.width - puckSize;
    puckSpeedX = -Math.abs(puckSpeedX) * 1.02;
  }
  
  if (puckRect.top <= 0) {
    puckY = 0;
    puckSpeedY = Math.abs(puckSpeedY) * 1.02;
  } else if (puckRect.bottom >= containerRect.height) {
    // Game Over när pucken träffar botten
    alert("Game Over! Poäng: " + score);
    resetGame();
    return false;
  }

  // Klubba lini kollidera nini.
  if (puckActive && 
      puckRect.bottom >= klubbaRect.top &&
      puckRect.top <= klubbaRect.bottom &&
      puckRect.right >= klubbaRect.left &&
      puckRect.left <= klubbaRect.right
  ) {
    // blah blah tralala (det här fixar position är trött när det här skrevs)
    const hitPosition = ((puckX + puckSize/2) - (klubbaX + klubbaWidth/2)) / (klubbaWidth/2);
    
    // Får vilken vinkel studsbollsvägarna ger puken
    const angle = hitPosition * (Math.PI/3);
    
    // Som inflation ökas med 2% per år gör vi det fast snabbare.
    const speed = Math.sqrt(puckSpeedX*puckSpeedX + puckSpeedY*puckSpeedY) * 1.02 * difficulty;
    
    // Listar utt vad det här gör
    puckSpeedX = speed * Math.sin(angle);
    puckSpeedY = -speed * 1;
    
    // sparar
    lastPuckSpeedX = puckSpeedX;
    lastPuckSpeedY = puckSpeedY;
    
    // Ska öka klubbhastighet med 2%
    klubbaSpeed *= 1.02;
    
    // fixar difficulty Ihop bangat med simons kod så vet ej vad det gör fråga honom om saken. Fyller säkert samma funtion som annat.
    difficulty *= 1.02;
    score++;
    
    // Hindrar sticking
    puckY = klubbaRect.top - puckSize - 1;
    
    return true;
  }
  
  return false;
}

function updatePuck() {
  if (!puckActive) {
    // Puken är dum så den behöver veta vad den ska göra:
    if (Date.now() - respawnTimer > respawnDelay) {
      resetPuck();
    }
    return;
  }

  // Updatrtst positionen av pucken. 
  puckX += puckSpeedX;
  puckY += puckSpeedY;
  
  // Check collisions
  checkPuckCollision();
  
  // Update rendering
  updatePuckPosition();
}

function updatePuckPosition() {
  puck.style.left = `${puckX}px`;
  puck.style.top = `${puckY}px`;
}

function gameLoop() {
  if (!gameActive) return;
  
  updatePuck();
  gameLoopId = requestAnimationFrame(gameLoop);
}

function resetGame() {
  gameActive = false;
  if (gameLoopId) {
    cancelAnimationFrame(gameLoopId);
    gameLoopId = null;
  }
  Titelkort.style.display = "block";
  Knaprardet.style.display = "block";
  klubba.style.visibility = "hidden";
  puck.style.visibility = "hidden";
}

// Event listeners för när saker ska ske
Knaprardet.addEventListener("click", initGame);

document.addEventListener("keydown", (e) => {
  if (!gameActive) return;
  if (e.key === "a" || e.key === "ArrowLeft") klubbaX -= klubbaSpeed;
  else if (e.key === "d" || e.key === "ArrowRight") klubbaX += klubbaSpeed;
  updateKlubbaPosition();
});