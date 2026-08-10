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