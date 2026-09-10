// ===========================
// LOADER
// ===========================

window.addEventListener("load", () => {

    setTimeout(() => {

        document
            .getElementById("loader")
            .classList
            .add("loader-hide");

    },2500);

});

// ==============================
// HAMBURGER MENU
// ==============================

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

// Open & Close Menu
hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show-menu");

    if (navLinks.classList.contains("show-menu")) {
        hamburger.innerHTML = "&times;";
    } else {
        hamburger.innerHTML = "☰";
    }
});

// Close menu when a link is clicked
document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("show-menu");

        hamburger.innerHTML = "☰";

    });

});


// ===========================================
// SMOOTH SCROLL
// ===========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e){

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});


// ===========================================
// HERO BACKGROUND SLIDESHOW
// ===========================================

const hero = document.querySelector(".hero");

const backgrounds = [

    "images/hero/office1.jpg",

    "images/hero/office2.jpg",

    "images/hero/office3.jpg",

    "images/hero/office4.jpg"

];

let currentImage = 0;

function changeHeroBackground(){

    currentImage++;

    if(currentImage >= backgrounds.length){

        currentImage = 0;

    }

    hero.style.backgroundImage =
    `linear-gradient(rgba(0,0,0,.82), rgba(5,5,5,.90)),
    url('${backgrounds[currentImage]}')`;

}

setInterval(changeHeroBackground,5000);


// ===========================================
// SEARCH BUTTON
// ===========================================

const searchButton = document.querySelector(".search-container button");

if(searchButton){

searchButton.addEventListener("click",()=>{

const job=document.querySelectorAll(".search-container input")[0].value;

const location=document.querySelectorAll(".search-container input")[1].value;

const type=document.querySelector(".search-container select").value;

console.log("Searching...");

console.log("Job:",job);

console.log("Location:",location);

console.log("Type:",type);

});

}


// ===========================================
// HERO BUTTON ANIMATION
// ===========================================

const heroButtons=document.querySelectorAll(".hero-buttons a");

heroButtons.forEach(button=>{

button.addEventListener("mouseenter",()=>{

button.style.transform="translateY(-4px)";

});

button.addEventListener("mouseleave",()=>{

button.style.transform="translateY(0px)";

});

});

// ==========================================
// ANIMATED COUNTERS
// ==========================================

const counters = document.querySelectorAll(".counter");

const startCounter = (counter) => {

    const target = +counter.getAttribute("data-target");

    let count = 0;

    const speed = target / 120;

    const updateCounter = () => {

        count += speed;

        if(count < target){

            counter.innerText = Math.ceil(count);

            requestAnimationFrame(updateCounter);

        }else{

            counter.innerText = target.toLocaleString() + "+";

        }

    };

    updateCounter();

};


// ==========================================
// INTERSECTION OBSERVER
// ==========================================

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            startCounter(entry.target);

            observer.unobserve(entry.target);

        }

    });

},{threshold:.5});


counters.forEach(counter=>{

    observer.observe(counter);

});


// ==========================================
// JOB CARD HOVER EFFECT
// ==========================================

const jobCards = document.querySelectorAll(".job-card");

jobCards.forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transform="translateY(-12px)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="translateY(0px)";

    });

});


/* ==========================================
   NEWSLETTER
========================================== */

const newsletterForm = document.querySelector(".newsletter-form");

if(newsletterForm){

newsletterForm.addEventListener("submit",(e)=>{

e.preventDefault();

alert("Thank you for subscribing!");

newsletterForm.reset();

});

}

/* ==========================================
   BACK TO TOP
========================================== */

const backToTop = document.getElementById("backToTop");

if(backToTop){

backToTop.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

}

/* ==========================================
   UI AI ASSISTANT
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ==========================================
       UI ELEMENTS
    ========================================== */

    const uiAiButton = document.getElementById("uiAiButton");

    const uiAiChat = document.getElementById("uiAiChat");

    const uiAiClose = document.getElementById("uiAiClose");

    const uiAiForm = document.getElementById("uiAiForm");

    const uiAiInput = document.getElementById("uiAiInput");

    const uiAiSend = document.getElementById("uiAiSend");

    const uiAiMessages = document.getElementById("uiAiMessages");

    const uiAiTyping = document.getElementById("uiAiTyping");


    /* ==========================================
       CHECK ELEMENTS
    ========================================== */

    if (
        !uiAiButton ||
        !uiAiChat ||
        !uiAiClose ||
        !uiAiForm ||
        !uiAiInput ||
        !uiAiSend ||
        !uiAiMessages ||
        !uiAiTyping
    ) {

        console.error(
            "UI AI Assistant: Required HTML elements were not found."
        );

        return;

    }


    /* ==========================================
       BACKEND URL
    ========================================== */

    const API_BASE_URL =
        "https://unicorninnovationsjobbackend-1.onrender.com";


    /* ==========================================
       OPEN AI CHAT
    ========================================== */

    uiAiButton.addEventListener("click", function () {

        uiAiChat.classList.add("active");

        uiAiButton.style.display = "none";

        setTimeout(function () {

            uiAiInput.focus();

        }, 200);

    });


    /* ==========================================
       CLOSE AI CHAT
    ========================================== */

    uiAiClose.addEventListener("click", function () {

        uiAiChat.classList.remove("active");

        uiAiButton.style.display = "flex";

    });


    /* ==========================================
       CLOSE CHAT WITH ESCAPE KEY
    ========================================== */

    document.addEventListener("keydown", function (event) {

        if (
            event.key === "Escape" &&
            uiAiChat.classList.contains("active")
        ) {

            uiAiChat.classList.remove("active");

            uiAiButton.style.display = "flex";

        }

    });


    /* ==========================================
       ADD MESSAGE TO CHAT
    ========================================== */

    function addMessage(message, sender) {

        const messageWrapper =
            document.createElement("div");


        /* Message type */

        if (sender === "user") {

            messageWrapper.className =
                "ui-message ui-message-user";

        } else {

            messageWrapper.className =
                "ui-message ui-message-ai";

        }


        /* ==========================================
           AVATAR
        ========================================== */

        const avatar =
            document.createElement("div");

        avatar.className =
            "ui-message-avatar";


        if (sender === "user") {

            avatar.textContent = "YOU";

        } else {

            avatar.textContent = "UI";

        }


        /* ==========================================
           MESSAGE CONTENT
        ========================================== */

        const content =
            document.createElement("div");

        content.className =
            "ui-message-content";


        /*
         * Use textContent instead of innerHTML.
         *
         * This prevents AI/user messages from
         * being interpreted as HTML.
         */

        const paragraph =
            document.createElement("p");

        paragraph.textContent = message;

        content.appendChild(paragraph);


        /* ==========================================
           BUILD MESSAGE
        ========================================== */

        messageWrapper.appendChild(avatar);

        messageWrapper.appendChild(content);

        uiAiMessages.appendChild(messageWrapper);


        /* ==========================================
           SCROLL TO BOTTOM
        ========================================== */

        uiAiMessages.scrollTop =
            uiAiMessages.scrollHeight;

    }


    /* ==========================================
       SHOW TYPING INDICATOR
    ========================================== */

    function showTyping() {

        uiAiTyping.classList.add("active");

        uiAiMessages.scrollTop =
            uiAiMessages.scrollHeight;

    }


    /* ==========================================
       HIDE TYPING INDICATOR
    ========================================== */

    function hideTyping() {

        uiAiTyping.classList.remove("active");

    }


    /* ==========================================
       SEND MESSAGE TO BACKEND
    ========================================== */

    async function sendMessage(message) {

        try {

            showTyping();

            uiAiSend.disabled = true;

            uiAiInput.disabled = true;


            /* ==========================================
               SEND REQUEST
            ========================================== */

            const response = await fetch(
                `${API_BASE_URL}/api/ai`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        message: message
                    })
                }
            );


            /* ==========================================
               READ RESPONSE
            ========================================== */

            const data =
                await response.json();


            /* ==========================================
               CHECK RESPONSE
            ========================================== */

            if (!response.ok || !data.success) {

                throw new Error(
                    data.message ||
                    "UI could not process your request."
                );

            }


            /* ==========================================
               ADD AI RESPONSE
            ========================================== */

            addMessage(
                data.message,
                "ai"
            );


        } catch (error) {

            console.error(
                "UI AI Error:",
                error
            );


            /* ==========================================
               USER-FRIENDLY ERROR
            ========================================== */

            addMessage(
                "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
                "ai"
            );


        } finally {

            hideTyping();

            uiAiSend.disabled = false;

            uiAiInput.disabled = false;

            uiAiInput.focus();

        }

    }


    /* ==========================================
       FORM SUBMISSION
    ========================================== */

    uiAiForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            /* ==========================================
               GET MESSAGE
            ========================================== */

            const message =
                uiAiInput.value.trim();


            /* ==========================================
               DON'T SEND EMPTY MESSAGE
            ========================================== */

            if (!message) {

                uiAiInput.focus();

                return;

            }


            /* ==========================================
               SHOW USER MESSAGE
            ========================================== */

            addMessage(
                message,
                "user"
            );


            /* ==========================================
               CLEAR INPUT
            ========================================== */

            uiAiInput.value = "";

            autoResizeTextarea();


            /* ==========================================
               SEND TO AI
            ========================================== */

            await sendMessage(message);

        }
    );


    /* ==========================================
       ENTER TO SEND
    ========================================== */

    uiAiInput.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();

                uiAiForm.requestSubmit();

            }

        }
    );


    /* ==========================================
       AUTO RESIZE TEXTAREA
    ========================================== */

    function autoResizeTextarea() {

        uiAiInput.style.height = "auto";

        uiAiInput.style.height =
            Math.min(
                uiAiInput.scrollHeight,
                105
            ) + "px";

    }


    uiAiInput.addEventListener(
        "input",
        autoResizeTextarea
    );


    /* ==========================================
       INITIAL TEXTAREA SIZE
    ========================================== */

    autoResizeTextarea();


});

/* =========================================================
   UI AI ASSISTANT
========================================================= */

const uiAiButton = document.getElementById("uiAiButton");
const uiAiChat = document.getElementById("uiAiChat");
const uiAiClose = document.getElementById("uiAiClose");
const uiAiForm = document.getElementById("uiAiForm");
const uiAiInput = document.getElementById("uiAiInput");
const uiAiMessages = document.getElementById("uiAiMessages");
const uiAiTyping = document.getElementById("uiAiTyping");
const uiAiSend = document.getElementById("uiAiSend");

const API_BASE_URL =
    "https://unicorninnovationsjobbackend-1.onrender.com";


/* =========================
   OPEN UI CHAT
========================= */

if (uiAiButton) {

    uiAiButton.addEventListener("click", () => {

        uiAiChat.classList.add("active");

        uiAiButton.style.display = "none";

        setTimeout(() => {
            uiAiInput.focus();
        }, 200);

    });

}


/* =========================
   CLOSE UI CHAT
========================= */

if (uiAiClose) {

    uiAiClose.addEventListener("click", () => {

        uiAiChat.classList.remove("active");

        uiAiButton.style.display = "flex";

    });

}


/* =========================
   ESCAPE KEY CLOSE
========================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        uiAiChat.classList.remove("active");

        if (uiAiButton) {
            uiAiButton.style.display = "flex";
        }

    }

});


/* =========================
   ADD MESSAGE
========================= */

function addUiMessage(message, sender) {

    const messageWrapper = document.createElement("div");

    messageWrapper.classList.add(
        "ui-message",
        sender === "user"
            ? "ui-message-user"
            : "ui-message-ai"
    );


    const avatar = document.createElement("div");

    avatar.classList.add("ui-message-avatar");

    avatar.textContent =
        sender === "user" ? "You" : "UI";


    const content = document.createElement("div");

    content.classList.add("ui-message-content");


    const paragraph = document.createElement("p");

    /*
     * textContent is intentional.
     * It prevents AI responses from injecting HTML/JavaScript.
     */
    paragraph.textContent = message;


    content.appendChild(paragraph);

    messageWrapper.appendChild(avatar);

    messageWrapper.appendChild(content);

    uiAiMessages.appendChild(messageWrapper);


    uiAiMessages.scrollTop =
        uiAiMessages.scrollHeight;

}


/* =========================
   TYPING INDICATOR
========================= */

function showUiTyping() {

    if (uiAiTyping) {
        uiAiTyping.style.display = "flex";
    }

    if (uiAiMessages) {
        uiAiMessages.scrollTop =
            uiAiMessages.scrollHeight;
    }

}


function hideUiTyping() {

    if (uiAiTyping) {
        uiAiTyping.style.display = "none";
    }

}


/* =========================
   SEND MESSAGE TO BACKEND
========================= */

async function sendMessageToUI(message) {

    showUiTyping();

    uiAiInput.disabled = true;
    uiAiSend.disabled = true;


    try {

        const response = await fetch(
            `${API_BASE_URL}/api/ai`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    message: message
                })
            }
        );


        const data = await response.json();


        if (!response.ok || data.success !== true) {

            throw new Error(
                data.message ||
                "UI could not process your request."
            );

        }


        addUiMessage(
            data.message,
            "ai"
        );


    } catch (error) {

        console.error(
            "UI AI Error:",
            error
        );


        addUiMessage(
            "Sorry, I couldn't connect to UI right now. Please try again shortly.",
            "ai"
        );

    } finally {

        hideUiTyping();

        uiAiInput.disabled = false;
        uiAiSend.disabled = false;

        uiAiInput.focus();

    }

}


/* =========================
   FORM SUBMISSION
========================= */

if (uiAiForm) {

    uiAiForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const message =
                uiAiInput.value.trim();


            if (!message) {
                return;
            }


            addUiMessage(
                message,
                "user"
            );


            uiAiInput.value = "";

            uiAiInput.style.height = "auto";


            await sendMessageToUI(
                message
            );

        }
    );

}


/* =========================
   ENTER TO SEND
========================= */

if (uiAiInput) {

    uiAiInput.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();

                uiAiForm.requestSubmit();

            }

        }
    );


    /* =========================
       AUTO RESIZE TEXTAREA
    ========================= */

    uiAiInput.addEventListener(
        "input",
        () => {

            uiAiInput.style.height =
                "auto";

            uiAiInput.style.height =
                Math.min(
                    uiAiInput.scrollHeight,
                    105
                ) + "px";

        }
    );

}