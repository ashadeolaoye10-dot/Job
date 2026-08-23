/* ==========================================
   APPLICANT LOGIN JAVASCRIPT
   Unicorn Innovation Hill Limited
========================================== */


/* =========================================================
   PRODUCTION BACKEND
========================================================= */

const API_BASE_URL =
    "https://unicorninnovationsjobbackend-1.onrender.com";


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

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


/* =========================================================
   NAVBAR ON SCROLL
========================================================= */

const header =
    document.querySelector("header");


if (header) {

    window.addEventListener("scroll", function () {

        if (window.scrollY > 50) {

            header.style.boxShadow =
                "0 8px 25px rgba(0,0,0,.4)";

        } else {

            header.style.boxShadow =
                "0 5px 20px rgba(0,0,0,.25)";

        }

    });

}


/* =========================================================
   APPLICANT LOGIN
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const loginForm =
            document.querySelector(".login-form");

        if (!loginForm) {
            console.error(
                "Login form was not found."
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


        /* =====================================================
           SHOW / HIDE PASSWORD
        ===================================================== */

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
                            .remove(
                                "fa-eye-slash"
                            );

                        togglePassword.classList
                            .add("fa-eye");
                    }

                }
            );
        }


        /* =====================================================
           LOGIN FORM
        ===================================================== */

        loginForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                const email =
                    emailInput.value.trim()
                        .toLowerCase();


                const password =
                    passwordInput.value;


                /* =============================================
                   VALIDATION
                ============================================= */

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


                /* =============================================
                   DISABLE BUTTON
                ============================================= */

                loginButton.disabled = true;

                loginButton.innerHTML =
                    '<i class="fa-solid fa-spinner fa-spin"></i> Logging in...';


                try {

                    /* =========================================
                       SEND LOGIN REQUEST TO RENDER
                    ========================================= */

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

                                        email: email,

                                        password: password

                                    })

                            }
                        );


                    console.log(
                        "Login HTTP status:",
                        response.status
                    );


                    /* =========================================
                       READ RESPONSE
                    ========================================= */

                    const responseText =
                        await response.text();


                    console.log(
                        "Login response:",
                        responseText
                    );


                    let result;


                    try {

                        result =
                            JSON.parse(
                                responseText
                            );

                    } catch (error) {

                        console.error(
                            "Invalid JSON from backend:",
                            error
                        );

                        throw new Error(
                            "The server returned an invalid response."
                        );
                    }


                    /* =========================================
                       INCORRECT EMAIL / PASSWORD
                    ========================================= */

                    if (
                        response.status ===
                        401
                    ) {

                        alert(
                            "❌ Incorrect email or password."
                        );

                        loginButton.disabled =
                            false;

                        loginButton.innerHTML =
                            "Login";

                        passwordInput.value = "";

                        passwordInput.focus();

                        return;
                    }


                    /* =========================================
                       OTHER BACKEND ERROR
                    ========================================= */

                    if (!response.ok) {

                        throw new Error(
                            result.message ||
                            "Login failed."
                        );
                    }


                    /* =========================================
                       LOGIN SUCCESSFUL
                    ========================================= */

                    if (
                        result.success ===
                        true
                    ) {

                        /* =====================================
                           SAVE APPLICANT INFORMATION
                        ===================================== */

                        localStorage.setItem(
                            "isApplicantLoggedIn",
                            "true"
                        );


                        localStorage.setItem(
                            "loggedInEmail",
                            result.email
                        );


                        localStorage.setItem(
                            "applicantEmail",
                            result.email
                        );


                        localStorage.setItem(
                            "loggedInName",
                            result.name
                        );


                        localStorage.setItem(
                            "applicantName",
                            result.name
                        );


                        /* =====================================
                           PROFILE IMAGE
                        ===================================== */

                        if (
                            result.profileImage
                        ) {

                            localStorage.setItem(
                                "applicantProfileImage",
                                result.profileImage
                            );

                        }


                        console.log(
                            "Applicant login successful:",
                            result.email
                        );


                        /* =====================================
                           REDIRECT
                        ===================================== */

                        alert(
                            "✅ Login successful!"
                        );


                        window.location.href =
                            "Applicant-dashboard.html";

                        return;
                    }


                    /* =========================================
                       UNKNOWN RESPONSE
                    ========================================= */

                    throw new Error(
                        result.message ||
                        "Login failed. Please try again."
                    );


                } catch (error) {

                    console.error(
                        "❌ Login error:",
                        error
                    );


                    let message =
                        error.message ||
                        "Unable to login.";


                    /* =========================================
                       CONNECTION ERROR
                    ========================================= */

                    if (
                        error instanceof TypeError
                    ) {

                        message =
                            "❌ Cannot connect to the Java backend.\n\n" +
                            "Please make sure the Render backend is running.";
                    }


                    alert(message);


                    loginButton.disabled =
                        false;


                    loginButton.innerHTML =
                        "Login";

                }

            });

    });