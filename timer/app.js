const routine = [
  { name: "Shower", duration: 8 * 60 },
  { name: "Brush Teeth", duration: 2 * 60 },
];

let currentStep = 0;
let currentTime = routine[currentStep].duration;
let interval;

const routineElem = document.getElementById("routine");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const stopBtn = document.getElementById("stop");

function displayRoutine() {
  routineElem.innerHTML = routine.map((step, index) => {
    return `<div><strong>${index === currentStep ? ">" : ""} ${step.name}:</strong> ${step.duration / 60} minutes</div>`;
  }).join("");
}

function updateTime() {
  currentTime--;
  if (currentTime <= 0) {
    currentStep++;
    if (currentStep >= routine.length) {
      clearInterval(interval);
      // Replace the URL with your x-callback-url
      window.location.href = "shortcuts://x-callback-url";
      return;
    }
    currentTime = routine[currentStep].duration;
  }
  displayRoutine();
}

startBtn.addEventListener("click", () => {
  interval = setInterval(updateTime, 1000);
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  stopBtn.disabled = false;
});

pauseBtn.addEventListener("click", () => {
  clearInterval(interval);
  startBtn.disabled = false;
  pauseBtn.disabled = true;
});

stopBtn.addEventListener("click", () => {
  clearInterval(interval);
  currentStep = 0;
  currentTime = routine[currentStep].duration;
  displayRoutine();
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  stopBtn.disabled = true;
});

displayRoutine();
