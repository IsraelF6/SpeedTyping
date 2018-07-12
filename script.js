const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

/* [minutes, seconds, hundredths, thousands] */
var timer = [0,0,0,0];
var interval;
var timerRunning = false;

/* Add leading zero to numbers 9 or below */
function leadingZero(time) {
    if (time <=9) 
        time = "0" + time;
    return time;
}

/* Run a standard minute:second:hundredths timer */
function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    /* Add another one thousandths of a second to the timer */
    timer[3]++;

    /* Minutes = thousandth of a second/100/60 */
    timer[0] = Math.floor((timer[3]/100)/60);
    /* Seconds = thousandth of a second/100 - # of minutes passed*/
    timer[1] = Math.floor((timer[3]/100) - (timer[0]*60));
    /* hundredth = thousandth - # of seconds - # of minutes passed*/
    timer[2] = Math.floor(timer[3] - (timer[1]*100) - (timer[0]*6000));
}

/* Match the text entered with the test phrase */
function textCheck() {
    let textEntered = testArea.value;
    /* Substring of test phrase the same length of text entered */
    let originTextMatch = originText.substring(0,textEntered.length);

    /* When no text has been entered */
    if (textEntered.length == 0)
        testWrapper.style.borderColor = "grey";

    /* Test phrase has been matched */
    else if (textEntered == originText) {
        testWrapper.style.borderColor = "lime";
        clearInterval(interval);
    }  
    else {
        /* Text entered is substring of test phrase */
        if (textEntered == originTextMatch)
            testWrapper.style.borderColor = "#65CCf3";
        /* Text entered does not match test phrase */
        else
            testWrapper.style.borderColor = "#E95D0F";
    }
}

/* Start the timer */
function start() {
    if (testArea.value.length === 0 && !timerRunning) {
        timerRunning = true;
        /* assigning to variable allows the interval to be cleared and reset */
        interval = setInterval(runTimer, 10);
    }
}

/* Reset everything */
function reset() {
    /* Stops timer from running */
    clearInterval(interval);
    /* avoid creating a new interval each run */
    interval = null;
    timer = [0,0,0,0];
    timerRunning = false;

    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";
}

/* Event listeners for keyboard input and the reset button */
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", textCheck, false);
resetButton.addEventListener("click", reset, false);
