/* ==========================================
   APPLICANT LOGIN JAVASCRIPT
   Unicorn Innovation Hill Limited
   PRODUCTION / RENDER VERSION
========================================== */


/* ==========================================
   JAVA BACKEND API
========================================== */

const API_BASE_URL =
    "https://unicorninnovationsjobbackend-1.onrender.com";


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


    document
        .querySelectorAll(".nav-links a")
        .forEach(function (link) {

            link.addEventListener("click", function () {

                hamburger.classList.remove("active");

                navLinks.classList.remove("active");

            });

        });


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
   APPLICANT LOGIN
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const loginForm =
            document.querySelector(".login-form");


        /* ==========================================
           MAKE SURE FORM EXISTS
        ========================================== */

        if (!loginForm) {

            console.error(
                "❌ Login form was not found."
            );

            return;

        }


        const emailInput =
            loginForm.querySelector(
                'input[type="email"]'
            );


        const passwordInput =
            document.getElementById("password");


        const loginButton =
            document.getElementById("loginBtn");


        /* ==========================================
           SHOW / HIDE PASSWORD
        ========================================== */

        const togglePassword =
            document.querySelector(
                ".toggle-password"
            );


        if (
            togglePassword &&
            passwordInput
        ) {

            togglePassword.addEventListener(
                "click",
                function () {

                    if (
                        passwordInput.type ===
                        "password"
                    ) {

                        passwordInput.type =
                            "text";


                        togglePassword.classList
                            .remove("fa-eye");


                        togglePassword.classList
                            .add("fa-eye-slash");

                    } else {

                        passwordInput.type =
                            "password";


                        togglePassword.classList
                            .remove("fa-eye-slash");


                        togglePassword.classList
                            .add("fa-eye");

                    }

                }
            );

        }


        /* ==========================================
           LOGIN FORM
        ========================================== */

        loginForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                /* ==========================================
                   GET VALUES
                ========================================== */

                const email =
                    emailInput.value.trim();


                const password =
                    passwordInput.value;


                /* ==========================================
                   VALIDATION
                ========================================== */

                if (!email) {

                    alert(
                        "Please enter your email address."
                    );

                    emailInput.focus();

                    return;

                }


                if (!password) {

                    alert(
                        "Please enter your password."
                    );

                    passwordInput.focus();

                    return;

                }


                /* ==========================================
                   DISABLE LOGIN BUTTON
                ========================================== */

                if (loginButton) {

                    loginButton.disabled =
                        true;


                    loginButton.innerHTML =
                        "⏳ Logging in...";

                }


                /* ==========================================
                   SEND LOGIN TO DEPLOYED JAVA BACKEND
                ========================================== */

                try {

                    const response =
                        await fetch(

                            API_BASE_URL +
                            "/api/applicants/login",

                            {

                                method: "POST",

                                headers: {

                                    "Content-Type":
                                        "application/json"

                                },

                                body:
                                    JSON.stringify({

                                        email:
                                            email,

                                        password:
                                            password

                                    })

                            }

                        );


                    /* ==========================================
                       READ SERVER RESPONSE
                    ========================================== */

                    let result = {};

                    try {

                        result =
                            await response.json();

                    } catch (jsonError) {

                        console.error(
                            "Server did not return valid JSON."
                        );

                    }


                    console.log(
                        "Login response:",
                        result
                    );


                    /* ==========================================
                       INCORRECT LOGIN
                    ========================================== */

                    if (
                        response.status === 401
                    ) {

                        alert(
                            "❌ Incorrect email or password."
                        );


                        resetLoginButton();


                        passwordInput.value = "";

                        passwordInput.focus();

                        return;

                    }


                    /* ==========================================
                       OTHER SERVER ERROR
                    ========================================== */

                    if (!response.ok) {

                        throw new Error(

                            result.message ||
                            "Login failed. Server returned HTTP " +
                            response.status

                        );

                    }


                    /* ==========================================
                       LOGIN SUCCESSFUL
                    ========================================== */

                    if (
                        result.success === true
                    ) {

                        /* ======================================
                           SAVE EMAIL
                        ====================================== */

                        localStorage.setItem(
                            "loggedInEmail",
                            result.email || email
                        );


                        localStorage.setItem(
                            "applicantEmail",
                            result.email || email
                        );


                        /* ======================================
                           SAVE APPLICANT NAME
                        ====================================== */

                        localStorage.setItem(
                            "applicantName",
                            result.name || ""
                        );


                        localStorage.setItem(
                            "loggedInName",
                            result.name || ""
                        );


                        /* ======================================
                           SAVE PROFILE IMAGE
                        ====================================== */

                        if (
                            result.profileImage
                        ) {

                            localStorage.setItem(
                                "applicantProfileImage",
                                result.profileImage
                            );

                        }


                        /* ======================================
                           LOGIN STATUS
                        ====================================== */

                        localStorage.setItem(
                            "isApplicantLoggedIn",
                            "true"
                        );


                        /* ======================================
                           SUCCESS MESSAGE
                        ====================================== */

                        alert(
                            "✅ Login successful!"
                        );


                        /* ======================================
                           CHECK FOR PENDING JOB
                        ====================================== */

                        const pendingJobId =
                            localStorage.getItem(
                                "pendingJobId"
                            );


                        if (pendingJobId) {

                            /*
                             * Keep pendingJobId.
                             * Jobs.js can use it when the
                             * applicant returns to the Jobs page.
                             */

                            window.location.href =
                                "Jobs.html";

                        } else {

                            window.location.href =
                                "Applicant-dashboard.html";

                        }


                        return;

                    }


                    /* ==========================================
                       UNKNOWN RESPONSE
                    ========================================== */

                    alert(
                        result.message ||
                        "Login failed. Please try again."
                    );


                    resetLoginButton();


                } catch (error) {

                    console.error(
                        "❌ Login error:",
                        error
                    );


                    alert(

                        "❌ Unable to connect to the server.\n\n" +

                        "Please check that your deployed Java backend " +
                        "is running on Render."

                    );


                    resetLoginButton();

                }


                /* ==========================================
                   RESET BUTTON
                ========================================== */

                function resetLoginButton() {

                    if (loginButton) {

                        loginButton.disabled =
                            false;


                        loginButton.innerHTML =
                            "Login";

                    }

                }

            }
        );

    }
);