/* ==========================================
   APPLICANT LOGIN JAVASCRIPT
   Unicorn Innovation Hill Limited
========================================== */


/* ==========================================
   MOBILE NAVIGATION
========================================== */

const hamburger =
    document.querySelector(".hamburger");

const navLinks =
    document.querySelector(".nav-links");


if (hamburger && navLinks) {

    hamburger.addEventListener("click", function () {

        hamburger.classList.toggle("active");

        navLinks.classList.toggle("active");

    });


    /* Close menu when link is clicked */

    document
        .querySelectorAll(".nav-links a")
        .forEach(function (link) {

            link.addEventListener("click", function () {

                hamburger.classList.remove("active");

                navLinks.classList.remove("active");

            });

        });


    /* Close menu when clicking outside */

    document.addEventListener("click", function (event) {

        if (
            !hamburger.contains(event.target) &&
            !navLinks.contains(event.target)
        ) {

            hamburger.classList.remove("active");

            navLinks.classList.remove("active");

        }

    });

}


/* ==========================================
   NAVBAR ON SCROLL
========================================== */

const header =
    document.querySelector("header");


if (header) {

    window.addEventListener("scroll", function () {

        if (window.scrollY > 50) {

            header.style.background = "#0849A8";

            header.style.boxShadow =
                "0 8px 25px rgba(0,0,0,.4)";

        } else {

            header.style.background = "#0B5ED7";

            header.style.boxShadow =
                "0 5px 20px rgba(0,0,0,.25)";

        }

    });

}


/* ==========================================
   LOGIN ELEMENTS
========================================== */

const loginBtn =
    document.getElementById("loginBtn");

const loginForm =
    document.querySelector(".login-form");

const emailInput =
    document.querySelector(
        ".login-form input[type='email']"
    );

const passwordInput =
    document.getElementById("password");

const togglePassword =
    document.querySelector(".toggle-password");


/* ==========================================
   SHOW / HIDE PASSWORD
========================================== */

if (passwordInput && togglePassword) {

    togglePassword.addEventListener(
        "click",
        function () {

            if (passwordInput.type === "password") {

                passwordInput.type = "text";

                togglePassword.classList.remove(
                    "fa-eye"
                );

                togglePassword.classList.add(
                    "fa-eye-slash"
                );

            } else {

                passwordInput.type = "password";

                togglePassword.classList.remove(
                    "fa-eye-slash"
                );

                togglePassword.classList.add(
                    "fa-eye"
                );

            }

        }
    );

}


/* ==========================================
   LOGIN BUTTON
========================================== */

if (
    loginBtn &&
    emailInput &&
    passwordInput
) {

    loginBtn.addEventListener(
        "click",
        function (event) {

            /*
                STOP THE HREF FIRST.

                This prevents the user from
                going to the dashboard before
                validation is completed.
            */

            event.preventDefault();


            /* Get entered information */

            const email =
                emailInput.value.trim();

            const password =
                passwordInput.value.trim();


            /* ==================================
               CHECK EMAIL
            ================================== */

            if (email === "") {

                alert(
                    "Please enter your email address."
                );

                emailInput.focus();

                return;

            }


            /* ==================================
               CHECK PASSWORD
            ================================== */

            if (password === "") {

                alert(
                    "Please enter your password."
                );

                passwordInput.focus();

                return;

            }


            /* ==================================
               BOTH ARE FILLED
            ================================== */

            /*
                Save the email temporarily.
                We will use the database later.
            */

            localStorage.setItem(
                "loggedInEmail",
                email
            );


            /*
                Get dashboard location
                from the HTML.
            */

            const dashboard =
                loginBtn.getAttribute(
                    "data-dashboard"
                );


            /* ==================================
               GO TO DASHBOARD
            ================================== */

            if (dashboard) {

                window.location.href =
                    dashboard;

            }

        }
    );

}