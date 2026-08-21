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

/* =========================================================
   APPLICANT LOGIN
   Connects to Java backend
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const loginForm =
        document.querySelector(".login-form");

    const emailInput =
        loginForm.querySelector('input[type="email"]');

    const passwordInput =
        document.getElementById("password");

    const loginButton =
        document.getElementById("loginBtn");


    /* =====================================================
       SHOW / HIDE PASSWORD
    ===================================================== */

    const togglePassword =
        document.querySelector(".toggle-password");

    if (togglePassword) {

        togglePassword.addEventListener("click", function () {

            if (passwordInput.type === "password") {

                passwordInput.type = "text";

                togglePassword.classList.remove("fa-eye");

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

        });
    }


    /* =====================================================
       LOGIN FORM
    ===================================================== */

    loginForm.addEventListener("submit", async function (event) {

        event.preventDefault();


        const email =
            emailInput.value.trim();

        const password =
            passwordInput.value;


        /* =================================================
           VALIDATION
        ================================================= */

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


        /* =================================================
           DISABLE BUTTON
        ================================================= */

        loginButton.disabled = true;

        loginButton.innerHTML =
            "⏳ Logging in...";


        /* =================================================
           SEND LOGIN REQUEST TO JAVA
        ================================================= */

        try {

            const response =
                await fetch(
                    "http://localhost:8080/api/applicants/login",
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


            const result =
                await response.json();


            console.log(
                "Login response:",
                result
            );


            /* =================================================
               INCORRECT EMAIL OR PASSWORD
            ================================================= */

            if (response.status === 401) {

                alert(
                    "❌ Incorrect email or password."
                );

                loginButton.disabled = false;

                loginButton.innerHTML =
                    "Login";

                passwordInput.value = "";

                passwordInput.focus();

                return;
            }


            /* =================================================
               OTHER BACKEND ERROR
            ================================================= */

            if (!response.ok) {

                throw new Error(
                    result.message ||
                    "Login failed."
                );

            }


            /* =================================================
               LOGIN SUCCESSFUL
            ================================================= */

            if (result.success === true) {

                /*
                 * Save applicant information.
                 *
                 * EMAIL IS NOT HASHED.
                 */

                localStorage.setItem(
                    "loggedInEmail",
                    result.email
                );


                localStorage.setItem(
                    "applicantEmail",
                    result.email
                );


                localStorage.setItem(
                    "applicantName",
                    result.name
                );


                localStorage.setItem(
                    "loggedInName",
                    result.name
                );


                /* =============================================
                   PROFILE IMAGE
                ============================================= */

                if (result.profileImage) {

                    localStorage.setItem(
                        "applicantProfileImage",
                        result.profileImage
                    );

                }


                /* =============================================
                   LOGIN STATUS
                ============================================= */

                localStorage.setItem(
                    "isApplicantLoggedIn",
                    "true"
                );


                /* =============================================
                   GO TO DASHBOARD
                ============================================= */

                alert(
                    "✅ Login successful!"
                );


                window.location.href =
                    "Applicant-dashboard.html";

                return;
            }


            /* =================================================
               UNKNOWN RESPONSE
            ================================================= */

            alert(
                "Login failed. Please try again."
            );


            loginButton.disabled = false;

            loginButton.innerHTML =
                "Login";


        } catch (error) {

            console.error(
                "Login error:",
                error
            );


            alert(

                "❌ Unable to connect to the server.\n\n" +

                "Make sure your Java backend is running."

            );


            loginButton.disabled = false;

            loginButton.innerHTML =
                "Login";

        }

    });

});