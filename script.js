let typingText = document.querySelector('.typing-text p');
let input = document.querySelector(".wrapper .input-field");
let time = document.querySelector(".time span b");
let mistakes = document.querySelector(".mistakes span");
let wpm = document.querySelector(".wpm span");
let btn = document.querySelector(".content-button");
let cpm = document.querySelector(".cpm span");

let timer;
let maxTime = 60;
let timeleft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;

function loadParagraph() {
    let paragraph = ["Space is the vast, seemingly infinite expanse that exists beyond Earth's atmosphere, consisting of planets, stars, galaxies, and cosmic phenomena.", "It is a near-perfect vacuum with zero gravity zones, allowing celestial bodies to orbit in harmony.", "The observable universe spans over 93 billion light-years, filled with dark matter, black holes, and nebulas.", "Space exploration has led to groundbreaking discoveries, from the Moon landing to Mars rovers, expanding human knowledge.", "It remains one of the last frontiers for scientific research, inspiring technological advancements like satellites and telescopes.", "However, space also poses challenges, including radiation and extreme temperatures, making human survival difficult.", "Despite these obstacles, space continues to captivate humanity, driving dreams of interstellar travel and extraterrestrial life."];

    let randomIndex = Math.floor(Math.random() * paragraph.length);
    typingText.innerHTML = '';

    for (let char of paragraph[randomIndex]) {
        typingText.innerHTML += `<span>${char}</span>`;
    }

    // Reset active character
    let spans = typingText.querySelectorAll('span');
    spans.forEach(span => {
        span.classList.remove('active', 'correct', 'incorrect');
    });
    if (spans.length > 0) {
        spans[0].classList.add('active');
    }

    document.addEventListener('keydown', () => input.focus());
    typingText.addEventListener("click", () => input.focus());
}

function initTyping() {
    let chars = typingText.querySelectorAll('span');
    let typedChar = input.value.charAt(charIndex);

    if (charIndex < chars.length && timeleft > 0) {
        if (!isTyping) {
            timer = setInterval(initTime, 1000);
            isTyping = true;
        }

        // Remove active class from current char
        if (charIndex > 0) {
            chars[charIndex - 1].classList.remove('active');
        }

        if (chars[charIndex].innerText === typedChar) {
            chars[charIndex].classList.add('correct');
        } else {
            mistake++;
            chars[charIndex].classList.add('incorrect');
        }

        charIndex++;
        mistakes.innerText = mistake;
        cpm.innerText = charIndex - mistake;

        // Add active class to next char if exists
        if (charIndex < chars.length) {
            chars[charIndex].classList.add('active');
        } else {
            // Test completed
            clearInterval(timer);
            input.blur();
        }
    } else {
        input.value = input.value.slice(0, charIndex); // Prevent typing beyond limit
    }
}

function initTime() {
    if (timeleft > 0) {
        timeleft--;
        time.innerText = timeleft;

        // Calculate WPM (words per minute)
        let minutes = (maxTime - timeleft) / 60;
        let wordsTyped = (charIndex - mistake) / 5;
        let wpmVal = Math.round(wordsTyped / minutes);
        wpm.innerText = wpmVal || 0;
    } else {
        clearInterval(timer);
        input.blur();
        input.value = ''; // Clear input when time runs out
    }
}

function reset() {
    clearInterval(timer);
    timeleft = maxTime;
    charIndex = 0;
    mistake = 0;
    isTyping = false;
    
    time.innerText = timeleft;
    mistakes.innerText = mistake;
    wpm.innerText = 0;
    cpm.innerText = 0;
    
    input.value = '';
    loadParagraph();
    input.focus();
}

// Event listeners
input.addEventListener("input", initTyping);
btn.addEventListener("click", reset);

// Initialize
loadParagraph();
input.focus();