document.addEventListener('DOMContentLoaded', function() {
    const clockElement = document.getElementById('clock');
    const timerDisplay = document.getElementById('timer-display');
    const stopwatchDisplay = document.getElementById('stopwatch-display');
  
    // Clock
    function updateClock() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
    setInterval(updateClock, 1000);
    updateClock();
  
    // Timer
    let timerInterval;
    document.getElementById('start-timer').addEventListener('click', function() {
      const minutes = parseInt(document.getElementById('timer-minutes').value) || 0;
      const seconds = parseInt(document.getElementById('timer-seconds').value) || 0;
      let totalTime = minutes * 60 + seconds;
  
      clearInterval(timerInterval);
      timerInterval = setInterval(() => {
        if (totalTime <= 0) {
          clearInterval(timerInterval);
          timerDisplay.textContent = '00:00';
          return;
        }
        totalTime -= 1;
        const mins = String(Math.floor(totalTime / 60)).padStart(2, '0');
        const secs = String(totalTime % 60).padStart(2, '0');
        timerDisplay.textContent = `${mins}:${secs}`;
      }, 1000);
    });
  
    document.getElementById('reset-timer').addEventListener('click', function() {
      clearInterval(timerInterval);
      timerDisplay.textContent = '00:00';
      document.getElementById('timer-minutes').value = '';
      document.getElementById('timer-seconds').value = '';
    });
  
    // Stopwatch
    let stopwatchInterval;
    let stopwatchTime = 0;
    document.getElementById('start-stopwatch').addEventListener('click', function() {
      clearInterval(stopwatchInterval);
      stopwatchInterval = setInterval(() => {
        stopwatchTime += 1;
        const hours = String(Math.floor(stopwatchTime / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((stopwatchTime % 3600) / 60)).padStart(2, '0');
        const seconds = String(stopwatchTime % 60).padStart(2, '0');
        stopwatchDisplay.textContent = `${hours}:${minutes}:${seconds}`;
      }, 1000);
    });
  
    document.getElementById('stop-stopwatch').addEventListener('click', function() {
      clearInterval(stopwatchInterval);
    });
  
    document.getElementById('reset-stopwatch').addEventListener('click', function() {
      clearInterval(stopwatchInterval);
      stopwatchTime = 0;
      stopwatchDisplay.textContent = '00:00:00';
    });
  });
  