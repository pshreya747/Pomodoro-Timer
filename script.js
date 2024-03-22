// Set default work and break durations
let workDuration = 25; // in minutes
let breakDuration = 5; // in minutes

// Initialize timer variables
let timer;
let remainingTime;
let isPaused = true;
let isWorking = true;

// Function to start the timer
function startTimer() {
    if (isPaused) {
        isPaused = false;
        if (remainingTime === undefined) {
            remainingTime = isWorking ? workDuration * 60 : breakDuration * 60;
        }
        timer = setInterval(updateTimer, 1000);
    }
}

// Function to pause the timer
function pauseTimer() {
    isPaused = true;
    clearInterval(timer);
}

// Function to reset the timer
function resetTimer() {
    pauseTimer();
    isPaused = true;
    isWorking = true;
    remainingTime = workDuration * 60;
    updateDisplay();
}

// Function to update the timer display
function updateTimer() {
    if (remainingTime > 0) {
        remainingTime--;
        updateDisplay();
    } else {
        clearInterval(timer);
        switchPeriod();
        startTimer();
    }
}

// Function to switch between work and break periods
function switchPeriod() {
    if (isWorking) {
        isWorking = false;
        remainingTime = breakDuration * 60;
    } else {
        isWorking = true;
        remainingTime = workDuration * 60;
    }
}

// Function to update the display with remaining time
function updateDisplay() {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    const formattedTime = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    document.getElementById('timer').textContent = formattedTime;
}

// Event listeners for changing work and break durations
document.getElementById('workDuration').addEventListener('change', function() {
    workDuration = parseInt(this.value);
    resetTimer();
});

document.getElementById('breakDuration').addEventListener('change', function() {
    breakDuration = parseInt(this.value);
    resetTimer();
});

// Initial display update
updateDisplay();
