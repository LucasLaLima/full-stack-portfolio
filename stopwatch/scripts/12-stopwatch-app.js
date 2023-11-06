// Global variables
let stopwatchOn = false;
let currentTime = 0;
let intervalId = undefined;

// Start Button functions
document.querySelector('.start-button').addEventListener('click', function () {
  if(!stopwatchOn) {
    stopwatchOn = true;
    intervalId = setInterval(function(){
      if(stopwatchOn){
        currentTime++;
        renderTime();
      }}, 1000);
  }}
);

document.querySelector('.start-button').addEventListener('click', function() {
  setStartButtonColor();
})

// Stop Button function
document.querySelector('.stop-button').addEventListener('click', () => { 
  if(stopwatchOn){
    stopwatchOn=false;
    clearInterval(intervalId);
    setStartButtonColor();
  }
});

// Reset Button function
document.querySelector('.reset-button').addEventListener('click', () => { 
  stopwatchOn = false;
  currentTime = 0;
  clearInterval(intervalId);
  renderTime();
  setStartButtonColor();
});

// Render time function
function renderTime() {
  document.querySelector('.current-time').innerHTML = `${currentTime} seconds`;
}

// Set start button color function
function setStartButtonColor(){
  const sb = document.querySelector('.start-button');
  if(stopwatchOn){
    sb.style.backgroundColor = '#007958' //ivy
  } else {
    sb.style.backgroundColor = '#ffffff' // white
  }
}