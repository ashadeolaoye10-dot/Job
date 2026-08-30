/* =========================================================
   APPLICANT EMAIL VERIFICATION
   Unicorn Innovation Hill Limited
   PRODUCTION / VERCEL + RENDER VERSION
========================================================= */


/* =========================================================
   JAVA BACKEND API
========================================================= */

const API_BASE_URL =
    "https://unicorninnovationsjobbackend-1.onrender.com";


/* =========================================================
   PAGE LOADER
========================================================= */

window.addEventListener("load", () => {

    const pageLoader =
        document.getElementById("pageLoader");

    if (pageLoader) {

        setTimeout(() => {

            pageLoader.classList.add("hidden");

        }, 500);
    }
});


/* =========================================================
   CURRENT YEAR
========================================================= */

const currentYear =
    document.getElementById("currentYear");

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();
}


/* =========================================================
   NAVBAR
========================================================= */

const hamburger =
    document.getElementById("hamburger");

const navLinks =
    document.getElementById("navLinks");

if (hamburger && navLinks) {

    hamburger.addEventListener("click", () => {

        hamburger.classList.toggle("active");

        navLinks.classList.toggle("active");
    });


    document
        .querySelectorAll(".nav-links a")
        .forEach(link => {

            link.addEventListener("click", () => {

                hamburger.classList.remove("active");

                navLinks.classList.remove("active");
            });

        });


    document.addEventListener("click", event => {

        if (
            !hamburger.contains(event.target) &&
            !navLinks.contains(event.target)
        ) {

            hamburger.classList.remove("active");

            navLinks.classList.remove("active");
        }
    });


    window.addEventListener("resize", () => {

        if (window.innerWidth > 992) {

            hamburger.classList.remove("active");

            navLinks.classList.remove("active");
        }
    });
}


/* =========================================================
   GET STORED EMAIL
========================================================= */

const storedEmail =
    localStorage.getItem("applicantEmail");

const applicantEmailElement =
    document.getElementById("applicantEmail");

if (applicantEmailElement) {

    if (storedEmail) {

        applicantEmailElement.textContent =
            storedEmail;

    } else {

        applicantEmailElement.textContent =
            "No email found";
    }
}


/* =========================================================
   ELEMENTS
========================================================= */

const verifyForm =
    document.getElementById("verifyForm");

const verificationCode =
    document.getElementById("verificationCode");

const verifyBtn =
    document.getElementById("verifyBtn");

const verificationMessage =
    document.getElementById("verificationMessage");

const resendBtn =
    document.getElementById("resendBtn");

const resendMessage =
    document.getElementById("resendMessage");


/* =========================================================
   SHOW VERIFICATION MESSAGE
========================================================= */

function showVerificationMessage(message, type) {

    if (!verificationMessage) {
        return;
    }

    verificationMessage.textContent =
        message;

    verificationMessage.className =
        "verification-message " + type;
}


/* =========================================================
   SHOW RESEND MESSAGE
========================================================= */

function showResendMessage(message, type) {

    if (!resendMessage) {
        return;
    }

    resendMessage.textContent =
        message;

    resendMessage.className =
        "resend-message " + type;
}


/* =========================================================
   CODE INPUT
========================================================= */

if (verificationCode) {

    verificationCode.addEventListener("input", () => {

        verificationCode.value =
            verificationCode.value
                .replace(/\D/g, "")
                .slice(0, 6);
    });
}


/* =========================================================
   VERIFY EMAIL
========================================================= */

if (verifyForm) {

    verifyForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            showVerificationMessage("", "");


            /* =================================================
               CHECK EMAIL
            ================================================= */

            if (!storedEmail) {

                showVerificationMessage(
                    "Your email could not be found. Please register again.",
                    "error"
                );

                return;
            }


            /* =================================================
               GET CODE
            ================================================= */

            const code =
                verificationCode
                    ? verificationCode.value.trim()
                    : "";


            /* =================================================
               VALIDATE CODE
            ================================================= */

            if (!code) {

                showVerificationMessage(
                    "Please enter your verification code.",
                    "error"
                );

                return;
            }


            if (!/^\d{6}$/.test(code)) {

                showVerificationMessage(
                    "Please enter the 6-digit verification code.",
                    "error"
                );

                return;
            }


            /* =================================================
               DISABLE BUTTON
            ================================================= */

            if (verifyBtn) {

                verifyBtn.disabled = true;

                verifyBtn.innerHTML =
                    '<i class="fa-solid fa-spinner fa-spin"></i> Verifying...';
            }


            /* =================================================
               SEND REQUEST
            ================================================= */

            try {

                const verifyURL =
                    API_BASE_URL +
                    "/api/applicants/verify";


                console.log(
                    "Verification API:",
                    verifyURL
                );


                const response =
                    await fetch(
                        verifyURL,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify({
                                    email: storedEmail,
                                    code: code
                                })
                        }
                    );


                /* =================================================
                   READ RESPONSE
                ================================================= */

                const responseText =
                    await response.text();


                console.log(
                    "Verification HTTP status:",
                    response.status
                );


                console.log(
                    "Verification response:",
                    responseText
                );


                let data = {};


                try {

                    data =
                        responseText
                            ? JSON.parse(responseText)
                            : {};

                } catch (jsonError) {

                    console.error(
                        "Invalid JSON:",
                        jsonError
                    );

                    throw new Error(
                        "The server returned an invalid response."
                    );
                }


                /* =================================================
                   BACKEND ERROR
                ================================================= */

                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        "Email verification failed."
                    );
                }


                /* =================================================
                   SUCCESS
                ================================================= */

                if (
                    data.success === true &&
                    data.verified === true
                ) {

                    showVerificationMessage(
                        "✅ Email verified successfully! Redirecting to login...",
                        "success"
                    );


                    if (verificationCode) {

                        verificationCode.disabled =
                            true;
                    }


                    localStorage.removeItem(
                        "verificationPending"
                    );


                    setTimeout(() => {

                        window.location.href =
                            "/Applicant-login.html";

                    }, 1500);


                    return;
                }


                /* =================================================
                   UNKNOWN RESPONSE
                ================================================= */

                throw new Error(
                    data.message ||
                    "Email verification failed."
                );


            } catch (error) {

                console.error(
                    "❌ Verification error:",
                    error
                );


                let message =
                    error.message ||
                    "Unable to verify your email.";


                if (
                    error instanceof TypeError
                ) {

                    message =
                        "Unable to connect to the Java backend. Please check that your Render backend is running.";
                }


                showVerificationMessage(
                    "❌ " + message,
                    "error"
                );


            } finally {

                if (verifyBtn) {

                    verifyBtn.disabled =
                        false;

                    verifyBtn.innerHTML =
                        '<i class="fa-solid fa-circle-check"></i> Verify Email';
                }
            }
        }
    );
}


/* =========================================================
   RESEND VERIFICATION CODE
========================================================= */

if (resendBtn) {

    resendBtn.addEventListener(
        "click",
        async function () {

            showResendMessage("", "");


            /* =================================================
               CHECK EMAIL
            ================================================= */

            if (!storedEmail) {

                showResendMessage(
                    "Your email could not be found. Please register again.",
                    "error"
                );

                return;
            }


            /* =================================================
               DISABLE BUTTON
            ================================================= */

            resendBtn.disabled = true;

            resendBtn.innerHTML =
                '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';


            /* =================================================
               SEND REQUEST
            ================================================= */

            try {

                const resendURL =
                    API_BASE_URL +
                    "/api/applicants/resend-code";


                console.log(
                    "Resend API:",
                    resendURL
                );


                const response =
                    await fetch(
                        resendURL,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify({
                                    email: storedEmail
                                })
                        }
                    );


                /* =================================================
                   READ RESPONSE
                ================================================= */

                const responseText =
                    await response.text();


                console.log(
                    "Resend HTTP status:",
                    response.status
                );


                console.log(
                    "Resend response:",
                    responseText
                );


                let data = {};


                try {

                    data =
                        responseText
                            ? JSON.parse(responseText)
                            : {};

                } catch (jsonError) {

                    console.error(
                        "Invalid JSON:",
                        jsonError
                    );

                    throw new Error(
                        "The server returned an invalid response."
                    );
                }


                /* =================================================
                   BACKEND ERROR
                ================================================= */

                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        "Could not resend verification code."
                    );
                }


                /* =================================================
                   SUCCESS
                ================================================= */

                if (data.success === true) {

                    showResendMessage(
                        "✅ A new verification code has been sent to your email.",
                        "success"
                    );

                    return;
                }


                throw new Error(
                    data.message ||
                    "Could not resend verification code."
                );


            } catch (error) {

                console.error(
                    "❌ Resend error:",
                    error
                );


                let message =
                    error.message ||
                    "Unable to resend verification code.";


                if (
                    error instanceof TypeError
                ) {

                    message =
                        "Unable to connect to the Java backend. Please check that your Render backend is running.";
                }


                showResendMessage(
                    "❌ " + message,
                    "error"
                );


            } finally {

                setTimeout(() => {

                    resendBtn.disabled =
                        false;

                    resendBtn.innerHTML =
                        '<i class="fa-solid fa-rotate-right"></i> Resend Verification Code';

                }, 3000);
            }
        }
    );
}


/* =========================================================
   NO EMAIL PROTECTION
========================================================= */

if (!storedEmail) {

    showVerificationMessage(
        "No registration email was found. Please register for an account first.",
        "error"
    );
}