// Check system preference
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
if (prefersDarkScheme.matches) {
    document.body.classList.add('dark')
} else {
    document.body.classList.remove('dark')
}

// Select elements
const dtoggle = document.querySelector('.check');
const label = document.querySelector('label');
const moon = document.querySelector('.moon');
const sun = document.querySelector('.sun');
const title = document.querySelector('.title');

// Check if dark class is applied
let active = document.body.classList.contains('dark');
// console.log(active)
if (active) {
    label.innerHTML = 'Light';
    sun.classList.add('transparent')
    dtoggle.click();
}
if (!active) {
    label.innerHTML = 'Dark';
    sun.classList.remove('transparent')
}
// Checkbox event listener
dtoggle.addEventListener('click', () => {
    // console.log(dtoggle.checked)
    // Change label text
    if (dtoggle.checked) {
        label.innerHTML = 'Light';
        sun.classList.add('transparent')
        // dtoggle.checked = true;
        dtoggle.click();
    }
    if (!dtoggle.checked) {
        label.innerHTML = 'Dark';
        sun.classList.remove('transparent')
        // Use Click method
        dtoggle.click()
    }
    // Toggle dark theme
    document.body.classList.toggle('dark')
});


// Speech command
// Hide speech info after 6s
const speechInfo = document.querySelector('.speech-info');
const recBtn = document.querySelector('.rec');
// Set Time out

setTimeout(() => {
    speechInfo.style.opacity = 0;
}, 6000);

// Speech recognition
const recognition = new window.webkitSpeechRecognition() || window.webkitSpeechRecognition;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;
// On result event
recognition.onresult = e => {
    if (typeof (e.results) == 'undefined') {
        recognition.onend = null;
        recognition.stop();
        return;
    }
    let mode = e.results[0][0].transcript;
    if (mode == 'dark') {
        // Check if dark mode is activated
        let active = document.body.classList.contains('dark');
        if (active) {
            // if activated do nothing
            recognition.onend = null;
            recognition.stop();
            return;
        } else {
            label.innerHTML = 'Light';
            sun.classList.add('transparent');
            // Toggle checkbox
            dtoggle.click();
            // Change title
            title.innerHTML = 'Dark Mode';
        }
    }
    if (mode == 'light') {
        // Check if dark mode is activated
        let active = document.body.classList.contains('dark');
        if (!active) {
            // if no activated do nothing
            recognition.onend = null;
            recognition.stop();
            return;
        } else {
            label.innerHTML = 'Dark';
            sun.classList.remove('transparent');
            // Toggle checkbox
            dtoggle.click();
            // Change title
            title.innerHTML = 'Light Mode';
        }
    }
    recognition.onnomatch = e => {
        recognition.stop();
    }
}

// On click star recognition
recBtn.onclick = () => {
    recognition.start();
}

// Paragraph
let paragraph = document.querySelector('.text')
//console.log(paragraph.innerHTML)
//console.log(paragraph.innerHTML.length)
let str = paragraph.innerText;
// Insert New Line Function
function newLine(str, maxLength) {
    // Empty line
    var line = "";
    // Calc number of lines
    var numOfLines = Math.floor(str.length / maxLength);
    // For loop
    for (var i = 0; i < numOfLines + 1; i++) {
        // Add text string to line
        line += str.substr(i * maxLength, maxLength);
        // Brake
        if (i !== numOfLines) {
            line += "\n ";
        }
    }

    // return buff;
    // console.log(line)
    paragraph.innerText = line;
}
// Run
newLine(str, 50)

// Bye ...